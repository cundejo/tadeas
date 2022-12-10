import { orderBy } from 'lodash';
import { nanoid } from 'nanoid';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { List, ListDocument } from '@tadeas/types';
import { db } from '@/common';
import { upsertListTasks } from '@/features/task';
import { listFromFirestore, listToFirestore } from '@tadeas/firestore-converters';

const COLLECTION = 'lists';

export const getList = async (id: string): Promise<List> => {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error(`List with id ${id} not found`);
  return listFromFirestore({ id: docSnap.id, ...(docSnap.data() as ListDocument) });
};

/**
 * Update or Insert a list.
 */
export const upsertList = async (list: List): Promise<List> => {
  try {
    await setDoc(doc(db, COLLECTION, list.id), listToFirestore(list));
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

export const deleteList = async (listId: string): Promise<string> => {
  try {
    await deleteDoc(doc(db, COLLECTION, listId));
  } catch (e) {
    console.error(e);
  }
  return listId;
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
    querySnapshot.docs.map((doc) => listFromFirestore({ id: doc.id, ...(doc.data() as ListDocument) })),
    ['name']
  );
};

export const getSharedListsByUser = async (userEmail: string): Promise<List[]> => {
  const q = query(collection(db, COLLECTION), where('sharedWith', 'array-contains', userEmail));
  const querySnapshot = await getDocs(q);
  return orderBy(
    querySnapshot.docs.map((doc) => listFromFirestore({ id: doc.id, ...(doc.data() as ListDocument) })),
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
    name: '🛍️ Groceries',
    owner: userEmail,
    sharedWith: [],
  };

  // Create the default lists and the correspondent lists tasks
  await Promise.all([
    upsertList(newTodoList),
    upsertList(newGroceriesList),
    upsertListTasks({ id: newTodoList.id, tasks: [], tasksCompleted: [] }),
    upsertListTasks({ id: newGroceriesList.id, tasks: [], tasksCompleted: [] }),
  ]);
};
