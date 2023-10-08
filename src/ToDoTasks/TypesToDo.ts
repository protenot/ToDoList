export enum Status {
  delayed = "delayed",
  done = "done",
  pending = "pending",
  cancelled = "cancelled",
}
export interface ToDoTask {
  id: number;
  date: Date | number | string;
  content: string;
  status: Status;
}

export type Filter = {
  date?: Date | number | string;
  content?: string;
  status?: Status | string;
};

export interface ToDoTaskLibrary {
  createToDoTask(text?: string, task?: ToDoTask): Promise<void>;

  getToDoTask(): Promise<ToDoTask[] | []>;

  updateToDoTask(task: ToDoTask): Promise<ToDoTask[] | []>;

  deleteToDoTask(task: ToDoTask): Promise<ToDoTask[] | []>;

  filterToDoTask(someData: Filter): Promise<ToDoTask[]>;
}
