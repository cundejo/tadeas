import { collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, Unsubscribe, where } from 'firebase/firestore';
import { fromFirestore as taskFromFirestore, toFirestore as taskToFirestore } from '@/features/task';
import { db, removeUndefined } from '@/features/common';
import { List, ListDocument } from '@/features/list';
import { orderBy } from 'lodash';
import { nanoid } from 'nanoid';

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

export const deleteList = async (list: List): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION, list.id));
  } catch (e) {
    console.log('ERROR', e);
  }
};

export const getListsByUser = async (userEmail: string): Promise<List[]> => {
  const q = query(collection(db, COLLECTION), where('owner', '==', userEmail));
  const querySnapshot = await getDocs(q);
  return orderBy(
    querySnapshot.docs.map((doc) => fromFirestore({ id: doc.id, ...(doc.data() as ListDocument) })),
    ['name']
  );
};

export const getSharedListsByUser = async (userEmail: string): Promise<List[]> => {
  const q = query(collection(db, COLLECTION), where('sharedWith', 'array-contains', userEmail));
  const querySnapshot = await getDocs(q);
  return orderBy(
    querySnapshot.docs.map((doc) => fromFirestore({ id: doc.id, ...(doc.data() as ListDocument) })),
    ['name']
  );
};

export const createDefaultListForNewUser = async (userEmail: string): Promise<void> => {
  const q = query(collection(db, COLLECTION), where('owner', '==', userEmail));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    const newList: List = {
      id: nanoid(),
      isDefault: true,
      name: 'My List',
      owner: userEmail,
      sharedWith: [],
      tasks: [],
    };
    await upsertList(newList);
  }
};
