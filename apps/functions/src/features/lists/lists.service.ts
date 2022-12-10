import { List, ListDocument } from '@tadeas/types';
import { listFromFirestore } from '@tadeas/firestore-converters';
import { admin } from '@/config';

const collectionRef = admin.firestore().collection('lists');

export const getList = async (id: string): Promise<List> => {
  const doc = await collectionRef.doc(id).get();
  if (!doc.exists) throw new Error(`There is no list with id ${id}`);
  return listFromFirestore({ id: doc.id, ...(doc.data() as ListDocument) });
};
