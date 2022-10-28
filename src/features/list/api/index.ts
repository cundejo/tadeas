import { doc, onSnapshot, setDoc, Unsubscribe, collection, query, where, getDocs } from 'firebase/firestore';
import { fromFirestore as taskFromFirestore, toFirestore as taskToFirestore } from '@/features/task';
import { db, removeUndefined, stringSort } from '@/features/common';
import { List, ListDocument } from '@/features/list';

const COLLECTION = 'lists';

export const fromFirestore = (list: ListDocument & { id: string }): List => {
  const { tasks, ...unchanged } = list;

  return {
    ...unchanged,
    tasks: tasks.map(taskFromFirestore),
  };
};

export const toFirestore = (list: List): ListDocument => {
  const { id, tasks, ...unchanged } = list;

  return removeUndefined({
    ...unchanged,
    tasks: tasks.map(taskToFirestore),
  } as ListDocument);
};

export const getListListener = (listId: string, onListReceived: (list: List) => void): Unsubscribe => {
  return onSnapshot(
    doc(db, COLLECTION, listId),
    (doc) => {
      const list = fromFirestore({ id: doc.id, ...(doc.data() as ListDocument) });
      onListReceived(list);
    },
    (e) => console.log('ERROR', e)
  );
};

export const upsertList = async (list: List): Promise<void> => {
  try {
    await setDoc(doc(db, COLLECTION, list.id), toFirestore(list));
  } catch (e) {
    console.log('ERROR', e);
  }
};

export const getListsByUser = async (userEmail: string): Promise<List[]> => {
  const q = query(collection(db, COLLECTION), where('owner', '==', userEmail));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => fromFirestore({ id: doc.id, ...(doc.data() as ListDocument) }))
    .sort((...args) => stringSort(...args)('name'));
};
