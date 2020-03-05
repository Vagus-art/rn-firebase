import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";
import Purchases from "./innertab/purchases";
import Sales from "./innertab/sales";
import { withNavigation } from "../../UI/WithNavigationHOC";

const TradesNav = createBottomTabNavigator(
  {
    Sales: {
      screen: withNavigation(Sales),
      navigationOptions: {
        title: "Ventas",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="attach-money" color={tintColor} size={30} />
        )
      }
    },
    Purchases: {
      screen: withNavigation(Purchases),
      navigationOptions: {
        title: "Compras",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="shopping-cart" color={tintColor} size={30} />
        )
      }
    }
  },
  {
    initialRouteName: "Sales",
    tabBarOptions: {
      labelStyle: {
        fontSize: 16
      },
      style: {
        height: 60
      }
    }
  }
);

export default TradesNav;
