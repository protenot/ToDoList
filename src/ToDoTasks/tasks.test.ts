import { renderModalMarkup, createToDoMarkup } from "./createToDoMarkup";

import { Filter, Status, ToDoTask } from "./TypesToDo";
import { createID } from "./createIDToDo";
import { renderList } from "./renderList";
import { searcherTasks } from "./searcherTasks";
import { createSelect } from "./createSelect";
import { ToDoList } from "./classToDo";
const sleep = (x: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });
const testToDoList = new ToDoList();
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
describe("ToDoList", () => {
  it("should create a new task and add it to the array", async () => {
    //const toDoList = new ToDoList();
    const task: ToDoTask = {
      id: 2222,
      date: "13/02/1969",
      content: "Погулять с кошкой",
      status: Status.pending,
    };
    await testToDoList.createToDoTask(task);
    //console.log(toDoList);

    expect(testToDoList.tasks.length).toBe(1);

    localStorage.removeItem("tasks");
  });
  describe("getToDoTask", () => {
    it("should return an empty array when there are no tasks", async () => {
      const toDoList = new ToDoList();
      const tasks = await toDoList.getToDoTask();
      expect(tasks).toEqual([]);
    });
    it("should return an array of tasks when tasks exist in local storage", async () => {
      const dummyTasks: ToDoTask[] = [
        {
          id: 1,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Погулять с кошкой",
          status: Status.delayed,
        },
        {
          id: 2,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Покормить черепаху",
          status: Status.pending,
        },
        {
          id: 3,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Купить слона",
          status: Status.done,
        },
      ];

      localStorage.setItem("tasks", JSON.stringify(dummyTasks));
      const toDoList = new ToDoList();
      const tasks = await toDoList.getToDoTask();
      expect(tasks).toStrictEqual(dummyTasks);
    });
  });
  describe("updateToDoTask", () => {
    it("updates data", async () => {
      const toDoList = new ToDoList();
      const task = {
        id: 1,
        date: new Date(`2023-10-15T00:00:00.000Z`),
        content: "Погулять с попугаем",
        status: Status.pending,
      };

      expect(await toDoList.updateToDoTask(task)).toEqual([
        {
          id: 1,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Погулять с попугаем",
          status: "pending",
        },
        {
          id: 2,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Покормить черепаху",
          status: Status.pending,
        },
        {
          id: 3,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Купить слона",
          status: Status.done,
        },
      ]);
    });

    describe("deleteToDoTask", () => {
      it("deletes data", async () => {
        const toDoList = new ToDoList();
        const task = {
          id: 1,
          date: new Date(`2023-10-15T00:00:00.000Z`),
          content: "Погулять с попугаем",
          status: Status.pending,
        };

        expect(await toDoList.deleteToDoTask(task)).toEqual([
          {
            id: 2,
            date: new Date(`2023-10-15T00:00:00.000Z`),
            content: "Покормить черепаху",
            status: Status.pending,
          },
          {
            id: 3,
            date: new Date(`2023-10-15T00:00:00.000Z`),
            content: "Купить слона",
            status: Status.done,
          },
        ]);
      });
    });
    describe("filterToDoTask", () => {
      it("filters by date", async () => {
        localStorage.removeItem("tasks");
        const dummyTasks: ToDoTask[] = [
          {
            id: 1,
            date: new Date(`2023-10-15T00:00:00.000Z`),
            content: "Погулять с кошкой",
            status: Status.delayed,
          },
          {
            id: 2,
            date: new Date(`2023-10-16T00:00:00.000Z`),
            content: "Покормить черепаху",
            status: Status.pending,
          },
          {
            id: 3,
            date: new Date(`2023-10-17T00:00:00.000Z`),
            content: "Купить слона",
            status: Status.done,
          },
        ];

        localStorage.setItem("tasks", JSON.stringify(dummyTasks));
        const toDoList = new ToDoList();
        const slon = { content: "Купить слона" };
        const data = { date: new Date(`2023-10-15T00:00:00.000Z`) } as Filter;
        const stat = { status: "pending" } as Filter;

        expect(await toDoList.filterToDoTask(slon)).toEqual([
          {
            id: 3,
            date: new Date(`2023-10-17T00:00:00.000Z`),
            content: "Купить слона",
            status: Status.done,
          },
        ]);

        expect(await toDoList.filterToDoTask(stat)).toEqual([
          {
            id: 2,
            date: new Date(`2023-10-16T00:00:00.000Z`),
            content: "Покормить черепаху",
            status: Status.pending,
          },
        ]);
      });
    });
  });
});
