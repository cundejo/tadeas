import { isUndefined, negate, pickBy } from 'lodash';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;
import { admin, ALLOWED_ORIGINS } from '../config';

export type Request = functions.https.Request;
export type RequestSecure = functions.https.Request & { user: DecodedIdToken };
export type Response<T> = functions.Response<T>;
export type Func = (req: Request, res: Response<any>) => Promise<void>;
export type FuncSecure = (req: RequestSecure, res: Response<any>) => Promise<void>;

// Response helpers
export const send = (res: Response<any>, code: string, data: string) => res.send({ code, data });

export const onRequest = (func: FuncSecure) =>
  functions.https.onRequest((req, res) => {
    corsHandle(req, res, async () => verifyAuthorization(req, res, func));
  });

export const onInsecureRequest = (func: Func) =>
  functions.https.onRequest((req, res) => {
    corsHandle(req, res, func);
  });

// Handling CORS for every request is needed
const corsHandle = (req: Request, res: Response<any>, func: any) => {
  if (req.method === 'OPTIONS') {
    // Allowing CORS in complex requests like pre-flight, https://www.npmjs.com/package/cors#enabling-cors-pre-flight
    cors({ origin: true })(req, res, () => null);
  } else {
    cors(corsOptionsDelegate)(req, res, async () => {
      if (isAllowedOrigin(req)) {
        await func(req, res);
      } else {
        console.log('Request cancelled, origin denied');
        res.status(404).send();
      }
    });
  }
};

const isAllowedOrigin = (req: any): boolean => {
  const origin = req.header('Origin');
  if (!origin) return true;
  return ALLOWED_ORIGINS.indexOf(origin) !== -1;
};

const corsOptionsDelegate = (req: any, callback: any) => {
  callback(null, { origin: isAllowedOrigin(req) });
};

export const getAuthorizationToken = (req: Request): string => {
  if (req?.headers?.authorization) return req?.headers?.authorization;
  throw new Error('Unauthorized');
};

// Checking token and if is valid, include user object in the request.
const verifyAuthorization = async (req: Request, res: Response<any>, func: FuncSecure) => {
  try {
    const token = getAuthorizationToken(req);
    const user = await admin.auth().verifyIdToken(token);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = user;
    await func(req as RequestSecure, res);
  } catch (e: any) {
    res.status(401).send({ code: 'AUTHORIZATION_ERROR', data: e.message });
  }
};

// Remove undefined props from an object
export function removeUndefined<T extends object>(obj: T): T {
  return pickBy(obj, negate(isUndefined)!) as T;
}
