import styles from './CursorPresence.module.css';

interface CursorInfo {
  userId: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface Props {
  cursors: CursorInfo[];
}

export function CursorPresence({ cursors }: Props) {
  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          className={styles.cursor}
          style={{ left: cursor.x, top: cursor.y }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M0 0L16 6L8 8L6 16L0 0Z" fill={cursor.color} />
          </svg>
          <span className={styles.label} style={{ background: cursor.color }}>
            {cursor.name}
          </span>
        </div>
      ))}
    </>
  );
}
