import axios from 'axios';
import _ from 'lodash';

const storeKey = 'com.otgride.admin.redux';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

API.interceptors.request.use(
  (config) => {
    const persistedState = localStorage.getItem(storeKey)
      ? JSON.parse(localStorage.getItem(storeKey))
      : {};

    const { accessToken } = persistedState.user;

    if (!_.isNil(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error),
);

export const normalizedAPIError = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    return { message: error.response.data.error };
  }

  if (error.message) {
    return error;
  }

  return { message: 'Something went wrong' };
};
