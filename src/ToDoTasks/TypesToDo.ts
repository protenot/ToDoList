export enum Status {
  Delayed = "delayed",
  Done = "done",
  Pending = "pending",
  Cancelled = "cancelled",
}
export interface ToDoTask {
  id: number;
  date: Date | number|string;
  content: string;
  status: Status;
}

export type Filter = {
  date?: Date | number;
  content?: string;
  status?: Status;
};

export interface ToDoTaskLibrary {
  createToDoTask(text?: string, task?: ToDoTask): Promise<void>;

  getToDoTask(): Promise<ToDoTask[] | []>;

  updateToDoTask(task: ToDoTask): Promise<ToDoTask[] | []>;

  deleteToDoTask(task: ToDoTask): Promise<ToDoTask[] | []>;

  filterToDoTask(someData: Filter): Promise<ToDoTask[]>;
}
