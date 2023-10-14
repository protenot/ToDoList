import { createRender, router } from "./router/renderRouter";
import "./style.css";
import { openModalAuth } from "./auth/openModalAuth";
import { store } from "./redux/store";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { ToDoTask } from "./ToDoTasks/TypesToDo";
import { firebaseConfig } from "./dataBase/firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const enterAuth = document.querySelector(".enter-icon");
app;

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

document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href") as string;

  history.pushState(url, document.title, url);

  router.go(url);
});

window.addEventListener("load", async () => {
  const tasks: ToDoTask[] = await newToDoList.getToDoTask();

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

  createRender(pathAfterToDoList)();
});

window.addEventListener("popstate", (event) => {
  console.log("event " + JSON.stringify(event));

  const url = new URL(document.location.href);
  const pathAfterToDoList: string = `/${url.pathname.replace(
    "/ToDoList/",
    "",
  )}`;

  createRender(pathAfterToDoList)();
});
