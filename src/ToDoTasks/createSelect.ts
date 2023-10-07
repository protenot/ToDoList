import { Status } from "./TypesToDo";
//Создаем массив из статусов
export const statusVar: string[] = Object.keys(Status);

export function createSelect(element: HTMLElement) {
  const selectStatus = document.createElement("select") as HTMLSelectElement;
  element.append(selectStatus);
  selectStatus.classList.add("input-status");
  const optionChoice = document.createElement("option");
  optionChoice.text = "Choose status";
  selectStatus.appendChild(optionChoice);
  for (let i = 0; i < statusVar.length; i++) {
    const option = document.createElement("option");
    option.value = statusVar[i];
    option.text = statusVar[i];
    option.classList.add("status-option");
    selectStatus.appendChild(option);
  }
  const statusOption = document.querySelector(".status-option") as HTMLElement;
  console.log(statusOption.textContent);
}
