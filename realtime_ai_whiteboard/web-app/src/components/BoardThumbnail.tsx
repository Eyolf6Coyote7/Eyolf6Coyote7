import { useState, useEffect } from 'react';
import { getThumbnail } from '../api/thumbnail-cache';

export function BoardThumbnail({ boardId }: { boardId: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Poll for thumbnail (generated async)
    const check = () => {
      const thumb = getThumbnail(boardId);
      if (thumb) {
        setSrc(thumb);
        return;
      }
      setTimeout(check, 200);
    };
    check();
  }, [boardId]);

  return (
    <div
      style={{
        height: 160,
        overflow: 'hidden',
        background: '#FAFAFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={`Board ${boardId}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={{ color: '#D1D5DB', fontSize: 13 }}>Loading...</span>
      )}
    </div>
  );
}
