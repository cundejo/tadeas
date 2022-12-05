import * as admin from 'firebase-admin';
import { SERVICE_ACCOUNT_OBJECT, SENDINGBLUE_API_KEY } from './env';

// The Firebase Admin SDK to access Firestore.
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT_OBJECT as any),
});

const ALLOWED_ORIGINS = [
  'https://tadeas.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5001',
  'http://192.168.0.20:3000',
];

export { admin, ALLOWED_ORIGINS, SENDINGBLUE_API_KEY };