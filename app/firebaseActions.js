import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import "@firebase/firestore";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export const getCollections = async () => {
  const collection = await db.collection("users").get();
  const awaited = collection.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }));
  return awaited;
};

export const addItem = (first, last, born) => {
  db.collection("users").add({
    first,
    last,
    born
  });
};