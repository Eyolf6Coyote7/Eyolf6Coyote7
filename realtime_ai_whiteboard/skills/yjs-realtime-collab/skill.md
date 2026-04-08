---
name: yjs-realtime-collab
description: Wire up Yjs CRDT realtime collaboration with y-websocket, IndexedDB persistence, and throttled awareness cursors.
---

## When to use

Trigger when the user asks about:

- realtime collaboration, CRDT, Yjs, y-websocket, awareness, cursor presence on the board
- editing realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts
- cursor presence or online-count UI (components/canvas/CursorPresence.tsx)
- offline persistence for a board (y-indexeddb)
- mentions of Y.Doc, WebsocketProvider, IndexeddbPersistence, awareness, clientID, setLocalStateField

## Context

The web client uses Yjs with three layers stacked on one Y.Doc:

1. WebsocketProvider from y-websocket, talking to the NestJS gateway on ws://localhost:4002 (see the y-websocket-jwt-gateway skill).
2. IndexeddbPersistence from y-indexeddb, for offline cache keyed by boardId.
3. provider.awareness for ephemeral user + cursor state.

The JWT token is taken from useAuthStore and passed via the params option to WebsocketProvider so the server can validate it. Cursors are throttled to ~30fps (33ms) to avoid saturating awareness updates when many clients are active.

Canonical file: realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts (lines 1-114).

## Operating instructions

When adding a new collaborative field (example: selected element IDs):

1. Edit useYjs.ts. Inside the main useEffect, obtain the shared map via doc.getMap('selection') and expose a setter from the hook.
2. Update the awareness listener to also read selection state from state.selection and return it alongside cursors.
3. If the field needs persistence across reloads, keep using Y.Doc (IndexeddbPersistence handles it automatically). Do NOT mirror into React state with setState on every update; prefer useSyncExternalStore or a throttled subscription.
4. For cursor-style ephemeral fields, use provider.awareness.setLocalStateField(fieldName, value) and listen to awareness.on('change', ...).
5. Respect the throttle wrapper on the write path for anything mousemove-frequency.
6. On cleanup, always call provider.destroy() and doc.destroy() in that order.

When fixing a connection bug, check: (a) VITE_YJS_WS_URL env var fallback is ws://localhost:4002, (b) provider.on('status', ...) reports 'connected', (c) token param is non-null (server closes with 4001 on missing token), (d) IndexedDB is available (Safari private mode breaks this - degrade gracefully).

## Reusable prompts / code patterns

### Hook skeleton (copy exactly, extend inside)

    import { useEffect, useRef, useState, useCallback } from 'react';
    import * as Y from 'yjs';
    import { WebsocketProvider } from 'y-websocket';
    import { IndexeddbPersistence } from 'y-indexeddb';
    import { useAuthStore } from '../stores/auth.store';

    const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    // Throttle with leading + trailing edge so the final cursor position is
    // always synchronized after the user stops moving.
    function throttle(fn, ms) {
      let last = 0;
      let timer = null;
      let lastArgs = null;
      return (...args) => {
        const now = Date.now();
        const remaining = ms - (now - last);
        lastArgs = args;
        if (remaining <= 0) {
          if (timer) { clearTimeout(timer); timer = null; }
          last = now;
          fn(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            last = Date.now();
            timer = null;
            fn(...lastArgs);
          }, remaining);
        }
      };
    }

    export function useYjs(boardId) {
      const providerRef = useRef(null);
      const [connected, setConnected] = useState(false);
      const [cursors, setCursors] = useState([]);
      const [onlineCount, setOnlineCount] = useState(0);
      const token = useAuthStore(s => s.token);
      const user = useAuthStore(s => s.user);

      useEffect(() => {
        const doc = new Y.Doc();
        const wsUrl = import.meta.env.VITE_YJS_WS_URL || 'ws://localhost:4002';
        const provider = new WebsocketProvider(wsUrl, boardId, doc, { params: token ? { token } : {} });
        providerRef.current = provider;
        new IndexeddbPersistence(boardId, doc);
        provider.on('status', e => setConnected(e.status === 'connected'));
        const awareness = provider.awareness;
        // Stable per-user color picked deterministically from COLORS by userId hash.
        const userId = user?.id ?? 'anonymous';
        const name = user?.name ?? 'Guest';
        const colorIndex = Math.abs(String(userId).split('').reduce((h, c) => h * 31 + c.charCodeAt(0), 0)) % COLORS.length;
        const color = COLORS[colorIndex];
        awareness.setLocalStateField('user', { userId, name, color });
        const updateCursors = () => {
          const states = Array.from(awareness.getStates().entries());
          const others = [];
          states.forEach(([clientId, state]) => { if (clientId === awareness.clientID) return; if (state.user && state.cursor) others.push({ ...state.user, ...state.cursor }); });
          setCursors(others); setOnlineCount(states.length);
        };
        awareness.on('change', updateCursors);
        return () => { awareness.off('change', updateCursors); provider.destroy(); doc.destroy(); };
      }, [boardId, token]);

      const updateCursorPosition = useCallback(throttle((x, y) => {
        providerRef.current?.awareness.setLocalStateField('cursor', { x, y });
      }, 33), []);

      return { connected, cursors, onlineCount, updateCursorPosition };
    }

### Throttle constant

All awareness write paths use 33ms (~30fps). Do not raise above 50ms or cursors stutter; do not lower below 16ms or the server is saturated at 5+ clients.

## Anti-patterns

- Do NOT create a Y.Doc per render - it MUST live inside useEffect.
- Do NOT call setState on every Y.Doc update at mousemove frequency; throttle it.
- Do NOT skip awareness.off and provider.destroy in cleanup - leaks a WebSocket and an IndexedDB handle per remount.
- Do NOT put the auth token in the boardId URL path - pass it via WebsocketProvider params so the gateway reads it from the query string.
- Do NOT mix Yjs shared state with Zustand for the same field; Zustand stores UI state, Yjs stores collaborative state.
- Do NOT call setLocalStateField with a new object identity unless the value actually changed - spurious writes cause re-renders on every peer.

## References

- realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts:1-114 - canonical hook.
- realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts:28-37 - throttle helper.
- realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts:46-92 - WebsocketProvider + IndexeddbPersistence setup and cleanup.
- realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts:96-101 - throttled cursor writer.
- realtime_ai_whiteboard/web-app/src/components/canvas/CursorPresence.tsx - cursor rendering consumer.
- realtime_ai_whiteboard/web-app/src/pages/BoardPage.tsx:27,118-122 - hook usage wiring onMouseMove to updateCursorPosition.
- realtime_ai_whiteboard/bff-api/src/collaboration/collaboration.gateway.ts:1-53 - server side (see y-websocket-jwt-gateway skill).
