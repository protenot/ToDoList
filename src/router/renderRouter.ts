import { createToDoMarkup } from "../ToDoTasks/createToDoMarkup";
import { Calendar } from "../calendar/createCalendar";
import { renderEnvironment } from "../calendar/renderEnvironment";
import { controlEnvironment } from "../calendar/controlEnvironment";
import { store } from "../redux/store";
import { Router } from "./routerRouter";

export const render = () => {
  const route = window.location.pathname;
  console.log("ROUTE" + route);
  if (route.match(/^\/ToDoList\/(0?[0-9]|1[0-2])\/(19|20)\d{2}$/)) {
    console.log(20233333);
    // /^\/ToDoList\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/
    renderEnvironment();
    const length = route.length;
    console.log("длина " + length);
    let month;
    length === 17
      ? (month = +route.slice(10, 12).toString() - 1)
      : (month = +route.slice(10, 11).toString() - 1);
    console.log("month " + month);
    let year;
    length === 17
      ? (year = +route.slice(13).toString())
      : (year = +route.slice(12).toString());

    const newCalendar = new Calendar(renderEnvironment(), year, month);
    newCalendar.renderCalendar();
    //   controlEnvironment(newCalendar);
  }

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

    createToDoMarkup(divCont);
  }
  if (route.match("/ToDoList/about")) {
    (
      document.getElementById("root") as HTMLDivElement
    ).innerHTML = `<h2>"${route} page"</h2>`;
  }
};

// 1. Handle initial page load

/* window.addEventListener("load", () => {
  //render(); // 👈
  //  console.log("2");
}); */

/* // 2. Handle history navigations. alternative "window.onpopstate"
window.addEventListener("popstate", (event) => {
  console.log("event " + JSON.stringify(event));
  render();
  console.log("35");
}); */

/* // 3. Catch <a> tag clicks + trigger change handler
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
}); */

export function updateMonthUrl(path: string) {
  /* console.log('selectedMonth111 '+selectedMonth);
  const monthStr = (selectedMonth).toString().padStart(2, '0');
  const yearStr = selectedYear.toString(); */
  const newUrl = `/ToDoList/${path}`;
  /* const monthString = (selectedMonth<10)?
  `0${selectedMonth}`:`${selectedMonth}`;
  const yearString = `${selectedYear}`
  const newUrl = `${monthString}/${yearString}` */
  console.log("newUrl " + newUrl);
  window.history.pushState({ path: path }, "", newUrl);
  console.log("Новый URL: " + window.location.href);
  console.log("Новый path: " + window.location.pathname);
}

// 4. Catch #bntNext and #btnPrev tag clicks + trigger change handler

/* document.body.addEventListener("click", (event) => {
  if (
    (event.target as HTMLElement).matches("#btnPrev") ||
    (event.target as HTMLElement).matches("#btnNext")
  ) {
    const url = document.location.href;
    const path = document.location.pathname;
    console.log("url 3 " + url + path);

    const selectedYear = store.getState().year;
    console.log("selectedYear" + selectedYear);
    const selectedMonth = store.getState().month;

    updateMonthUrl(selectedMonth, selectedYear);
  }
}); */
