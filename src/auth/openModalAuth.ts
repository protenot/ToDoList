import { createAuthModal } from "./createAuthModal";
import { handlerAuthForm } from "./handlerAuthForm";
import { placeForName } from "..";
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
      modal?.remove();
    });
  } else {
    const modalForOut = document.createElement("div");
    modalForOut.classList.add("modal-out");
    modalForOut.innerHTML = `
    <span class="close-button">×</span>
    <button class = "out-button">LogOut</button>`;
    const body = document.querySelector("body");
    (body as HTMLElement).append(modalForOut);
    const outButton = document.querySelector(".out-button");
    document.querySelector(".close-button")?.addEventListener("click", () => {
      modalForOut.remove();
    });
    outButton?.addEventListener("click", () => {
      localStorage.removeItem("username");
      modalForOut.remove();
      signOutFromFB();
      (placeForName as HTMLElement).innerHTML = "Unauthorized";
    });
  }
}
