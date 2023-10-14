import { createToDoMarkup } from "../ToDoTasks/createToDoMarkup";
import { Calendar } from "../calendar/createCalendar";
import { renderEnvironment } from "../calendar/renderEnvironment";
import { controlEnvironment } from "../calendar/controlEnvironment";
import { Router } from "./routerRouter";
import { iArgs } from "./typesRouter";

export const PREFIX = "/ToDoList";
export const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    if (content.match(/^\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/)) {
      renderEnvironment();
      const length = content.length;
      let month;
      length === 8
        ? (month = +content.slice(1, 3).toString() - 1)
        : (month = +content.slice(1, 2).toString() - 1);
      let year;
      length === 8
        ? (year = +content.slice(4).toString())
        : (year = +content.slice(3).toString());

      const newCalendar = new Calendar(renderEnvironment(), year, month);
      newCalendar.renderCalendar();
      controlEnvironment(newCalendar);
    }
    if (content === "/") {
      renderEnvironment();

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
      (
        document.getElementById("root") as HTMLDivElement
      ).innerHTML = `<h1 align="center">Simple ToDoList 👋</h1>
      <p align="left"> This project is the result of studying at the OTUS course Java Script Basic and demonstrates some of the knowledge I have gained</p>
      <h2 align="center">This project built with :</h2>
      <p align="center"> <a href="https://babeljs.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg" alt="babel" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>   <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> </p>
      <h3 align="center"> Site  🌱 </h3>
      <p align="center">https://protenot.github.io/ToDoList/</p><h3 align="center"> How it works </h3>
      <section>
      <p><b>Calendar Page: </b>Users click a date to create a task. The modal view open with a selected date and lets them set task details and date. Default status is "pending." After clicking the button, the user goes to the Tasks page.</p>
      <p><b>Tasks Page: </b>Here, users can also add tasks and edit existing ones. Also hcan see and filter all tasks. Filter available on the date, task and status</p>
      <p><b>Task Update: </b>To update a task, users choose a new date, time, and status and click "Update".
      
      </p>
      <p><b>Task Delete: </b>To delete a task, users choose task  and click "Delete"
      
      </section>
      
      <h3 align="center">Connect with me:</h3>
      <p align="center">protenot@gmail.com</p>`;
    }
  };

export const router = Router();

const aArray = document.querySelectorAll("a");

aArray.forEach((link) => {
  link.href = PREFIX + link.pathname;
});

router.on(
  "/",
  createRender("/"), // onEnter
);
router.on(
  "/list",
  createRender("/list"), // onEnter
);

router.on(
  "/about",
  createRender("/about"),
  console.log("[leaving] /about"),
  () => {
    console.log("[coming/about]");
  },
);

export function updateMonthUrl(path: string) {
  const newUrl = `/ToDoList/${path}`;

  window.history.pushState({ path: path }, "", newUrl);
}
