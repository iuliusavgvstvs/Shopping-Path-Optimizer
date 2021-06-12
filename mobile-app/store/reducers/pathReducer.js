import {
  INIT_PATH_STARTED,
  INIT_PATH_FAILED,
  INIT_PATH_SUCCEEDED,
  CHECK_ITEM,
  GENERATE_NEXT_STARTED,
  GENERATE_NEXT_SUCCEEDED,
  GENERATE_NEXT_FAILED,
} from '../actions/pathActions';

const initialState = {
  config: null,
  items: null,
  itemsToPick: null,
  allShelves: null,
  currentShelves: null,
  orderedShelves: null,
  currentShelf: 0,
  path: null,
  error: null,
  isLoadingPath: false,
  itemsInCart: 0,
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_PATH_STARTED:
      return {
        config: null,
        items: null,
        itemsToPick: null,
        allShelves: null,
        currentShelves: null,
        orderedShelves: null,
        currentShelf: 0,
        path: null,
        error: null,
        itemsInCart: 0,
        totalAmount: 0,
        isLoadingPath: true,
      };
    case INIT_PATH_SUCCEEDED:
      return {
        ...state,
        config: action.payload.config,
        items: action.payload.items,
        itemsToPick: action.payload.itemsToPick,
        allShelves: action.payload.allShelves,
        currentShelves: action.payload.currentShelves,
        orderedShelves: action.payload.orderedShelves,
        currentShelf: 1,
        path: action.payload.path,
        error: null,
        isLoadingPath: false,
      };
    case CHECK_ITEM:
      const oldItem = state.itemsToPick.find(
        (item) => item.productId === action.payload.itemId
      );
      const newItems = state.itemsToPick.filter(
        (item) => item.productId !== action.payload.itemId
      );
      return {
        ...state,
        itemsToPick: newItems,
        totalAmount: state.totalAmount + oldItem.sum,
        itemsInCart: state.itemsInCart + 1,
      };
    case GENERATE_NEXT_STARTED:
      return {
        ...state,
        isLoadingPath: true,
      };
    case GENERATE_NEXT_SUCCEEDED: {
      let newItemsToPick = [];
      if (state.currentShelf < state.currentShelves.length - 1) {
        const currentShelfId =
          state.currentShelves[state.orderedShelves[state.currentShelf + 1]].id;
        Object.values(state.items).forEach((item) => {
          if (item.shelfId === currentShelfId) newItemsToPick.push(item);
        });
      }
      return {
        ...state,
        path: action.payload.path,
        isLoadingPath: false,
        currentShelf: state.currentShelf + 1,
        itemsToPick: newItemsToPick,
        error: null,
      };
    }
  }
  return state;
};
