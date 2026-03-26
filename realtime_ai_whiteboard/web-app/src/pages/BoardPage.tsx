import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WhiteboardCanvas, type Tool } from '../components/canvas/WhiteboardCanvas';
import { Toolbar } from '../components/canvas/Toolbar';
import { CursorPresence } from '../components/canvas/CursorPresence';
import { AiChatPanel } from '../components/ai/AiChatPanel';
import { DemoModal } from '../components/DemoModal';
import { DemoTooltip } from '../components/DemoTooltip';
import { useYjs } from '../hooks/useYjs';
import { useAiStore } from '../stores/ai.store';
import { useBoardStore } from '../stores/board.store';
import styles from './BoardPage.module.css';

const ZOOM_MIN = 25;
const ZOOM_MAX = 200;
const ZOOM_STEP = 25;
const isMock = import.meta.env.VITE_MOCK === 'true';

export function BoardPage() {
  const { t } = useTranslation();
  const { id = 'default' } = useParams<{ id: string }>();
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [zoom, setZoom] = useState(75);
  const [demoModal, setDemoModal] = useState('');
  const { cursors, onlineCount, updateCursorPosition } = useYjs(id);
  const toggleAi = useAiStore((s) => s.togglePanel);
  const boards = useBoardStore((s) => s.boards);
  const board = boards.find((b) => b.id === id);
  const boardTitle = board?.title || `Board ${id}`;

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN)), []);

  const handleShare = () => {
    if (isMock) setDemoModal('Share & Collaborate');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backBtn} title="Back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className={styles.boardIcon}>
            <svg viewBox="0 0 15 11" fill="none">
              <path
                d="M1 5.5L5 1.5L9 5.5L14 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 9.5L5 5.5L9 9.5L14 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={styles.title}>
            {boardTitle}
            {isMock && <span className={styles.demoBadge}>DEMO</span>}
          </span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.onlineBadge}>
            <span className={styles.onlineDot} />
            <span className={styles.onlineText}>
              {isMock ? '3 online' : t('board.online', { count: onlineCount })}
            </span>
          </div>
          <div className={styles.collaborators}>
            <div className={styles.collabAvatar} style={{ borderColor: '#3B82F6', zIndex: 3 }} />
            <div className={styles.collabAvatar} style={{ borderColor: '#22C55E', zIndex: 2 }} />
            <div className={styles.collabAvatar} style={{ borderColor: '#F97316', zIndex: 1 }} />
          </div>
          <DemoTooltip message="Share requires backend">
            <button className={styles.shareBtn} onClick={handleShare}>
              Share
            </button>
          </DemoTooltip>
          <button className={styles.moreBtn}>
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              <circle cx="2" cy="8" r="1.5" fill="currentColor" />
              <circle cx="2" cy="14" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      {/* Canvas */}
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

        {/* Minimap */}
        <div className={styles.minimap}>
          <div className={styles.minimapInner}>
            <div className={styles.minimapRect} />
            <div className={styles.minimapCircle} />
          </div>
          <div className={styles.minimapBorder} />
        </div>
      </div>

      <AiChatPanel boardId={id} />
      <DemoModal isOpen={!!demoModal} onClose={() => setDemoModal('')} feature={demoModal} />

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.zoomControls}>
            <button className={styles.zoomBtn} onClick={zoomOut} disabled={zoom <= ZOOM_MIN}>
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                <line x1="0" y1="1" x2="10" y2="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <span className={styles.zoomValue}>{zoom}%</span>
            <button className={styles.zoomBtn} onClick={zoomIn} disabled={zoom >= ZOOM_MAX}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <button className={styles.fullscreenBtn} title="Fullscreen">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 7V2H7M11 2H16V7M16 11V16H11M7 16H2V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.footerRight}>
          <span className={styles.pageInfo}>Page 1 of 1</span>
          <button className={styles.footerIconBtn} title="Help" onClick={toggleAi}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M5 5.5a2 2 0 0 1 3.9.5c0 1-1.4 1.5-1.9 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="7" cy="11" r="0.5" fill="currentColor" />
            </svg>
          </button>
          <button className={styles.footerIconBtn} title="Settings">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M7.5 1v2M7.5 12v2M13.5 7.5h-2M3.5 7.5h-2M11.7 3.3l-1.4 1.4M4.7 10.3l-1.4 1.4M11.7 11.7l-1.4-1.4M4.7 4.7L3.3 3.3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
