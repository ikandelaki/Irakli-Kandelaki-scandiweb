import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// importing Redux
import { Provider } from "react-redux";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

// Importing reducer
import reducer from "./reducers";

// Configuring store
const store = configureStore({ reducer }, applyMiddleware(reduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
