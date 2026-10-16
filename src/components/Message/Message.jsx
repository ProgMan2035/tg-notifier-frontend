import styles from './Message.module.css';

export default function Message({ item }) {
  const { messageData, senderData } = item.body;

  return (
    <div className={`${styles.wrapper}${!senderData ? ` ${styles.rtl}` : ''}`}>
      <div className={styles.message}>
        {senderData && <div className={styles.sender}>{senderData.senderName}</div>}
        <div className={styles.text}>
          {messageData.textMessageData.textMessage}
        </div>
      </div>
    </div>
  );
}