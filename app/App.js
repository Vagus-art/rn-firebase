import React from "react";
import Users from "./Users/";
import Stock from "./Stock";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { promiseMiddleware } from "./redux-middleware";
import { fetchDir, fetchStock } from "./lib/Helpers";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { O2A, ReverseO2A } from "object-to-array-convert";

const DrawerNavigator = createDrawerNavigator(
  {
    Users: {
      screen: Users,
      navigationOptions: {
        title: "Clientes"
      }
    },
    Stock: {
      screen: Stock,
      navigationOptions: {
        title: "Stock"
      }
    }
  },
  {
    initialRouteName: "Stock"
  }
);

const Navigation = createAppContainer(DrawerNavigator);

const initialState = {
  users: null,
  stock: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_STOCK":
      return { ...state, stock: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

console.disableYellowBox = true;

fetchDir("/rnfirebase/users",(data)=>store.dispatch({
  type: "GET_USERS",
  payload: data
}));

fetchStock("/rnfirebase/stock",(data)=>store.dispatch({
  type: "GET_STOCK",
  payload: data
}));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
