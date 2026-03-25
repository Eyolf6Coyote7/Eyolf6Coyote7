import { useEffect, useRef, useState, useCallback } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

interface CursorInfo {
  userId: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export function useYjs(boardId: string) {
  const docRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [cursors, setCursors] = useState<CursorInfo[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const doc = new Y.Doc();
    docRef.current = doc;

    const wsUrl = import.meta.env.VITE_YJS_WS_URL || 'ws://localhost:4002';
    const provider = new WebsocketProvider(wsUrl, boardId, doc);
    providerRef.current = provider;

    new IndexeddbPersistence(boardId, doc);

    provider.on('status', (event: { status: string }) => {
      setConnected(event.status === 'connected');
    });

    const awareness = provider.awareness;
    const userId = Math.random().toString(36).slice(2, 8);
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
        const user = state.user as { userId: string; name: string; color: string } | undefined;
        const cursor = state.cursor as { x: number; y: number } | undefined;
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
  }, [boardId]);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    providerRef.current?.awareness.setLocalStateField('cursor', { x, y });
  }, []);

  const getSharedElements = useCallback(() => {
    return docRef.current?.getArray('elements') ?? null;
  }, []);

  return {
    connected,
    cursors,
    onlineCount,
    updateCursorPosition,
    getSharedElements,
  };
}
