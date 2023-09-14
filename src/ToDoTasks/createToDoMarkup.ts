//import { current } from "@reduxjs/toolkit";
import { Status, ToDoTask, Filter } from "./TypesToDo";
import { ToDoList } from "./classToDo";
import { createID } from "./createIDToDo";
import FuzzySearch from "fuzzy-search";
import { renderList } from "./renderList";
import { searcherTasks } from "./searcherTasks";

export const newToDoList = new ToDoList();
//Создаем массив из статусов
export const statusVar: string[] = Object.keys(Status);
//создаем массив для верхней строчки таблицы
export const toDoListTitle: string[] = [
  "Дата",
  "Время",
  "Задача",
  "Статус",
  "Удалить",
  "Изменить",
];
//console.log(statusVar);

export async function createModalW(el: string | HTMLElement) {
  const inputToDos: HTMLInputElement = document.createElement("input");
  // console.log(toDoContainer)
  (el as HTMLElement).append(inputToDos);
  inputToDos.classList.add("input-todos");
  inputToDos.id = "lable";
  inputToDos.setAttribute("list", "tasks-choice");
  inputToDos.placeholder = "Введите задачу";
  inputToDos.type = "text";
  inputToDos.autocomplete = "on";

  const inputDate: HTMLInputElement = document.createElement("input");
  (el as HTMLElement).append(inputDate);
  inputDate.classList.add("input-date");
  inputDate.type = "datetime-local";

  /*   //создаем дату для появления в окне дата при выборе даты
  if (location.pathname==="/"){
    inputDate.value="13.02.1969";
  } */

  // создаем listener для реализации поиска в строке ввода
searcherTasks(inputToDos)

  /* 
  const inputTasks = Array.from(await newToDoList.getToDoTask());
  console.log(inputTasks);
  let tasksArray = inputTasks.reduce((res, obj) => {
    const key: string = obj.content;
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(obj);
    return res;
  }, {});

  tasksArray = Object.keys(tasksArray);

  console.log(tasksArray);

  inputToDos.addEventListener("keyup", () => {
    const searcher = new FuzzySearch(tasksArray);
    const result = searcher.search(inputToDos.value);
    console.log(result);
    // result.forEach((elem:string)=>inputToDos.placeholder=elem)
    const label = document.createElement("label");
    inputToDos.append(label);
    label.setAttribute("for", "label");
    const dataList = document.createElement("datalist");
    dataList.id = "tasks-choice";
    inputToDos.setAttribute("list", "tasks-choice");
    inputToDos.name = "label";
    for (let i = 0; i < result.length; i++) {
      const optionWord = document.createElement("option");
      optionWord.value = result[i];

      optionWord.classList.add("tasks-option");
      dataList.appendChild(optionWord);
      (el as HTMLElement).append(dataList);
    }
    console.log(dataList);
  }); */
  const toDoButton: HTMLButtonElement = document.createElement("button");
  (el as HTMLElement).append(toDoButton);
  toDoButton.classList.add("main-button");
  toDoButton.textContent = "Сохранить задачу";

  toDoButton.addEventListener("click", async () => {
    if (inputToDos.value && inputDate.value) {
      const currentTask: ToDoTask = {
        id: createID(),
        date: inputDate.value,
        content: inputToDos.value,
        status: Status.Pending,
      };
      await newToDoList.createToDoTask(currentTask);
    }

    //console.log(list1);
  });

  //return inputTasks
}

export async function createToDoMarkup(el: string | HTMLElement) {
  const toDoContainer = document.querySelector(el as string);

  createModalW(toDoContainer as HTMLElement);
  
  const selectStatus: HTMLSelectElement = document.createElement("select");
  toDoContainer.append(selectStatus);
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
  const statusOption = document.querySelector(".status-option");
  console.log(statusOption.textContent);

  const toDoList: HTMLElement = document.createElement("div");
  toDoContainer.append(toDoList);
  toDoList.classList.add("list");
  for (let j = 0; j < toDoListTitle.length; j++) {
    const p = document.createElement("div");
    p.textContent = toDoListTitle[j];
    p.classList.add("title" + j);
    toDoList.appendChild(p);
  }
  const tasksContainer = document.createElement("div");
  tasksContainer.id = "tasks-container";
  toDoContainer.append(tasksContainer);
  const list1 = await newToDoList.getToDoTask();
  // функция для создания тела списка
  renderList(list1);
  //console.log("ЭТО " + list1);

  
  //создаем фильтр в ячейке "Дата"
  const divData: HTMLElement = document.querySelector(".title0");
  const selectDate = document.createElement("select");
  divData.append(selectDate);
  const listDates = document.querySelectorAll(".list-dates");
  console.log(listDates[0].textContent);
  const aArray = [];
  for (let i = 0; i < listDates.length; i++) {
    if (!aArray.includes(listDates[i].textContent)) {
      aArray.push(listDates[i].textContent);
      const optionDate = document.createElement("option");
      // optionDate.value = listDates[i].textContent;
      optionDate.text = listDates[i].textContent;
      optionDate.classList.add("date-option");
      selectDate.appendChild(optionDate);
    }
  }
  // добавляем Listener на выбор даты

  selectDate.addEventListener("change", (event: any) => {
    const options = event.target.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const filter: Filter = { date: options[i].value };
        newToDoList.filterToDoTask(filter);

        console.log(`Selected option: ${options[i].value}`);
      }
    }
  });
  //создаем фильтр в ячейке "Статус"
  const divStatus: HTMLElement = document.querySelector(".title3");
  const selectStatusTitle = document.createElement("select");
  divStatus.append(selectStatusTitle);
  const listStatuses = document.querySelectorAll(".status-title");
  const bArray = [];
  for (let i = 0; i < listStatuses.length; i++) {
    if (!bArray.includes(listStatuses[i].textContent)) {
      bArray.push(listStatuses[i].textContent);
      const optionStatus = document.createElement("option");
      optionStatus.text = listStatuses[i].textContent;
      selectStatusTitle.appendChild(optionStatus);
    }
  }
  // добавляем Listener на выбор статуса
  selectStatusTitle.addEventListener("change", (event: any) => {
    const currentStatus = event.target.options;
    for (let i = 0; i < currentStatus.length; i++) {
      if (currentStatus[i].selected) {
        const filter: Filter = { status: currentStatus[i].value };
        newToDoList.filterToDoTask(filter);

        console.log(`Selected option: ${currentStatus[i].value}`);
      }
    }
  });
//создаем фильтр на выбор задачи
const divTask: HTMLElement = document.querySelector(".title2");
const filterInput = document.createElement('input');
divTask.append(filterInput);
console.log("Задачи: ")

searcherTasks(filterInput)

//Добавляем Listener на input 

}
