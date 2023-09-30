import { createModalWindow } from "../ToDoTasks/createToDoMarkup";


export function createModal(el: Element, dataStr?: string) {
  const placeForModal = document.createElement("div");
  placeForModal.classList.add("flex");
 
  el.append(placeForModal);
  placeForModal.innerHTML = `
<button class ="btn btn-close">х</button>


`;
 
  createModalWindow(placeForModal, dataStr);

  const closeButton = document.querySelector(".btn");

    (closeButton as HTMLButtonElement).addEventListener("click", () => {
      placeForModal.classList.add('hidden')
     // document.location = "/ToDoList";
    });

}


//Добавляем количество задач в день

//  console.log(newToDoList.getToDoTask()) */
