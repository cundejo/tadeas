import { admin } from '../../config';
import { onRequest, send } from '../../utils';
import { AuthCode, generateAuthCodeBody, validateAuthCodeBody } from './auth.types';
import {
  decreaseAuthCodeAttempt,
  deleteAuthCode,
  getAuthCode,
  saveAuthCode,
  validateUserExistence,
} from './auth.service';

/**
 * AUTH PROCESS
 *
 * 1. generateAuthCode
 *    - Receives an email as parameter
 *    - Generates a random six-digit code
 *    - Save the code and the email in the DB (collection authCodes).
 *        object should look like:
 *        "johndoe@example.com": {
 *          code: "123456",
 *          attempts: 3
 *        }
 *    - If there is another code already generated for this client (resend several emails without login with any of it),
 *      remove it
 *    - The client need to transition to a page to enter the code, the email needs to be saved to send it in the step 2
 *
 * 2. validateAuthCode
 *    - Receives client email and code he entered
 *    - Verify against the code we have in DB
 *    - 2.1. If the code is correct, generate an auth token and send it to the client
 *    - 2.2. If the code is incorrect,
 *         - 2.2.1. If authAttempts < 2, update authAttempts and send an error to the client with the amount of attempts left.
 *         - 2.2.2. If authAttempts >= 2 return another error to the client and delete the entry in the DB
 *
 * 2.1. Following
 *    - Frontend receives the token and log in the client
 *    - Clean the email from wherever is saved
 *
 * 2.2.1 Following
 *    - Frontend should restart the form and show the error, along with the attempts left.
 *
 * 2.2.2 Following
 *    - Frontend should redirect the client back to the login page and show the error in a toast.
 *    - Clean the email from wherever is saved
 */

export const generateAuthCode = onRequest(async (req, res) => {
  try {
    const { email } = generateAuthCodeBody.parse(req.body);
    const code = generateSixDigitNumber();
    // ToDo Send Email with the code
    await saveAuthCode(email, code);
    send(res, 'AUTH_CODE_GENERATED', 'true');
  } catch (e: any) {
    send(res, 'AUTH_CODE_ERROR', e.message);
  }
});

export const validateAuthCode = onRequest(async (req, res) => {
  try {
    const { code, email } = validateAuthCodeBody.parse(req.body);
    const codeObject = await getAuthCode(email);
    if (isValidCode(code, codeObject)) {
      const userRecord = await validateUserExistence(email);
      if (!userRecord) throw new Error('Error getting user record');
      const authToken = await admin.auth().createCustomToken(userRecord.uid);
      await deleteAuthCode(email);
      send(res, 'AUTH_VALIDATION_SUCCESSFUL', authToken);
    } else {
      const attempts = await decreaseAuthCodeAttempt(email);
      // After 3 attempts failed, delete the auth code and raise an error to send failed auth.
      if (attempts === 0) {
        await deleteAuthCode(email);
        throw new Error('Authentication failed');
      }
      const message = `Incorrect code, try again.`;
      send(res, 'AUTH_VALIDATION_FAILED', message);
    }
  } catch (e: any) {
    console.error(e);
    send(res, 'AUTH_VALIDATION_ERROR', e.message);
  }
});

const generateSixDigitNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const isValidCode = (code: string, codeObject: AuthCode): boolean => codeObject.code === code;
