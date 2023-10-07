/* //import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import firebase from "firebase/app";
import { renderErrorModal } from "./renderErrorModal";
//const database = getDatabase();



export async function authWithEmailAndPassword(
  email: string,
  password: string,
)
//:Promise<string | void> 
{
  const auth =  getAuth();
  console.log('auth'+JSON.stringify(auth.currentUser))
  
  
  
  if (!auth.currentUser?.uid){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log('user'+ JSON.stringify(user))
    // ...
  })

  }else{
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential;
      console.log('user'+ JSON.stringify(user.user))

      const db = getDatabase();
      const tasksRef = ref(db);
      get(child(tasksRef,'tasks/')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("DB "+ JSON.stringify(snapshot.val()));
        }
  
    })
    
  
     
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log( 'errorCode '+errorCode)

      const errorMessage = error.message;
      console.log('errorMessage '+errorMessage)
      renderErrorModal(errorMessage)
        return error
    });


 
  }}
 */
import {
  getAuth,
  UserCredential,
  getIdTokenResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import firebase from "firebase/app";
import { renderErrorModal } from "./renderErrorModal";

interface AuthError extends Error {
  code: string;
}

export async function authWithEmailAndPassword(
  email: string,
  password: string,
): Promise<UserCredential | void | string> {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Проверка, является ли пользователь новым
    const idTokenResult = await getIdTokenResult(userCredential.user);
    if (idTokenResult.claims.newUser) {
      console.log("Новый пользователь!");
    }

    return userCredential;
  } catch (error) {
    if ((error as AuthError).code === "auth/email-already-in-use") {
      // Если пользователь уже существует, попробуем войти
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        ).then((userCredential) => {
          // Signed in
          const user = userCredential;
          console.log("user" + JSON.stringify(user.user));

          /*  const db = getDatabase();
            const tasksRef = ref(db);
            get(child(tasksRef,'tasks/')).then((snapshot) => {
              if (snapshot.exists()) {
                console.log("DB "+ JSON.stringify(snapshot.val()));
              }
        
          }) */
        });
        return userCredential;
      } catch (signInError) {
        const errorMessage = (signInError as AuthError).message;
        // console.log("Ошибка входа: " + errorMessage);
        renderErrorModal(errorMessage);
        return;
      }
    } else {
      // const errorCode = error.code;
      //console.log("Ошибка: " + errorCode);

      const errorMessage = (error as AuthError).message;
      //console.log("Сообщение об ошибке: " + errorMessage);
      renderErrorModal(errorMessage);
      return;
    }
  }
}
