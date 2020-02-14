import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase.database();