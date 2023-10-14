import { Calendar } from "./createCalendar";
import { createModal } from "./createModal";
import { getCalendarMarkup } from "./getCalendarMarkUp";
import { controlEnvironment } from "./controlEnvironment";
import { renderEnvironment } from "./renderEnvironment";
import * as createModalModule from "./createModal";
import { createRender } from "../router/renderRouter";

document.body.append(document.createElement("div"));
const div = document.querySelector("div");
(div as HTMLDivElement).id = "root";
(div as HTMLDivElement).innerHTML = ` <div class="calendar-wrapper">
    <button id="btnPrev" type="button">Prev</button>
    <button id="btnNext" type="button">Next</button>
    <div id="divCal"></div>
    </div>`;

const divCal = "divCal";
const testCalendar = new Calendar(divCal, 2023, 11);

describe("Calendar", () => {
  describe("showMonth", () => {
    it("shows month", () => {
      expect(testCalendar.renderMonth).toBeInstanceOf(Function);
      testCalendar.renderMonth(2023, 8);
      expect(document.querySelectorAll("tr").length).toBe(7);

      expect(document.querySelectorAll("td").length).toBe(43);
      expect(document.querySelectorAll("button").length).toBe(2);
    });
  });
  describe("nextMonth", () => {
    it("shows next month", () => {
      expect(testCalendar.nextMonth).toBeInstanceOf(Function);
    });
  });

  describe("renderCalendar", () => {
    it("shows current month", () => {
      expect(testCalendar.renderCalendar()).toBe(11);
    });
  });
});
describe("createModal", () => {
  it("creates markup", () => {
    createModal(div as HTMLDivElement);
    expect(document.querySelector(".close-button")?.innerHTML).toBeTruthy();
    document
      .querySelector(".close-button")
      ?.dispatchEvent(new MouseEvent("click"));
    setTimeout(() => {
      const modalAfterRemove = document.querySelector(".flex") as HTMLElement;
      expect(modalAfterRemove).toBeNull();
    }, 100);
  });
});
describe("getCalendarMarkUp", () => {
  it("creates markup", () => {
    const year = 2023;
    const month = 11;

    getCalendarMarkup(year, month);
    expect(getCalendarMarkup(2023, 11)).toBeTruthy();
  });
});
describe("controlEnvironment", () => {
  it("creates markup", () => {
    controlEnvironment(testCalendar);

    expect(document.querySelector("#btnNext")).toBeDefined();
    expect(document.querySelector("#btnPrev")).toBeDefined();
  });
});
describe("renderEnvironment", () => {
  it("render environment", () => {
    renderEnvironment();

    expect(document.querySelector(".calendar-wrapper")).toBeDefined();
    expect(document.querySelector("#btnPrev")).toBeDefined();
  });
});

describe("renderModalControl", () => {
  let table: HTMLTableElement;
  let cell: HTMLTableCellElement;

  const createModalSpy = jest.spyOn(createModalModule, "createModal");

  beforeEach(() => {
    table = document.createElement("table");
    cell = document.createElement("td");
    cell.classList.add("normal");
    cell.setAttribute("data-year", "2023");
    cell.setAttribute("data-month", "1");
    cell.setAttribute("data-date", "15");
    table.appendChild(document.createElement("tr").appendChild(cell));

    createModalSpy.mockClear();
  });

  it("should create a modal when a table cell with 'normal' class is clicked", () => {
    cell.dispatchEvent(new Event("click"));

    expect(createModalSpy).toBeDefined();
    expect(table.querySelector(".normal")).not.toBeNull();
    expect(cell.getAttribute("data-year")).toBe("2023");
    expect(cell.getAttribute("data-month")).toBe("1");
    expect(cell.getAttribute("data-date")).toBe("15");
  });
});

describe("createRender", () => {
  it("render according the path /", () => {
    createRender("/");

    expect(document.querySelector("table")).toBeDefined();
    expect(document.querySelector("#btnPrev")).toBeDefined();
  });

  it("render according the path /list", () => {
    createRender("/list");

    expect(document.querySelector("input")).toBeDefined();
  });
});
