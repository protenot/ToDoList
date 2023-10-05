import { getCalendarMarkup } from "./getCalendarMarkUp";
import { renderModalControl } from "./renderModalControl";
import { store } from "../redux/store";

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Аugust",
  "September",
  "October",
  "November",
  "December",
];
export const DaysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export class Calendar {
  divId: string;
  currentMonth: number;
  currentYear: number;
  currentDay: number;

  constructor(divId: string, year?: number, month?: number) {
    this.divId = divId;

    const currentDate = new Date();

    this.currentMonth = month !== undefined ? month : currentDate.getMonth();
    this.currentYear = year !== undefined ? year : currentDate.getFullYear();
    this.currentDay = currentDate.getDate();
  }

  nextMonth() {
    if (this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
      store.dispatch({
        type: "CHANGE_YEAR",
        payload: { year: this.currentYear },
      });
    } else {
      this.currentMonth = this.currentMonth + 1;
    }

    this.renderCalendar();
  }

  previousMonth() {
    if (this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;

      store.dispatch({
        type: "CHANGE_YEAR",
        payload: { year: this.currentYear },
      });
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.renderCalendar();
  }

  renderCalendar() {
    console.log(this.currentYear);
    this.renderMonth(this.currentYear, this.currentMonth);
    return this.currentMonth;
  }

  renderMonth(year: number, month: number) {
    console.log("year " + year, "month " + month);

    const element = document.getElementById(this.divId);
    if (element instanceof HTMLDivElement) {
      element.innerHTML = getCalendarMarkup(year, month);
    }

    renderModalControl();
  }
}
