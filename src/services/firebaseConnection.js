import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACoOzGhqc34X_LdNGAAwBgd30_s0MwcFI",
  authDomain: "todo-app-b199d.firebaseapp.com",
  projectId: "todo-app-b199d",
  storageBucket: "todo-app-b199d.appspot.com",
  messagingSenderId: "562834842075",
  appId: "1:562834842075:web:9a6e33ee0099ef7456c7fe",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
