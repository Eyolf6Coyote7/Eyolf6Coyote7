import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBoardStore } from '../stores/board.store';
import { useAuthStore } from '../stores/auth.store';
import { BoardThumbnail } from '../components/BoardThumbnail';
import { DemoTooltip } from '../components/DemoTooltip';
import { LanguageToggle } from '../components/LanguageToggle';
import styles from './DashboardPage.module.css';

const isMock = import.meta.env.VITE_MOCK === 'true';

const FILTER_KEYS = [
  'dashboard.all',
  'dashboard.recent',
  'dashboard.sharedWithMe',
  'dashboard.starred',
] as const;
const NAV_KEYS = [
  { key: 'dashboard.all', icon: 'grid' },
  { key: 'dashboard.recent', icon: 'clock' },
  { key: 'dashboard.sharedWithMe', icon: 'users' },
  { key: 'dashboard.starred', icon: 'star' },
] as const;

const COLLABORATORS: Record<string, { colors: string[]; initials: string[]; extra?: number }> = {
  '1': { colors: ['#2563EB', '#22C55E'], initials: ['JW', 'SC'], extra: 3 },
  '2': { colors: ['#A855F7', '#EF4444'], initials: ['AR', 'KL'] },
  '3': { colors: ['#2563EB'], initials: ['JW'] },
  '4': { colors: ['#2563EB', '#BC4800'], initials: ['GC', 'MK'] },
  '5': { colors: ['#475569'], initials: ['JD'] },
  '6': { colors: ['#2563EB'], initials: ['JW'] },
};

const EDIT_TIMES: Record<string, string> = {
  '1': 'Edited 2 hours ago',
  '2': 'Edited yesterday',
  '3': 'Edited 3 days ago',
  '4': 'Edited last week',
  '5': 'Edited Oct 12',
  '6': 'Edited Oct 5',
};

