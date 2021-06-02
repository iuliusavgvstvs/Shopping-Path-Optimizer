import axios from 'axios';

export const SIGNUP_STARTED = 'SIGNUP_STARTED';
export const SIGNUP_SUCCEEDED = 'SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.101:5000/api',
  headers: { 'Content-Type': 'application/json' },
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
      console.log('response data aici: ', response);
      const responseData = response.data;
      console.log('response data aici', responseData);
      dispatch({ type: SIGNUP_SUCCEEDED, payload: response });
    } catch (error) {
      console.log('am primit eroare:', error);
      console.log('error response aici', error.response);
      if (error === 'Error: Request failed with status code 403')
        console.log('da');
      dispatch({ type: SIGNUP_FAILED, payload: error.message });
    }
  };
};

export const login = (email, password) => {
  console.log('S-a intrat in login cu ', email, password);
  return async (dispatch) => {
    dispatch({ type: LOGIN_STARTED });
    try {
      const response = await axiosInstance({
        method: 'post',
        url: '/auth/login',
        data: { email, password },
      });
      const responseData = response.data;
      console.log('response data aici', responseData);
      dispatch({ type: LOGIN_SUCCEEDED, payload: responseData });
    } catch (error) {
      let err = 'Log in failed. Please try again later.';
      if (error.response.status === '403')
        err = 'Invalid username or password. Please try again.';
      dispatch({ type: LOGIN_FAILED, payload: err });
    }
  };
};
