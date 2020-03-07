import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import ActionButton from "../../../UI/ActionButton";
import { updateUser, deleteUser } from "../../../lib/Helpers";


const ViewUser = props => {
  const item = props.navigation.state.params.item;


  const [inputs, setInput] = useState({
    ...item
  });

  const [editMode, toggleEdit] = useState(false);

  const toggleEditMode = () => {
    editMode ? setInput({ ...item }) : null;
    toggleEdit(!editMode);
  };

  const onSubmit = () => {
    const {name,adress,phone} = inputs;
    updateUser(item.key,{name,adress,phone});
    props.navigation.goBack();
  };

  const onDelete = async () => {
    deleteUser(item.key)
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nombre"
        placeholder="..."
        leftIcon={{ name: "person" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, name: text })}
        value={inputs.name}
        disabled={!editMode}
      />

      <Input
        label="Dirección"
        placeholder="..."
        leftIcon={{ name: "directions-car" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, adress: text })}
        value={inputs.adress}
        disabled={!editMode}
      />

      <Input
        label="Teléfono"
        placeholder="..."
        leftIcon={{ name: "phone" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, phone: text })}
        value={inputs.phone}
        disabled={!editMode}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          height: 100
        }}
      >
        <TouchableOpacity style={{ flex: 1, height: 100, padding: 10}}>
          <Button
            title={editMode ? "Cancelar" : "Modificar"}
            onPress={() => toggleEditMode()}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, height: 100, padding: 10 }}>
          <Button
            title={"Borrar"}
            onPress={() => onDelete()}
            style={{ flex: 1, height: 100 }}
          />
        </TouchableOpacity>
      </View>
      {editMode && <ActionButton touch={() => onSubmit()} iconName="check" />}
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



export default ViewUser;
