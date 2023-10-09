import { renderModalMarkup, createToDoMarkup } from "./createToDoMarkup";
import { ToDoList } from "./classToDo";
import { Status, ToDoTask, Filter } from "./TypesToDo";
import { createID } from "./createIDToDo";
import { renderList } from "./renderList";
import { app, auth, database } from "../dataBase/firebase";
import { writeTaskInFB } from "../dataBase/writeInFB";
//import { ToDoTask } from "./TypesToDo";
//import { fireEvent } from '@testing-library/dom'; // Подключите необходимые библиотеки для тестирования DOM
//import { render, screen } from '@testing-library/dom';
import { searcherTasks } from "./searcherTasks";
import { createSelect } from "./createSelect";
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
  // Создаем фиктивный элемент input для тестирования
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    // Создаем элемент input перед каждым тестом
    inputElement = document.createElement("input");
    document.body.appendChild(inputElement);
  });

  afterEach(() => {
    // Удаляем элемент input после каждого теста
    //document.body.removeChild(inputElement);
  });

  it("should update the datalist options when input value changes", async () => {
    // Вызываем функцию и передаем фиктивный элемент input

    await searcherTasks(inputElement);
    console.log("++++" + inputElement.value);
    // Эмулируем ввод текста в input
    inputElement.value = "Прогулка";
    console.log("++++" + inputElement.value);
    inputElement.dispatchEvent(new Event("keyup"));
    sleep(200);
    // Получаем datalist и проверяем, что в нем появились соответствующие опции
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

/*  it("creates markup", ()=>{
    let div1 =document.createElement("div")
   div1.classList.add('test-div')
   div.append(div1)
let testDiv='test-div'
   createToDoMarkup(div1)
   
    //expect(document.querySelector("button")).not.toBe(null)
}) */

/* jest.mock("../dataBase/firebase", () => ({
  ...jest.requireActual("../dataBase/firebase"), // Импортируем оригинальный модуль
  writeTaskInFB: jest.fn(),
})); */
describe("ToDoList", () => {
  it("should create a new task and add it to the array", async () => {
    /* //const toDoList = new ToDoList();
    const task: ToDoTask = {
      id: 2222,
      date: "13/02/1969",
      content: "Погулять с кошкой",
      status: Status.pending,
    };
    await testToDoList.createToDoTask(task);
    //console.log(toDoList);
    expect(writeTaskInFB).toHaveBeenCalledWith(task);
    expect(testToDoList.tasks.length).toBe(1);

    localStorage.removeItem("tasks"); */
  });
  /*  describe("getToDoTask", () => {
   /*  it("should return an empty array when there are no tasks", async () => {
      const toDoList = new ToDoList();
      const tasks = await toDoList.getToDoTask();
      expect(tasks).toEqual([]);
    }); */
  /*  it("should return an array of tasks when tasks exist in local storage", async () => {
      const dummyTasks: ToDoTask[] = [
        {
          id: 1,
          date: 1689886800000,
          content: "Погулять с кошкой",
          status: Status.delayed,
        },
        {
          id: 2,
          date: 1689886800000,
          content: "Покормить черепаху",
          status: Status.pending,
        },
        {
          id: 3,
          date: 1689886800000,
          content: "Купить слона",
          status: Status.done,
        },
      ];

      localStorage.setItem("tasks", JSON.stringify(dummyTasks));
      const toDoList = new ToDoList();
      const tasks = await toDoList.getToDoTask();
      expect(tasks).toStrictEqual(dummyTasks);
    }); */
});
/*   describe("updateToDoTask", () => {
    it("updates data", async () => {
      //localStorage.removeItem("tasks");
      const toDoList = new ToDoList();
      const task = {
        id: 1,
        date: 1689886800000,
        content: "Погулять с попугаем",
        status: Status.pending,
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
          status: Status.pending,
        },
        {
          id: 3,
          date: 1689886800000,
          content: "Купить слона",
          status: Status.done,
        },
      ]);
    });
 */
/*  describe("deleteToDoTask", () => {
      it("deletes data", async () => {
        const toDoList = new ToDoList();
        const task = {
          id: 1,
          date: 1689886800000,
          content: "Погулять с попугаем",
          status: Status.pending,
        };

        expect(await toDoList.deleteToDoTask(task)).toEqual([
          {
            id: 2,
            date: 1689886800000,
            content: "Покормить черепаху",
            status: Status.pending,
          },
          {
            id: 3,
            date: 1689886800000,
            content: "Купить слона",
            status: Status.done,
          },
        ]);
      });
    }); */
/*     describe("filterToDoTask", () => {
      it("filters by date", async () => {
        localStorage.removeItem("tasks");
        const dummyTasks: ToDoTask[] = [
          {
            id: 1,
            date: "13.02.1969",
            content: "Погулять с кошкой",
            status: Status.delayed,
          },
          {
            id: 2,
            date: "15.02.1969",
            content: "Покормить черепаху",
            status: Status.pending,
          },
          {
            id: 3,
            date: "14.02.1969",
            content: "Купить слона",
            status: Status.done,
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
            status: Status.done,
          },
        ]); */

/* expect(await toDoList.filterToDoTask(data)).toEqual([
          {
            id: 1,
            date: "13.02.1969",
            content: "Погулять с кошкой",
            status: Status.Delayed,
          },
        ]);*/

/*       expect(await toDoList.filterToDoTask(stat)).toEqual([
          {
            id: 2,
            date: "15.02.1969",
            content: "Покормить черепаху",
            status: Status.pending,
          },
        ]);
      });
    });
  });
});  */
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

    console.log(document.querySelector(".list-dates"));
    expect(document.querySelectorAll(".list-dates").length).toBe(1);
    //expect (container.querySelector('.list-dates').textContent).toBe('05.09.2023')
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
