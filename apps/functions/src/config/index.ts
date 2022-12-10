import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

const SERVICE_ACCOUNT_OBJECT = JSON.parse(process.env.GCP_SA_KEY ?? '{}');

const ALLOWED_ORIGINS = [
  'https://tadeas.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5001',
  'http://192.168.0.20:3000',
];

const SENDINGBLUE_API_KEY = process.env.SENDINGBLUE_API_KEY;

// The Firebase Admin SDK to access Firestore. Initialize without connection when testing.
if (process.env.NODE_ENV === 'test') {
  admin.initializeApp({});
} else {
  admin.initializeApp({ credential: admin.credential.cert(SERVICE_ACCOUNT_OBJECT as any) });
}

export { admin, ALLOWED_ORIGINS, SENDINGBLUE_API_KEY };
