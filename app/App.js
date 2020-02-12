import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import "@firebase/firestore";
import { ListItem } from "react-native-elements";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

const getCollections = async () => {
  const collection = await db.collection("users").get();
  const awaited = collection.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }));
  return awaited;
};

const addItem = (first, last, born) => {
  db.collection("users").add({
    first,
    last,
    born
  });
};

export default function App() {
  const [collections, setCollections] = useState(null);
  const [inputs, setInput] = useState({
    first: "",
    last: "",
    born: 0
  });
  useEffect(() => {
    getCollections().then(data => setCollections(data));
    //console.log(collections);
  }, []);
  const onSubmit = () => {
    addItem(inputs.first, inputs.last, inputs.born);
    getCollections().then(data => setCollections(data));
  };
  return (
    <View style={styles.main}>
      {collections &&
        collections.map(doc => (
          <ListItem
            title={doc.data.first + " " + doc.data.last}
            rightTitle={doc.id}
            subtitle={"born: " + doc.data.born}
            onPress={() => alert("something")}
            bottomDivider
          />
        ))}
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
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
