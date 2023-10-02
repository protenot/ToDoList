import { authWithEmailAndPassword } from "./authWithEmailAndPassword";
import { placeForName } from "..";
import { closeModal } from "./closeModal";

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
      //if () {
      (placeForName as HTMLElement).innerHTML = email;
      const userName = email;
      localStorage.setItem("username", userName);
      //}
    })
    .then(() => closeModal(modalAuth))

    .then(() => (authButton.disabled = false));
}
