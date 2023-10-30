import {
  ADD_PRODUCTS_INFO,
  LOGIN_USER,
  SET_SEARCH_RESULTS,
} from "./actions/actions_types.js";

const initialState = {
  filterProducts: [],
  allProducts: [],
  searchResults: [],
  userData: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS_INFO:
      return { ...state, allProducts: payload, filterProducts: payload };
    case LOGIN_USER:
      return { ...state, userData: payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: payload };

    default:
      return state;
  }
};

export default rootReducer;
