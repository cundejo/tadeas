import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db, removeUndefined } from '@/common';
import { List, ListDocument } from '@/features/list';
import { orderBy } from 'lodash';
import { nanoid } from 'nanoid';

const COLLECTION = 'lists';

export const fromFirestore = (list: ListDocument & { id: string }): List => {
  // @ts-ignore TODO remove "tasks" from here after completed migration to listsTasks
  const { tasks, ...unchanged } = list;
  return {
    ...unchanged,
  };
};

export const toFirestore = (list: List): ListDocument => {
  // @ts-ignore TODO remove "tasks" from here after completed migration to listsTasks
  const { id, tasks, ...unchanged } = list;

  return removeUndefined({
    ...unchanged,
  } as ListDocument);
};

export const getList = async (id: string): Promise<List> => {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error(`Listing with id ${id} not found`);
  return fromFirestore({ id: docSnap.id, ...(docSnap.data() as ListDocument) });
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
    await createDefaultUserLists(userEmail);
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

const createDefaultUserLists = async (userEmail: string): Promise<void> => {
  const newTodoList: List = {
    id: nanoid(),
    isDefault: true,
    name: '✅ To Do',
    owner: userEmail,
    sharedWith: [],
  };
  const newGroceriesList: List = {
    id: nanoid(),
    isDefault: false,
    name: '🛍️ Groceries',
    owner: userEmail,
    sharedWith: [],
  };
  await Promise.all([upsertList(newTodoList), upsertList(newGroceriesList)]);
};
