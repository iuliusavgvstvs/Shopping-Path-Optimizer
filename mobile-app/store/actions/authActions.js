import axios from 'axios';

export const SIGNUP_STARTED = 'SIGNUP_STARTED';
export const SIGNUP_SUCCEEDED = 'SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.102:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const signup = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_STARTED });
    try {
      const response = await axiosInstance({
        method: 'post',
        url: '/auth/signup',
        data: { email, password },
      });
      const responseData = response.data;
      dispatch({ type: SIGNUP_SUCCEEDED, payload: responseData });
    } catch (error) {
      let err = 'Sign up failed. Please try again later.';
      if (!error.response)
        err = 'Login takes too long. Please try again later.';
      dispatch({ type: SIGNUP_FAILED, payload: err });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_STARTED });
    try {
      const response = await axiosInstance({
        method: 'post',
        url: '/auth/login',
        data: { email, password },
      });
      const responseData = response.data;
      dispatch({ type: LOGIN_SUCCEEDED, payload: responseData });
    } catch (error) {
      let err = 'Log in failed. Please try again later.';
      if (error.response) {
        if (error.response.status === '403')
          err = 'Invalid username or password. Please try again.';
      } else err = 'Login takes too long. Please try again later.';
      dispatch({ type: LOGIN_FAILED, payload: err });
    }
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };
};
