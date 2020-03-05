import React from "react";
import { View } from "react-native";
import { Overlay, Button, ListItem } from "react-native-elements";

export default LongPressOverlayMenu = props => {
  return (
    <Overlay
      overlayStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        width: 300
      }}
      isVisible={props.isVisible}
      onBackdropPress={() => props.toggle(!props.isVisible)}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {props.menuData.map((item, index) => (
          <ListItem
            containerStyle={{
              width: 300
            }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center"
            }}
            titleStyle={{           
              fontSize: 20
            }}
            title={item.title}
            onPress={() => {
              props.toggle(!props.isVisible);
              item.function(props.option);
            }}
            key={index}
            bottomDivider
            topDivider
          />
        ))}
      </View>
    </Overlay>
  );
};
