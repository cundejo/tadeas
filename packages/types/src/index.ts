export type DateISOString = string;

export type TaskCore = {
  id: string;
  title: string;
};

export type TaskDocument = TaskCore & {
  createdAt: Timestamp;
  completedAt?: Timestamp;
};

export type Task = TaskCore & {
  createdAt: DateISOString;
  completedAt?: DateISOString;
};

export type ListTasksDocument = {
  tasks: TaskDocument[];
  tasksCompleted: TaskDocument[];
};

export type ListTasks = {
  id: string; // Same id of the list
  tasks: Task[];
  tasksCompleted: Task[];
};

export type ListDocument = {
  name: string;
  owner: string;
  sharedWith: string[];
  isDefault?: boolean;
};

export type List = ListDocument & {
  id: string;
};

// This class is from firebase, but just to be sure that it will not
// raise any error because we use different firebase implementations in
// different projects, we decided to duplicate here the interface.
export class Timestamp {
  // @ts-ignore
  static now(): Timestamp;
  // @ts-ignore
  static fromDate(date: Date): Timestamp;
  // @ts-ignore
  static fromMillis(milliseconds: number): Timestamp;
  // @ts-ignore
  constructor(seconds: number, nanoseconds: number);
  // @ts-ignore
  readonly seconds: number;
  // @ts-ignore
  readonly nanoseconds: number;
  // @ts-ignore
  toDate(): Date;
  // @ts-ignore
  toMillis(): number;
  // @ts-ignore
  isEqual(other: Timestamp): boolean;
  // @ts-ignore
  valueOf(): string;
}
