import axios from 'axios';
import _ from 'lodash';

export const normalizedAPIError = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    return { message: error.response.data.error };
  }

  if (error.message) {
    return error;
  }

  return { message: 'Something went wrong' };
};

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

// set up Authorization in header
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!_.isNil(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error),
);

// auto refresh expired token
let isRefreshing = false; // if there is an ongoing token refreshing job
let subscribers = []; // callbacks waiting for token refreshed event

const subscribeTokenRefresh = (callback) => {
  subscribers.push(callback);
};

const onTokenRefreshed = (token) => {
  subscribers.map(callback => callback(token));

  subscribers = [];
};

API.interceptors.response.use(undefined, (err) => {
  const {
    config,
    response: {
      status,
      data: { error },
    },
  } = err;

  const originalRequest = config;

  // verify the error is caused by expired token
  if (status === 401 && error === 'access token expired') {
    // create a new refreshing job
    if (!isRefreshing) {
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      API({ method: 'post', url: '/auth/token', data: { refreshToken } }).then((response) => {
        const {
          data: { accessToken },
        } = response;

        isRefreshing = false;
        localStorage.setItem('accessToken', accessToken);

        onTokenRefreshed(accessToken);
      });
    }

    const requestSubscribers = new Promise((resolve) => {
      subscribeTokenRefresh((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
    return requestSubscribers;
  }

  return Promise.reject(err);
});
