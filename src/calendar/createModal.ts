import { renderModalMarkup } from "../ToDoTasks/createToDoMarkup";

export function createModal(el: Element, dataStr?: string) {
  const placeForModal = document.createElement("div");
  placeForModal.classList.add("flex");
  el.append(placeForModal);
  placeForModal.innerHTML = `
  <span class="close-button">×</span>
`;

  renderModalMarkup(placeForModal, dataStr);

  (document.querySelector(".close-button") as HTMLElement).addEventListener(
    "click",
    () => {
      placeForModal.remove();
    },
  );
}
