import {
  ADD_PRODUCTS_INFO,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "./actions/actions_types.js";

const initialState = {
  filterProducts: [],
  allProducts: [],
  cart: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS_INFO:
      return { ...state, allProducts: payload, filterProducts: payload };

    case ADD_TO_CART: {
      let newItem = state.allProducts.find((product) => product.id === payload);
      //console.log(newItem);

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, cantidad: 1 }],
          };
    }
    case REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === payload);

      return itemToDelete.cantidad > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === payload
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== payload),
          };
    }
    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };
    }
    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

export default rootReducer;
