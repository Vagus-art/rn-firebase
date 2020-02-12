import { createStackNavigator } from "react-navigation-stack";
import Users from "./Users";
import AddUser from "./AddUser";
import { createAppContainer } from "react-navigation";

const UserStack = createStackNavigator(
  {
    Users: {
      screen:Users,
      navigationOptions: {
        title: "Users"
      }
    },
    AddUser: {
        screen:AddUser,
        navigationOptions: {
          title: "Add User"
        }
      }
  },
  {
    initialRouteName: "Users"
  }
);

export default createAppContainer(UserStack);