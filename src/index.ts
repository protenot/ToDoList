import { PREFIX, createRender, router } from "./router/renderRouter";
import { iArgs } from "./router/typesRouter";
import { Calendar } from "./calendar/createCalendar";
import "./style.css";
import { openModalAuth } from "./auth/openModalAuth";
import { createToDoMarkup } from "./ToDoTasks/createToDoMarkup";
import { store } from "./redux/store";
//import { ToDoList } from "./ToDoTasks/classToDo";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { ToDoTask } from "./ToDoTasks/TypesToDo";
import { firebaseConfig } from "./dataBase/firebase";
import { renderEnvironment } from "./calendar/renderEnvironment";
import { controlEnvironment } from "./calendar/controlEnvironment";
import { isMatch } from "fuzzy-search";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
const enterAuth = document.querySelector(".enter-icon");
//app;

enterAuth?.addEventListener("click", () => {
  openModalAuth();
});
export const placeForName = document.querySelector(".auth-icon");
const savedUsername = localStorage.getItem("username");

if (savedUsername) {
  (placeForName as HTMLElement).innerHTML = savedUsername;
} else {
  openModalAuth();
}

//const tasksForStore = store.getState().tasks;

document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }

  console.log("++++++++++");
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href") as string;
  console.log(url);
  history.pushState(url, document.title, url);
  //render()
  router.go(url);
});

window.addEventListener("load", async () => {
  const tasks: ToDoTask[] = await newToDoList.getToDoTask();

  //console.log("Задачи " + tasks[1].id);
  if (store.getState().tasks) {
    store.dispatch({
      type: "LOAD_TASKS",
      payload: { tasks },
    });
  }
  const url = new URL(document.location.href);
  const pathAfterToDoList: string = `/${url.pathname.replace(
    "/ToDoList/",
    "",
  )}`;

  console.log("pathAfterToDoList" + pathAfterToDoList);
  console.log("url " + url);
  createRender(pathAfterToDoList)();
});

window.addEventListener("popstate", (event) => {
  console.log("/////");
  console.log("event " + JSON.stringify(event));

  const url = new URL(document.location.href);
  const pathAfterToDoList: string = `/${url.pathname.replace(
    "/ToDoList/",
    "",
  )}`;

  console.log("pathAfterToDoList 1 " + pathAfterToDoList);
  console.log("url 1" + url);
  createRender(pathAfterToDoList)();
  // render();
  //router.go(url)
});
