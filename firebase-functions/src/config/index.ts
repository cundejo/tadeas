import * as admin from 'firebase-admin';
import { serviceAccountObject } from './service-account-object';

// The Firebase Admin SDK to access Firestore.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject as any),
});

const ALLOWED_ORIGINS = [
  'https://tadeas.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://192.168.0.20:3000',
];

export { admin, ALLOWED_ORIGINS };
