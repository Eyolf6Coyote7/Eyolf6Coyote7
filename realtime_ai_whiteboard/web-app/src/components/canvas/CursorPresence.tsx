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
          style={{
            position: 'absolute',
            left: cursor.x,
            top: cursor.y,
            pointerEvents: 'none',
            zIndex: 999,
            transition: 'left 50ms, top 50ms',
          }}
        >
          {/* Cursor arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M0 0L16 6L8 8L6 16L0 0Z" fill={cursor.color} />
          </svg>
          {/* Name label */}
          <span
            style={{
              position: 'absolute',
              left: 16,
              top: 0,
              background: cursor.color,
              color: 'white',
              fontSize: 11,
              padding: '2px 6px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {cursor.name}
          </span>
        </div>
      ))}
    </>
  );
}
