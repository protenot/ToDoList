//import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import firebase from "firebase/app";
//const database = getDatabase();



export async function authWithEmailAndPassword(
  email: string,
  password: string,
) {
  const auth =  getAuth();
  console.log('auth'+auth)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential;
      console.log('user'+ user.user)

      const db = getDatabase();
      const tasksRef = ref(db);
      get(child(tasksRef,'tasks/')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("DB "+ JSON.stringify(snapshot.val()));
        }
     /*  console.log("DB "+ JSON.stringify(Object.keys(tasksRef).map((key) => ({
        ...tasksRef[key],
        id: key,
      })) */
    })
      // ...
    /*   const apiKey = "AIzaSyBnwkbfufeUO7ld1W2Fn06xBy_F1pleK5A";
      fetch(
        `https://todotasks-f6b9b-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${user}`
      ) */
     // database
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });


  const apiKey = "AIzaSyBnwkbfufeUO7ld1W2Fn06xBy_F1pleK5A";
  const requestOptions: RequestInit & { returnSecureToken: boolean } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    returnSecureToken: true,
  };

  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
}
