import { render } from "./router/renderRouter";
import { Router } from "./router/routerRouter";
import { iArgs } from "./router/typesRouter";
import { Calendar } from "./calendar/createCalendar";
import "./style.css";
import { createToDoMarkup } from "./ToDoTasks/createToDoMarkup";
import { store } from "./redux/store";
import { ToDoList } from "./ToDoTasks/classToDo";
import { newToDoList } from "./ToDoTasks/createToDoMarkup";
import { ToDoTask } from "./ToDoTasks/TypesToDo";
const tasksForStore = store.getState().tasks;
const PREFIX = "/ToDoList";
const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    if (content === "/") {
      document.getElementById(
        "root",
      ).innerHTML = ` <div class="calendar-wrapper">
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
      getId("btnNext").onclick = function () {
        newCalendar.nextMonth();
      };
      getId("btnPrev").onclick = function () {
        newCalendar.previousMonth();
      };
    }
    if (content === "/list") {
      document.getElementById(
        "root",
      ).innerHTML = `<div id = "root-list"></div>`;
      const root = "#root-list";
      createToDoMarkup(root);
    }
    if (content === "/about") {
      document.getElementById("root").innerHTML = `<h2>"${
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
  console.log(aArray[0].href);
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
  const url = (event.target as HTMLElement).getAttribute("href");
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
