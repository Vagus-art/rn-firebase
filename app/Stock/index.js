import { createStackNavigator } from "react-navigation-stack";
import Stock from "./Stock";
import AddStock from "./AddStock";
import {withNavigation} from "../WithNavigationHOC";
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();


const StockStack = createStackNavigator(
  {
    Stock: {
      screen: withNavigation(Stock),
      navigationOptions: {
        title: "Stock"
      }
    },
    AddStock: {
      screen: AddStock,
      navigationOptions: {
        title: "Agregar Item"
      }
    }
  },
  {
    initialRouteName: "Stock"
  }
);

export default StockStack;
