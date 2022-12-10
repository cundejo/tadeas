import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { DateISOString } from '@tadeas/types';
import * as environment from './environment';

const app = initializeApp(environment.NEXT_PUBLIC_FIREBASE_CONFIG);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

export const dateToFirestore = (date?: DateISOString): Timestamp | undefined => {
  if (!date) return undefined;
  return Timestamp.fromDate(new Date(date));
};
