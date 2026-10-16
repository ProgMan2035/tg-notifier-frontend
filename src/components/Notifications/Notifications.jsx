import Message from '@/components/Message';
import styles from './Notifications.module.css';
import { useEffect, useRef } from 'react';

export default function Notifications({ items }) {
  const notificationInner = useRef(null);

  function onEnterHandler(event) {
    if (event.key === 'Enter' && notificationInner.current.scrollHeight > notificationInner.current.offsetHeight) {
      notificationInner.current.scrollTo(0, notificationInner.current.scrollHeight);
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', onEnterHandler);

    return () => {
      document.removeEventListener('keypress', onEnterHandler);
    };
  }, [])

  return (
    <div className={styles.notifications}>
      <div className={styles['notifications-inner']} ref={notificationInner}>
        {items.map((item, i) => (
          <Message key={i} item={item} />
        ))}
      </div>
    </div>    
  );
}
