import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoTooltip } from '../components/DemoTooltip';
import { LanguageToggle } from '../components/LanguageToggle';
import styles from './AccountSettingsPage.module.css';

const NAV_ITEMS = [
  { key: 'settings.profile', icon: 'user' },
  { key: 'settings.planBilling', icon: 'card' },
  { key: 'settings.team', icon: 'users' },
  { key: 'settings.notifications', icon: 'bell' },
  { key: 'settings.security', icon: 'shield' },
];

export function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      {/* Top Nav */}
      <header className={styles.topNav}>
        <div className={styles.topNavBrand}>
          <span className={styles.brandText}>Whiteboard AI</span>
          <button className={styles.searchPill}>
            <svg viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M10 10L14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.topNavActions}>
          <LanguageToggle />
          <button className={styles.iconBtn}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path
                d="M12 15H4C2.9 15 2 14.1 2 13V8C2 4.7 4.7 2 8 2s6 2.7 6 6v5c0 1.1-.9 2-2 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M6 15v1c0 1.1.9 2 2 2s2-.9 2-2v-1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button className={styles.iconBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M10 1v2M10 17v2M18.36 4.64l-1.41 1.41M3.05 15.95l-1.41 1.41M19 10h-2M3 10H1M15.95 3.05l-1.41 1.41M5.64 13.36l-1.41 1.41"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className={styles.topNavAvatar} />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{t('settings.title')}</h2>
          <p className={styles.sidebarSubtitle}>{t('settings.management')}</p>
        </div>
        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.key}
              className={activeTab === i ? styles.navItemActive : styles.navItem}
              onClick={() => setActiveTab(i)}
            >
              <svg className={styles.navIcon} viewBox="0 0 16 16" fill="none">
                {item.icon === 'user' && (
                  <>
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M2 14c0-2.8 2.7-5 6-5s6 2.2 6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </>
                )}
                {item.icon === 'card' && (
                  <>
                    <rect
                      x="1"
                      y="3"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
                  </>
                )}
                {item.icon === 'users' && (
                  <>
                    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="M1 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1" />
                    <path d="M12 9c2 0 3.5 1.5 3.5 3.5" stroke="currentColor" strokeWidth="1" />
                  </>
                )}
                {item.icon === 'bell' && (
                  <>
                    <path
                      d="M11 12H5c-1 0-2-.9-2-2V7c0-2.8 2.2-5 5-5s5 2.2 5 5v3c0 1.1-.9 2-2 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M6 12v1a2 2 0 0 0 4 0v-1" stroke="currentColor" strokeWidth="1.5" />
                  </>
                )}
                {item.icon === 'shield' && (
                  <>
                    <path
                      d="M8 1L2 4v4c0 4 2.7 7.3 6 8 3.3-.7 6-4 6-8V4L8 1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
              {t(item.key)}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>{t('settings.systemStatus')}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {activeTab === 0 && <ProfileTab />}
          {activeTab === 1 && <PlanBillingTab />}
          {activeTab === 2 && <TeamTab />}
          {activeTab >= 3 && (
            <div>
              <h1 className={styles.pageTitle}>{t(NAV_ITEMS[activeTab].key)}</h1>
              <p className={styles.pageSubtitle}>Coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProfileTab() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <h1 className={styles.pageTitle}>{t('settings.profileTitle')}</h1>
        <p className={styles.pageSubtitle}>{t('settings.profileSubtitle')}</p>
      </div>

      <div className={styles.avatarSection}>
        <div className={styles.avatarCircle} />
        <div>
          <h2 className={styles.avatarName}>Jerry Wolf</h2>
          <p className={styles.avatarRole}>Product Designer &bull; San Francisco</p>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>{t('settings.displayName')}</label>
          <input className={styles.fieldInput} defaultValue="Jerry Wolf" />
        </div>
        <div className={styles.field}>
          <div className={styles.emailHeader}>
            <label className={styles.fieldLabel}>{t('settings.emailAddress')}</label>
            <span className={styles.verifiedBadge}>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                <path
                  d="M2 6l3 3 6-6"
                  stroke="#BDFFDB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('settings.verified')}
            </span>
          </div>
          <input
            className={styles.fieldInputDisabled}
            defaultValue="jerry.wolf@whiteboard.ai"
            readOnly
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>{t('settings.bio')}</label>
          <textarea
            className={styles.textarea}
            defaultValue="Product Designer passionate about AI and cognitive workflows. Building the future of digital ideation."
          />
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>{t('settings.timezone')}</label>
            <select className={styles.selectInput}>
              <option>PST (UTC -8)</option>
              <option>EST (UTC -5)</option>
              <option>CST (UTC +8)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>{t('settings.language')}</label>
            <select className={styles.selectInput}>
              <option>English (US)</option>
              <option>繁體中文</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.discardBtn}>{t('settings.discardChanges')}</button>
        <DemoTooltip message={t('demo.saveRequired')}>
          <button className={styles.saveBtn}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M12 1H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V4l-2-3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M4 1v4h6V1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 14v-5h7v5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {t('settings.saveProfile')}
          </button>
        </DemoTooltip>
      </div>

      <div className={styles.bentoGrid}>
        <div className={styles.bentoCard}>
          <div className={styles.bentoIcon} style={{ color: '#004AC6' }}>
            <svg width="23" height="12" viewBox="0 0 23 12" fill="none">
              <ellipse cx="6" cy="6" rx="6" ry="6" fill="currentColor" />
              <path d="M10 6h3M16 2v8M22 6h-3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h3 className={styles.bentoTitle}>{t('settings.passkeys')}</h3>
          <p className={styles.bentoDesc}>{t('settings.passkeysDesc')}</p>
        </div>
        <div className={styles.bentoCard}>
          <div className={styles.bentoIcon} style={{ color: '#006242' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1v16M1 9h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h3 className={styles.bentoTitle}>{t('settings.activityLog')}</h3>
          <p className={styles.bentoDesc}>{t('settings.activityLogDesc')}</p>
        </div>
        <div className={styles.bentoCard}>
          <div className={styles.bentoIcon} style={{ color: '#515F74' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          </div>
          <h3 className={styles.bentoTitle}>{t('settings.integrations')}</h3>
          <p className={styles.bentoDesc}>{t('settings.integrationsDesc')}</p>
        </div>
      </div>
    </>
  );
}

function PlanBillingTab() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <h1 className={styles.pageTitle}>{t('settings.planTitle')}</h1>
        <p className={styles.pageSubtitle}>{t('settings.planSubtitle')}</p>
      </div>

      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div>
            <div className={styles.planLabel}>{t('settings.currentPlan')}</div>
            <div className={styles.planName}>{t('settings.freePlan')}</div>
          </div>
          <DemoTooltip message={t('demo.upgradeRequired')}>
            <button className={styles.upgradeBtn}>{t('settings.upgrade')}</button>
          </DemoTooltip>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.planFeature}>
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            {t('settings.boards3')}
          </div>
          <div className={styles.planFeature}>
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            {t('settings.collab1')}
          </div>
          <div className={styles.planFeature}>
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            {t('settings.ai100')}
          </div>
        </div>
      </div>

      <div className={styles.usageSection}>
        <span className={styles.usageSectionTitle}>{t('settings.usageLimits')}</span>
        <div className={styles.usageItems}>
          <div className={styles.usageItem}>
            <div className={styles.usageHeader}>
              <div>
                <div className={styles.usageLabel}>{t('settings.boardsLabel')}</div>
                <div className={styles.usageDesc}>{t('settings.boardsDesc')}</div>
              </div>
              <span className={styles.usageValue}>2 / 3</span>
            </div>
            <div className={styles.usageBar}>
              <div className={styles.usageBarFill} style={{ width: '66%' }} />
            </div>
          </div>
          <div className={styles.usageItem}>
            <div className={styles.usageHeader}>
              <div>
                <div className={styles.usageLabel}>{t('settings.aiQueries')}</div>
                <div className={styles.usageDesc}>{t('settings.aiQueriesDesc')}</div>
              </div>
              <span className={styles.usageValue}>47 / 100</span>
            </div>
            <div className={styles.usageBar}>
              <div className={styles.usageBarFill} style={{ width: '47%' }} />
            </div>
          </div>
          <div className={styles.usageItemDanger}>
            <div className={styles.usageHeader}>
              <div>
                <div className={styles.usageLabel}>{t('settings.collaborators')}</div>
                <div className={styles.usageDesc}>{t('settings.collaboratorsDesc')}</div>
              </div>
              <span className={styles.usageValueDanger}>1 / 1</span>
            </div>
            <div className={styles.usageBar}>
              <div className={styles.usageBarDanger} style={{ width: '100%' }} />
            </div>
            <span className={styles.limitWarning}>{t('settings.limitReached')}</span>
          </div>
        </div>
      </div>

      <div className={styles.usageSection}>
        <span className={styles.usageSectionTitle}>{t('settings.recentActivity')}</span>
        <div className={styles.activityGrid}>
          <div className={styles.activityCard}>
            <svg className={styles.activityIcon} viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="2"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6 10h8M10 6v8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <div className={styles.activityLabel}>{t('settings.lastInvoice')}</div>
              <div className={styles.activityValue}>$0.00 (Free Tier)</div>
            </div>
          </div>
          <div className={styles.activityCard}>
            <svg className={styles.activityIcon} viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="2"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M6 6h8v8H6z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div>
              <div className={styles.activityLabel}>{t('settings.nextReset')}</div>
              <div className={styles.activityValue}>Oct 12, 2023</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TEAM_MEMBERS = [
  { name: 'Alex Rivers', email: 'alex@whiteboard.ai', role: 'Admin', isOwner: true },
  { name: 'Sarah Chen', email: 'sarah.c@design.io', role: 'Editor' },
  { name: 'Marcus Tso', email: 'm.tso@techflow.com', role: 'Editor' },
  { name: 'Elena Rodriguez', email: 'elena.r@whiteboard.ai', role: 'Viewer' },
];

function TeamTab() {
  const [inviteEmail, setInviteEmail] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <div>
        <h1 className={styles.pageTitle}>{t('settings.teamTitle')}</h1>
        <p className={styles.pageSubtitle}>{t('settings.teamSubtitle')}</p>
      </div>

      {/* Invite */}
      <div className={styles.formCard}>
        <span className={styles.usageSectionTitle}>{t('settings.inviteNewMembers')}</span>
        <div className={styles.inviteRow}>
          <input
            className={styles.fieldInput}
            style={{ flex: 1 }}
            placeholder={t('settings.invitePlaceholder')}
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <DemoTooltip message={t('demo.inviteRequired')}>
            <button className={styles.inviteBtn}>
              {' '}
              {t('settings.invite')}
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path
                  d="M1 4.5L4.5 8L10 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DemoTooltip>
        </div>
        <div className={styles.inviteHint}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="6" stroke="#006242" strokeWidth="1.5" />
            <path d="M7.5 5v3M7.5 10h0" stroke="#006242" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{t('settings.inviteHint')}</span>
        </div>
      </div>

      {/* Members */}
      <div className={styles.membersCard}>
        <div className={styles.membersHeader}>
          <span className={styles.usageSectionTitle}>{t('settings.activeMembers')}</span>
          <span className={styles.memberCountBadge}>
            {t('settings.membersCount', { count: 8 })}
          </span>
        </div>
        {TEAM_MEMBERS.map((m, i) => (
          <div key={m.email} className={i > 0 ? styles.memberRowBorder : styles.memberRow}>
            <div className={styles.memberInfo}>
              <div className={m.isOwner ? styles.memberAvatarOwner : styles.memberAvatarDefault}>
                {m.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div className={styles.memberName}>{m.name}</div>
                <div className={styles.memberEmail}>{m.email}</div>
              </div>
            </div>
            <div className={styles.memberActions}>
              <div className={styles.roleBadge}>{m.role}</div>
              <button className={styles.moreBtn}>
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                  <circle cx="2" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="2" cy="14" r="1.5" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className={styles.loadMoreFooter}>
          <button className={styles.loadMoreBtn}>
            {t('settings.loadMore')}
            <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
              <path
                d="M1 1l2.5 3L6 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Pending */}
      <div className={styles.pendingSection}>
        <div className={styles.pendingHeader}>
          <span className={styles.usageSectionTitle}>{t('settings.pendingInvitations')}</span>
          <span className={styles.pendingDot} />
        </div>
        <div className={styles.pendingCard}>
          <div className={styles.pendingInfo}>
            <div className={styles.pendingAvatar}>
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="20"
                  height="14"
                  rx="2"
                  stroke="#C3C6D7"
                  strokeWidth="1.5"
                />
                <path d="M1 3l10 6 10-6" stroke="#C3C6D7" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className={styles.pendingEmail}>jordan.smith@partner.co</div>
              <div className={styles.pendingTime}>Sent 2 hours ago</div>
            </div>
          </div>
          <button className={styles.resendBtn}>{t('settings.resend')}</button>
        </div>
      </div>

      {/* Transfer Ownership */}
      <div className={styles.dangerSection}>
        <div className={styles.dangerTitle}>{t('settings.transferOwnership')}</div>
        <p className={styles.dangerDesc}>{t('settings.transferDesc')}</p>
        <DemoTooltip message={t('demo.transferRequired')}>
          <button className={styles.dangerBtn}>{t('settings.transferOwnership')}</button>
        </DemoTooltip>
      </div>
    </>
  );
}
