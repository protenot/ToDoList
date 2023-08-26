import { render } from "./router/renderRouter";
import { Router } from "./router/routerRouter";
import { iArgs } from "./router/typesRouter";
import { Calendar } from "./calendar/createCalendar";

const divCal: string = "divCal";
function getId(id: string) {
  return document.getElementById(id);
}

window.onload = function () {
  const newCalendar = new Calendar(divCal);
  newCalendar.showCurrent();
  getId("btnNext").onclick = function () {
    newCalendar.nextMonth();
  };
  getId("btnPrev").onclick = function () {
    newCalendar.previousMonth();
  };
};

const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);

    document.getElementById("root").innerHTML = `<h2>"${content}"</h2>`;
    console.log(content);
  };

const router = Router();

router.on(
  "/Calendar",
  () => {
    console.log("Calendar");
  }, // onEnter
  console.log("[leaving] /Calendar"), //onLeaving
  () => {
    console.log("[coming]/Calendar"); // onBeforeEnter
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
  console.log("5");
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href");
  router.go(url);
});

window.addEventListener("popstate", () => {
  console.log("4");
  render();
});
