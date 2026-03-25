import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password, displayName);
    }
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ width: '480px', padding: '32px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Whiteboard AI</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          <button type="button" onClick={() => setIsLogin(false)} style={{ borderBottom: !isLogin ? '2px solid #2563EB' : 'none', background: 'none', border: 'none', padding: '8px', cursor: 'pointer', fontWeight: !isLogin ? 600 : 400 }}>Sign Up</button>
          <button type="button" onClick={() => setIsLogin(true)} style={{ borderBottom: isLogin ? '2px solid #2563EB' : 'none', background: 'none', border: 'none', padding: '8px', cursor: 'pointer', fontWeight: isLogin ? 600 : 400 }}>Log In</button>
        </div>
        {!isLogin && <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Full name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '12px', boxSizing: 'border-box' }} />}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '12px', boxSizing: 'border-box' }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '24px', boxSizing: 'border-box' }} />
        <button type="submit" style={{ width: '100%', padding: '14px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>{isLogin ? 'Log In' : 'Create Account'}</button>
      </form>
    </div>
  );
}
