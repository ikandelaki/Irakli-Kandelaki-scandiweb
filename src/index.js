import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// Importing apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// importing Redux
import { Provider } from "react-redux";
import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

// Importing reducer
import reducer from "./reducers";

// For redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Configuring store
const store = configureStore(
  { reducer },
  composeEnhancers(applyMiddleware(reduxThunk))
);

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
