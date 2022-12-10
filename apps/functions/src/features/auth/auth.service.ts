import { v4 as uuidv4 } from 'uuid';
import { UserRecord } from 'firebase-functions/lib/common/providers/identity';
import { admin } from '@/config';
import { AuthCode, AuthCodeDocument } from './auth.types';

const USER_NOT_FOUND = 'auth/user-not-found';

const collectionRef = admin.firestore().collection('authCodes');

export const saveAuthCode = async (email: string, code: string): Promise<void> => {
  await collectionRef.doc(email).set({ code, attempts: 3 });
};

export const getAuthCode = async (email: string): Promise<AuthCode> => {
  const doc = await collectionRef.doc(email).get();
  if (!doc.exists) throw new Error(`There is no auth code for email ${email}`);
  return { email, ...(doc.data() as AuthCodeDocument) };
};

// If the code received from client is incorrect, decrease attempts.
export const decreaseAuthCodeAttempt = async (email: string): Promise<number> => {
  const authCode = await getAuthCode(email);
  await collectionRef.doc(email).update({ attempts: authCode.attempts - 1 });
  return authCode.attempts - 1;
};

export const deleteAuthCode = async (email: string): Promise<string> => {
  await collectionRef.doc(email).delete();
  return email;
};

export const createUser = async (email: string): Promise<UserRecord> => {
  return admin.auth().createUser({ uid: uuidv4(), email, emailVerified: true });
};

// Get user by email, or create it if doesn't exist.
export const validateUserExistence = async (email: string): Promise<UserRecord | undefined> => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error: any) {
    if (error.code === USER_NOT_FOUND) {
      return createUser(email);
    } else {
      console.log('Error', error.code);
      return undefined;
    }
  }
};
