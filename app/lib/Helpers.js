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
        let categoryName = item.key;
        Object.values(item.val()).forEach(childitem => {
          if (childitem.name !== "void") {
            category.push({
              name: childitem.name,
              quantity: childitem.quantity,
              category: categoryName,
              key: childitem.key
            });
          }
        });
        data.push({ title: categoryName, data: category });
      });
      callback(data);
    });
};

//agrega items del stock a una categoría
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

//crea una categoria agregando un item vacio a la carpeta
export const createCategory = category => {
  firebase
    .database()
    .ref("/rnfirebase/stock/" + category)
    .set({ void: 0 });
};
//agrega un usuario
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

export const updateUser = (key, { first, last, born }) => {
  firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .update({ first, last, born });
};

export const deleteUser = key => {
  firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .remove();
};

export const deleteItem = (category, key) => {
  firebase
    .database()
    .ref("rnfirebase/stock/" + category + "/" + key)
    .remove();
};

export const updateItem = (category, key, { name, quantity }) => {
  firebase
    .database()
    .ref("rnfirebase/stock/" + category + "/" + key)
    .update({ name, quantity });
};

export const deleteCategory = category => {
  firebase
    .database()
    .ref("rnfirebase/stock/" + category)
    .remove();
};

export const renameCategory = (category, renamedCategory) => {
  const callbackActions = snap => {
    firebase
      .database()
      .ref("rnfirebase/stock/" + renamedCategory)
      .update({ ...snap });
    deleteCategory(category);
  };
  fetchDir("rnfirebase/stock/" + category, callbackActions);
};
