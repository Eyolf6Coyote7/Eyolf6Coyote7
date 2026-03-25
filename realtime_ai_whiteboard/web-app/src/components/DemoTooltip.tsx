import styles from './DemoTooltip.module.css';

const isMock = import.meta.env.VITE_MOCK === 'true';

interface Props {
  message?: string;
  children: React.ReactNode;
}

export function DemoTooltip({ message = 'Available in full version', children }: Props) {
  if (!isMock) return <>{children}</>;

  return (
    <span className={styles.wrapper}>
      {children}
      <span className={styles.tooltip}>🔒 {message}</span>
    </span>
  );
}
