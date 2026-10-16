import styles from './Input.module.css';

export default function Input({ variant = 'default', ...props}) {
  return (
    <input className={`${styles.input} ${variant === 'default' ? '' : styles[variant]}`} type="text" {...props} />
  );
}
