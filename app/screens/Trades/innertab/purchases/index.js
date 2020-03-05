import { createStackNavigator } from "react-navigation-stack";
import Purchases from "./Purchases";
import { withNavigation } from "../../../../UI/WithNavigationHOC";

export default createStackNavigator(
  {
    Purchases: {
      screen: withNavigation(Purchases),
      navigationOptions: {
        title: "Compras"
      }
    }
  },
  {
    initialRouteName: "Purchases"
  }
);
