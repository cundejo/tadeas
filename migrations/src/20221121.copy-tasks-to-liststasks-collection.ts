/**
 * For better separation of concern, we want to move the tasks for a new collection `listsTasks`,
 * and leave `lists` collection with the list attributes only.
 *
 * This is the structure if the `listsTask` collection
 * listsTask (collection)
 *    ⏐
 *    ├ LIST_ID (id)
 *          ⏐
 *          ├ tasks: Task[]
 *          ├ tasksCompleted: Task[]
 */

import { admin } from './config';

const collectionRef = admin.firestore().collection('lists');

const getLists = async () => {
  const snapshot = await collectionRef.get();
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
};

const run = async () => {
  const lists = await getLists();
  console.log('lists', lists);
};

(async () => {
  run();
})();
