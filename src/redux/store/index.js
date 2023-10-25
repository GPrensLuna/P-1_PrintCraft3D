import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer.js";
import thunk from "redux-thunk";

const savedState = JSON.parse(localStorage.getItem("appState"));

const store = createStore(rootReducer, savedState,applyMiddleware(thunk));

export default store;
