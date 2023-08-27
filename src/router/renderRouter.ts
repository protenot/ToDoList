import { Calendar } from "../calendar/createCalendar";

export const render = async () => {
  const route = window.location.pathname;
  console.log(route);
  if (route.match("/ToDoList/")) {
    document.getElementById("root").innerHTML = ` <div class="calendar-wrapper">
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
    newCalendar.showCurrent();
    getId("btnNext").onclick = function () {
      newCalendar.nextMonth();
    };
    getId("btnPrev").onclick = function () {
      newCalendar.previousMonth();
    };
  }
  if (route.match("/ToDoList/list")) {
    document.getElementById("root").innerHTML = `<h2>"${route} page"</h2>`;
  } else {
    document.getElementById("root").innerHTML = `<h2>"${route} page"</h2>`;
    console.log("1" + route);
  }
};

// 1. Handle initial page load

window.addEventListener("load", () => {
  render(); // 👈
  console.log("2");
});

// 2. Handle history navigations. alternative "window.onpopstate"
window.addEventListener("popstate", (event) => {
  render();
  console.log("35");
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
  console.log(history.state);
  // history.replaceState({ foo: "bar" }, url, url);
  render(); // 👈
  console.log("3");
});
