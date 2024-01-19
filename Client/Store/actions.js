export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_ERROR = "SET_ERROR";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_LIMIT = "SET_LIMIT";

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setError = (error) => ({ 
  type: SET_ERROR,
  payload: error,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setLimit = (limit) => ({ 
  type: SET_LIMIT,
  payload: limit,
});
