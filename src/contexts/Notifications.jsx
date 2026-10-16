import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/Auth.jsx';

const NotificationsContext = createContext();

function NotificationsProvider({ children }) {
  const { apiUrl, idInstance, apiTokenInstance, isAuthorized } = useAuth();
  const [ notifications, setNotifications ] = useState([]);

  async function startReceivingNotifications() {
    try {
      const res = await fetch(`${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`);
      const data = await res.json();

      if (data) {
        setNotifications(notifies => [...notifies, data]);
      } else {
        startReceivingNotifications();
      }
    } catch(err) {
      startReceivingNotifications();
    }
  }

  useEffect(() => {
    if (isAuthorized) {
      startReceivingNotifications();
    }
  }, [isAuthorized]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        startReceivingNotifications,
      }} 
    >
      {children}
    </NotificationsContext.Provider>
  )
}

function useNotifications() {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    throw new Error('Notifications context was used outside the NotificationsProvider');
  }

  return context;
}

export {
  NotificationsProvider,
  useNotifications,
};