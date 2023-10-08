import { getCalendarMarkup } from "./getCalendarMarkUp";
import { renderModalControl } from "./renderModalControl";

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

  nextMonth(): string {
    if (this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }

    this.renderCalendar();
    return `${this.currentMonth + 1}/${this.currentYear}`;
  }

  previousMonth() {
    if (this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.renderCalendar();
    this.currentMonth;
    return `${this.currentMonth + 1}/${this.currentYear}`;
  }

  renderCalendar() {
    console.log(this.currentYear);
    this.renderMonth(this.currentYear, this.currentMonth);
    return this.currentMonth;
  }

  renderMonth(year: number, month: number) {
    const element = document.getElementById(this.divId);
    if (element instanceof HTMLDivElement) {
      element.innerHTML = getCalendarMarkup(year, month);
    }

    renderModalControl();
  }
}
