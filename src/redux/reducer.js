import { ADD_PRODUCTS_INFO, DELETE_PRODUCT } from "./actions/actions_types.js";

const initialState = {
  filterProducts: [],
  allProducts: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS_INFO:
      console.log("Payload received by reducer:", payload);
      const newState = {
        ...state,
        allProducts: payload,
        filterProducts: payload,
      };
      // Guarda el nuevo estado en localStorage
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;

    case DELETE_PRODUCT:
      const productNameToDelete = payload;
      const updatedProducts = state.allProducts.filter(
        (product) => product.name !== productNameToDelete
      );
      const updatedState = {
        ...state,
        allProducts: updatedProducts,
      };
      // Guarda el nuevo estado en localStorage
      localStorage.setItem("appState", JSON.stringify(updatedState));
      return updatedState;

    default:
      return state;
  }
};

export default rootReducer;
