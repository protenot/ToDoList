import { createToDoMarkup } from "../ToDoTasks/createToDoMarkup";
import { Calendar } from "../calendar/createCalendar";
import { renderEnvironment } from "../calendar/renderEnvironment";
import { controlEnvironment } from "../calendar/controlEnvironment";

export const render = () => {
  const route = window.location.pathname;

  if (route.match("/ToDoList")) {
    renderEnvironment();

    const newCalendar = new Calendar(renderEnvironment());
    newCalendar.renderCalendar();
    controlEnvironment(newCalendar);
  }
  if (route.match("/ToDoList/list")) {
    (
      document.getElementById("root") as HTMLDivElement
    ).innerHTML = `<div id = "divCont"></div>`;
    const divCont: string = "#divCont";
    //    console.log(document.getElementById(divCont));
    createToDoMarkup(divCont);
  }
  if (route.match("/ToDoList/about")) {
    (
      document.getElementById("root") as HTMLDivElement
    ).innerHTML = `<h2>"${route} page"</h2>`;
  }
};

// 1. Handle initial page load

window.addEventListener("load", () => {
  render(); // 👈
  //  console.log("2");
});

// 2. Handle history navigations. alternative "window.onpopstate"
window.addEventListener("popstate", (event) => {
  render();
  // console.log("35");
});

// 3. Catch <a> tag clicks + trigger change handler
document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url =
    event.target && (event.target as HTMLElement).getAttribute("href");
  history.pushState({ foo: "bar", url }, document.title, url);
  //  console.log(history.state);

  render(); // 👈
  console.log("3");
});
