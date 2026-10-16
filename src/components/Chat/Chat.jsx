import Sender from '@/components/Sender';
import Notifications from '@/components/Notifications';
import { useNotifications } from '@/contexts/Notifications';
import { useAuth } from '@/contexts/Auth';

import styles from './Chat.module.css';

export default function Chat() {
  const { notifications, setNotifications, startReceivingNotifications } = useNotifications();
  const { apiUrl, phoneNumber, idInstance, apiTokenInstance } = useAuth();

  let notify = notifications.filter((notify) => notify.receiptId).at(-1);

  async function sendMessage(message) {
    try {
      setNotifications((notifies) => [...notifies, message]);

      // Send Message
      let response = await fetch(`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: `${phoneNumber}`,
          message: message.body.messageData.textMessageData.textMessage,
        }),
      });

      let data = await response.json();

      if (data.statusCode === 400) {
        throw new Error(data.message);
      }

      // Delete Notification
      if (!notify?.processed) {
        response = await fetch(`${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${notify.receiptId}`, {
          method: 'DELETE',
        });

        data = await response.json();

        if (!data.result) {
          throw new Error(data.message);
        }
      }

      notify.processed = true;

      // Start Receiving Notifications
      startReceivingNotifications();
    } catch(err) {
      // 
    }
  }

  return (
    <div className={styles.chat}>
      <Notifications items={notifications} />
      <Sender onSend={sendMessage} />
    </div>
  );
}