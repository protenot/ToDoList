import { ToDoTask, Status, Filter } from "./TypesToDo";
import { createID } from "./createIDToDo";

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
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        console.log("Ключи" + localStorage);
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
    const item = (await this.getToDoTask()) as ToDoTask[];
    for (let i = 0; i < item.length; i++) {
      if (task.id === item[i].id) item[i] = task;
    }

    localStorage.setItem("item", JSON.stringify(item));
    return item;
  }
  async deleteToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    let item = (await this.getToDoTask()) as ToDoTask[];
    console.log("1 " + item.length);
    for (let i = 0; i < item.length; i++) {
      if (task.id === item[i].id) {
        console.log(item.length);
        item.splice(i, 1);
        console.log("длина " + item.length);

        localStorage.setItem("item", JSON.stringify(item));

        item = (await this.getToDoTask()) as ToDoTask[];
        console.log(item.length);
        return item;
      }
      console.log("3 " + item.length);
    }
    console.log("2  " + item.length);
    localStorage.setItem("item", JSON.stringify(item));
    return item;
  }

  async filterToDoTask(something: Filter): Promise<ToDoTask[]> {
    const item = (await this.getToDoTask()) as ToDoTask[];
    let newTasks: ToDoTask[];

    if (something.date) {
      newTasks = item.filter((task) => task.date === something.date);
      console.log(newTasks);
      return newTasks;
    }
    if (something.content) {
      newTasks = item.filter((task) =>
        task.content.includes(something.content),
      );
      console.log(newTasks);
      return newTasks;
    }
    if (something.status) {
      newTasks = item.filter((task) => task.status === something.status);
      return newTasks;
    } else {
      console.log("Try again");
    }
  }
}
