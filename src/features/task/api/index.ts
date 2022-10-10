import { collection, getDocs, query } from 'firebase/firestore';
import { Task, TaskDocument } from '@/features/task';
import { db } from '@/features/common';

const COLLECTION = 'tasks';
const DEFAULT_DATE = '1970-01-01';

export function presentTask(taskDocument: TaskDocument & { id: string }): Task {
  const { createdAt, ...unchanged } = taskDocument;

  const createdAtIso = createdAt?.toDate().toISOString() ?? new Date(DEFAULT_DATE).toISOString();

  return {
    ...unchanged,
    createdAt: createdAtIso,
  };
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const q = query(collection(db, COLLECTION));

    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as TaskDocument) }));
    return tasks.map(presentTask);
  } catch (e) {
    console.log('ERROR', e);
    return [];
  }
};
