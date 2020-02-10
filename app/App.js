import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import "@firebase/firestore";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();


// ADD DOCS

/*db.collection("users").add({
  first: "asd",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});*/

//GET DOCS
/*
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
});*/

const getCollections = async () => {
  const collection = await db.collection("users").get();
  const awaited = collection.docs.map(doc=>({id:doc.id,data:doc.data()}));
  return awaited;
}
console.log("asddasd");
export default function App() {
  const [collections,setCollections] = useState(null);
  useEffect(()=>{
    getCollections().then(data=>setCollections(data));
    console.log(collections);
  },[])
  return (
    <View style={styles.container}>  
    <Text>add asddasss sss!</Text> 
    <Text>asda ssssd</Text>
  {collections && collections.map(doc=><Text>{doc.id} | {doc.data.first}</Text>)}   
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
