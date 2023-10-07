import { Months, DaysOfWeek } from "./createCalendar";

export function getCalendarMarkup(
  this: unknown,
  year: number,
  month: number,
): string {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const firstDayOfMonth: number = new Date(year, month, 7).getDay(),
    lastDateOfMonth: number = new Date(year, month + 1, 0).getDate(),
    lastDayOfLastMonth: number =
      month == 0
        ? new Date(year - 1, 11, 0).getDate()
        : new Date(year, month, 0).getDate();
  console.log("firstDayOfMonth " + firstDayOfMonth);
  console.log("year1 " + year);
  let html: string = `<table>
  <thead>
     <tr>
      <td colspan="7">  ${Months[month]}   ${year}  </td>
    </tr>
  </thead>
  <tr class="days">`;
  console.log("month " + month);
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

    if (year == currentYear && month == currentMonth && j == currentDay) {
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
  return html;
}
