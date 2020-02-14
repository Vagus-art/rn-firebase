import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { modifyItem, deleteItem } from "../firebaseActions";
import { connect } from "react-redux";
import { getCollections } from "../firebaseActions";
import { Input } from "react-native-elements";
import ActionButton from "../ActionButton";

const mapDispatchToProps = dispatch => ({
  getUsers: payload => dispatch({ type: "GET_USERS", payload })
});

const ViewUser = props => {
  const item = props.navigation.state.params.item;

  const data = item.data;

  const [inputs, setInput] = useState({
    ...data
  });

  const [editMode, toggleEdit] = useState(false);

  const toggleEditMode = () => {
    editMode ? setInput({ ...data }) : null;
    toggleEdit(!editMode);
  };

  const onSubmit = () => {
    modifyItem(item.id, inputs.first, inputs.last, inputs.born);
    getCollections().then(data => props.getUsers(data));
    props.navigation.goBack();
  };

  const onDelete = async () => {
    deleteItem(item.id);
    getCollections().then(data => props.getUsers(data));
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
        onChangeText={text => setInput({ ...inputs, first: text })}
        value={inputs.first}
        disabled={!editMode}
      />

      <Input
        label="Dirección"
        placeholder="..."
        leftIcon={{ name: "directions-car" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, last: text })}
        value={inputs.last}
        disabled={!editMode}
      />

      <Input
        label="Teléfono"
        placeholder="..."
        leftIcon={{ name: "phone" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, born: text })}
        value={inputs.born}
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

const highestTimeoutId = setTimeout(() => ';');
for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i); 
}

export default connect(null, mapDispatchToProps)(ViewUser);
