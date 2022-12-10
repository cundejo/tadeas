import { Task, TaskDocument } from '@tadeas/types';
import { dateToFirestore, removeUndefined } from './utils';

const DEFAULT_DATE = '1970-01-01';

export const taskFromFirestore = (taskDocument: TaskDocument): Task => {
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

export const taskToFirestore = (task: Task): TaskDocument => {
  const { createdAt, completedAt, ...unchanged } = task;

  return removeUndefined({
    ...unchanged,
    createdAt: dateToFirestore(createdAt),
    completedAt: dateToFirestore(completedAt),
  } as TaskDocument);
};
