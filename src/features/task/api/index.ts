import { Task, TaskDocument } from '@/features/task';
import { dateToFirestore, removeUndefined } from '@/features/common';
import { List, upsertList } from '@/features/list';
import { compact, find, findIndex, forEach } from 'lodash';
import { toast } from 'react-toastify';

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

/**
 * Update several tasks at once in a list
 */
export const upsertTasks = async (updatedTasks: Array<Task | undefined>, list: List): Promise<void> => {
  const tasks = [...list.tasks];
  forEach(compact(updatedTasks), (task) => {
    const taskIndex = findIndex(tasks, { id: task.id });
    if (taskIndex >= 0) tasks.splice(taskIndex, 1, task);
    else tasks.push(task);
  });
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
