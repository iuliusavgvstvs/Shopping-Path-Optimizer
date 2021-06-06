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

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          addedProduct.id,
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
          productTitle,
          productImageUrl,
          parseFloat(productPrice),
          1,
          parseFloat(productPrice)
        );
      }
      return {
        items: { [addedProduct.id]: updatedOrNewCartItem, ...state.items },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const oldItem = state.items[action.productId];
      const currentQuantity = oldItem.quantity;
      let updatedItems;
      if (currentQuantity > 1) {
        const updatedItem = new CartItem(
          oldItem.quantity - 1,
          oldItem.productPrice,
          oldItem.productTitle,
          oldItem.sum - oldItem.productPrice
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
