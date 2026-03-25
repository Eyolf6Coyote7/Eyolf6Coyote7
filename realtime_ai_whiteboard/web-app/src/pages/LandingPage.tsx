import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function LandingPage() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'zh-TW' : 'en';
    void i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <button
        onClick={toggleLang}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'none',
          border: '1px solid #E5E7EB',
          borderRadius: 8,
          padding: '6px 12px',
          cursor: 'pointer',
        }}
      >
        {i18n.language === 'en' ? '中文' : 'EN'}
      </button>
      <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3.6, color: '#191C1D' }}>
        {t('landing.title')}
      </h1>
      <p
        style={{
          fontSize: 20,
          color: '#434655',
          maxWidth: 512,
          textAlign: 'center',
          marginTop: 24,
        }}
      >
        {t('landing.subtitle')}
      </p>
      <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
        <Link
          to="/auth"
          style={{
            padding: '16px 32px',
            background: '#2563EB',
            color: 'white',
            borderRadius: 12,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          {t('landing.cta')}
        </Link>
      </div>
    </div>
  );
}
