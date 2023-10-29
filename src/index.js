import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import './App.css';
import App from './App';
import store from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
