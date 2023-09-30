import { createAuthModal } from "./createAuthModal";
import { handlerAuthForm } from "./handlerAuthForm";
import { placeForName } from "..";
import { closeModal } from "./closeModal";
export function openModalAuth() {
   
    const nameFromLS=localStorage.getItem('username')
    console.log('nameFromLS '+nameFromLS)
    if(!nameFromLS){
  createAuthModal();
  document
    .getElementById("auth-form")
    ?.addEventListener("submit", handlerAuthForm);
    
  //  const modalAuth = document.querySelector(".modal-auth");
  
}
else{
    const modalForOut= document.createElement('div');
    modalForOut.classList.add('modal-out')
    modalForOut.innerHTML=`
    <button class = "out-button">Out</button>`
    const body = document.querySelector('body');
    (body as HTMLElement).append(modalForOut)
    const outButton = document.querySelector('.out-button');
    outButton?.addEventListener('click', ()=>{
        localStorage.removeItem("username");
        closeModal(modalForOut);
        (placeForName as HTMLElement).innerHTML="Unauthorized"
    })
}
}
