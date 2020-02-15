import React, { useState } from "react";
import { StyleSheet, View} from "react-native";
import { Input } from "react-native-elements";
import firebase from "../firebase";

const AddUser = props => {
  const [inputs, setInput] = useState({
    first: null,
    last: null,
    born: null
  });
  const onSubmit = async () => {
    if (inputs.first&&inputs.last&&inputs.born){
    const key = firebase.ref('/users').push().key;
    firebase.ref('users/'+key+'/').update({first:inputs.first,last:inputs.last,born:inputs.born,id:key});
    props.navigation.goBack();
    }
    else alert("Campos vacios, revise antes de confirmar.")
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
      />

      <Input
        label="Dirección"
        placeholder="..."
        leftIcon={{ name: "directions-car" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, last: text })}
      />

      <Input
        label="Teléfono"
        placeholder="..."
        leftIcon={{ name: "phone" }}
        containerStyle={{ margin: 20 }}
        leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
        onChangeText={text => setInput({ ...inputs, born: text })}
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

export default AddUser;