export function DashboardPage() {
  const { t } = useTranslation();
  const { boards, loading, fetchBoards, createBoard } = useBoardStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeNav, setActiveNav] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    void fetchBoards();
  }, [fetchBoards]);

  const handleCreate = async () => {
    const board = await createBoard('Untitled Board');
    navigate(`/board/${board.id}`);
  };

  return (
    <div className={styles.page}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <span className={styles.topBarBrand}>
          Whiteboard AI
          {isMock && <span className={styles.demoBadge}>DEMO</span>}
        </span>
        <div className={styles.searchBar}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M13 13L16.5 16.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            className={styles.searchInput}
            placeholder={t('dashboard.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.topBarActions}>
          {isMock && <span className={styles.demoNote}>Static demo</span>}
          <LanguageToggle />
          <button className={styles.iconButton} title="Notifications">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15H4C2.89543 15 2 14.1046 2 13V8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8V13C14 14.1046 13.1046 15 12 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6 15V16C6 17.1046 6.89543 18 8 18C9.10457 18 10 17.1046 10 16V15"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button className={styles.avatarButton} onClick={!isMock ? logout : undefined}>
            <div className={styles.avatar} />
            <svg
              className={styles.chevronDown}
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div style={{ paddingBottom: 24 }}>
            <h2 className={styles.sidebarTitle}>{t('dashboard.myBoards')}</h2>
            <p className={styles.sidebarSubtitle}>{t('dashboard.manageWorkspace')}</p>
          </div>
          <nav className={styles.sidebarNav}>
            {NAV_KEYS.map((item, i) => (
              <button
                key={item.key}
                className={activeNav === i ? styles.navLinkActive : styles.navLink}
                onClick={() => setActiveNav(i)}
              >
                {item.icon === 'grid' && (
                  <svg className={styles.navIcon} viewBox="0 0 16 16" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="1"
                      y="9"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="9"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
                {item.icon === 'clock' && (
                  <svg className={styles.navIcon} viewBox="0 0 17 17" fill="none">
                    <circle cx="8.5" cy="8.5" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M8.5 4.5V8.5L11 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {item.icon === 'users' && (
                  <svg className={styles.navIcon} viewBox="0 0 18 14" fill="none">
                    <circle cx="6" cy="4" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M1 13C1 10.2386 3.23858 8 6 8C8.76142 8 11 10.2386 11 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="13" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="M13 8.5C15.2091 8.5 17 10.2909 17 12.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
                {item.icon === 'star' && (
                  <svg className={styles.navIcon} viewBox="0 0 17 16" fill="none">
                    <path
                      d="M8.5 1L10.6 6.2H16L11.7 9.5L13.3 15L8.5 11.5L3.7 15L5.3 9.5L1 6.2H6.4L8.5 1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {t(item.key)}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 48 }}>
            <DemoTooltip message={t('demo.createBoard')}>
              <button className={styles.sidebarCta} onClick={() => !isMock && void handleCreate()}>
                {t('dashboard.newBoard')}
              </button>
            </DemoTooltip>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>{t('dashboard.title')}</h1>
            <DemoTooltip message={t('demo.createBoard')}>
              <button
                className={styles.newBoardButton}
                onClick={() => !isMock && void handleCreate()}
                style={isMock ? { background: '#93C5FD', cursor: 'default' } : undefined}
              >
                {t('dashboard.newBoard')}
              </button>
            </DemoTooltip>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            {FILTER_KEYS.map((key, i) => (
              <button
                key={key}
                className={activeFilter === i ? styles.filterTabActive : styles.filterTab}
                onClick={() => setActiveFilter(i)}
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Board Grid */}
          {loading ? (
            <p>{t('dashboard.loading')}</p>
          ) : (
            <div className={styles.boardGrid}>
              {/* New Board Card */}
              <DemoTooltip message={t('demo.createBoard')}>
                <button
                  className={styles.newBoardCard}
                  onClick={() => !isMock && void handleCreate()}
                >
                  <div className={styles.newBoardCardIcon}>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 1V17M1 9H17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className={styles.newBoardCardText}>{t('dashboard.newBoardCard')}</span>
                </button>
              </DemoTooltip>

              {/* Board Cards */}
              {boards.map((board) => {
                const collabs = COLLABORATORS[board.id] || { colors: ['#94A3B8'], initials: ['?'] };
                const editTime =
                  EDIT_TIMES[board.id] ||
                  t('dashboard.edited', { date: new Date(board.updatedAt).toLocaleDateString() });
                return (
                  <div
                    key={board.id}
                    className={styles.boardCard}
                    onClick={() => navigate(`/board/${board.id}`)}
                  >
                    <div className={styles.boardCardPreview}>
                      <BoardThumbnail boardId={board.id} />
                    </div>
                    <div className={styles.boardCardBody}>
                      <div>
                        <div className={styles.boardCardHeader}>
                          <h3 className={styles.boardCardTitle}>{board.title}</h3>
                          <button
                            className={styles.boardCardMenu}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                              <circle cx="2" cy="8" r="1.5" fill="currentColor" />
                              <circle cx="2" cy="14" r="1.5" fill="currentColor" />
                            </svg>
                          </button>
                        </div>
                        <p className={styles.boardCardDate}>{editTime}</p>
                      </div>
                      <div className={styles.boardCardCollaborators}>
                        {collabs.initials.map((initial, i) => (
                          <div
                            key={i}
                            className={styles.collaboratorAvatar}
                            style={{
                              background: collabs.colors[i] || '#94A3B8',
                              zIndex: collabs.initials.length - i,
                            }}
                          >
                            {initial}
                          </div>
                        ))}
                        {collabs.extra && (
                          <div className={styles.collaboratorExtra} style={{ zIndex: 0 }}>
                            +{collabs.extra}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Floating AI Button */}
      <button
        className={styles.aiButton}
        onClick={() => {
          if (boards.length > 0) navigate(`/board/${boards[0].id}?ai=1`);
        }}
      >
        <svg
          className={styles.aiButtonIcon}
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1L13 8L20 8L14.5 12.5L16.5 20L11 15.5L5.5 20L7.5 12.5L2 8L9 8L11 1Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.aiButtonText}>{t('dashboard.aiHelp')}</span>
        <span className={styles.aiButtonDivider} />
        <span className={styles.aiButtonAsk}>{t('dashboard.askAi')}</span>
      </button>
    </div>
  );
}
