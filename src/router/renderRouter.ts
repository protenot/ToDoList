import { createToDoMarkup } from "../ToDoTasks/createToDoMarkup";
import { Calendar } from "../calendar/createCalendar";
import { store } from "../redux/store";

export const render = () => {
  const route = window.location.pathname;

  let monthForStore: number = store.getState().month;
  console.log("store " + monthForStore);
  if (route.match("/ToDoList")) {
    (
      document.getElementById("root") as HTMLDivElement
    ).innerHTML = ` <div class="calendar-wrapper">
    <button id="btnPrev" type="button">Предыдущий</button>
    <button id="btnNext" type="button">Следующий</button>
    <div id="divCal"></div>
  </div>`;


    const divForCalendar: string = "divCal";
    const btnNext: string = "#btnNext";
    const btnPrev: string = "#btnPrev";

  
    console.log(divForCalendar);
    const newCalendar = new Calendar(divForCalendar);
    newCalendar.renderCalendar();
    const buttonNext = document.querySelector(btnNext);
    buttonNext?.addEventListener("click", () => {
      monthForStore = monthForStore + 1;
      if (monthForStore > 11) {
        monthForStore = 0;
      }
      store.dispatch({
        type: "CHANGE_MONTH",
        payload: { month: monthForStore },
      });

      newCalendar.nextMonth();
     // console.log("Месяц" + store.getState().month);
    });

    const buttonPrevious = document.querySelector(btnPrev);
    buttonPrevious?.addEventListener("click", () => {
      monthForStore = monthForStore - 1;
      if (monthForStore < 0) {
        monthForStore = 11;
      }
      store.dispatch({
        type: "CHANGE_MONTH",
        payload: { month: monthForStore },
      });
      newCalendar.previousMonth();
    });

 
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
