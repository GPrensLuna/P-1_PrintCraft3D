import { ADD_PRODUCTS_INFO, DELETE_PRODUCT } from "./actions/actions_types.js";

const initialState = {
  filterProducts: [],
  allProducts: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS_INFO:
     return { ...state, allProducts: payload, filterProducts: payload };

    default:
      return state;
  }
};

export default rootReducer;
