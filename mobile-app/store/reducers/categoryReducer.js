import {
  FETCH_CATEGORY_STARTED,
  FETCH_CATEGORY_FAILED,
  FETCH_CATEGORY_SUCCEEDED,
} from '../actions/categoryActions';

const initialState = {
  availableCategories: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_STARTED:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case FETCH_CATEGORY_SUCCEEDED:
      return {
        ...state,
        availableCategories: action.payload.categories,
        error: null,
        isLoading: false,
      };
    case FETCH_CATEGORY_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
  }
  return state;
};
