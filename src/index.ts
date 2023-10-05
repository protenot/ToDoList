import { render } from "./router/renderRouter";
import { Router } from "./router/routerRouter";
import { iArgs } from "./router/typesRouter";
import { Calendar } from "./calendar/createCalendar";
import "./style.css";
import { openModalAuth } from "./auth/openModalAuth";
import { createToDoMarkup } from "./ToDoTasks/createToDoMarkup";
import { store } from "./redux/store";
//import { ToDoList } from "./ToDoTasks/classToDo";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { ToDoTask } from "./ToDoTasks/TypesToDo";
import { app } from "./dataBase/firebase";
import { renderEnvironment } from "./calendar/renderEnvironment";
import { controlEnvironment } from "./calendar/controlEnvironment";
//import { renderAuthForm } from "./auth/renderAuthForm";
//import { createAuthModal } from "./auth/createAuthModal";

const enterAuth = document.querySelector(".enter-icon");
app;
enterAuth?.addEventListener("click", () => {
  openModalAuth();
});
export const placeForName = document.querySelector(".auth-icon");
const savedUsername = localStorage.getItem("username");

if (savedUsername) {
  (placeForName as HTMLElement).innerHTML = savedUsername;
}

//const tasksForStore = store.getState().tasks;

const PREFIX = "/ToDoList";
const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    if (content === "/") {
      renderEnvironment();
      // исправить
      const month = Number(new Date().getMonth);
      const year = +new Date().getFullYear;
      const newCalendar = new Calendar(renderEnvironment());
      newCalendar.renderCalendar();
      controlEnvironment(newCalendar);
    }
    if (content === "/list") {
      (
        document.getElementById("root") as HTMLDivElement
      ).innerHTML = `<div id = "divCont"></div>`;
      const root = "#divCont";
      createToDoMarkup(root);
    }
    if (content === "/about") {
      (document.getElementById("root") as HTMLDivElement).innerHTML = `<h2>"${
        PREFIX + content
      }"</h2>`;
    }
    // console.log(content);
  };

const router = Router();

const aArray = document.querySelectorAll("a");
//console.log(aArray);
aArray.forEach((link) => {
  link.href = PREFIX + link.pathname;
});

router.on(
  "/",
  createRender("/"), // onEnter
  //console.log("[leaving] /calendar"), //onLeaving
  () => {
    console.log("[coming]/calendar"); // onBeforeEnter
  },
);
router.on(
  "/list",
  createRender("/list"), // onEnter
  // console.log("[leaving] /list"), // onLeave
  () => {
    console.log("[coming]/list"); // onBeforeEnter
  },
);

router.on(
  "/about",
  createRender("/about"),
  //console.log("[leaving] /about"),
  () => {
    console.log("[coming/about]");
  },
);

document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href") as string;
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
    /* console.log(
      "ggggg+" + store.getState().tasks,
      store.getState().tasks.length,
    ); */
  }

  // render();
});

window.addEventListener("popstate", () => {
  render();
});
