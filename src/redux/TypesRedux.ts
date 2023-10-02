import { ToDoTask } from "../ToDoTasks/TypesToDo";

export type ToDoTasks = ToDoTask[];

export interface State {
  tasks: ToDoTasks | [];
  year: number;
  month: number;
  months: string[];
}

export interface Action {
  type: string;
  payload?: any;
}
export type { Reducer } from "redux";
//export type Reducer<State, Action> = (state: State, action: Action) => State;
