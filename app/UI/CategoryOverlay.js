import React, { useState } from "react";
import { View } from "react-native";
import { Overlay, Input, Button, Text, Divider } from "react-native-elements";

export default CategoryOverlay = props => {
  const [input, setInput] = useState(null);
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
      <View style={{width:300}}>
        <Text h4 style={{ width: "auto", textAlign: "center", opacity:0.7}}>{props.nameLabel}</Text>
        <Divider style={{ margin: 10 }}></Divider>
        <Input
          label="Nombre"
          placeholder="Nombre..."
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 10, width:"auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setInput(text)}
        />
        <Button
          title="Guardar"
          containerStyle={{ margin: 10, width:"auto" }}
          onPress={() => {
            props.toggle(!props.isVisible);
            props.function(input);
          }}
        />
      </View>
    </Overlay>
  );
};
