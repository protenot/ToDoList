import { ToDoTask, Filter } from "./TypesToDo";
import { store } from "../redux/store";
import { renderList } from "./renderList";
import { writeTaskInFB } from "../dataBase/writeInFB";
import { getFromFB } from "../dataBase/getFromFB";

const TASKS_STORAGE_KEY = "tasks";
export class ToDoList {
  tasks: ToDoTask[];
  static error: string;
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || "[]");
  }

  async createToDoTask(task: ToDoTask): Promise<string> {
    return new Promise((resolve) => {
      const newToDoTask = {
        id: task.id,
        date: task.date,
        content: task.content,
        status: task.status,
      };

      store.dispatch({
        type: "LOAD_TASKS",
        payload: newToDoTask,
      });

      this.tasks.push(newToDoTask);
      console.log("задача" + newToDoTask);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks));
      writeTaskInFB(this.tasks);

      resolve("Задача создана");
    });
  }

  async getToDoTask(): Promise<ToDoTask[] | []> {
    const tasks: string | null = localStorage.getItem(TASKS_STORAGE_KEY);

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
      getFromFB();
      return parsedTasks;
    }
    return [];
  }

  async updateToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    const tasks = (await this.getToDoTask()) as ToDoTask[];

    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    for (let i = 0; i < tasks.length; i++) {
      if (task.id === tasks[i].id) {
        tasks.splice(i, 1, task);
      }
    }
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

    renderList(updatedTasks);
    return updatedTasks;
  }
  async deleteToDoTask(task: ToDoTask): Promise<ToDoTask[] | []> {
    let tasks = (await this.getToDoTask()) as ToDoTask[];

    for (let i = 0; i < tasks.length; i++) {
      if (task.id === tasks[i].id) {
        tasks.splice(i, 1);

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        writeTaskInFB(this.tasks);

        tasks = (await this.getToDoTask()) as ToDoTask[];
        renderList(tasks);

        return tasks;
      }
    }

    localStorage.setItem("item", JSON.stringify(tasks));
    writeTaskInFB(this.tasks);
    return tasks;
  }

  async filterToDoTask(something: Filter): Promise<ToDoTask[] | void> {
    const tasks = (await this.getToDoTask()) as ToDoTask[];
    let newTasks: ToDoTask[];

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

      return newTasks;
    }

    // проверяем одиночек
    if (something.date) {
      newTasks = tasks.filter(
        (task) => new Date(task.date).toLocaleDateString() === something.date,
      );

      renderList(newTasks);
      return newTasks;
    }
    if (something.status) {
      newTasks = tasks.filter((task) => task.status === something.status);

      renderList(newTasks);
      return newTasks;
    }
    if (something.content) {
      newTasks = tasks.filter((task) =>
        task.content.includes(something.content as string),
      );

      renderList(newTasks);
      return newTasks;
    }
  }
}
