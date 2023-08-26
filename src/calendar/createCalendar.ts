export class Calendar {
  divId: string;
  DaysOfWeek: string[];
  Months: string[];
  currentMonth: number;
  currentYear: number;
  currentDay: number;

  constructor(divId: string) {
    this.divId = divId;
    this.DaysOfWeek = ["Пн", "Вт", "Ср", "Чтв", "Птн", "Суб", "Вск"];
    this.Months = [
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

    const currentDate = new Date();

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
    this.showCurrent();
  }
  previousMonth() {
    if (this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.showCurrent();
  }
  showCurrent() {
    this.showMonth(this.currentYear, this.currentMonth);
  }
  showMonth(year: number, month: number) {
    const date = new Date(),
      firstDayOfMonth: number = new Date(year, month, 7).getDay(),
      lastDateOfMonth: number = new Date(year, month + 1, 0).getDate(),
      lastDayOfLastMonth: number =
        month == 0
          ? new Date(year - 1, 11, 0).getDate()
          : new Date(year, month, 0).getDate();
    let html: string = "<table>";
    html += "<thead><tr>";
    html += '<td colspan="7">' + this.Months[month] + " " + year + "</td>";
    html += "</tr></thead>";
    html += '<tr class="days">';
    for (let i = 0; i < this.DaysOfWeek.length; i++) {
      html += "<td>" + this.DaysOfWeek[i] + "</td>";
    }
    html += "</tr>";

    let i = 1;
    do {
      const dow = new Date(year, month, i).getDay();
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
      i++;
    } while (i <= lastDateOfMonth);

    html += "</table>";

    (document.getElementById(this.divId) as HTMLDivElement).innerHTML = html;
  }
}
