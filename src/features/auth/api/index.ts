import {
  auth,
  LOCAL_STORAGE_EMAIL_FOR_SIGNING,
  NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH,
  removeLocalStorage,
  setLocalStorage,
} from '@/features/common';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signOut, User } from 'firebase/auth';
import axios from 'axios';

export const generateAuthCode = async (email: string): Promise<any> => {
  const response = await axios.post(`${NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH}/generateAuthCode`, { email });
  console.log('response.data', response.data);
  return response.data;
};

export const getUser = (): Promise<User> =>
  new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) resolve(user);
      reject(new Error('User not found.'));
    });
  });

// Documentation: https://firebase.google.com/docs/auth/web/email-link-auth
export const sendAuthLinkToUserEmail = async (email: string): Promise<void> => {
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/signing?redirectTo=${window.location.origin}`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    setLocalStorage(LOCAL_STORAGE_EMAIL_FOR_SIGNING, email);
  } catch (e) {
    console.error(e);
  }
};

export const signIn = async (email: string): Promise<string> => {
  try {
    const currentUrl = window.location.href;
    if (isSignInWithEmailLink(auth, currentUrl)) {
      await signInWithEmailLink(auth, email, currentUrl);
      removeLocalStorage(LOCAL_STORAGE_EMAIL_FOR_SIGNING);
      const url = new URL(currentUrl);
      return url.searchParams.get('redirectTo') ?? '/';
    }
    return '/';
  } catch (e) {
    console.error(e);
    return '/';
  }
};

export const signOff = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};
