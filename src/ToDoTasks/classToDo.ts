import { ToDoTask, Status, Filter } from "./TypesToDo";
import { store } from "../redux/store";
import { renderList } from "./renderList";
//import { newToDoList } from "./createToDoMarkup";

const tasksForStore = store.getState().tasks;
console.log(tasksForStore);
const TASKS_STORAGE_KEY = "tasks";
export class ToDoList {
  tasks: ToDoTask[];
  static error: any;
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  async createToDoTask(task: ToDoTask): Promise<string> {
    return new Promise((resolve) => {
      /* if (this.tasks.find((task) => task.content !== task.content)) {
        console.log(ToDoList);
        reject("Такая задача уже существует");
        return;
      } else { */
      const newToDoTask = {
        //...task,
        id: task.id,
        date: task.date,
        content: task.content,
        status: task.status,
      };
      console.log("задача" + newToDoTask);
      store.dispatch({
        type: "LOAD_TASKS",
        payload: newToDoTask,
      });

      console.log("task" + store.getState().tasks);
      this.tasks.push(newToDoTask);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks));

      //location.reload();
      resolve("Задача создана");
      //}
    });
  }

  async getToDoTask(): Promise<ToDoTask[] | []> {
    const tasks: string | null = localStorage.getItem("tasks");
    console.log("Обратились в ЛС");
    if (tasks) {
      const parsedTasks = JSON.parse(tasks) as ToDoTask[];
      parsedTasks.forEach((task) => {
        if (typeof task.date === "string") {
          task.date = new Date(task.date);
        }
      });

      parsedTasks.sort((a, b) => {
        const dateA = a.date as Date;
        const dateB = b.date as Date;
        return dateA.getTime() - dateB.getTime();
      });

      return parsedTasks;
      // (await JSON.parse(tasks)) as ToDoTask[];
    }
    return [];
  }

  async updateToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    const tasks = (await this.getToDoTask()) as ToDoTask[];

    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    for (let i = 0; i < tasks.length; i++) {
      if (task.id === tasks[i].id) {
        tasks.splice(i, 1, task);
        //tasks[i] = task;
        console.log(tasks);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

        renderList(updatedTasks);

        // location.reload();

        return tasks;
      }
    }
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    renderList(updatedTasks);
    return updatedTasks;
  }
  async deleteToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    let tasks = (await this.getToDoTask()) as ToDoTask[];
    // const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    console.log("1 " + tasks.length);
    for (let i = 0; i < tasks.length; i++) {
      if (task.id === tasks[i].id) {
        console.log(tasks.length);
        tasks.splice(i, 1);
        console.log("длина " + tasks.length);

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

        //location.reload();
        tasks = (await this.getToDoTask()) as ToDoTask[];
        renderList(tasks);
        // console.log(tasks.length);
        return tasks;
      }
      console.log("3 " + tasks.length);
    }
    console.log("2  " + tasks.length);
    localStorage.setItem("item", JSON.stringify(tasks));
    return tasks;
  }

  async filterToDoTask(something: Filter): Promise<ToDoTask[]|void> {
    const tasks = (await this.getToDoTask()) as ToDoTask[];
    let newTasks: ToDoTask[];
    console.log(tasks[0]);
    //Фильтрация в случае если все поля заполнены
    if (something.date && something.status && something.content) {
      newTasks = tasks.filter(
        (task) => new Date(task.date).toLocaleDateString() === something.date,
      );
      newTasks = newTasks.filter((task) => task.status === something.status);
      newTasks = tasks.filter((task) =>
        task.content.includes(something.content as string),
      );

      renderList(newTasks);
      return newTasks;
    }

    //проверяем комбинации полей

    if (something.date && something.status) {
      newTasks = tasks.filter(
        (task) => new Date(task.date).toLocaleDateString() === something.date,
      );
      newTasks = newTasks.filter((task) => task.status === something.status);
      renderList(newTasks);
      return newTasks;
    }

    if (something.content && something.date) {
      newTasks = tasks.filter((task) =>
        task.content.includes(something.content as string),
      );
      newTasks = tasks.filter(
        (task) => new Date(task.date).toLocaleDateString() === something.date,
      );
      renderList(newTasks);
      return newTasks;
    }

    if (something.content && something.status) {
      newTasks = tasks.filter((task) =>
        task.content.includes(something.content as string),
      );

      newTasks = tasks.filter((task) => task.status === something.status);

      renderList(newTasks);
      console.log(newTasks);
      return newTasks;
    }

    // проверяем одиночек
    if (something.date) {
      newTasks = tasks.filter(
        (task) => new Date(task.date).toLocaleDateString() === something.date,
      );
      console.log(newTasks);
      renderList(newTasks);
      return newTasks;
    }
    if (something.status) {
      newTasks = tasks.filter((task) => task.status === something.status);

      console.log(newTasks);
      renderList(newTasks);
      return newTasks;
    }
    if (something.content) {
      newTasks = tasks.filter((task) =>
        task.content.includes(something.content as string),
      );

      renderList(newTasks);
      return newTasks;
    } else {
      console.log("Try again");
      
    }
    
  }
  async createDataBase(task:ToDoTask){

    /* fetch(`https://todolist-452c2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
    ).then(response =>response.json())
    .then(response=>{
      console.log(response)
    })
  } */
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task), 
  };

  try {
    await fetch(
      'https://todotasks-f6b9b-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      requestOptions
    ).then(response =>response.json())
    .then(response=>{
      console.log('response'+response)});

   /*  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } */

    /* const responseData = await response.json();
    console.log(responseData); */
  } catch (error) {
    console.error('Error:', error);
  }
}
 async fetch(token:string){
  console.log('token ' + token)
  if(!token){
    return Promise.resolve('<p class ="error"> You don\'t have token</p>')
  }
return await fetch(`https://todotasks-f6b9b-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${token}`)
.then(response =>response.json()).then(response=>{
  if(response && response.error){
   return`<p class ="error">${response.error}</p>` 
  }
  console.log(response?Object.keys(response).map( key =>({
    ...response[key],
    id:key
  })):[]
 )
  return response?Object.keys(response).map( key =>({
    ...response[key],
    id:key
  })):[]
 }) 
 }
}
