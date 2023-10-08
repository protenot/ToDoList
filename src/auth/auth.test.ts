import { closeModal } from "./closeModal";
import { createAuthModal } from "./createAuthModal";
import { openModalAuth } from "./openModalAuth";
import { renderErrorModal } from "./renderErrorModal";
const sleep = (x: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });
describe("createAuthModal", () => {
  it("create modal", () => {
    createAuthModal();

    const modalAuth = document.querySelector(".modal-auth");

    expect(modalAuth).toBeDefined();
  });
  it("add form to modal", () => {
    createAuthModal();

    const modalAuth = document.querySelector(".modal-auth");

    expect(modalAuth).not.toBeNull();

    const form = modalAuth?.querySelector("form");
    expect(form).not.toBeNull();
  });
});
describe("renderErrorModal", () => {
  it("open modal", () => {
    const content = "Error";
    renderErrorModal(content);

    const modalErr = document.querySelector(".modal-err") as HTMLElement;

    expect(modalErr).toBeDefined();
    const text = document.querySelector(".error-modal-text");
    expect(text?.textContent).toBe("Error");
    const button = document.querySelector(".error-modal-button") as HTMLElement;
    expect(button).not.toBeNull();
    button?.dispatchEvent(new MouseEvent("click"));
  });
});
