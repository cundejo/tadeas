import { admin } from '../../config';
import { AuthCode, AuthCodeDocument } from './auth.types';

const collectionRef = admin.firestore().collection('authCodes');

export const saveAuthCode = async (email: string, code: string): Promise<void> => {
  await collectionRef.doc(email).set({ code, attempts: 3 });
};

export const getAuthCode = async (email: string): Promise<AuthCode> => {
  const doc = await collectionRef.doc(email).get();
  if (!doc.exists) throw new Error(`There is no auth code for email ${email}`);
  return { email, ...(doc.data() as AuthCodeDocument) };
};
