import {
  ADD_PRODUCTS_INFO,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "./actions_types.js";

export const addProductInfo = (addProductInfo) => {
  return {
    type: ADD_PRODUCTS_INFO,
    payload: addProductInfo,
  };
};

export const addToCart = (id) => ({ type: ADD_TO_CART, payload: id });

export const delFromCart = (id, all = false) =>
  all
    ? { type: REMOVE_ALL_FROM_CART, payload: id }
    : { type: REMOVE_ONE_FROM_CART, payload: id };

export const clearCart = () => ({ type: CLEAR_CART });
