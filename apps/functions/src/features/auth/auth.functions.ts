import { admin } from '../../config';
import { onInsecureRequest, send } from '../../utils';
import { generateAuthCodeBody, validateAuthCodeBody } from './auth.types';
import {
  decreaseAuthCodeAttempt,
  deleteAuthCode,
  getAuthCode,
  saveAuthCode,
  validateUserExistence,
} from './auth.service';
import { generateSixDigitNumber, isValidCode, sendAuthCodeEmail } from './auth.utils';

export const generateAuthCode = onInsecureRequest(async (req, res) => {
  try {
    const { email } = generateAuthCodeBody.parse(req.body);
    const code = generateSixDigitNumber();
    const emailSent = await sendAuthCodeEmail(email, code);
    if (!emailSent) throw new Error(`Error sending code to your email ${email}, please try again later.`);
    await saveAuthCode(email, code);
    send(res, 'AUTH_CODE_GENERATED', 'true');
  } catch (e: any) {
    send(res, 'AUTH_CODE_ERROR', e.message);
  }
});

export const validateAuthCode = onInsecureRequest(async (req, res) => {
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
