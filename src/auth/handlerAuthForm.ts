import { authWithEmailAndPassword } from "./authWithEmailAndPassword";
import { placeForName } from "..";
import { store } from "../redux/store";
import { closeModal } from "./closeModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "../dataBase/firebase"

const auth = getAuth(app);
export function handlerAuthForm(event: any) {
  event.preventDefault();

  const authButton = event.target.querySelector("button");
  const email: string = event.target?.querySelector("#email").value;
  const password: string = event.target.querySelector("#password").value;
    const placeForName = document.querySelector(".auth-icon");
  const modalAuth = document.querySelector(".modal-auth") as HTMLElement;
  authButton.disabled = true;

  authWithEmailAndPassword(email, password)
    .then(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //console.log("logged in"+user);
         const userEmail= placeForName?.textContent;
         if (user.email  == userEmail){console.log( user.email , userEmail)}
         (placeForName as HTMLElement).innerHTML = email;
         const userName = email;
   
         store.dispatch({
           type: "CHANGE_USER",
           payload: { user:userName },
         });
        // console.log("user in the store " + store.getState().user);
   
         localStorage.setItem("username", userName);
          }  })
      })
    .then(() => closeModal(modalAuth))

    .then(() => (authButton.disabled = false));
}
