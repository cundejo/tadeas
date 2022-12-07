import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

const SERVICE_ACCOUNT_OBJECT = {
  type: process.env.SERVICE_ACCOUNT_TYPE,
  project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
  client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
};

const ALLOWED_ORIGINS = [
  'https://tadeas.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5001',
  'http://192.168.0.20:3000',
];

const SENDINGBLUE_API_KEY = process.env.SENDINGBLUE_API_KEY;

// The Firebase Admin SDK to access Firestore.
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT_OBJECT as any),
});

export { admin, ALLOWED_ORIGINS, SENDINGBLUE_API_KEY };
