import { admin } from './config';
import { find } from 'lodash';

const collectionListsRef = admin.firestore().collection('lists');
const collectionListsTasksRef = admin.firestore().collection('listsTasks');

const getLists = async () => {
  const snapshot = await collectionListsRef.get();
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
};

const getListsTasks = async () => {
  const snapshot = await collectionListsTasksRef.get();
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
};

const run = async () => {
  const lists = await getLists();
  const listsTasks = await getListsTasks();

  // Checking that all lists have their correspondent lists tasks
  lists.forEach((list) => {
    if (!find(listsTasks, { id: list.id })) {
      console.log(`List ${list.id} doesn't have list tasks`);
    }
  });
};

(async () => {
  run();
})();
