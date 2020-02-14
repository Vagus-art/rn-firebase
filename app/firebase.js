import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase.database();