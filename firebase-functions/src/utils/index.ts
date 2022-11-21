import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { ALLOWED_ORIGINS } from '../config';

const isAllowedOrigin = (req: any): boolean => {
  const origin = req.header('Origin');
  if (!origin) return true;
  return ALLOWED_ORIGINS.indexOf(origin) !== -1;
};

const corsOptionsDelegate = (req: any, callback: any) => {
  callback(null, { origin: isAllowedOrigin(req) });
};

/**
 * Currying functions.https.Request with CORS
 * @param {function} code
 * @return {function} functions.https.Request
 */
export const onRequest = (code: (req: functions.https.Request, res: functions.Response<any>) => Promise<void>) =>
  functions.https.onRequest((req, res) => {
    if (req.method === 'OPTIONS') {
      // Allowing CORS in complex requests like pre-flight, https://www.npmjs.com/package/cors#enabling-cors-pre-flight
      cors({ origin: true })(req, res, () => null);
    } else {
      cors(corsOptionsDelegate)(req, res, async () => {
        if (isAllowedOrigin(req)) await code(req, res);
        else {
          console.log('Request cancelled, origin denied');
          res.status(404).send();
        }
      });
    }
  });

// Response helpers
export const send = (res: functions.Response, code: string, data: string) => res.send({ code, data });
