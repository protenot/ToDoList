import { current } from "@reduxjs/toolkit";
import { Status } from "./TypesToDo";
import { ToDoList } from "./classToDo";




//newToDoList.createToDoTask()
const statusVar: string[] = Object.keys(Status);
const toDoListTitle: string[] = ["Номер", "Дата", "Задача", "Статус", "Кнопка"];
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

  let list1 = await newToDoList.getToDoTask();
  console.log("ЭТО "+list1);

  list1.forEach((item) => {
    console.log(item.id);
    const values = Object.entries(item);
    //console.log(values);

    
      for (let k = 0; k < values.length; k++) {
        //console.log(item)

       // console.log(values[k]);

        const p1 = document.createElement("p");
        p1.textContent  = values[k][1] as string;

        toDoList.appendChild(p1);
      }
  
    //setTimeout(createButton, 1000)

    //  createButton(toDoList,"Удалить")

    const currentButton = document.createElement("button");
    currentButton.classList.add("current-delete-button");
    currentButton.textContent = "Удалить";
    toDoList.appendChild(currentButton);
    currentButton.addEventListener("click", () => {
      console.log(item);
      newToDoList.deleteToDoTask(item);
      console.log(item);
    });
  });



  toDoButton.addEventListener("click", async () => {
    if(inputToDos.value)
  {  await newToDoList.createToDoTask(inputToDos.value);
  }
  //await newToDoList.getToDoTask()

   

    console.log(list1);

     });
}

/* export  function createButton(teg:HTMLElement,name:string){

    let currentButton = document.createElement('button');
        currentButton.textContent=name;
       teg.appendChild(currentButton);
  
}
 */
