/**
 * For better separation of concern, we want to move the tasks for a new collection `listsTasks`,
 * and leave `lists` collection with the list attributes only.
 *
 * This is the structure if the `listsTasks` collection
 * listsTasks (collection)
 *    ⏐
 *    ├ LIST_ID (id)
 *          ⏐
 *          ├ tasks: Task[]
 *          ├ tasksCompleted: Task[]
 */

import { admin } from './config';
import { ListDocument } from '../../src/features/list';
import { TaskDocument } from '../../src/features/task';

// TODO move to frontend
type ListTaskDocument = {
  tasks: TaskDocument[];
  tasksCompleted: TaskDocument[];
};

const listsCollectionRef = admin.firestore().collection('lists');
const listsTasksCollectionRef = admin.firestore().collection('listsTasks');

const getLists = async () => {
  const snapshot = await listsCollectionRef.get();
  return snapshot.docs.map((document) => ({ id: document.id, ...(document.data() as ListDocument) }));
};

const isListsTasksCollectionEmpty = async () => {
  const snapshot = await listsTasksCollectionRef.get();
  if (snapshot.empty) return true;
  throw new Error('Please, clean listsTasks collection first.');
};

const createListsTasks = (lists: (ListDocument & { id: string })[]) => {
  return lists.map((list) => {
    const listTask: ListTaskDocument & { id: string } = {
      id: list.id,
      tasks: list.tasks.filter((t) => !t.completedAt),
      tasksCompleted: list.tasks.filter((t) => !!t.completedAt),
    };
    return listTask;
  });
};

const saveListsTasks = async (listsTasks: (ListTaskDocument & { id: string })[]) => {
  const batch = admin.firestore().batch();
  listsTasks.forEach((listTask) => {
    const { id, tasks, tasksCompleted } = listTask;
    const docRef = listsTasksCollectionRef.doc(id);
    batch.set(docRef, { tasks, tasksCompleted });
  });
  return batch.commit();
};

const run = async () => {
  // Check if listsTask is empty, if it's not empty stop with an exception
  await isListsTasksCollectionEmpty();

  // Get all lists
  const lists = await getLists();

  // Create list task documents
  const listsTasks = createListsTasks(lists);

  // Save in batch the lists task documents
  const result = await saveListsTasks(listsTasks);
  console.log('result', result);
};

(async () => {
  run();
})();
