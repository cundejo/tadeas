import { auth, NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH } from '@/common';
import { signInWithCustomToken, signOut, User } from 'firebase/auth';
import axios from 'axios';
import { z } from 'zod';

const functionResponseBody = z.object({
  code: z.string(),
  data: z.string(),
});

type FunctionResponseBody = z.infer<typeof functionResponseBody>;

export const generateAuthCode = async (email: string): Promise<FunctionResponseBody> => {
  const response = await axios.post(`${NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH}/generateAuthCode`, { email });
  return functionResponseBody.parse(response.data);
};

export const validateAuthCode = async (email: string, code: string): Promise<FunctionResponseBody> => {
  const response = await axios.post(`${NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH}/validateAuthCode`, { email, code });
  return functionResponseBody.parse(response.data);
};

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

export const signOff = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};
