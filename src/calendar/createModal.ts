import { createModalW } from "../ToDoTasks/createToDoMarkup";

export function createModal(el: Element) {
  const placeForModal = document.createElement("div");
  placeForModal.classList.add("flex");
  //placeForModal.classList.add ("hidden")
  el.append(placeForModal);
  placeForModal.innerHTML = `
<button class ="btn btn-close">х</button>


`;
  //const place:HTMLElement = document.querySelector('.place')
  const place = document.querySelector('table')
  createModalW(placeForModal);

  const closeButton = document.querySelector(".btn");
  closeButton.addEventListener("click", () => {
  //  placeForModal.classList.add("hidden");
    //location.reload();
    document.location = "/ToDoList";
  });
  // return closeButton
}
/* <section class = "modal">
<div class ="flexy">

</div>
</section>
<div class ="overlay hidden"></div> */
