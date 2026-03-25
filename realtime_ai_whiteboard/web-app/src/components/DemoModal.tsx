import styles from './DemoModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export function DemoModal({ isOpen, onClose, feature }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.badge}>DEMO MODE</span>
        <h3 className={styles.title}>🔒 {feature}</h3>
        <p className={styles.desc}>
          This feature requires a running backend with real-time WebSocket connections and database.
          <br />
          <br />
          In the full version, you can invite collaborators, set permissions, and generate shareable
          links.
        </p>
        <button className={styles.closeBtn} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
