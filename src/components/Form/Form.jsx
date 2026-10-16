import { useState } from 'react';
import { useAuth } from '@/contexts/Auth';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

import styles from './Form.module.css';

export default function Form({ onSubmit }) {
  const { setApiUrl, setIdInstance, setPhoneNumber, setApiTokenInstance } = useAuth();

  function submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const apiUrl = formData.get('apiUrl');
    const phoneNumber = formData.get('phoneNumber');
    const idInstance = formData.get('idInstance');
    const apiTokenInstance = formData.get('apiTokenInstance');

    if (apiUrl && phoneNumber && idInstance && apiTokenInstance) {
      setPhoneNumber(phoneNumber);
      setApiUrl(apiUrl);
      setIdInstance(idInstance);
      setApiTokenInstance(apiTokenInstance);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles['form-title']}>
        Укажите ваши данные
      </div>
      <label className={styles['form-label']}>
        <Input variant="primary" placeholder="API Url" name="apiUrl" />
      </label>
      <label className={styles['form-label']}>
        <Input variant="primary" placeholder="Phone Number" name="phoneNumber" />
      </label>
      <label className={styles['form-label']}>
        <Input variant="primary" placeholder="ID Instance" name="idInstance" />
      </label>
      <label className={styles['form-label']}>
        <Input variant="primary" placeholder="API Token Instance" name="apiTokenInstance" />
      </label>
      <div className={styles['form-actions']}>
        <Button type="submit">Далее</Button>
      </div>
    </form>
  );
}