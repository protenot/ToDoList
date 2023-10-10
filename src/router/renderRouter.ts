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
      (document.getElementById("root") as HTMLDivElement).innerHTML = `<h2>"${
        PREFIX + content
      }"</h2>`;
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
