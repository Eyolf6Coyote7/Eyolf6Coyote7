import { useEffect, useRef, useState, useCallback } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';
import { useAuthStore } from '../stores/auth.store';

interface CursorInfo {
  userId: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface AwarenessUser {
  userId: string;
  name: string;
  color: string;
}

interface AwarenessCursor {
  x: number;
  y: number;
}

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let last = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  }) as T;
}

export function useYjs(boardId: string) {
  const providerRef = useRef<WebsocketProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [cursors, setCursors] = useState<CursorInfo[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const doc = new Y.Doc();

    const wsUrl = import.meta.env.VITE_YJS_WS_URL || 'ws://localhost:4002';
    const params = token ? { token } : {};
    const provider = new WebsocketProvider(wsUrl, boardId, doc, { params });
    providerRef.current = provider;

    new IndexeddbPersistence(boardId, doc);

    provider.on('status', (event: { status: string }) => {
      setConnected(event.status === 'connected');
    });

    const awareness = provider.awareness;
    const userId = token ? `user-${token.slice(-6)}` : Math.random().toString(36).slice(2, 8);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    awareness.setLocalStateField('user', {
      userId,
      name: `User-${userId.slice(0, 4)}`,
      color,
    });

    const updateCursors = () => {
      const states = Array.from(awareness.getStates().entries());
      const otherCursors: CursorInfo[] = [];
      states.forEach(([clientId, state]) => {
        if (clientId === awareness.clientID) return;
        const user = state.user as AwarenessUser | undefined;
        const cursor = state.cursor as AwarenessCursor | undefined;
        if (user && cursor) {
          otherCursors.push({ ...user, ...cursor });
        }
      });
      setCursors(otherCursors);
      setOnlineCount(states.length);
    };

    awareness.on('change', updateCursors);

    return () => {
      awareness.off('change', updateCursors);
      provider.destroy();
      doc.destroy();
    };
  }, [boardId, token]);

  // Throttle cursor updates to 30fps (every ~33ms)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCursorPosition = useCallback(
    throttle((x: number, y: number) => {
      providerRef.current?.awareness.setLocalStateField('cursor', { x, y });
    }, 33),
    [],
  );

  const getSharedElements = useCallback(() => {
    return null; // Will be implemented with Fabric.js ↔ Yjs binding
  }, []);

  return {
    connected,
    cursors,
    onlineCount,
    updateCursorPosition,
    getSharedElements,
  };
}
