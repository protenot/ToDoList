import { createAuthModal } from "./createAuthModal";
import { handlerAuthForm } from "./handlerAuthForm";
import { placeForName } from "..";
import { closeModal } from "./closeModal";
import { signOutFromFB } from "../dataBase/signOut";
export function openModalAuth() {
  const nameFromLS = localStorage.getItem("username");

  if (!nameFromLS) {
    createAuthModal();
    const modal = document.querySelector(".modal-auth");
    document
      .getElementById("auth-form")
      ?.addEventListener("submit", handlerAuthForm);
    document.querySelector(".close-button")?.addEventListener("click", () => {
      closeModal(modal as HTMLElement);
    });
  } else {
    const modalForOut = document.createElement("div");
    modalForOut.classList.add("modal-out");
    modalForOut.innerHTML = `
    <span class="close-button">×</span>
    <button class = "out-button">Exit</button>`;
    const body = document.querySelector("body");
    (body as HTMLElement).append(modalForOut);
    const outButton = document.querySelector(".out-button");
    document.querySelector(".close-button")?.addEventListener("click", () => {
      closeModal(modalForOut);
    });
    outButton?.addEventListener("click", () => {
      localStorage.removeItem("username");
      closeModal(modalForOut);
      signOutFromFB();
      (placeForName as HTMLElement).innerHTML = "Unauthorized";
    });
  }
}
