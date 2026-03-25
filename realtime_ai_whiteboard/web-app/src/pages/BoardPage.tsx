import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WhiteboardCanvas, type Tool } from '../components/canvas/WhiteboardCanvas';
import { Toolbar } from '../components/canvas/Toolbar';
import { CursorPresence } from '../components/canvas/CursorPresence';
import { AiChatPanel } from '../components/ai/AiChatPanel';
import { useYjs } from '../hooks/useYjs';
import { useAiStore } from '../stores/ai.store';
import styles from './BoardPage.module.css';

export function BoardPage() {
  const { id = 'default' } = useParams<{ id: string }>();
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const { connected, cursors, onlineCount, updateCursorPosition } = useYjs(id);
  const toggleAi = useAiStore((s) => s.togglePanel);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.backLink}>
          ← Back
        </Link>
        <span className={styles.title}>Board {id}</span>
        <div className={styles.headerRight}>
          <span className={styles.status} style={{ color: connected ? '#10B981' : '#EF4444' }}>
            <span
              className={styles.statusDot}
              style={{ background: connected ? '#10B981' : '#EF4444' }}
            />
            {onlineCount} online
          </span>
          <button className={styles.shareBtn} onClick={toggleAi}>
            ✨ AI
          </button>
          <button className={styles.shareBtn}>Share</button>
        </div>
      </header>

      <div className={styles.canvasRow}>
        <div
          className={styles.canvasArea}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            updateCursorPosition(e.clientX - rect.left, e.clientY - rect.top);
          }}
        >
          <div className={styles.toolbarWrapper}>
            <Toolbar activeTool={activeTool} onToolChange={setActiveTool} />
          </div>
          <CursorPresence cursors={cursors} />
          <div className={styles.canvasWrapper}>
            <WhiteboardCanvas activeTool={activeTool} width={1200} height={700} />
          </div>
        </div>

        <AiChatPanel boardId={id} />
      </div>

      <footer className={styles.footer}>
        <button className={styles.zoomBtn}>−</button>
        <span>100%</span>
        <button className={styles.zoomBtn}>+</button>
      </footer>
    </div>
  );
}
