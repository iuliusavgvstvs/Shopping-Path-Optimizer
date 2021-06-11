import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';
//import { ADD_ORDER } from '../actions/orderActions';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = parseFloat(addedProduct.price);
      const productTitle = addedProduct.title;
      const productImageUrl = addedProduct.imageUrl;
      const productShelfId = addedProduct.shelfId;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          addedProduct.id,
          productShelfId,
          productTitle,
          productImageUrl,
          productPrice,
          state.items[addedProduct.id].quantity + 1,
          parseFloat(state.items[addedProduct.id].sum) +
            parseFloat(productPrice)
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          addedProduct.id,
          productShelfId,
          productTitle,
          productImageUrl,
          parseFloat(productPrice),
          1,
          parseFloat(productPrice)
        );
      }
      return {
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const oldItem = state.items[action.productId];
      const currentQuantity = oldItem.quantity;
      let updatedItems;
      if (currentQuantity > 1) {
        const updatedItem = new CartItem(
          oldItem.productId,
          productShelfId,
          oldItem.productTitle,
          oldItem.productImageUrl,
          oldItem.productPrice,
          oldItem.quantity - 1,
          parseFloat(oldItem.sum) - parseFloat(oldItem.productPrice)
        );
        updatedItems = { ...state.items, [action.productId]: updatedItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.productId];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - oldItem.productPrice,
      };
    // case ADD_ORDER:
    //   return initialState;
    default:
      return state;
  }
};
