import {
  FETCH_PRODUCTS_STARTED,
  FETCH_PRODUCTS_SUCCEEDED,
  FETCH_PRODUCTS_FAILED,
  CLEAR_PRODUCTS_ERROR,
} from '../actions/productActions';

const initialState = {
  availableProducts: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_STARTED:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case FETCH_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        availableProducts: action.payload.products,
        error: null,
        isLoading: false,
      };
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case CLEAR_PRODUCTS_ERROR:
      return { ...state, error: null };
  }
  return state;
};
