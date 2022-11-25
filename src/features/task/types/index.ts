import firebase from 'firebase/compat';
import { DateISOString } from '@/common';
import Timestamp = firebase.firestore.Timestamp;

type TaskCore = {
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
