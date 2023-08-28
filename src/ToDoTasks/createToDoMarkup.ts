import { Status } from "./TypesToDo";
const statusVar: string[] = Object.keys(Status);
const toDoListTitle: string[] = ["Дата", "Время", "Задача", "Статус", "Кнопка"];
console.log(statusVar);
export function createToDoMarkup(el: string) {
  const toDoContainer = document.querySelector(el);

  const inputToDos: HTMLInputElement = document.createElement("input");
  // console.log(toDoContainer)
  toDoContainer.append(inputToDos);
  inputToDos.classList.add("input-todos");
  inputToDos.placeholder = "Введите задачу";
  inputToDos.type = "text";

  const inputDate: HTMLInputElement = document.createElement("input");
  toDoContainer.append(inputDate);
  inputDate.classList.add("input-date");
  inputDate.type = "datetime-local";

  /* let inputStatus:HTMLInputElement = document.createElement("input");
    toDoContainer.append(inputStatus);
    inputStatus.classList.add("input-status")
    inputStatus.type = ""; */

  const selectStatus: HTMLSelectElement = document.createElement("select");
  toDoContainer.append(selectStatus);
  selectStatus.classList.add("input-status");
  for (let i = 0; i < statusVar.length; i++) {
    const option = document.createElement("option");
    option.value = statusVar[i];
    option.text = statusVar[i];
    selectStatus.appendChild(option);
  }

  const toDoButton: HTMLButtonElement = document.createElement("button");
  toDoContainer.append(toDoButton);
  toDoButton.classList.add("main-button");
  toDoButton.textContent = "Сохранить задачу";

  const toDoList: HTMLElement = document.createElement("div");
  toDoContainer.append(toDoList);
  toDoList.classList.add("list");
  for (let j = 0; j < toDoListTitle.length; j++) {
    const p = document.createElement("p");
    p.textContent = toDoListTitle[j];
    toDoList.appendChild(p);
  }
}
