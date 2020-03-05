import React from "react";
import Users from "./Users/";
import Stock from "./Stock/";
import Balance from "./Balance/";
import Trades from "./Trades/";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { fetchDir, fetchStock } from "./lib/Helpers";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

const DrawerNavigator = createDrawerNavigator(
  {
    Trades: {
      screen: Trades,
      navigationOptions: {
        title: "Intercambios"
      }
    },
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
    },
    Balance: {
      screen: Balance,
      navigationOptions: {
        title: "Balance"
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

const store = createStore(reducer);

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
