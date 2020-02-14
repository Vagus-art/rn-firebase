import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import "@firebase/firestore";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();



export const getCollections = async () => {
  const db = firebase.firestore();
  const collection = await db.collection("users").get();
  const awaited = collection.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }));
  return awaited;
};

export const addItem = (first, last, born) => {
  const db = firebase.firestore();
  db.collection("users").add({
    first,
    last,
    born
  });
};

export const modifyItem = (id, first, last, born) => {
  const db = firebase.firestore();
  db.collection("users").doc(id).set({
    first,
    last,
    born
  }, { merge: true });
};

export const deleteItem = (id) => {
  const db = firebase.firestore();
  db.collection("users").doc(id).delete();
};

