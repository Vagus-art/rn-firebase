import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import "@firebase/firestore";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const addUser = (user, phone) => {
  const dbh = firebase.firestore();
  dbh
    .collection("users")
    .add({
      name: user,
      phone: phone
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch(error => {
      console.error("Error writing document: ", error);
    });
};

const readUsers = async () => {
  const dbh = firebase.firestore();
  const docRef = await dbh.collection("users").get();
  return docRef.data();
};

export default function App() {
  const [clients, setClients] = useState(null);
  const [name,setName] = useState(null);
  const [phone,setPhone] = useState(null);

  useEffect(() => {
    setClients(readUsers);
    alert(clients);
  }, []);
  return (
    <View style={styles.container}>     
      {clients && <Text>hola</Text>}
      <Text>add users!</Text>
      <TextInput placeholder="username" onChangeText={text => setName(text)}></TextInput>
      <TextInput placeholder="phone number" onChangeText={text => setPhone(text)}></TextInput>
      <Button title="Add Client" onPress={()=>addUser(name,phone)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
