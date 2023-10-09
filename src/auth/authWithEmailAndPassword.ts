import {
  getAuth,
  UserCredential,
  getIdTokenResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
          const user = userCredential;
          //console.log("user" + JSON.stringify(user.user));
        });
        return userCredential;
      } catch (signInError) {
        const errorMessage = (signInError as AuthError).message;
        renderErrorModal(errorMessage);
        return;
      }
    } else {
      const errorMessage = (error as AuthError).message;
      renderErrorModal(errorMessage);
      return;
    }
  }
}
