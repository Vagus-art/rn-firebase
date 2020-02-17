import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";

export default AddItemOverlay = props => {
  const [name,setName] = useState(null);
  const [quantity,setQuantity] = useState(null);

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
      <Input
        label="Agregar item"
        placeholder="Nombre"
        leftIcon={{ name: "list" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setName(text)}
      />
      <Input
        label="Cantidad"
        placeholder="..."
        leftIcon={{ name: "list" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setQuantity(text)}
      />
      <Button title="Guardar" onPress={()=>{props.toggle(!props.isVisible);props.function({name,quantity})}} />
    </Overlay>
  );
};
