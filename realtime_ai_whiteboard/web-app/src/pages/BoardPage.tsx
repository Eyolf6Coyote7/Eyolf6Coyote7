import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WhiteboardCanvas, type Tool } from '../components/canvas/WhiteboardCanvas';
import { Toolbar } from '../components/canvas/Toolbar';
import { CursorPresence } from '../components/canvas/CursorPresence';
import { AiChatPanel } from '../components/ai/AiChatPanel';
import { useYjs } from '../hooks/useYjs';
import { useAiStore } from '../stores/ai.store';
import styles from './BoardPage.module.css';

const ZOOM_MIN = 25;
const ZOOM_MAX = 200;
const ZOOM_STEP = 25;

export function BoardPage() {
  const { t } = useTranslation();
  const { id = 'default' } = useParams<{ id: string }>();
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [zoom, setZoom] = useState(100);
  const { connected, cursors, onlineCount, updateCursorPosition } = useYjs(id);
  const toggleAi = useAiStore((s) => s.togglePanel);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN)), []);
  const zoomReset = useCallback(() => setZoom(100), []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.backLink}>
          {t('board.back')}
        </Link>
        <span className={styles.title}>Board {id}</span>
        <div className={styles.headerRight}>
          <span className={styles.status} style={{ color: connected ? '#10B981' : '#EF4444' }}>
            <span
              className={styles.statusDot}
              style={{ background: connected ? '#10B981' : '#EF4444' }}
            />
            {t('board.online', { count: onlineCount })}
          </span>
          <button className={styles.shareBtn} onClick={toggleAi}>
            {t('board.ai')}
          </button>
          <button className={styles.shareBtn}>{t('board.share')}</button>
        </div>
      </header>

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
        <div
          className={styles.canvasWrapper}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        >
          <WhiteboardCanvas activeTool={activeTool} boardId={id} width={1200} height={700} />
        </div>
      </div>

      <AiChatPanel boardId={id} />

      <footer className={styles.footer}>
        <button className={styles.zoomBtn} onClick={zoomOut} disabled={zoom <= ZOOM_MIN}>
          −
        </button>
        <button
          className={styles.zoomBtn}
          onClick={zoomReset}
          style={{ width: 'auto', padding: '0 8px', fontSize: 13 }}
        >
          {zoom}%
        </button>
        <button className={styles.zoomBtn} onClick={zoomIn} disabled={zoom >= ZOOM_MAX}>
          +
        </button>
      </footer>
    </div>
  );
}
