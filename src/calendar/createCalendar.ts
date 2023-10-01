import { createModal } from "./createModal";
import { newToDoList } from "../ToDoTasks/createToDoMarkup";

export const Months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const DaysOfWeek = ["Пн", "Вт", "Ср", "Чтв", "Птн", "Суб", "Вск"];

export class Calendar {
  divId: string;
  currentMonth: number;
  currentYear: number;
  currentDay: number;

  constructor(divId: string) {
    this.divId = divId;

    const currentDate = new Date();
    //console.log(currentDate);
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.currentDay = currentDate.getDate();
  }

  nextMonth() {
    if (this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }
    this.renderCalendar();
  }
  previousMonth() {
    if (this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.renderCalendar();
  }
  renderCalendar() {
    this.renderMonth(this.currentYear, this.currentMonth);
  }
  renderMonth(year: number, month: number) {
    console.log("year" + year, "month " + month);
    //const date = new Date(),
    const firstDayOfMonth: number = new Date(year, month, 7).getDay(),
      lastDateOfMonth: number = new Date(year, month + 1, 0).getDate(),
      lastDayOfLastMonth: number =
        month == 0
          ? new Date(year - 1, 11, 0).getDate()
          : new Date(year, month, 0).getDate();

    let html: string = `<table>
    <thead>
       <tr>
        <td colspan="7">  ${Months[month]}   ${year}  </td>
      </tr>
    </thead>
    <tr class="days">`;

    for (let i = 0; i < DaysOfWeek.length; i++) {
      html += `<td> ${DaysOfWeek[i]} </td> `;
    }
    html += `</tr>`;

    let j = 1;
    do {
      let dayOfWeek = new Date(year, month, j).getDay();
      //console.log("dayOfWeek" + dayOfWeek);
      // Начать новую строку в понедельник
      if (dayOfWeek == 1) {
        html += `<tr>`;
      } else if (j == 1) {
        html += `<tr>`;
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        //  console.log("k " + k);
        for (let x = 0; x < firstDayOfMonth; x++) {
          html += `<td class="not-current"> ${k}</td>`;
          k++;
        }
      }
      const check = new Date();
      const checkYear = check.getFullYear();
      const checkMonth = check.getMonth();

      if (
        checkYear == this.currentYear &&
        checkMonth == this.currentMonth &&
        j == this.currentDay
      ) {
        html += `<td class="today normal" data-year = "${year}" data-month = "${month}" data-date ="${j}"> 
          ${j}
          <p class = "mark">
          </p>
          </td>`;
      } else {
        html += `<td class="normal" data-year = "${year}" data-month = "${month}" data-date ="${j}">
           ${j} 
            <p class = mark></p>
           </td>`;
      }
      // закрыть строку в воскресенье
      if (dayOfWeek == 0) {
        html += `</tr>`;
      }

      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if (j && j == lastDateOfMonth) {
        let k = 1;
        for (dayOfWeek; dayOfWeek < 7; dayOfWeek++) {
          html += `<td class="not-current"> ${k} </td>`;
          k++;
        }
      }
      j++;
    } while (j <= lastDateOfMonth);

    html += `</table>`;

    (document.getElementById(this.divId) as HTMLDivElement).innerHTML = html;

    //добавляем переход на страницу с задачами по двойному щелчку
    const renderControl = () => {
      // console.log(html)
      const table = document.querySelector("table") as HTMLTableElement;

      table?.addEventListener("click", (event) => {
        if (
          (event.target as HTMLElement).matches(".normal")
          //||
          // (event.target as HTMLElement).matches(".today")
        ) {
          const monthFormatted = (
            Number((event.target as HTMLElement).getAttribute("data-month")) + 1
          )
            .toString()
            .padStart(2, "0");
          // console.log("nextmonth " + monthFormatted);

          const dataStr: string = `${(event.target as HTMLElement).getAttribute(
            "data-year",
          )}-${monthFormatted}-${(event.target as HTMLElement)
            .getAttribute("data-date")
            ?.padStart(2, "0")}T12:00`;
          createModal(table, dataStr);
        }
      });

      const currentDate = document.querySelector(".today");
      if (currentDate) {
        currentDate.addEventListener(
          "click",
          () => {
            createModal(table);
          },
          // { once: true },
        );
      }
    };
    // const markedDates = document.body.querySelectorAll(".mark");
    // markedDates.forEach((item) => console.log(item.textContent));
    // console.log(markedDates);
    //console.log(newToDoList.getToDoTask());

    renderControl();
  }
}
