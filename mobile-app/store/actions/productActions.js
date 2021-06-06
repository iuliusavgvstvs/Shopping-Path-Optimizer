import axios from 'axios';

export const FETCH_PRODUCTS_STARTED = 'FETCH_PRODUCTS_STARTED';
export const FETCH_PRODUCTS_SUCCEEDED = 'FETCH_PRODUCTS_SUCCEEDED';
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';
export const CLEAR_PRODUCTS_ERROR = 'CLEAR_PRODUCTS_ERROR';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.100:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const fetchProductsByCatId = (token, categoryId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_STARTED });
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `/products/categories/${categoryId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      dispatch({ type: FETCH_PRODUCTS_SUCCEEDED, payload: responseData });
    } catch (error) {
      console.log('eroare la fetch products', error);
      let err = 'Fetching products failed. Please try again later.';
      if (!error.response)
        err = 'Fetching products takes too long. Please try again later.';
      dispatch({ type: FETCH_PRODUCTS_FAILED, payload: err });
    }
  };
};

export const fetchProductsByName = (token, searchString) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_STARTED });
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `/products/${searchString}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      dispatch({ type: FETCH_PRODUCTS_SUCCEEDED, payload: responseData });
    } catch (error) {
      console.log('eroare la fetch products', error);
      let err = 'Fetching products failed. Please try again later.';
      if (!error.response)
        err = 'Fetching products takes too long. Please try again later.';
      dispatch({ type: FETCH_PRODUCTS_FAILED, payload: err });
    }
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_PRODUCTS_ERROR });
  };
};
