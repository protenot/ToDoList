import { authWithEmailAndPassword } from "./authWithEmailAndPassword";
import { newToDoList } from "../ToDoTasks/createToDoMarkup";
//import { renderModalAfterAuth } from "./renderModalAfterAuth";
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
    .then(newToDoList.fetch)
    .then(() => console.log("Adding 'hidden' class"))
    .then(() => closeModal(modalAuth))
    .then(() => console.log("Adding 'hidden' class"))
    // .then(renderModalAfterAuth)
    .then(() => (authButton.disabled = false))
    .then(() => ((placeForName as HTMLElement).innerHTML = email))
    .then(() => {
      const userName = email;
      localStorage.setItem("username", userName);
    });
  //authButton.addEventListener('click',()=>{modalAuth?.classList.add("hidden")})
  //modalAuth?.classList.add("hidden")
}
