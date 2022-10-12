import { collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, Unsubscribe } from 'firebase/firestore';
import { Task, TaskDocument } from '@/features/task';
import { dateToFirestore, db, removeUndefined } from '@/features/common';

const COLLECTION = 'tasks';
const DEFAULT_DATE = '1970-01-01';

function fromFirestore(taskDocument: TaskDocument & { id: string }): Task {
  const { createdAt, ...unchanged } = taskDocument;

  const createdAtIso = createdAt?.toDate().toISOString() ?? new Date(DEFAULT_DATE).toISOString();

  return {
    ...unchanged,
    createdAt: createdAtIso,
  };
}

function toFirestore<T>(task: Task): TaskDocument {
  const { id, createdAt, ...unchanged } = task;

  return removeUndefined({
    ...unchanged,
    createdAt: dateToFirestore(createdAt),
  } as TaskDocument);
}

export const getTask = async (taskId: string): Promise<Task> => {
  const docRef = doc(db, COLLECTION, taskId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error(`Task with id ${taskId} doesn't exist`);
  return fromFirestore({ id: taskId, ...(docSnap.data() as TaskDocument) });
};

export const getTasksListener = (onTasksReceived: (tasks: Task[]) => void): Unsubscribe => {
  return onSnapshot(
    query(collection(db, COLLECTION), orderBy('createdAt', 'desc')),
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => fromFirestore({ id: doc.id, ...(doc.data() as TaskDocument) }));
      onTasksReceived(tasks);
    },
    (e) => {
      console.log('ERROR', e);
    }
  );
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    await setDoc(doc(db, COLLECTION, task.id), toFirestore(task));
    return getTask(task.id);
  } catch (e) {
    console.log('ERROR', e);
    return {} as Task;
  }
};

export const taskHasChanges = (prevTaskData: Task, newTaskData: Task): boolean => {
  if (prevTaskData.id !== newTaskData.id)
    throw new Error(`Comparing 2 different tasks, Prev Task Id: ${prevTaskData.id}, New Task Id: ${newTaskData.id}`);
  return prevTaskData.title !== newTaskData.title || prevTaskData.details !== newTaskData.details;
};
