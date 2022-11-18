import * as admin from 'firebase-admin';
import { serviceAccountObject } from './service-account-object';

// The Firebase Admin SDK to access Firestore.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject as any),
});

export { admin };
