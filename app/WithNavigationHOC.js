import React from "react";
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";

//HOC that adds menu button
export const withNavigation = Component => {
  Component.navigationOptions = props => ({
    headerLeft: () => (
      <Icon
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        name="menu"
        iconStyle={{ paddingLeft: 20 }}
      />
    )
  });
  return Component;
};