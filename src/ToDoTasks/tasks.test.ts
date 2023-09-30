import { createModalWindow, createToDoMarkup } from "./createToDoMarkup";
import { ToDoList } from "./classToDo";
import { Status, ToDoTask, Filter } from "./TypesToDo";
import { createID } from "./createIDToDo";
import { renderList } from "./renderList";
//import { ToDoTask } from "./TypesToDo";

const sleep = (x: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });

document.body.append(document.createElement("div"));
const div = document.querySelector("div") as HTMLDivElement;
const testToDoList = new ToDoList();

const container = document.createElement("div");
container.id = "tasks-container";
document.body.appendChild(container);

describe("createModalW", () => {
  it("creates markup", () => {
    createModalWindow(div);
    expect(document.querySelector("input")?.placeholder).toBe("Введите задачу");
    expect(document.querySelector("button")).toBeDefined();
    expect(document.querySelector("datalist")).toBeDefined();
  });
});
describe("createToDoMarkup", () => {
  it("is a function", () => {
    expect(createToDoMarkup).toBeInstanceOf(Function);
  });
  /*  it("creates markup", ()=>{
    let div1 =document.createElement("div")
   div1.classList.add('test-div')
   div.append(div1)
let testDiv='test-div'
   createToDoMarkup(div1)
   
    //expect(document.querySelector("button")).not.toBe(null)
}) */
});
describe("ToDoList", () => {
  it("should create a new task and add it to the array", async () => {
    //const toDoList = new ToDoList();
    const task: ToDoTask = {
      id: 2222,
      date: "13/02/1969",
      content: "Погулять с кошкой",
      status: Status.Pending,
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
          date: 1689886800000,
          content: "Погулять с кошкой",
          status: Status.Delayed,
        },
        {
          id: 2,
          date: 1689886800000,
          content: "Покормить черепаху",
          status: Status.Pending,
        },
        {
          id: 3,
          date: 1689886800000,
          content: "Купить слона",
          status: Status.Done,
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
      //localStorage.removeItem("tasks");
      const toDoList = new ToDoList();
      const task = {
        id: 1,
        date: 1689886800000,
        content: "Погулять с попугаем",
        status: Status.Pending,
      };

      expect(await toDoList.updateToDoTask(task)).toEqual([
        {
          id: 1,
          date: 1689886800000,
          content: "Погулять с попугаем",
          status: "pending",
        },
        {
          id: 2,
          date: 1689886800000,
          content: "Покормить черепаху",
          status: Status.Pending,
        },
        {
          id: 3,
          date: 1689886800000,
          content: "Купить слона",
          status: Status.Done,
        },
      ]);
    });

    describe("deleteToDoTask", () => {
      it("deletes data", async () => {
        const toDoList = new ToDoList();
        const task = {
          id: 1,
          date: 1689886800000,
          content: "Погулять с попугаем",
          status: Status.Pending,
        };

        expect(await toDoList.deleteToDoTask(task)).toEqual([
          {
            id: 2,
            date: 1689886800000,
            content: "Покормить черепаху",
            status: Status.Pending,
          },
          {
            id: 3,
            date: 1689886800000,
            content: "Купить слона",
            status: Status.Done,
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
            date: "13.02.1969",
            content: "Погулять с кошкой",
            status: Status.Delayed,
          },
          {
            id: 2,
            date: "15.02.1969",
            content: "Покормить черепаху",
            status: Status.Pending,
          },
          {
            id: 3,
            date: "14.02.1969",
            content: "Купить слона",
            status: Status.Done,
          },
        ];

        localStorage.setItem("tasks", JSON.stringify(dummyTasks));
        const toDoList = new ToDoList();
        const slon = { content: "Купить слона" };
        const data = { date: "13.02.1969" } as Filter;
        const stat = { status: "pending" } as Filter;

        expect(await toDoList.filterToDoTask(slon)).toEqual([
          {
            id: 3,
            date: "14.02.1969",
            content: "Купить слона",
            status: Status.Done,
          },
        ]);

        /* expect(await toDoList.filterToDoTask(data)).toEqual([
          {
            id: 1,
            date: "13.02.1969",
            content: "Погулять с кошкой",
            status: Status.Delayed,
          },
        ]);*/

        expect(await toDoList.filterToDoTask(stat)).toEqual([
          {
            id: 2,
            date: "15.02.1969",
            content: "Покормить черепаху",
            status: Status.Pending,
          },
        ]);
      });
    });
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
      status: Status.Cancelled,
    },
  ];
  renderList(list);

  it("creates markup for dates", () => {
    expect(document.querySelector(".list-dates")).toBeDefined();

    console.log(document.querySelector(".list-dates"));
    expect(document.querySelectorAll(".list-dates").length).toBe(1);
    //expect (container.querySelector('.list-dates').textContent).toBe('05.09.2023')
    expect(container.querySelectorAll("p").length).toBe(4);
  });
  it("creates markup for content", () => {
    expect(document.querySelector(".taska")).toBeDefined();
  });

  it("creates markup for buttons", () => {
    expect(container.querySelectorAll("button").length).toBe(2);
    expect(
      container.querySelector(".current-delete-button")?.textContent,
    ).toEqual("Удалить");
  });
});
