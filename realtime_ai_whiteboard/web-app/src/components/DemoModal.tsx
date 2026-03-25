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
          This feature requires the full backend stack (NestJS + PostgreSQL + Redis).
          <br />
          <br />
          Clone the repo and run locally to try it:
        </p>
        <code
          style={{
            background: '#F3F4F6',
            padding: '8px 12px',
            borderRadius: 6,
            fontSize: 13,
            display: 'block',
            marginBottom: 16,
          }}
        >
          ./start.sh
        </code>
        <a
          className={styles.link}
          href="https://github.com/Eyolf6Coyote7/fullstack_ai_workspace"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub →
        </a>
        <br />
        <button className={styles.closeBtn} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
