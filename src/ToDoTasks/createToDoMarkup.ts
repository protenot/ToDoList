import { current } from "@reduxjs/toolkit";
import { Status, ToDoTask } from "./TypesToDo";
import { ToDoList } from "./classToDo";
import { createID } from "./createIDToDo";
//newToDoList.createToDoTask()
//Создаем массив из статусов
const statusVar: string[] = Object.keys(Status);
//создаем массив для верхней строчки таблицы
const toDoListTitle: string[] = ["Дата", "Время", "Задача", "Статус", "Удалить", "Изменить"];
//console.log(statusVar);

export async function createToDoMarkup(el: string) {
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
  const newToDoList = new ToDoList();
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
    const dateToDoTask = date.toLocaleDateString();
    console.log(dateToDoTask);
    const p1Date = document.createElement("p");
    p1Date.textContent = dateToDoTask;
    toDoList.appendChild(p1Date);
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
    
    currentButtonEdit.addEventListener("click", () => {
      console.log(item);
      newToDoList.updateToDoTask(item);
      console.log(item);
  })
  });

  toDoButton.addEventListener("click", async () => {
    if (inputToDos.value&& inputDate.value) {
        let currentTask:ToDoTask ={
            id:createID(),
            date:inputDate.value,
            content:inputToDos.value,
           status: Status.Pending

        }
      await newToDoList.createToDoTask(currentTask);
    }
   

    console.log(list1);
  });
}

/* export  function createButton(teg:HTMLElement,name:string){

    let currentButton = document.createElement('button');
        currentButton.textContent=name;
       teg.appendChild(currentButton);
  

 */
