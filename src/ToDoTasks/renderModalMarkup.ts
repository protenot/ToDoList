import { renderErrorModal } from "../auth/renderErrorModal";
import { formatTodayDateToString } from "../calendar/formatDate";
import { Status, ToDoTask } from "./TypesToDo";
import { createID } from "./createIDToDo";
import { newToDoList } from "./createToDoMarkup";
import { searcherTasks } from "./searcherTasks";

export async function renderModalMarkup(
  el: string | HTMLElement,
  dataStr?: string,
) {
  const inputToDos: HTMLInputElement = document.createElement("input");

  (el as HTMLElement).append(inputToDos);
  inputToDos.classList.add("input-todos");
  inputToDos.id = "lable";
  inputToDos.setAttribute("list", "tasks-choice");
  inputToDos.placeholder = "Set a task";
  inputToDos.type = "text";
  inputToDos.autocomplete = "on";

  const inputDate: HTMLInputElement = document.createElement("input");
  (el as HTMLElement).append(inputDate);
  inputDate.classList.add("input-date");
  inputDate.type = "datetime-local";
  //inputDate.value=(new Date()).toLocaleString();
  //console.log("Сегодня" + location.pathname);

  //получаем дату для появления в окне дата при выборе даты
  if (!dataStr) {
    // console.log("pppp +" + dataStr);
    formatTodayDateToString(inputDate);
  } else {
    // console.log("wwww +" + dataStr);
    inputDate.value = dataStr;
  }

  // создаем listener для реализации поиска в строке ввода

  searcherTasks(inputToDos);

  const toDoButton: HTMLButtonElement = document.createElement("button");
  (el as HTMLElement).append(toDoButton);
  toDoButton.classList.add("main-button");
  toDoButton.textContent = "Save a task";

  toDoButton.addEventListener("click", async () => {
    if (document.querySelector(".auth-icon")?.textContent === "Unauthorized") {
      renderErrorModal("You are noy auhorized");
    } else {
      if (inputToDos.value && inputDate.value) {
        const currentTask: ToDoTask = {
          id: createID(),
          date: inputDate.value,
          content: inputToDos.value,
          status: Status.Pending,
        };

        await newToDoList.createToDoTask(currentTask);
        document.querySelector(".modal-auth")?.remove();

        document.location = "/ToDoList/list";
      }
    }
  });
}
