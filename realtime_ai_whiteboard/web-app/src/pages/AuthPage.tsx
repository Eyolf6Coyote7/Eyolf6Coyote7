import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/auth.store';
import { DemoTooltip } from '../components/DemoTooltip';
import styles from './AuthPage.module.css';

const isMock = import.meta.env.VITE_MOCK === 'true';

export function AuthPage() {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'zh-TW' : 'en';
    void i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) await login(email, password);
    else await register(email, password, displayName);
    navigate('/dashboard');
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <svg
            className={styles.brandIcon}
            viewBox="0 0 23 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10L8 4L14 10L20 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 16L8 10L14 16L20 10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.brandText}>{t('auth.appName')}</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.helpLink}>Help</button>
          <button className={styles.langButton} onClick={toggleLang} title="Switch language">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 10H18" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="10" cy="10" rx="4" ry="8.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        {/* Decorative elements */}
        <div className={styles.decorCircle} />
        <div className={styles.decorRect} />
        <div className={styles.decorDiamond} />

        {/* Auth Card */}
        <div className={styles.card}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 11L8 5L14 11L22 3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 19L8 13L14 19L22 11"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className={styles.logoTitle}>{t('auth.appName')}</h1>
            <p className={styles.logoSubtitle}>Where ideas find their space.</p>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={!isLogin ? styles.tabActive : styles.tab}
              onClick={() => setIsLogin(false)}
            >
              {t('auth.signUp')}
            </button>
            <button
              className={isLogin ? styles.tabActive : styles.tab}
              onClick={() => setIsLogin(true)}
            >
              {t('auth.logIn')}
            </button>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={(e) => void handleSubmit(e)}>
            {!isLogin && (
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('auth.fullName')}</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Jane Cooper"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            )}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>{t('auth.email')}</label>
              <input
                className={styles.input}
                type="email"
                placeholder="jane@whiteboard.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>{t('auth.password')}</label>
              <div className={styles.passwordWrapper}>
                <input
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6.5C1 6.5 4 1 9 1C14 1 17 6.5 17 6.5C17 6.5 14 12 9 12C4 12 1 6.5 1 6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="9" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            </div>
            <DemoTooltip message="Authentication requires backend">
              <button type="submit" className={styles.submitButton} disabled={isMock}>
                {isLogin ? t('auth.logIn') : t('auth.createAccount')}
              </button>
            </DemoTooltip>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>OR</span>
            <div className={styles.dividerLine} />
          </div>

          {/* OAuth */}
          <div className={styles.oauthButtons}>
            <DemoTooltip message="OAuth requires backend">
              <button className={styles.oauthButton} disabled={isMock}>
                <svg
                  className={styles.oauthIcon}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.17 8.37H10v3.45h4.59C14.18 13.65 12.34 15 10 15a5 5 0 1 1 3.16-8.86l2.58-2.58A8.5 8.5 0 1 0 10 18.5c4.48 0 8.27-3.05 8.27-8.5 0-.55-.07-1.1-.1-1.63Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M2.18 6.12 5.02 8.2A5 5 0 0 1 10 5c1.22 0 2.35.44 3.16 1.14l2.58-2.58A8.46 8.46 0 0 0 10 1.5 8.5 8.5 0 0 0 2.18 6.12Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M10 18.5a8.45 8.45 0 0 0 5.64-2.13l-2.79-2.16A5.01 5.01 0 0 1 5.02 11.8l-2.84 2.19A8.5 8.5 0 0 0 10 18.5Z"
                    fill="#34A853"
                  />
                  <path
                    d="M18.17 8.37H10v3.45h4.59a4.95 4.95 0 0 1-1.72 2.39l2.79 2.16c1.6-1.49 2.61-3.73 2.61-6.37 0-.55-.07-1.1-.1-1.63Z"
                    fill="#FBBC05"
                  />
                </svg>
                Continue with Google
              </button>
            </DemoTooltip>
            <DemoTooltip message="OAuth requires backend">
              <button className={styles.oauthButton} disabled={isMock}>
                <svg
                  className={styles.oauthIcon}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 10 4.836a9.578 9.578 0 0 1 2.508.338c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10Z"
                    fill="#191C1D"
                  />
                </svg>
                Continue with GitHub
              </button>
            </DemoTooltip>
          </div>

          {/* Redirect */}
          <p className={styles.redirect}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button className={styles.redirectLink} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? t('auth.signUp') : t('auth.logIn')}
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.footerCopyright}>
          &copy; 2024 Whiteboard AI. The Ethereal Workshop.
        </span>
        <div className={styles.footerLinks}>
          <button className={styles.footerLink}>Privacy Policy</button>
          <button className={styles.footerLink}>Terms of Service</button>
          <button className={styles.footerLink}>Security</button>
          <button className={styles.footerLink}>Contact</button>
        </div>
      </footer>
    </div>
  );
}
