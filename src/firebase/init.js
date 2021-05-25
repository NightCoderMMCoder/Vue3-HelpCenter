import firebase from "firebase/app";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyDvw38Lxak9ENK1UaZvFmND2n2m5VnGc2U",
  authDomain: "help-center-e9c38.firebaseapp.com",
  projectId: "help-center-e9c38",
  storageBucket: "help-center-e9c38.appspot.com",
  messagingSenderId: "91310678809",
  appId: "1:91310678809:web:06dbbad5e7813fd65d1b88",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebase.auth();

export { firebaseAuth };
