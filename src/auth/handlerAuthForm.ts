import { authWithEmailAndPassword } from "./authWithEmailAndPassword";
import { newToDoList } from "../ToDoTasks/createToDoMarkup";
import { renderModalAfterAuth } from "./renderModalAfterAuth";

export function handlerAuthForm(event: any) {
  event.preventDefault();

  const authButton = event.target.querySelector("button");
  const email: string = event.target?.querySelector("#email").value;
  const password: string = event.target.querySelector("#password").value;
  const placeForName = document.querySelector(".auth-icon");
  const modalAuth = document.querySelector(".modal-auth");
  authButton.disabled = true;
  //const nameFromLS=localStorage.getItem('username')
  //console.log('nameFromLS '+nameFromLS)
//if(!nameFromLS){
  authWithEmailAndPassword(email, password)
    .then(newToDoList.fetch)
    .then(renderModalAfterAuth)
    .then(() => (authButton.disabled = false))
    .then(() => ((placeForName as HTMLElement).innerHTML = email))
    .then(() => modalAuth?.classList.add("hidden"))
    .then(()=> 
    {const userName= email
    localStorage.setItem("username", userName)})
    // return  newToDoList.fetch(token)
  //})  72a4c59b-fcde-40f8-8806-80196534430b
/* }else{
   const modalForOut= document.createElement('div');
   modalForOut.classList.add('auth-modal')
   modalForOut.innerHTML=`
   <button>Out</button> */
   

}
