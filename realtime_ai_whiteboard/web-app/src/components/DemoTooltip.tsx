import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './DemoTooltip.module.css';

const isMock = import.meta.env.VITE_MOCK === 'true';

interface Props {
  message?: string;
  children: React.ReactNode;
}

export function DemoTooltip({ message = 'Available in full version', children }: Props) {
  if (!isMock) return <>{children}</>;

  return <DemoTooltipInner message={message}>{children}</DemoTooltipInner>;
}

function DemoTooltipInner({ message, children }: Required<Props>) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const handleEnter = useCallback(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPos({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
    setShow(true);
  }, []);

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <span className={styles.tooltip} style={{ top: pos.top, left: pos.left }}>
            🔒 {message}
          </span>,
          document.body,
        )}
    </span>
  );
}
