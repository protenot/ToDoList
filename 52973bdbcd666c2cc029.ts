import { createRender, router } from "./router/renderRouter";
import "./style.css";
import { store } from "./redux/store";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
document.body.addEventListener("click", event => {
  if (event.target && !event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.getAttribute("href");
  history.pushState(url, document.title, url);
  router.go(url);
});
window.addEventListener("load", async () => {
  const tasks = await newToDoList.getToDoTask();
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
  createRender(pathAfterToDoList)();
});
window.addEventListener("popstate", event => {
  console.log("event " + JSON.stringify(event));
  const url = new URL(document.location.href);
  const pathAfterToDoList = `/${url.pathname.replace("/ToDoList/", "")}`;
  createRender(pathAfterToDoList)();
});