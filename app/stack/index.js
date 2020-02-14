import { createStackNavigator } from "react-navigation-stack";
import Users from "./Users";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";
import { createAppContainer } from "react-navigation";

const UserStack = createStackNavigator(
  {
    Users: {
      screen: Users,
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

export default createAppContainer(UserStack);
