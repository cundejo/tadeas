import { admin } from '../../config';

const collectionRef = admin.firestore().collection('lists');

export const saveAuthCode = async (email: string, code: string): Promise<void> => {
  await collectionRef.doc(email).set({ code, attempts: 3 });
};
