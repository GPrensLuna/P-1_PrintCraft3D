import { ADD_PRODUCTS_INFO, LOGIN_USER } from "./actions_types.js";

export const addProductInfo = (addProductInfo) => {
  return {
    type: ADD_PRODUCTS_INFO,
    payload: addProductInfo,
  };
};

export const LoginUser = (LoginUser) => {
  return {
    type: LOGIN_USER,
    payload: LoginUser,
  };
};

