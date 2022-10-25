import { Task, TaskDocument } from '@/features/task';

type ListCore = {
  name: string;
  owner: string;
  sharedWith: string[];
};

export type ListDocument = ListCore & {
  tasks: TaskDocument[];
};

export type List = ListCore & {
  id: string;
  tasks: Task[];
};
