import * as admin from 'firebase-admin';
import { SERVICE_ACCOUNT_OBJECT } from './env';

// The Firebase Admin SDK to access Firestore.
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT_OBJECT as any),
});

export { admin };
