import {
  SET_PRODUCTS,
  SET_ERROR,
  SET_CURRENT_PAGE,
  SET_LIMIT,
} from "./actions";

const initialState = {
  products: [],
  error: "",
  currentPage: 1,
  limit: 12,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
