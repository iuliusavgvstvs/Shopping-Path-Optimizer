import {
  INIT_PATH_STARTED,
  INIT_PATH_FAILED,
  INIT_PATH_SUCCEEDED,
} from '../actions/pathActions';

const initialState = {
  cart: null,
  shelves: null,
  currentShelf: 0,
  itemsToPick: null,
  path: null,
  error: null,
  isLoadingPath: false,
  config: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_PATH_STARTED:
      return {
        ...state,
        isLoadingPath: true,
        error: null,
        cart: null,
        path: null,
        itemsToPick: null,
        currentShelf: 0,
        config: null,
        shelves: null,
      };
    case INIT_PATH_SUCCEEDED:
      return {
        ...state,
        isLoadingPath: false,
      };
  }
  return state;
};
