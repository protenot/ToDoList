import { ToDoTask } from "../ToDoTasks/TypesToDo";

export type ToDoTasks = ToDoTask[];

export interface State {
  tasks: ToDoTasks | [];

  user: string;
}

export interface Action {
  type: string;
  payload?: any;
}
export type { Reducer } from "redux";
//export type Reducer<State, Action> = (state: State, action: Action) => State;
