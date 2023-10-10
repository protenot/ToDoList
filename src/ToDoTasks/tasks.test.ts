import { renderModalMarkup, createToDoMarkup } from "./createToDoMarkup";

import { Status } from "./TypesToDo";
import { createID } from "./createIDToDo";
import { renderList } from "./renderList";
import { searcherTasks } from "./searcherTasks";
import { createSelect } from "./createSelect";
const sleep = (x: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });

document.body.append(document.createElement("div"));
const div = document.querySelector("div") as HTMLDivElement;

const container = document.createElement("div");
container.id = "tasks-container";
document.body.appendChild(container);

describe("renderModalMarkup", () => {
  it("creates markup", () => {
    renderModalMarkup(div);
    expect(document.querySelector("input")?.placeholder).toBe("Set a task");
    expect(document.querySelector("button")).toBeDefined();
    expect(document.querySelector("datalist")).toBeDefined();
  });
});
describe("createToDoMarkup", () => {
  it("is a function", () => {
    expect(createToDoMarkup).toBeInstanceOf(Function);
  });
  it("creates markup", async () => {
    await createToDoMarkup("#test-container");
    sleep(200);
    const toDoContainer = container.querySelector(".list");
    expect(toDoContainer).toBeDefined();
    const taskContainer = container.querySelector("#task-container");
    expect(taskContainer).toBeDefined();
    const select = container.querySelector("select");
    expect(select).toBeDefined();
  });
});

describe("searcherTasks", () => {
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    inputElement = document.createElement("input");
    document.body.appendChild(inputElement);
  });

  it("should update the datalist options when input value changes", async () => {
    await searcherTasks(inputElement);

    inputElement.value = "Прогулка";

    inputElement.dispatchEvent(new Event("keyup"));
    sleep(200);

    const label = document.querySelector("label");
    expect(label).not.toBeNull();
  });
});

describe("createSelect", () => {
  it("creates select", () => {
    const div = document.createElement("div");
    createSelect(div);

    expect(document.querySelector("select")).toBeDefined();
    sleep(200);
    expect(document.querySelectorAll(".status-option")).toBeDefined();
  });
});

describe("createIDToDo", () => {
  it("creates ID", () => {
    expect(createID()).toBeGreaterThanOrEqual(1);
  });
});
describe("renderList", () => {
  const list = [
    {
      content: "Покормить черепаху",
      date: "2023-09-05T15:54",
      id: 6316,
      status: Status.cancelled,
    },
  ];

  it("creates markup for dates", async () => {
    await renderList(list);
    expect(document.querySelector(".list-dates"))?.toBeDefined();
    expect(document.querySelectorAll(".list-dates").length).toBe(1);
    expect(container.querySelectorAll("p").length).toBe(4);
  });
  it("creates markup for content", () => {
    expect(document.querySelector(".taska")).toBeDefined();
  });

  it("creates markup for buttons", () => {
    sleep(200);
    expect(container.querySelectorAll("button").length).toBe(2);
    expect(
      container.querySelector(".current-delete-button")?.textContent,
    ).toEqual("Delete");
  });
});
