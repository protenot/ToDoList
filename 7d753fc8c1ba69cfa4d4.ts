import { createRender, router } from "./router/renderRouter";
import "./style.css";
import { openModalAuth } from "./auth/openModalAuth";
import { store } from "./redux/store";
//import { ToDoList } from "./ToDoTasks/classToDo";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { firebaseConfig } from "./dataBase/firebase";
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
  placeForName.innerHTML = savedUsername;
} else {
  openModalAuth();
}

//const tasksForStore = store.getState().tasks;

document.body.addEventListener("click", event => {
  if (event.target && !event.target.matches("a")) {
    return;
  }
  console.log("++++++++++");
  event.preventDefault();
  const url = event.target.getAttribute("href");
  console.log(url);
  history.pushState(url, document.title, url);
  //render()
  router.go(url);
});
window.addEventListener("load", async () => {
  const tasks = await newToDoList.getToDoTask();

  //console.log("Задачи " + tasks[1].id);
  if (store.getState().tasks) {
    store.dispatch({
      type: "LOAD_TASKS",
      payload: {
        tasks
      }
    });
  }
  const url = new URL(document.location.href);
  const pathAfterToDoList = `/${url.pathname.replace("/ToDoList/", "")}`;
  console.log("pathAfterToDoList" + pathAfterToDoList);
  console.log("url " + url);
  createRender(pathAfterToDoList)();
});
window.addEventListener("popstate", event => {
  console.log("/////");
  console.log("event " + JSON.stringify(event));
  const url = new URL(document.location.href);
  const pathAfterToDoList = `/${url.pathname.replace("/ToDoList/", "")}`;
  console.log("pathAfterToDoList 1 " + pathAfterToDoList);
  console.log("url 1" + url);
  createRender(pathAfterToDoList)();
  // render();
  //router.go(url)
});