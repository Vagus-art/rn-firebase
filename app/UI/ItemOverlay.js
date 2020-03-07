import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Overlay, Input, Button, Text, Divider } from "react-native-elements";

export default ItemOverlay = props => {
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (props.option) {
      setName(props.option.name);
      setQuantity(props.option.quantity);
      setUnit(props.option.unit);
      setPrice(props.option.price);
    }
  }, [props.option]);

  {
    /* Este useEffect asigna los valores anteriores del item a los inputs si se trata de una modificación */
  }

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
      <View style={{ width: 300 }}>
        <Text h4 style={{ width: "auto", textAlign: "center", opacity:0.7}}>{props.nameLabel}</Text>
        <Divider style={{ margin: 10 }}></Divider>
        <Input
          value={name}
          label="Nombre"
          placeholder="Nombre"
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 10, width: "auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setName(text)}
        />
        <Input
          value={quantity?quantity.toString():null}
          label="Cantidad"
          keyboardType={'numeric'}
          placeholder="Cantidad"
          leftIcon={{ name: "inbox" }}
          containerStyle={{ margin: 10, width: "auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setQuantity(Number.parseInt(text))}
        />
        <Input
          value={unit}
          label="Unidad (peso)"
          placeholder="Unidad (peso)"
          leftIcon={{ name: "local-mall" }}
          containerStyle={{ margin: 10, width: "auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setUnit(text)}
        />
        <Input
          value={price?price.toString():null}
          keyboardType={'numeric'}
          label="Precio"
          placeholder="Precio"
          leftIcon={{ name: "attach-money" }}
          containerStyle={{ margin: 10, width: "auto" }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setPrice(Number.parseInt(text))}
        />
        <Button
          title="Guardar"
          containerStyle={{ margin: 10, width: "auto" }}
          onPress={() => {
            props.toggle(!props.isVisible);
            props.function({ name, quantity, unit, price });
          }}
        />
      </View>
    </Overlay>
  );
};
