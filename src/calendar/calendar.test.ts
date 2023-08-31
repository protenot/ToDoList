import { Calendar } from "./createCalendar";
import { createModal } from "./createModal";
const date = new Date();

document.body.append(document.createElement("div"));
const div = document.querySelector("div");
div.id = "root";
div.innerHTML = ` <div class="calendar-wrapper">
    <button id="btnPrev" type="button">Предыдущий</button>
    <button id="btnNext" type="button">Следующий</button>
    <div id="divCal"></div>
    </div>`;

const divCal = "divCal";
const testCalendar = new Calendar(divCal);
//console.log("1 " + div.innerHTML);
describe("Calendar", () => {
  //console.log("2 " + div.innerHTML);
  describe("showMonth", () => {
    //console.log("3 " + div.innerHTML);
    it("shows month", () => {
      // const testCalendar = new Calendar(divCal)
      expect(testCalendar.showMonth).toBeInstanceOf(Function);
      testCalendar.showMonth(2023, 8);
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
});
describe("createModal", () => {
  it("creates markup", () => {
    createModal(div);
    expect(document.querySelector(".btn").innerHTML).toBeTruthy();
  });
});
