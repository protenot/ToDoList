import { renderAuthForm } from "./renderAuthForm"
export function createAuthModal(){
   
    const blockModal = document.querySelector('body')
    
    const modalAuth = document.createElement('div')
    modalAuth.classList.add("modal-auth")
    console.log(modalAuth) 
    modalAuth.innerHTML=renderAuthForm()
    blockModal?.append(modalAuth)
}