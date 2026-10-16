import Input from '@/components/common/Input';
import styles from './Sender.module.css';

export default function Sender({ onSend }) {
  function schemaOfMessage(textMessage) {
    return {
      body: {
        messageData: {
          textMessageData: {
            textMessage,
          },
        },
      },
    };
  }

  function onKeyPressHandler(event) {
    if (event.key === 'Enter') {
      onSend(schemaOfMessage(event.target.value));

      event.target.value = '';
    }
  }

  return (
    <label className={styles.sender}>
      <Input variant="surface" placeholder="Message" onKeyPress={onKeyPressHandler} />
    </label>
  );
}