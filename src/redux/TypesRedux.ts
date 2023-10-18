import { ToDoTask } from "../ToDoTasks/TypesToDo";
import { ToDoList } from "../ToDoTasks/classToDo";

export type ToDoTasks = ToDoTask[];

export interface State {
  tasks: ToDoTasks | [];
}

export interface Action {
  type: string;
  payload?: typeof ToDoList;
}
export type { Reducer } from "redux";
