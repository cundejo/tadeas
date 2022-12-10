import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { SENDINGBLUE_API_KEY } from '@/config';
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = SENDINGBLUE_API_KEY;

export const sendEmail = async (email: string, subject: string, htmlContent: string): Promise<boolean> => {
  try {
    // eslint-disable-next-line new-cap
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      subject,
      sender: { email: 'noreply@tadeas.app', name: 'Tadeas' },
      to: [{ email }],
      htmlContent,
    });

    return true;
  } catch (error: any) {
    console.error('Error on sendEmail', error);
    return false;
  }
};
