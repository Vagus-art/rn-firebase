import React, { useState } from "react";
import { View } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

export default ItemOverlay = props => {
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);

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
        <Input
          label={props.nameLabel}
          placeholder="Nombre"
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 20, width:"auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setName(text)}
        />
        <Input
          label={props.quantityLabel}
          placeholder="..."
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 20, width:"auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setQuantity(text)}
        />
        <Button
          title="Guardar"
          containerStyle={{ margin: 20, width:"auto" }}
          onPress={() => {
            props.toggle(!props.isVisible);
            props.function({ name, quantity });
          }}
        />
      </View>
    </Overlay>
  );
};
