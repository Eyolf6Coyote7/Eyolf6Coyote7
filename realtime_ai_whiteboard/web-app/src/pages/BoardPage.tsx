import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WhiteboardCanvas, type Tool } from '../components/canvas/WhiteboardCanvas';
import { Toolbar } from '../components/canvas/Toolbar';

export function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTool, setActiveTool] = useState<Tool>('select');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <header style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none', fontSize: 14 }}>← Back</Link>
        <span style={{ fontWeight: 600 }}>Board {id}</span>
        <button style={{ padding: '6px 16px', background: '#2563EB', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
          Share
        </button>
      </header>

      {/* Canvas area */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', background: '#F9FAFB' }}>
        {/* Toolbar */}
        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
          <Toolbar activeTool={activeTool} onToolChange={setActiveTool} />
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <WhiteboardCanvas activeTool={activeTool} width={1200} height={700} />
        </div>
      </div>

      {/* Bottom bar */}
      <footer style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #E5E7EB',
        fontSize: 14,
        color: '#6B7280',
      }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>−</button>
        <span>100%</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>+</button>
      </footer>
    </div>
  );
}
