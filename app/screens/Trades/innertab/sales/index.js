import { createStackNavigator } from "react-navigation-stack";
import Sales from "./Sales";
import { withNavigation } from "../../../../UI/WithNavigationHOC";

export default createStackNavigator(
  {
    Sales: {
      screen: withNavigation(Sales),
      navigationOptions: {
        title: "Ventas"
      }
    }
  },
  {
    initialRouteName: "Sales"
  }
);
