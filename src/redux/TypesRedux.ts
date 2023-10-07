import { ToDoTask } from "../ToDoTasks/TypesToDo";
import { ToDoList } from "../ToDoTasks/classToDo";

export type ToDoTasks = ToDoTask[];

export interface State {
  tasks: ToDoTasks | [];

  user: string;
}

export interface Action {
  type: string;
  payload?: typeof ToDoList;
}
export type { Reducer } from "redux";
//export type Reducer<State, Action> = (state: State, action: Action) => State;
