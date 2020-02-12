import React from "react";
import Stack from "./stack/";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { promiseMiddleware } from "./redux-middleware";

const initialState = {
  users: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default function App() {
  return <Provider store={store}><Stack /></Provider>;
}
