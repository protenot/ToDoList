import { Calendar } from "./createCalendar";
import { createModal } from "./createModal";
import { getCalendarMarkup } from "./getCalendarMarkUp";
import { Months, DaysOfWeek } from "./createCalendar";
const date = new Date();

document.body.append(document.createElement("div"));
const div = document.querySelector("div");
(div as HTMLDivElement).id = "root";
(div as HTMLDivElement).innerHTML = ` <div class="calendar-wrapper">
    <button id="btnPrev" type="button">Предыдущий</button>
    <button id="btnNext" type="button">Следующий</button>
    <div id="divCal"></div>
    </div>`;

const divCal = "divCal";
const testCalendar = new Calendar(divCal, 2023, 11);
//console.log("1 " + div?.innerHTML);
describe("Calendar", () => {
  //console.log("2 " + div.innerHTML);
  describe("showMonth", () => {
    //console.log("3 " + div.innerHTML);
    it("shows month", () => {
      // const testCalendar = new Calendar(divCal)
      expect(testCalendar.renderMonth).toBeInstanceOf(Function);
      testCalendar.renderMonth(2023, 8);
      expect(document.querySelectorAll("tr").length).toBe(7);

      expect(document.querySelectorAll("td").length).toBe(43);
      expect(document.querySelectorAll("button").length).toBe(2);
    });
  });
  describe("nextMonth", () => {
    //
    //console.log(table)
    it("shows next month", () => {
      expect(testCalendar.nextMonth).toBeInstanceOf(Function);
    });
  });

  describe("renderCalendar", () => {
    //console.log(table)
    it("shows current month", () => {
      //console.log(testCalendar.renderCalendar())
      expect(testCalendar.renderCalendar()).toBe(11);
    });
  });
});
describe("createModal", () => {
  it("creates markup", () => {
    createModal(div as HTMLDivElement);
    expect(document.querySelector(".close-button")?.innerHTML).toBeTruthy();
  });
});
describe("getCalendarMarkUp", () => {
  it("creates markup", () => {
    const year = 2023;
    const month = 11;

    getCalendarMarkup(year, month);
    // console.log( getCalendarMarkup(2023,11))
    expect(getCalendarMarkup(2023, 11)).toBeTruthy();
  });
});
