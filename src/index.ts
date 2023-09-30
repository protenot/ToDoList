import { render } from "./router/renderRouter";
import { Router } from "./router/routerRouter";
import { iArgs } from "./router/typesRouter";
import { Calendar } from "./calendar/createCalendar";
import "./style.css";
import {openModalAuth} from "./auth/openModalAuth";
import { createToDoMarkup } from "./ToDoTasks/createToDoMarkup";
import { store } from "./redux/store";
import { ToDoList } from "./ToDoTasks/classToDo";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { ToDoTask } from "./ToDoTasks/TypesToDo";
import { renderAuthForm } from "./auth/renderAuthForm";
import { createAuthModal } from "./auth/createAuthModal";

const enterAuth = document.querySelector('.enter-icon');

enterAuth?.addEventListener('click',()=>{
 
  openModalAuth()
 /*  document.getElementById('auth-form')
  ?.addEventListener(submit,) */
})


const tasksForStore = store.getState().tasks;
const PREFIX = "/ToDoList";
const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    if (content === "/") {
      (document.getElementById(
        "root",
      )as HTMLDivElement).innerHTML = ` <div class="calendar-wrapper">
    <button id="btnPrev" type="button">Предыдущий</button>
    <button id="btnNext" type="button">Следующий</button>
    <div id="divCal"></div>
  </div>`;

      //window.onload = function () {
      const divCal: string = "divCal";
      function getId(id: string) {
        return document.getElementById(id);
      }
      console.log(divCal);
      const newCalendar = new Calendar(divCal);
      newCalendar.renderCalendar();

      (getId("btnNext") as HTMLElement).onclick = function () {
        newCalendar.nextMonth();
      };

      (getId("btnPrev")as HTMLElement).onclick = function () {
        newCalendar.previousMonth();
      };
      /* const divCal: string = "divCal";
      const calendar = new Calendar(divCal);
      calendar.init(); */
      console.log("working");
    }
    if (content === "/list") {
      (document.getElementById("root") as HTMLDivElement).innerHTML = `<div id = "divCont"></div>`;
      const root = "#divCont";
      createToDoMarkup(root);
    }
    if (content === "/about") {
      (document.getElementById("root")as HTMLDivElement).innerHTML = `<h2>"${
        PREFIX + content
      }"</h2>`;
    }
    console.log(content);
  };

const router = Router();

const aArray = document.querySelectorAll("a");
console.log(aArray);
aArray.forEach((link) => {
  link.href = PREFIX + link.pathname;
  
});

router.on(
  "/",
  createRender("/"), // onEnter
  console.log("[leaving] /calendar"), //onLeaving
  () => {
    console.log("[coming]/calendar"); // onBeforeEnter
  },
);
router.on(
  "/list",
  createRender("/list"), // onEnter
  console.log("[leaving] /list"), // onLeave
  () => {
    console.log("[coming]/list"); // onBeforeEnter
  },
);

router.on(
  "/about",
  createRender("/about"),
  console.log("[leaving] /about"),
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

  console.log("Задачи " + tasks[1].id);
  if (store.getState().tasks) {
    store.dispatch({
      type: "LOAD_TASKS",
      payload: { tasks },
    });
    console.log(
      "ggggg+" + store.getState().tasks,
      store.getState().tasks.length,
    );
  }

  // render();
});

window.addEventListener("popstate", () => {
  render();
});
