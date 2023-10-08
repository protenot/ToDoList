import { newToDoList } from "../ToDoTasks/createToDoMarkup";
export function renderEnvironment() {
  (
    document.getElementById("root") as HTMLDivElement
  ).innerHTML = ` <div class="calendar-wrapper">
    <button id="btnPrev" type="button">Prev</button>
    <button id="btnNext" type="button">Next</button>
    <div id="divCal"></div>
  </div>`;
  return "divCal";
}
