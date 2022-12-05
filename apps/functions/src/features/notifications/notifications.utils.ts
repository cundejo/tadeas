import { sendEmail } from '../../libs';

export const sendNotificationEmail = async (email: string, listName: string, listOwner: string) => {
  const subject = `A list was shared with you in Tadeas`;
  const content = `
  <div>
    <p>Hello,</p>
    <p>The user ${listOwner} shared with you the to-do list <strong>${listName}</strong> in Tadeas.</p>
    <p>To get started, just go to <a href="https://tadeas.app" title="Visit Tadeas App">Tadeas</a> and log in or create an account.</p>
    <br/>
    <p>Tadeas is a free, simple to-do list app to organize your day and share tasks with others.</p>
    <br/>
    <p>Enjoy,</p>
    <p>Your Tadeas Team</p>
  </div>
  `;

  return sendEmail(email, subject, content);
};
