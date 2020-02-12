import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    right: 30,
    bottom: 30
  }
});

export default ActionButton = props => {
  return (
    <TouchableOpacity
      style={styles.TouchableOpacityStyle}
      activeOpacity={0.7}
      onPress={props.touch}
    >
      <Icon
        name="add"
        reverseColor="#ffffff"
        color="#1858cd"
        size={35}
        reverse
        raised
      />
    </TouchableOpacity>
  );
};
