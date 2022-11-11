import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
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

export const getList = async (id: string): Promise<List> => {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error(`Listing with id ${id} not found`);
  return fromFirestore({ id: docSnap.id, ...(docSnap.data() as ListDocument) });
};

export const getListListener = (listId: string, onListReceived: (list: List) => void): Unsubscribe => {
  return onSnapshot(
    doc(db, COLLECTION, listId),
    (doc) => {
      // If the listener is active for a list that is being deleted, do not follow up.
      if (!doc.exists()) return;
      const list = fromFirestore({ id: doc.id, ...(doc.data() as ListDocument) });
      onListReceived(list);
    },
    (e) => console.error(e)
  );
};

/**
 * Update or Insert a list.
 */
export const upsertList = async (list: List): Promise<List> => {
  try {
    await setDoc(doc(db, COLLECTION, list.id), toFirestore(list));
    return list;
  } catch (e) {
    console.error(e);
    return {} as List;
  }
};

export const renameList = async (listId: string, name: string): Promise<List> => {
  try {
    await updateDoc(doc(db, COLLECTION, listId), { name });
    return getList(listId);
  } catch (e) {
    console.error(e);
    return {} as List;
  }
};

export const deleteList = async (list: List): Promise<List> => {
  try {
    await deleteDoc(doc(db, COLLECTION, list.id));
    return list;
  } catch (e) {
    console.error(e);
    return {} as List;
  }
};

export const getListsByUser = async (userEmail: string): Promise<List[]> => {
  const q = query(collection(db, COLLECTION), where('owner', '==', userEmail));
  let querySnapshot = await getDocs(q);

  // Every user should have a default list, so we create it here if the user hasn't any list.
  if (querySnapshot.empty) {
    await createDefaultUserList(userEmail);
    querySnapshot = await getDocs(q);
  }

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

const createDefaultUserList = async (userEmail: string): Promise<void> => {
  const newList: List = {
    id: nanoid(),
    isDefault: true,
    name: 'My List',
    owner: userEmail,
    sharedWith: [],
    tasks: [],
  };
  await upsertList(newList);
};
