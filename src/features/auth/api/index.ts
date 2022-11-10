import { auth } from '@/features/common';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, User, signOut } from 'firebase/auth';

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
    window.localStorage.setItem('emailForSignIn', email);
  } catch (e) {
    console.error(e);
  }
};

export const signIn = async (): Promise<string | undefined> => {
  try {
    const currentUrl = window.location.href;
    if (isSignInWithEmailLink(auth, currentUrl)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation') as string;
      }
      await signInWithEmailLink(auth, email, currentUrl);
      window.localStorage.removeItem('emailForSignIn');
      const url = new URL(currentUrl);
      return url.searchParams.get('redirectTo') ?? '/';
    }
  } catch (e) {
    console.error(e);
  }
};

export const signOff = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};
