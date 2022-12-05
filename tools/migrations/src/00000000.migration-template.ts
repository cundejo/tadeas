/**
 * This is just a template with a small example of code bringing all the lists collection
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
