import React from "react";
import { ListItem } from "react-native-elements";

export default ItemTemplate = props => {
  return (
    <ListItem
      title={props.name}
      rightTitle={props.quantity}
      subtitle={props.unity}
      onPress={() => alert("something")}
      bottomDivider
    />
  );
};
