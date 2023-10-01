import { closeModal } from "./closeModal";

export function renderErrorModal(content: string) {
 const errorModal = document.createElement('div');
 errorModal.classList.add('modal-err');
 document.body.append(errorModal);
    errorModal.innerHTML=`
    <p>${content} </p>
    <button class = "error-modal-button"> Close </button>
    `
  document.querySelector('.error-modal-button')?.addEventListener('click', ()=>closeModal(errorModal))
  
}
