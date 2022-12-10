import { sendEmail } from '@/libs';
import { AuthCode } from './auth.types';

export const sendAuthCodeEmail = async (email: string, code: string) => {
  const subject = 'Sign in to Tadeas';
  const content = `
  <div>
    <p>Hello,</p>
    <p>We received a request to sign in to Tadeas using this email address.</p>
    <p>This is your authentication code: <code>${code}</code></p>
    <br/>
    <p>If you did not request this, you can safely ignore this email.</p>
    <br/>
    <p>Thanks,</p>
    <p>Your Tadeas Team</p>
  </div>
  `;

  return sendEmail(email, subject, content);
};

export const generateSixDigitNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

export const isValidCode = (code: string, codeObject: AuthCode): boolean => codeObject.code === code;
