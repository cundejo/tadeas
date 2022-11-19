import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { ALLOWED_ORIGINS } from '../config';

const isAllowedOrigin = (req: any): boolean => ALLOWED_ORIGINS.indexOf(req.header('Origin')) !== -1;

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
      console.log('pre-flight request');
      // Allowing all CORS in complex requests like pre-flight, https://www.npmjs.com/package/cors#enabling-cors-pre-flight
      cors({ origin: true })(req, res, () => null);
    } else {
      console.log('common request');
      cors(corsOptionsDelegate)(req, res, async () => {
        if (isAllowedOrigin(req)) await code(req, res);
        else {
          console.log('Request cancelled, origin denied');
          res.send();
        }
      });
    }
  });
