import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3.6, color: '#191C1D' }}>Think together, in real time</h1>
      <p style={{ fontSize: 20, color: '#434655', maxWidth: 512, textAlign: 'center', marginTop: 24 }}>A collaborative whiteboard powered by AI — draw, brainstorm, and let AI turn your sketches into polished visuals.</p>
      <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
        <Link to="/auth" style={{ padding: '16px 32px', background: '#2563EB', color: 'white', borderRadius: 12, fontWeight: 700, textDecoration: 'none' }}>Get Started Free</Link>
      </div>
    </div>
  );
}
