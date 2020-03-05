import React, { useState } from "react";
import { View } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

export default CategoryOverlay = props => {
  const [input, setInput] = useState(null);
  return (
    <Overlay
      overlayStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 300
      }}
      isVisible={props.isVisible}
      onBackdropPress={() => props.toggle(!props.isVisible)}
    >
      <View style={{width:300}}>
        <Input
          label={props.label}
          placeholder="Nombre"
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 20, width:"auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setInput(text)}
        />
        <Button
          title="Guardar"
          containerStyle={{ margin: 20, width:"auto" }}
          onPress={() => {
            props.toggle(!props.isVisible);
            props.function(input);
          }}
        />
      </View>
    </Overlay>
  );
};
