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

import { compact, filter, isEmpty } from 'lodash';
import { admin } from './config';
import { ListTasksDocument, TaskDocument } from '../../src/features/task';

type OldListDocument = {
  name: string;
  owner: string;
  sharedWith: string[];
  isDefault?: boolean;
  tasks: TaskDocument[];
};

const listsCollectionRef = admin.firestore().collection('lists');
const listsTasksCollectionRef = admin.firestore().collection('listsTasks');

const getLists = async () => {
  const snapshot = await listsCollectionRef.get();
  return snapshot.docs.map((document) => ({ id: document.id, ...(document.data() as OldListDocument) }));
};

const isListsTasksCollectionEmpty = async () => {
  const snapshot = await listsTasksCollectionRef.get();
  if (snapshot.empty) return true;
  throw new Error('Please, clean listsTasks collection first.');
};

const createListsTasks = (lists: (OldListDocument & { id: string })[]) => {
  return compact(
    lists.map((list) => {
      const listTask: ListTasksDocument & { id: string } = {
        id: list.id,
        tasks: filter(list.tasks, (t) => !t.completedAt),
        tasksCompleted: filter(list.tasks, (t) => !!t.completedAt && !isEmpty(t.title)),
      };
      return listTask;
    })
  );
};

const saveListsTasks = async (listsTasks: (ListTasksDocument & { id: string })[]) => {
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
