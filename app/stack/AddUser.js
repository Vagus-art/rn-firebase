import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { addItem } from "../firebaseActions";
import { connect } from "react-redux";
import { getCollections } from "../firebaseActions";

const mapDispatchToProps = dispatch => ({
    getUsers: (payload) => dispatch({type:"GET_USERS",payload}) 
  })

const AddUser = (props) => {
  const [inputs, setInput] = useState({
    first: "",
    last: "",
    born: 0
  });
  const onSubmit = () => {
    addItem(inputs.first, inputs.last, inputs.born);
    getCollections().then(data => props.getUsers(data));
    props.navigation.goBack();
  };
  return (
      <View style={styles.container}>
        <TextInput
          placeholder="first"
          onChangeText={text => setInput({ ...inputs, first: text })}
        />
        <TextInput
          placeholder="last"
          onChangeText={text => setInput({ ...inputs, last: text })}
        />
        <TextInput
          placeholder="born"
          onChangeText={text => setInput({ ...inputs, born: text })}
        />
        <Button title="submit" onPress={() => onSubmit()} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(null,mapDispatchToProps)(AddUser);