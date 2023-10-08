import { renderAuthForm } from "./renderAuthForm";
export function createAuthModal() {
  const blockModal = document.querySelector("body");

  const modalAuth = document.createElement("div");
  modalAuth.classList.add("modal-auth");

  modalAuth.innerHTML = renderAuthForm();
  blockModal?.append(modalAuth);
}
