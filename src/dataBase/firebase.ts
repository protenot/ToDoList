import firebase from "firebase/app";
import "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log(13);
const firebaseConfig = {
  apiKey: "AIzaSyBnwkbfufeUO7ld1W2Fn06xBy_F1pleK5A",
  authDomain: "todotasks-f6b9b.firebaseapp.com",
  databaseURL:
    "https://todotasks-f6b9b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todotasks-f6b9b",
  storageBucket: "todotasks-f6b9b.appspot.com",
  messagingSenderId: "187771119289",
  appId: "1:187771119289:web:cfcc15fcda5120ed775d68",
};
export const app = initializeApp(firebaseConfig); //{ /* config */ }


const auth = getAuth(app);
/* auth
console.log('AUTH '+
  Object.keys(auth).map((key) => ({
       ...auth[key],
       id: key,
     }))); */

export const database = getDatabase(app);
//const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    //console.log("logged in"+user);
  

  }
  console.log("no user");
});
