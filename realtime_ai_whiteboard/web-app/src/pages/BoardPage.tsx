import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WhiteboardCanvas, type Tool } from '../components/canvas/WhiteboardCanvas';
import { Toolbar } from '../components/canvas/Toolbar';
import { CursorPresence } from '../components/canvas/CursorPresence';
import { AiChatPanel } from '../components/ai/AiChatPanel';
import { DemoModal } from '../components/DemoModal';
import { useYjs } from '../hooks/useYjs';
import { useAiStore } from '../stores/ai.store';
import styles from './BoardPage.module.css';

const ZOOM_MIN = 25;
const ZOOM_MAX = 200;
const ZOOM_STEP = 25;
const isMock = import.meta.env.VITE_MOCK === 'true';

export function BoardPage() {
  const { t } = useTranslation();
  const { id = 'default' } = useParams<{ id: string }>();
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [zoom, setZoom] = useState(100);
  const [demoModal, setDemoModal] = useState('');
  const { connected, cursors, onlineCount, updateCursorPosition } = useYjs(id);
  const toggleAi = useAiStore((s) => s.togglePanel);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN)), []);
  const zoomReset = useCallback(() => setZoom(100), []);

  const handleShare = () => {
    if (isMock) {
      setDemoModal('Share & Collaborate');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.backLink}>
          {t('board.back')}
        </Link>
        <span className={styles.title}>
          Board {id}
          {isMock && (
            <span
              style={{
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: 10,
                fontWeight: 600,
                padding: '1px 6px',
                borderRadius: 4,
                marginLeft: 8,
              }}
            >
              DEMO
            </span>
          )}
        </span>
        <div className={styles.headerRight}>
          <span
            className={styles.status}
            style={{ color: isMock ? '#10B981' : connected ? '#10B981' : '#EF4444' }}
          >
            <span
              className={styles.statusDot}
              style={{ background: isMock ? '#10B981' : connected ? '#10B981' : '#EF4444' }}
            />
            {isMock ? '3 online' : t('board.online', { count: onlineCount })}
          </span>
          <button className={styles.shareBtn} onClick={toggleAi}>
            {t('board.ai')}
          </button>
          <button className={styles.shareBtn} onClick={handleShare}>
            {t('board.share')}
          </button>
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
          <WhiteboardCanvas activeTool={activeTool} boardId={id} width={900} height={600} />
        </div>
      </div>

      <AiChatPanel boardId={id} />
      <DemoModal isOpen={!!demoModal} onClose={() => setDemoModal('')} feature={demoModal} />

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
