import { current } from "@reduxjs/toolkit";
import { Status, ToDoTask } from "./TypesToDo";
import { ToDoList } from "./classToDo";
import { createID } from "./createIDToDo";
import FuzzySearch from "fuzzy-search";
//newToDoList.createToDoTask()

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

  // создаем listener для реализации поиска в строке ввода

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
  });
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

  //return inputDate
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
    const p = document.createElement("p");
    p.textContent = toDoListTitle[j];
    toDoList.appendChild(p);
  }
  const list1 = await newToDoList.getToDoTask();
  //console.log("ЭТО " + list1);

  list1.forEach((item) => {
    console.log(item.id);

    const values = Object.entries(item);
    const date = new Date(values[1][1]);
    console.log(values[1][1]);
    //Заполняем ячейку с датой
    //  if (typeof date === Date){
    const dateToDoTask = date.toLocaleDateString();
    console.log(dateToDoTask);
    const p1Date = document.createElement("p");
    p1Date.textContent = dateToDoTask;
    toDoList.appendChild(p1Date);
    //}
    // заполняем ячейку со временем
    const timeToDoTask = date.toLocaleTimeString();
    const p1Time = document.createElement("p");
    p1Time.textContent = timeToDoTask;
    toDoList.appendChild(p1Time);

    // Заполняем ячейку с задачей
    const p1Task = document.createElement("p");
    p1Task.textContent = values[2][1];
    toDoList.appendChild(p1Task);

    //Заполняем ячейку со статусом
    const p1Status = document.createElement("p");
    p1Status.textContent = values[3][1];
    toDoList.appendChild(p1Status);

    // добавляем кнопку удалить
    const currentButton = document.createElement("button");
    currentButton.classList.add("current-delete-button");
    currentButton.textContent = "Удалить";
    toDoList.appendChild(currentButton);
    //добавляем к ней функционал
    currentButton.addEventListener("click", () => {
      console.log(item);
      newToDoList.deleteToDoTask(item);
      console.log(item);
    });
    //добавляем кнопку изменить
    const currentButtonEdit = document.createElement("button");
    currentButtonEdit.classList.add("current-edit-button");
    currentButtonEdit.textContent = "Изменить";
    toDoList.appendChild(currentButtonEdit);

    //добавляем функционал кнопки изменить

    currentButtonEdit.addEventListener("click", () => {
      const dateEdited: HTMLInputElement =
        document.querySelector(".input-date");
      console.log(dateEdited.value);
      const currentStatus = selectStatus.value;
      console.log(currentStatus);
      console.log(item.id);
      console.log(dateEdited.value);
      const editedItem: ToDoTask = {
        id: item.id,
        date: dateEdited.value,
        content: item.content,
        status: currentStatus as Status,
      };
      console.log(editedItem);
      console.log(item);
      newToDoList.updateToDoTask(editedItem);
      //console.log(item);
    });
  });
  // Добавляем функционал кнопки "Создать задачу"
}

/* export  function createButton(teg:HTMLElement,name:string){

    let currentButton = document.createElement('button');
        currentButton.textContent=name;
       teg.appendChild(currentButton);
  

 */
