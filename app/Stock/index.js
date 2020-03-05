import { createStackNavigator } from "react-navigation-stack";
import Stock from "./Stock";
import { withNavigation } from "../UI/WithNavigationHOC";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

const StockStack = createStackNavigator(
  {
    Stock: {
      screen: withNavigation(Stock),
      navigationOptions: {
        title: "Stock"
      }
    }
  },
  {
    initialRouteName: "Stock"
  }
);

export default StockStack;
