import { Task, TaskDocument } from '@/features/task';
import { dateToFirestore, removeUndefined } from '@/features/common';
import { List, upsertList } from '@/features/list';
import { find, findIndex } from 'lodash';

const DEFAULT_DATE = '1970-01-01';

export const fromFirestore = (taskDocument: TaskDocument): Task => {
  const { createdAt, completedAt, ...unchanged } = taskDocument;

  // If not created date, put a default one.
  const createdAtIso = createdAt?.toDate().toISOString() ?? new Date(DEFAULT_DATE).toISOString();
  const completedAtIso = completedAt?.toDate().toISOString();

  return {
    ...unchanged,
    createdAt: createdAtIso,
    completedAt: completedAtIso,
  };
};

export const toFirestore = (task: Task): TaskDocument => {
  const { createdAt, completedAt, ...unchanged } = task;

  return removeUndefined({
    ...unchanged,
    createdAt: dateToFirestore(createdAt),
    completedAt: dateToFirestore(completedAt),
  } as TaskDocument);
};

export const upsertTask = async (updatedTask: Task, list: List): Promise<void> => {
  const tasks = [...list.tasks];
  const taskIndex = findIndex(list.tasks, { id: updatedTask.id });
  if (taskIndex >= 0) tasks.splice(taskIndex, 1, updatedTask);
  else tasks.push(updatedTask);
  await upsertList({ ...list, tasks });
};

export const completeTask = async (taskId: string, list: List): Promise<void> => {
  const tasks = [...list.tasks];
  const task = find(tasks, { id: taskId });
  if (!task) throw new Error(`Task with id ${taskId} doesn't exist`);
  task.completedAt = new Date().toISOString();
  await upsertList({ ...list, tasks });
};

export const undoCompleteTask = async (taskId: string, list: List): Promise<void> => {
  const tasks = [...list.tasks];
  const task = find(tasks, { id: taskId });
  if (!task) throw new Error(`Task with id ${taskId} doesn't exist`);
  delete task.completedAt;
  await upsertList({ ...list, tasks });
};

export const taskHasChanges = (prevTaskData: Task, newTaskData: Task): boolean => {
  if (prevTaskData.id !== newTaskData.id)
    throw new Error(`Comparing 2 different tasks, Prev Task Id: ${prevTaskData.id}, New Task Id: ${newTaskData.id}`);
  return prevTaskData.title !== newTaskData.title;
};
