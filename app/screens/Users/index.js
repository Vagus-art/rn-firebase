import { createStackNavigator } from "react-navigation-stack";
import Users from "./Users";
import AddUser from "./innerstack/AddUser";
import ViewUser from "./innerstack/ViewUser";
import {withNavigation} from "../../UI/WithNavigationHOC";


const UserStack = createStackNavigator(
  {
    Users: {
      screen: withNavigation(Users),
      navigationOptions: {
        title: "Clientes"
      }
    },
    AddUser: {
      screen: AddUser,
      navigationOptions: {
        title: "Agregar Cliente"
      }
    },
    ViewUser: {
      screen: ViewUser,
      navigationOptions: {
        title: "Ver Cliente"
      }
    }
  },
  {
    initialRouteName: "Users"
  }
);

export default UserStack;
