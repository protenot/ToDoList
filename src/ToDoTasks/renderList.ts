import { ToDoTask, Status } from "./TypesToDo";
import { newToDoList } from "./createToDoMarkup";

export function renderList(list1: ToDoTask[]) {
  // функция для создания тела списка

  const toDoList = document.querySelector("#tasks-container") as HTMLElement;
  if (toDoList) {
    toDoList.innerHTML = ``;
    list1.forEach((item: ToDoTask) => {
      const values = Object.entries(item);
      const date = new Date(values[1][1]);

      //Заполняем ячейку с датой

      const dateToDoTask = date.toLocaleDateString();
      const p1Date = document.createElement("p");
      p1Date.textContent = dateToDoTask;
      toDoList.appendChild(p1Date);
      p1Date.classList.add("list-dates");

      // заполняем ячейку со временем
      const timeToDoTask = date.toLocaleTimeString();
      const p1Time = document.createElement("p");
      p1Time.classList.add("list-time");
      p1Time.textContent = timeToDoTask;
      toDoList.appendChild(p1Time);

      // Заполняем ячейку с задачей
      const p1Task = document.createElement("p");
      p1Task.textContent = values[2][1];
      toDoList.appendChild(p1Task);
      p1Task.classList.add("taska");

      //Заполняем ячейку со статусом
      const p1Status = document.createElement("p");
      p1Status.textContent = values[3][1];
      toDoList.appendChild(p1Status);
      p1Status.classList.add("status-title");

      // добавляем кнопку удалить
      const currentButton = document.createElement("button");
      currentButton.classList.add("current-delete-button");
      currentButton.textContent = "Удалить";
      toDoList.appendChild(currentButton);
      //добавляем к ней функционал
      currentButton.addEventListener("click", () => {
        newToDoList.deleteToDoTask(item);
      });
      //добавляем кнопку изменить
      const currentButtonEdit = document.createElement("button");
      currentButtonEdit.classList.add("current-edit-button");
      currentButtonEdit.textContent = "Изменить";
      toDoList.appendChild(currentButtonEdit);

      //добавляем функционал кнопки изменить

      currentButtonEdit.addEventListener("click", () => {
        const dateEdited = document.querySelector(
          ".input-date",
        ) as HTMLInputElement;
        //  console.log(dateEdited.value);
        const currentStatus = (
          document.querySelector(".input-status") as HTMLInputElement
        ).value;

        const editedItem: ToDoTask = {
          id: item.id,
          date: dateEdited.value,
          content: item.content,
          status: currentStatus as Status,
        };

        newToDoList.updateToDoTask(editedItem);
      });
    });
  }
}
