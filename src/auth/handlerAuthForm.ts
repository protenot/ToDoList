import { authWithEmailAndPassword } from "./authWithEmailAndPassword";
import { placeForName } from "..";
import { store } from "../redux/store";
import { closeModal } from "./closeModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/*  const auth = getAuth();
onAuthStateChanged(auth) */

/* if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("USER "+JSON.stringify(user))
    // ...
  } else {
    // User is signed out
    // ...
  }
}); */

export function handlerAuthForm(event: any) {
  event.preventDefault();

  const authButton = event.target.querySelector("button");
  const email: string = event.target?.querySelector("#email").value;
  const password: string = event.target.querySelector("#password").value;
  //  const placeForName = document.querySelector(".auth-icon");
  const modalAuth = document.querySelector(".modal-auth") as HTMLElement;
  authButton.disabled = true;

  authWithEmailAndPassword(email, password)
    .then(() => {
      (placeForName as HTMLElement).innerHTML = email;
      const user = email;

      store.dispatch({
        type: "CHANGE_USER",
        payload: { user },
      });
      console.log("user in the store " + store.getState().user);

      localStorage.setItem("username", user);
    })
    .then(() => closeModal(modalAuth))

    .then(() => (authButton.disabled = false));
}
