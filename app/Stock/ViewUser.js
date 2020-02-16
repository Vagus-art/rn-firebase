import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import ActionButton from "../ActionButton";
//import firebase from "../firebase";


const ViewUser = props => {
  const item = props.navigation.state.params.item;

  const dbRef = firebase.ref('users/'+item.id+'/');

  const [inputs, setInput] = useState({
    ...item
  });

  const [editMode, toggleEdit] = useState(false);

  const toggleEditMode = () => {
    editMode ? setInput({ ...item }) : null;
    toggleEdit(!editMode);
  };

  const onSubmit = () => {
    //dbRef.update({first:inputs.first,last:inputs.last,born:inputs.born});
    props.navigation.goBack();
  };

  const onDelete = async () => {
    //dbRef.remove();
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



export default ViewUser;
