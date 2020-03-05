import React from "react";
import { ListItem } from "react-native-elements";
import { Text } from "react-native";

export default TradeTemplate = props => {
  return (
    <ListItem
      title={props.person}
      rightTitle={<Text>${props.sum}</Text>}
      subtitle={props.item}
      onPress={props.touch}
      bottomDivider
    />
  );
};
