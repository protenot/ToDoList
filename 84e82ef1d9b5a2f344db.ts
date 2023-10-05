import { render } from "./router/renderRouter";
import { Router } from "./router/routerRouter";
import { Calendar } from "./calendar/createCalendar";
import "./style.css";
import { openModalAuth } from "./auth/openModalAuth";
import { createToDoMarkup } from "./ToDoTasks/createToDoMarkup";
import { store } from "./redux/store";
//import { ToDoList } from "./ToDoTasks/classToDo";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { app } from "./dataBase/firebase";
import { renderEnvironment } from "./calendar/renderEnvironment";
import { controlEnvironment } from "./calendar/controlEnvironment";
const enterAuth = document.querySelector(".enter-icon");
app;
enterAuth?.addEventListener("click", () => {
  openModalAuth();
});
export const placeForName = document.querySelector(".auth-icon");
const savedUsername = localStorage.getItem("username");
if (savedUsername) {
  placeForName.innerHTML = savedUsername;
}

//const tasksForStore = store.getState().tasks;

const PREFIX = "/ToDoList";
export const createRender = content => (...args) => {
  console.log('content ' + content);
  console.info(`${content} args=${JSON.stringify(args)}`);
  if (content === "/") {
    console.log('content ' + content);
    renderEnvironment();
    const newCalendar = new Calendar(renderEnvironment());
    newCalendar.renderCalendar();
    controlEnvironment(newCalendar);
  }
  if (content === "/list") {
    document.getElementById("root").innerHTML = `<div id = "divCont"></div>`;
    const root = "#divCont";
    createToDoMarkup(root);
  }
  if (content === "/about") {
    document.getElementById("root").innerHTML = `<h2>"${PREFIX + content}"</h2>`;
  }
  // console.log(content);
};

const router = Router();
const aArray = document.querySelectorAll("a");
//console.log(aArray);
aArray.forEach(link => {
  link.href = PREFIX + link.pathname;
});
router.on("/", createRender("/"),
// onEnter
//console.log("[leaving] /calendar"), //onLeaving
() => {
  console.log("[coming]/calendar"); // onBeforeEnter
});

router.on("/list", createRender("/list"),
// onEnter
// console.log("[leaving] /list"), // onLeave
() => {
  console.log("[coming]/list"); // onBeforeEnter
});

router.on("/about", createRender("/about"),
//console.log("[leaving] /about"),
() => {
  console.log("[coming/about]");
});
document.body.addEventListener("click", event => {
  if (event.target && !event.target.matches("a")) {
    return;
  }
  console.log("++++++++++");
  event.preventDefault();
  const url = event.target.getAttribute("href");
  console.log(url);
  history.pushState(url, document.title, url);
  render();
  //router.go(url);
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
  render();
});
window.addEventListener("popstate", () => {
  console.log('/////');
  render();
});