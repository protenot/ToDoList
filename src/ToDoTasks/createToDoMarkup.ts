import { Filter } from "./TypesToDo";
import { ToDoList } from "./classToDo";
import { renderList } from "./renderList";
import { searcherTasks } from "./searcherTasks";
import { renderModalMarkup } from "./renderModalMarkup";
import { createSelect } from "./createSelect";

export const newToDoList = new ToDoList();
//создаем массив для верхней строчки таблицы
export const toDoListTitle: string[] = [
  "Date",
  "Time",
  "Task",
  "Status",
  "Delete",
  "Update",
];
export async function createToDoMarkup(el: string) {
  const toDoContainer = document.querySelector(el) as HTMLDivElement;

  await renderModalMarkup(toDoContainer as HTMLElement);
  await createSelect(toDoContainer);

  const toDoList: HTMLElement = document.createElement("div");
  toDoContainer?.append(toDoList);
  toDoList.classList.add("list");
  for (let j = 0; j < toDoListTitle.length; j++) {
    const p = document.createElement("div");
    p.textContent = toDoListTitle[j];
    p.classList.add("title" + j);
    toDoList?.appendChild(p);
  }
  const tasksContainer = document.createElement("div");
  tasksContainer.id = "tasks-container";
  toDoContainer?.append(tasksContainer);
  const list1 = await newToDoList.getToDoTask();

  // функция для создания тела списка
  await renderList(list1);

  //создаем фильтр в ячейке "Дата"
  const divData = document.querySelector(".title0") as HTMLElement;
  const selectDate = document.createElement("select");

  divData?.append(selectDate);

  const listDates = document.querySelectorAll(".list-dates");

  const aArray: (string | null)[] = [];
  for (let i = 0; i < listDates.length; i++) {
    if (!aArray.includes(listDates[i].textContent)) {
      aArray.push(listDates[i].textContent);
      const optionDate = document.createElement("option");

      optionDate.text = listDates[i].textContent as string;
      optionDate.classList.add("date-option");
      selectDate?.appendChild(optionDate);
    }
  }
  // добавляем Listener на выбор даты

  selectDate.addEventListener("change", (event) => {
    const options = (event.target as HTMLSelectElement)?.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const filter: Filter = { date: options[i].value };
        newToDoList.filterToDoTask(filter);
      }
    }
  });
  //создаем фильтр в ячейке "Статус"
  const divStatus = document.querySelector(".title3") as HTMLElement;
  const selectStatusTitle = document.createElement("select");
  divStatus?.append(selectStatusTitle);
  const listStatuses = document.querySelectorAll(".status-title");
  const bArray: (string | null)[] = [];
  for (let i = 0; i < listStatuses.length; i++) {
    if (!bArray.includes(listStatuses[i].textContent)) {
      bArray.push(listStatuses[i].textContent);
      const optionStatus = document.createElement("option");
      optionStatus.text = listStatuses[i].textContent as string;
      selectStatusTitle?.appendChild(optionStatus);
    }
  }
  // добавляем Listener на выбор статуса
  selectStatusTitle.addEventListener("change", (event) => {
    const currentStatus = (event.target as HTMLSelectElement).options;

    for (let i = 0; i < currentStatus.length; i++) {
      if (currentStatus[i].selected) {
        const filter: Filter = { status: currentStatus[i].value };
        newToDoList.filterToDoTask(filter);
      }
    }
  });
  //создаем фильтр на выбор задачи
  const divTask = document.querySelector(".title2") as HTMLElement;
  const filterInput = document.createElement("input");
  filterInput.placeholder = "Start typing...";
  divTask?.append(filterInput);

  await searcherTasks(filterInput);

  //Добавляем Listener на выбор задачи
  filterInput.addEventListener("change", (event) => {
    const option = (event.target as HTMLSelectElement).value;
    const filter: Filter = { content: option };
    newToDoList.filterToDoTask(filter);
  });
}
export { renderModalMarkup };
