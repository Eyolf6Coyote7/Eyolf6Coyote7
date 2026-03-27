import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const isMock = import.meta.env.VITE_MOCK === "true";

interface Props {
  message?: string;
  children: React.ReactNode;
}

export function DemoTooltip({ message = "Available in full version", children }: Props) {
  if (!isMock) return <>{children}</>;
  return <Inner message={message}>{children}</Inner>;
}

function Inner({ message, children }: Required<Props>) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const enter = useCallback(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ top: r.top - 8, left: r.left + r.width / 2 });
    }
    setShow(true);
  }, []);

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={enter}
      onMouseLeave={() => setShow(false)}
    >
      <span style={{ width: "100%" }}>{children}</span>
      {show &&
        createPortal(
          <span
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              transform: "translate(-50%, -100%)",
              background: "#1f2937",
              color: "white",
              fontSize: 12,
              padding: "6px 12px",
              borderRadius: 6,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            🔒 {message}
          </span>,
          document.body,
        )}
    </span>
  );
}
