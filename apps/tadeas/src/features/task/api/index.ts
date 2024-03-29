import { compact, find, findIndex, forEach, isEmpty } from 'lodash';
import { deleteDoc, doc, onSnapshot, setDoc, Unsubscribe, updateDoc } from 'firebase/firestore';
import { ListTasks, ListTasksDocument, Task } from '@tadeas/types';
import { db } from '@/common';
import { listTasksFromFirestore, listTasksToFirestore } from '@tadeas/firestore-converters';

const COLLECTION = 'listsTasks';

export const getListTasksListener = (listId: string, onListReceived: (listTasks: ListTasks) => void): Unsubscribe => {
  return onSnapshot(
    doc(db, COLLECTION, listId),
    (doc) => {
      // If the listener is active for a list that is being deleted, do not follow up.
      if (!doc.exists()) return;
      const listTasks = listTasksFromFirestore({ id: doc.id, ...(doc.data() as ListTasksDocument) });
      onListReceived(listTasks);
    },
    (e) => console.error(e)
  );
};

/**
 * Update or Insert a listTasks.
 */
export const upsertListTasks = async (listTasks: ListTasks): Promise<ListTasks> => {
  try {
    await setDoc(doc(db, COLLECTION, listTasks.id), listTasksToFirestore(listTasks));
    return listTasks;
  } catch (e) {
    console.error(e);
    return {} as ListTasks;
  }
};

export const deleteListTasks = async (listTasksId: string): Promise<string> => {
  try {
    await deleteDoc(doc(db, COLLECTION, listTasksId));
  } catch (e) {
    console.error(e);
  }
  return listTasksId;
};

/**
 * Update several tasks at once in a list
 */
export const upsertTasks = async (listTasks: ListTasks, tasks: Task[], completedTasks: Task[]): Promise<void> => {
  const updatedTasks = updateTasks(listTasks.tasks, tasks);
  const updatedCompletedTasks = updateTasks(listTasks.tasksCompleted, completedTasks);
  await upsertListTasks({ ...listTasks, tasks: updatedTasks, tasksCompleted: updatedCompletedTasks });
};

export const completeTask = async (taskId: string, listTasks: ListTasks): Promise<void> => {
  const task = find(listTasks.tasks, { id: taskId });
  if (!task) throw new Error(`Task with id ${taskId} doesn't exist`);
  const { tasks, taskDeleted } = removeTask(listTasks.tasks, task);

  // If the task completed doesn't have title, let's not save it in completed
  if (isEmpty(task.title)) {
    await upsertListTasks({ ...listTasks, tasks });
    return;
  }

  taskDeleted.completedAt = new Date().toISOString();
  const updatedCompletedTasks = updateTasks(listTasks.tasksCompleted, [taskDeleted]);
  await upsertListTasks({ ...listTasks, tasks, tasksCompleted: updatedCompletedTasks });
};

export const reactivateTask = async (taskId: string, listTasks: ListTasks): Promise<void> => {
  const task = find(listTasks.tasksCompleted, { id: taskId });
  if (!task) throw new Error(`Task with id ${taskId} doesn't exist in completed tasks`);
  const { tasks, taskDeleted } = removeTask(listTasks.tasksCompleted, task);
  delete taskDeleted.completedAt;
  const updatedTasks = updateTasks(listTasks.tasks, [taskDeleted]);
  await upsertListTasks({ ...listTasks, tasks: updatedTasks, tasksCompleted: tasks });
};

export const taskHasChanges = (prevTaskData: Task, newTaskData: Task): boolean => {
  if (prevTaskData.id !== newTaskData.id)
    throw new Error(`Comparing 2 different tasks, Prev Task Id: ${prevTaskData.id}, New Task Id: ${newTaskData.id}`);
  return prevTaskData.title !== newTaskData.title;
};

export const updateTasks = (oldTasks: Task[], newTasks: Task[]): Task[] => {
  if (isEmpty(newTasks)) return oldTasks;
  const tasks = [...oldTasks];
  forEach(compact(newTasks), (task) => {
    const taskIndex = findIndex(tasks, { id: task.id });
    if (taskIndex >= 0) tasks.splice(taskIndex, 1, task);
    else tasks.push(task);
  });
  return tasks;
};

export const removeTask = (tasks: Task[], task: Task): { tasks: Task[]; taskDeleted: Task } => {
  if (isEmpty(tasks)) return { tasks, taskDeleted: task };
  const newTasks = [...tasks];
  const taskIndex = findIndex(newTasks, { id: task.id });
  if (taskIndex >= 0) newTasks.splice(taskIndex, 1);
  return { tasks: newTasks, taskDeleted: task };
};

export const deleteAllCompletedTasks = async (listTaskId: string): Promise<void> => {
  const docRef = doc(db, COLLECTION, listTaskId);
  await updateDoc(docRef, { tasksCompleted: [] });
};
