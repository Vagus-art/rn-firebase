import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { addItem } from "../firebaseActions";
import { connect } from "react-redux";
import { getCollections } from "../firebaseActions";
import { Input } from "react-native-elements";

const mapDispatchToProps = dispatch => ({
  getUsers: payload => dispatch({ type: "GET_USERS", payload })
});

const AddUser = props => {
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
      <Input
        label="First name"
        placeholder="First"
        leftIcon={{ name: "people" }}
        containerStyle={{margin:20}}
        leftIconContainerStyle={{marginLeft:5,marginRight:5}}
        onChangeText={text => setInput({ ...inputs, first: text })}
       
      />

      <Input
        label="Last name"
        placeholder="Last"
        leftIcon={{ name: "people" }}
        containerStyle={{margin:20}}
        leftIconContainerStyle={{marginLeft:5,marginRight:5}}
        onChangeText={text => setInput({ ...inputs, last: text })}
      />

      <Input
        label="Birth year"
        placeholder="Born"
        leftIcon={{ name: "people" }}
        containerStyle={{margin:20}}
        leftIconContainerStyle={{marginLeft:5,marginRight:5}}
        onChangeText={text => setInput({ ...inputs, born: text })}
      />

      <Button title="submit" onPress={() => onSubmit()} />
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

export default connect(null, mapDispatchToProps)(AddUser);
