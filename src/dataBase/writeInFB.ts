import { getDatabase, ref, set } from "firebase/database";
import { ToDoTask } from "../ToDoTasks/TypesToDo";

export function writeTaskInFB(task: ToDoTask | ToDoTask[]) {
  const db = getDatabase();
  set(ref(db, "tasks/"), {
    task,
  });
}
