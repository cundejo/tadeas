import { onRequest } from '../../utils';
import { getAuthCode, saveAuthCode } from './auth.service';
import {
  AuthCode,
  GenerateAuthCodeBody,
  generateAuthCodeBody,
  validateAuthCodeBody,
  ValidateAuthCodeBody,
} from './auth.types';
import { admin } from '../../config';

/**
 * AUTH PROCESS
 *
 * 1. generateAuthCode
 *    - Receives an email as parameter
 *    - Generates a random six-digit code
 *    - Save the code and the email in the DB (collection authCodes).
 *        object should look like:
 *        {
 *          email: "johndoe@example.com",
 *          authCode: "123456",
 *          authAttempts: 0
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
  generateAuthCodeBody.parse(req.body);

  const { email } = req.body as GenerateAuthCodeBody;
  const code = generateSixDigitNumber();
  // Send Email with the code
  await saveAuthCode(email, code);
  res.send({ code: 'AUTH_CODE_GENERATED' });
});

export const validateAuthCode = onRequest(async (req, res) => {
  validateAuthCodeBody.parse(req.body);

  const { code, email } = req.body as ValidateAuthCodeBody;
  const codeObject = await getAuthCode(email);
  if (isValidCode(code, codeObject)) {
    console.log('Code Valid');
    admin
      .auth()
      .createCustomToken(email)
      .then((customToken) => {
        res.send({ code: 'AUTH_SUCCESSFUL', data: customToken });
      })
      .catch((error) => {
        console.log('Error creating custom token:', error);
      });
  }

  // const code = generateSixDigitNumber();
  // // Send Email with the code
  // await saveAuthCode(email, code);
  res.status(500).send({ code: 'AUTH_FAILED', data: 'Authentication code incorrect' });
});

const generateSixDigitNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const isValidCode = (code: string, codeObject: AuthCode): boolean => codeObject.code === code;
