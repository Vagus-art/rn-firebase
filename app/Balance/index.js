import { createStackNavigator } from "react-navigation-stack";
import Balance from "./Balance";
import {withNavigation} from "../WithNavigationHOC";
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();


const BalanceStack = createStackNavigator(
  {
    Balance: {
      screen: withNavigation(Balance),
      navigationOptions: {
        title: "Balance"
      }
    }
  },
  {
    initialRouteName: "Balance"
  }
);

export default BalanceStack;
