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
  DaysOfWeek: string[];
  Months: string[];
  currentMonth: number;
  currentYear: number;
  currentDay: number;

  constructor(divId: string) {
    this.divId = divId;

    const currentDate = new Date();
    console.log(currentDate);
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
    const date = new Date(),
      firstDayOfMonth: number = new Date(year, month, 7).getDay(),
      lastDateOfMonth: number = new Date(year, month + 1, 0).getDate(),
      lastDayOfLastMonth: number =
        month == 0
          ? new Date(year - 1, 11, 0).getDate()
          : new Date(year, month, 0).getDate();
    console.log("firstDayOfMonth " + firstDayOfMonth);
    console.log("lastDateOfMonth " + lastDateOfMonth);
    let html: string = "<table>";
    html += "<thead><tr>";
    html += '<td colspan="7">' + Months[month] + " " + year + "</td>";
    html += "</tr></thead>";
    html += '<tr class="days">';
    for (let i = 0; i < DaysOfWeek.length; i++) {
      html += "<td>" + DaysOfWeek[i] + "</td>";
    }
    html += "</tr>";

    let i = 1;
    do {
      let dow = new Date(year, month, i).getDay();
      // Начать новую строку в понедельник
      if (dow == 1) {
        html += "<tr>";
      } else if (i == 1) {
        html += "<tr>";
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + "</td>";
          k++;
        }
      }
      const chk = new Date();
      const chkY = chk.getFullYear();
      const chkM = chk.getMonth();
      if (
        chkY == this.currentYear &&
        chkM == this.currentMonth &&
        i == this.currentDay
      ) {
        html +=
          '<td class="today">' + i + "<p class = mark>" + "</p>" + "</td>";
      } else {
        html +=
          '<td class="normal">' + i + "<p class = mark>" + "</p>" + "</td>";
      }
      // закрыть строку в воскресенье
      if (dow == 0) {
        html += "</tr>";
      }

      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if (i && i == lastDateOfMonth) {
        let k = 1;
        for (dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + "</td>";
          k++;
        }
      }
      i++;
    } while (i <= lastDateOfMonth);

    html += "</table>";
    // console.log(html);
    // console.log(this.divId);
    //console.log(document.getElementById(this.divId));
    document.getElementById(this.divId).innerHTML = html;
    //добавляем переход на страницу с задачами по двойному щелчку
    const renderControl = () => {
     // console.log(html)
      const table = document.querySelector("table");
      table.addEventListener("dblclick", () => {
        document.location = "/ToDoList/list";
      });
      //добавляем listener на даты
      //const placeForModal = document.querySelector('.mark')
      const normalDate = document.querySelectorAll(".normal");
      normalDate.forEach((n) => {
        n.addEventListener(
          "click",
          () => {
            console.log("nnnnn"+n.textContent)
            //let root = document.getElementById('root')
            createModal(table);
            
          },
          { once: true },
        );
      });

      const currentDate = document.querySelector(".today");
      if (currentDate) {
        currentDate.addEventListener(
          "click",
          () => {
            //let root = document.getElementById('root')
            createModal(table);
          },
          { once: true },
        );
      }
    };
    let markedDates = document.body.querySelectorAll('.mark')
   markedDates.forEach((item)=>console.log(item.textContent))
    console.log(markedDates)
    console.log(newToDoList.getToDoTask())


    renderControl();
  }



}
