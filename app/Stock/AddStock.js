import React, { useState } from "react";
import { StyleSheet, View} from "react-native";
import { Input } from "react-native-elements";
import {pushToCategory} from "../lib/Helpers";

const AddStock = props => {
  const [inputs, setInput] = useState({
    category: null,
    name: null,
    quantity: null
  });
  const onSubmit = () => {
    if (inputs.category&&inputs.name&&inputs.quantity){
    pushToCategory(inputs.category,{name:inputs.name,quantity:inputs.quantity})
    }
    else alert("Campos vacios, revise antes de confirmar.")
  };
  return (
    <View style={styles.container}>
      <Input
        label="Categoría"
        placeholder="..."
        leftIcon={{ name: "folder" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, category: text })}
      />

      <Input
        label="Nombre"
        placeholder="..."
        leftIcon={{ name: "list" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, name: text })}
      />

      <Input
        label="Cantidad"
        placeholder="..."
        leftIcon={{ name: "view-comfy" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, quantity: text })}
      />

      <ActionButton touch={() => onSubmit()} iconName="check" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});

export default AddStock;
