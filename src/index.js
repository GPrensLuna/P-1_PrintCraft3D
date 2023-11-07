import React from "react";
<<<<<<< Updated upstream
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history"; // Import createBrowserHistory
import reportWebVitals from "./reportWebVitals";
=======
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import App from "./App";
>>>>>>> Stashed changes
import store from "./redux/store";
import "./App.css";
import App from "./App";

<<<<<<< Updated upstream
// Create a history object
const history = createBrowserHistory();

// Use the history object in the Router
=======
>>>>>>> Stashed changes
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
