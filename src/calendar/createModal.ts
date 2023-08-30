import { createModalW } from "../ToDoTasks/createToDoMarkup";
export function createModal(el: Element) {
  const placeForModal = document.createElement("div");
  placeForModal.classList.add("flex");
  //placeForModal.classList.add ("hidden")
  el.append(placeForModal);
  placeForModal.innerHTML = `
<button class ="btn btn-close">х</button>
<section class = "modal">
<div class ="flexy">

</div>
</section>
<div class ="overlay hidden"></div>

`;
  createModalW(placeForModal);
  const closeButton = document.querySelector(".btn");
  closeButton.addEventListener("click", () => {
    placeForModal.classList.add("hidden");
    location.reload();
  });
}
