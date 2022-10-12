import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import * as environment from './environment';
import { DateISOString } from '../types';

const firebaseConfig = {
  apiKey: environment.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: environment.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: environment.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: environment.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const dateToFirestore = (date?: DateISOString): Timestamp | undefined => {
  if (!date) return undefined;
  return Timestamp.fromDate(new Date(date));
};