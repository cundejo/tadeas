import { ListTasks, ListTasksDocument } from '@tadeas/types';
import { taskFromFirestore, taskToFirestore } from './tasks';
import { removeUndefined } from './utils';

export const listTasksFromFirestore = (listTasksDocument: ListTasksDocument & { id: string }): ListTasks => {
  const { tasks, tasksCompleted, ...unchanged } = listTasksDocument;

  return {
    ...unchanged,
    tasks: tasks.map(taskFromFirestore),
    tasksCompleted: tasksCompleted.map(taskFromFirestore),
  };
};

export const listTasksToFirestore = (listTasks: ListTasks): ListTasksDocument => {
  const { id, tasks, tasksCompleted, ...unchanged } = listTasks;

  return removeUndefined({
    ...unchanged,
    tasks: tasks.map(taskToFirestore),
    tasksCompleted: tasksCompleted.map(taskToFirestore),
  });
};
