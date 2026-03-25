import { useEffect } from 'react';
import { useBoardStore } from '../stores/board.store';
import { useAuthStore } from '../stores/auth.store';

export function DashboardPage() {
  const { boards, loading, fetchBoards, createBoard } = useBoardStore();
  const { user, logout } = useAuthStore();

  useEffect(() => { fetchBoards(); }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ height: '64px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <span style={{ fontWeight: 700, fontSize: '20px' }}>Whiteboard AI</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>{user?.displayName}</span>
          <button onClick={logout} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>My Boards</h1>
          <button onClick={() => createBoard('Untitled Board')} style={{ padding: '12px 24px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>+ New Board</button>
        </div>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {boards.map(board => (
              <div key={board.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '160px', background: '#F3F4F6' }} />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontWeight: 600 }}>{board.title}</h3>
                  <p style={{ color: '#6B7280', fontSize: '14px' }}>Edited {new Date(board.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
