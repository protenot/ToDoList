import FuzzySearch from "fuzzy-search";
import { newToDoList } from "./createToDoMarkup";
import { ToDoTask } from "./TypesToDo";

export async function searcherTasks(element: HTMLInputElement) {
  const inputTasks = Array.from(await newToDoList.getToDoTask());

  const tasksArray: Record<string, ToDoTask[]> = inputTasks.reduce(
    (res, obj) => {
      const key: string = obj.content;
      if (!res[key]) {
        res[key] = [];
      }
      res[key].push(obj);
      return res;
    },
    [] as unknown as Record<string, ToDoTask[]>,
  );

  const keysArray = Object.keys(tasksArray);

  element.addEventListener("keyup", () => {
    const searcher = new FuzzySearch(keysArray);
    const result = searcher.search(element.value);
    const label = document.createElement("label");
    element.append(label);
    label.setAttribute("for", "label");
    const dataList = document.createElement("datalist");
    dataList.id = "tasks-choice";
    element.setAttribute("list", "tasks-choice");
    element.name = "label";
    for (let i = 0; i < result.length; i++) {
      const optionWord = document.createElement("option");
      optionWord.value = result[i];
      optionWord.classList.add("tasks-option");
      dataList.appendChild(optionWord);
      (element as HTMLElement).append(dataList);
    }
  });
}
