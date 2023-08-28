import { ToDoTask, Status, Filter } from "./TypesToDo";
import { createID } from "./createIDToDo";

const TASKS_STORAGE_KEY = "tasks";
export class ToDoList {
  tasks: ToDoTask[];
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  async createToDoTask(text: string, task?: ToDoTask): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.tasks.find((task) => task.content === text)) {
        console.log(ToDoList);
        reject("Такая задача уже существует");
        return;
      } else {
        const newToDoTask = {
          //...task,
          id: createID(),
          date: new Date(),
          content: text,
          status: Status.Pending,
        };
        this.tasks.push(newToDoTask);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks));

        location.reload();
        resolve("Задача создана");
      }
    });
  }

  async getToDoTask(): Promise<ToDoTask[] | []> {
    const tasks: string | null = localStorage.getItem("tasks");
    console.log("Обратились в ЛС");
    if (tasks) {
      return (await JSON.parse(tasks)) as ToDoTask[];
    }
    return [];
  }

  async updateToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    const tasks = (await this.getToDoTask()) as ToDoTask[];
    for (let i = 0; i < tasks.length; i++) {
      if (task.id === tasks[i].id) tasks[i] = task;
    }

    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    return tasks;
  }
  async deleteToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    let tasks = (await this.getToDoTask()) as ToDoTask[];
    console.log("1 " + tasks.length);
    for (let i = 0; i < tasks.length; i++) {
      if (task.id === tasks[i].id) {
        console.log(tasks.length);
        tasks.splice(i, 1);
        console.log("длина " + tasks.length);

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        location.reload();
        tasks = (await this.getToDoTask()) as ToDoTask[];
        console.log(tasks.length);
        return tasks;
      }
      console.log("3 " + tasks.length);
    }
    console.log("2  " + tasks.length);
    localStorage.setItem("item", JSON.stringify(tasks));
    return tasks;
  }

  async filterToDoTask(something: Filter): Promise<ToDoTask[]> {
    const tasks = (await this.getToDoTask()) as ToDoTask[];
    let newTasks: ToDoTask[];

    if (something.date) {
      newTasks = tasks.filter((task) => task.date === something.date);
      console.log(newTasks);
      return newTasks;
    }
    if (something.content) {
      newTasks = tasks.filter((task) =>
        task.content.includes(something.content),
      );
      console.log(newTasks);
      return newTasks;
    }
    if (something.status) {
      newTasks = tasks.filter((task) => task.status === something.status);
      return newTasks;
    } else {
      console.log("Try again");
    }
  }
}
