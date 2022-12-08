import firebase from 'firebase/compat';

export type DateISOString = string;

export type TaskCore = {
  id: string;
  title: string;
};

export type TaskDocument = TaskCore & {
  createdAt: firebase.firestore.Timestamp;
  completedAt?: firebase.firestore.Timestamp;
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
