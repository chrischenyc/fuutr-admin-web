import axios from 'axios';

const storeKey = 'com.otgride.admin.redux';

const persistedState = localStorage.getItem(storeKey)
  ? JSON.parse(localStorage.getItem(storeKey))
  : {};

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: { Authorization: `bearer ${persistedState.user.accessToken}` },
});

export const normalizedAPIError = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    return { message: error.response.data.error };
  }

  if (error.message) {
    return error;
  }

  return { message: 'Something went wrong' };
};
