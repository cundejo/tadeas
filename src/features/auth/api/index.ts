import {
  auth,
  FunctionResponseBody,
  generateAuthCode as functionGenerateAuthCode,
  validateAuthCode as functionValidateAuthCode,
} from '@/common';
import { signInWithCustomToken, signOut, User } from 'firebase/auth';

export const generateAuthCode = async (email: string): Promise<FunctionResponseBody> => functionGenerateAuthCode(email);

export const validateAuthCode = async (email: string, code: string): Promise<FunctionResponseBody> =>
  functionValidateAuthCode(email, code);

export const signIn = async (authToken: string): Promise<User> => {
  const userCredential = await signInWithCustomToken(auth, authToken);
  return userCredential.user;
};

export const getUser = (): Promise<User> =>
  new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) resolve(user);
      reject(new Error('User not found.'));
    });
  });

export const getUserAuthToken = async (): Promise<string> => {
  const user = await getUser();
  return user.getIdToken();
};

export const signOff = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};
