import { admin } from '../../config';
import { removeUndefined } from '../../utils';
import { List, ListDocument } from './lists.types';

const collectionRef = admin.firestore().collection('lists');

export const getList = async (id: string): Promise<List> => {
  const doc = await collectionRef.doc(id).get();
  if (!doc.exists) throw new Error(`There is no list with id ${id}`);
  return fromFirestore({ id: doc.id, ...(doc.data() as ListDocument) });
};

// TODO fromFirestore should be in a core package
const fromFirestore = (list: ListDocument & { id: string }): List => {
  const { ...unchanged } = list;
  return {
    ...unchanged,
  };
};

// TODO toFirestore should be in a core package
const toFirestore = (list: List): ListDocument => {
  const { id, ...unchanged } = list;
  return removeUndefined({
    ...unchanged,
  } as ListDocument);
};
