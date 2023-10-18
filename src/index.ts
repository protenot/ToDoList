import { createRender, router } from "./router/renderRouter";
import "./style.css";

import { store } from "./redux/store";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { ToDoTask } from "./ToDoTasks/TypesToDo";

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
