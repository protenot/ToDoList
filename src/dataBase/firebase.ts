import "firebase/auth";

import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBnwkbfufeUO7ld1W2Fn06xBy_F1pleK5A",
  authDomain: "todotasks-f6b9b.firebaseapp.com",
  databaseURL:
    "https://todotasks-f6b9b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todotasks-f6b9b",
  storageBucket: "todotasks-f6b9b.appspot.com",
  messagingSenderId: "187771119289",
  appId: "1:187771119289:web:cfcc15fcda5120ed775d68",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);

/* onAuthStateChanged(auth, (user) => {
  if (user) {
   
    const userEmail = document.querySelector(".auth-icon")?.textContent;
    if (user.email == userEmail) {
      console.log(user.email, userEmail);
    }
  }
  console.log("no user");
}); */
