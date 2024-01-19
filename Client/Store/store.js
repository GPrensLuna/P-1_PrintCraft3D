// store.js
import { createStore } from "redux";
import rootReducer from "./reducer";

const makeStore = () => createStore(rootReducer);

export default makeStore;
