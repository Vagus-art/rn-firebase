import React, { useState } from "react";
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
      <Input
        label={props.label}
        placeholder="Nombre"
        leftIcon={{ name: "list" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput(text)}
      />
      <Button
        title="Guardar"
        onPress={() => {
          props.toggle(!props.isVisible);
          props.function(input);
        }}
      />
    </Overlay>
  );
};
