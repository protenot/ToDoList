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

  constructor(divId: string) {
    this.divId = divId;

    const currentDate = new Date();
    //console.log(currentDate);
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.currentDay = currentDate.getDate();
  }

  nextMonth() {
    const currentUrl = window.location.href;
    /* window.history.pushState(null, "", currentUrl); */
    if (this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }

    this.renderCalendar();

    const selectedMonth = this.currentMonth;
    const newUrl = `${currentUrl}?${selectedMonth}`;
    window.history.pushState(null, "", newUrl);
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
    // console.log("year" + year, "month " + month);

    (document.getElementById(this.divId) as HTMLDivElement).innerHTML =
      getCalendarMarkup(year, month);

    renderModalControl();
  }
}
