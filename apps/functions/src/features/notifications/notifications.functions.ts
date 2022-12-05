import { onRequest, send } from '../../utils';
import { notifySharedListBody } from './notifications.types';
import { getList } from '../lists/lists.service';
import { sendNotificationEmail } from './notifications.utils';

export const notifySharedList = onRequest(async (req, res) => {
  try {
    const { listId, email } = notifySharedListBody.parse(req.body);

    const list = await getList(listId);
    if (list.owner !== req.user.email) throw new Error(`You don't have access to share the list ${list.name}`);

    const emailSent = await sendNotificationEmail(email, list.name, list.owner);
    if (!emailSent) throw new Error(`Error sending notification to ${email} about the shared list.`);

    send(res, 'NOTIFICATION_SUCCESS', `${email} was notified`);
  } catch (e: any) {
    send(res, 'NOTIFICATION_ERROR', e.message);
  }
});
