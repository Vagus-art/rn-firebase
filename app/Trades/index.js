import { createStackNavigator } from "react-navigation-stack";
import Trades from "./Trades";
import {withNavigation} from "../UI/WithNavigationHOC";
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();


const TradesStack = createStackNavigator(
  {
    Trades: {
      screen: withNavigation(Trades),
      navigationOptions: {
        title: "Intercambios"
      }
    }
  },
  {
    initialRouteName: "Trades"
  }
);

export default TradesStack;
