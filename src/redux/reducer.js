import { ADD_PRODUCTS_INFO, LOGIN_USER } from "./actions/actions_types.js";

const initialState = {
  filterProducts: [],
  allProducts: [],
  userData: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS_INFO:
      return { ...state, allProducts: payload, filterProducts: payload };
    case LOGIN_USER:
      return { ...state, userData: payload };

    default:
      return state;
  }
};

export default rootReducer;
