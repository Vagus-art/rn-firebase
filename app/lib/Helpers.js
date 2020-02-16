import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const fetchDir = (dir, callback) => {
  firebase
    .database()
    .ref(dir)
    .on("value", snap => {
      if (snap.val()) {
        callback(Object.values(snap.val()));
      }
    });
};

//fetchStock obtiene carpetas junto a sus contenidos, estructurado para SectionList de react native
/*
SectionList solo acepta datos con esta estructura:
section:[{
    title:"title",data:[...data]
}]
*/

export const fetchStock = (dir, callback) => {
  firebase
    .database()
    .ref(dir)
    .on("value", snap => {
      let data = [];
      snap.forEach(item => {
        let category = [];

        Object.values(item.val()).forEach(childitem => {
          category.push({ name: childitem.name, quantity: childitem.quantity });
        });

        data.push({ title: item.key, data: category });
      });
      callback(data);
    });
};

export const pushToCategory = (category, { name, quantity }) => {
  const key = firebase
    .database()
    .ref("/rnfirebase/stock/" + category)
    .push().key;
  firebase
    .database()
    .ref("rnfirebase/stock/" + category + "/" + key)
    .update({ name, quantity, key });
};

export const pushToUsers = ({ first, last, born }) => {
  const key = firebase
    .database()
    .ref("/rnfirebase/users/")
    .push().key;
  firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .update({ first, last, born, key });
};

export const updateUser = (key, {first,last,born}) => {
    firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .update({ first, last, born});
}

export const deleteUser = (key) => {
    firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .remove();
}
