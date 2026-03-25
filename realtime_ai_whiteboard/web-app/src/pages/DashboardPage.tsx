import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardStore } from '../stores/board.store';
import { useAuthStore } from '../stores/auth.store';
import { useTranslation } from 'react-i18next';

const isMock = import.meta.env.VITE_MOCK === 'true';

export function DashboardPage() {
  const { t } = useTranslation();
  const { boards, loading, fetchBoards, createBoard } = useBoardStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchBoards();
  }, [fetchBoards]);

  const handleCreate = async () => {
    const board = await createBoard('Untitled Board');
    navigate(`/board/${board.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Inter, sans-serif' }}>
      <header
        style={{
          height: 64,
          background: 'white',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 20 }}>Whiteboard AI</span>
          {isMock && (
            <span
              style={{
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
              DEMO
            </span>
          )}
        </div>
        {!isMock && (
          <button
            onClick={logout}
            style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}
          >
            {t('dashboard.logout')}
          </button>
        )}
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>{t('dashboard.title')}</h1>
          <button
            onClick={() => void handleCreate()}
            style={{
              padding: '12px 24px',
              background: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t('dashboard.newBoard')}
          </button>
        </div>
        {loading ? (
          <p>{t('dashboard.loading')}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {boards.map((board) => (
              <div
                key={board.id}
                onClick={() => navigate(`/board/${board.id}`)}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div style={{ height: 160, background: '#F3F4F6' }} />
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontWeight: 600 }}>{board.title}</h3>
                  <p style={{ color: '#6B7280', fontSize: 14 }}>
                    {t('dashboard.edited', {
                      date: new Date(board.updatedAt).toLocaleDateString(),
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
