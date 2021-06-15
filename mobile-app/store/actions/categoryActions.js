import axios from 'axios';

export const FETCH_CATEGORY_STARTED = 'SET_CATEGORIES';
export const FETCH_CATEGORY_FAILED = 'FETCH_CATEGORY_FAILED';
export const FETCH_CATEGORY_SUCCEEDED = 'FETCH_CATEGORY_SUCCEEDED';
export const CLEAR_CATEGORY_ERROR = 'CLEAR_CATEGORY_ERROR';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.102:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const fetchCategories = (token) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORY_STARTED });
    try {
      const response = await axiosInstance({
        method: 'get',
        url: '/categories',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      dispatch({ type: FETCH_CATEGORY_SUCCEEDED, payload: responseData });
    } catch (error) {
      let err = 'Fetching categories failed. Please try again later.';
      if (!error.response)
        err = 'Fetching categories takes too long. Please try again later.';
      dispatch({ type: FETCH_CATEGORY_FAILED, payload: err });
    }
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CATEGORY_ERROR });
  };
};
