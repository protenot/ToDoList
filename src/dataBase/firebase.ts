import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//это неправильный конфиг
console.log(13)
const firebaseConfig = {
  apiKey: "AIzaSyAJNwKh5ZSHSfHzDpqNafpT1wS31T8nqCE",
  authDomain: "todolist-452c2.firebaseapp.com",
  databaseURL:
    "https://todotasks-f6b9b-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "todolist-452c2",
  storageBucket: "todolist-452c2.appspot.com",
  messagingSenderId: "18406882529",
  appId: "1:18406882529:web:adac6a0286ed6898600ba0",
};
const app = initializeApp(firebaseConfig); //{ /* config */ }
const auth = getAuth(app);
export const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("logged in");
  }
  console.log("no user");
});
