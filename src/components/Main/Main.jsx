import { useState, useEffect } from 'react';

import Chat from '@/components/Chat';
import Form from '@/components/Form';
import { useAuth } from '@/contexts/Auth';

import styles from './Main.module.css';

export default function Main() {
  const { isAuthorized } = useAuth();

  return (
    <main className={`${styles.main} ${!isAuthorized ? styles['content-center'] : ''}`}>
      {!isAuthorized
        ? <Form />
        : <Chat />
      }
    </main>
  );
}