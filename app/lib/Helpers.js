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
              unit: childitem.unit,
              price: childitem.price,
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

export const fetchStockValue = (dir, callback) => {
  firebase
    .database()
    .ref(dir)
    .on("value", snap => {
      let moneyCounter = 0;
      let itemCounter = 0;
      snap.forEach(category=>{
        category.forEach(item=>{
          if(item.val()!=0){
            moneyCounter+=item.val().price*item.val().quantity;
            itemCounter+=item.val().quantity;
          }
        })
      });
      callback({moneyCounter,itemCounter});
    });
}

//agrega items del stock a una categoría
export const pushToCategory = (category, { name, quantity, unit, price }) => {
  const key = firebase
    .database()
    .ref("/rnfirebase/stock/" + category)
    .push().key;
  firebase
    .database()
    .ref("rnfirebase/stock/" + category + "/" + key)
    .update({ name, quantity, unit, price, key });
};

//inserta item existente a una categoría
export const insertToCategory = (category, { name, quantity, unit, price, key }) => {
  firebase
    .database()
    .ref("/rnfirebase/stock/" + category + "/" + key)
    .set({ name, quantity, unit, price, key });
};

//crea una categoria agregando un item vacio a la carpeta
export const createCategory = category => {
  firebase
    .database()
    .ref("/rnfirebase/stock/" + category)
    .set({ void: 0 });
};
//agrega un usuario
export const pushToUsers = ({ name, adress, phone }) => {
  const key = firebase
    .database()
    .ref("/rnfirebase/users/")
    .push().key;
  firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .update({ name, adress, phone, key });
};

export const updateUser = (key, { name, adress, phone }) => {
  firebase
    .database()
    .ref("rnfirebase/users/" + key)
    .update({ name, adress, phone });
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

export const updateItem = (category, key, { name, quantity, unit, price }) => {
  firebase
    .database()
    .ref("rnfirebase/stock/" + category + "/" + key)
    .update({ name, quantity, unit, price });
};

export const deleteCategory = category => {
  firebase
    .database()
    .ref("rnfirebase/stock/" + category)
    .remove();
};

export const renameCategory = (category, renamedCategory) => {
  const callbackActions = snap => {
    snap.forEach(child => {
      firebase
        .database()
        .ref("rnfirebase/stock/" + renamedCategory + "/" + child.key)
        .set({ ...child });
    });
    deleteCategory(category);
  };
  firebase
    .database()
    .ref("rnfirebase/stock/" + category)
    .once("value", snap => callbackActions(Object.values(snap.val())));
};
