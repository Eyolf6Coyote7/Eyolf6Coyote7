import { useState } from 'react';
import styles from './AccountSettingsPage.module.css';

const NAV_ITEMS = [
  { label: 'Profile', icon: 'user' },
  { label: 'Plan & Billing', icon: 'card' },
  { label: 'Team', icon: 'users' },
  { label: 'Notifications', icon: 'bell' },
  { label: 'Security', icon: 'shield' },
];

export function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

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
          <h2 className={styles.sidebarTitle}>Account Settings</h2>
          <p className={styles.sidebarSubtitle}>Management</p>
        </div>
        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
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
              {item.label}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>System status normal</span>
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
              <h1 className={styles.pageTitle}>{NAV_ITEMS[activeTab].label}</h1>
              <p className={styles.pageSubtitle}>Coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProfileTab() {
  return (
    <>
      <div>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Manage your public identity and account information.</p>
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
          <label className={styles.fieldLabel}>Display Name</label>
          <input className={styles.fieldInput} defaultValue="Jerry Wolf" />
        </div>
        <div className={styles.field}>
          <div className={styles.emailHeader}>
            <label className={styles.fieldLabel}>Email Address</label>
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
              Verified
            </span>
          </div>
          <input
            className={styles.fieldInputDisabled}
            defaultValue="jerry.wolf@whiteboard.ai"
            readOnly
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Bio</label>
          <textarea
            className={styles.textarea}
            defaultValue="Product Designer passionate about AI and cognitive workflows. Building the future of digital ideation."
          />
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Timezone</label>
            <select className={styles.selectInput}>
              <option>PST (UTC -8)</option>
              <option>EST (UTC -5)</option>
              <option>CST (UTC +8)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Language</label>
            <select className={styles.selectInput}>
              <option>English (US)</option>
              <option>繁體中文</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.discardBtn}>Discard Changes</button>
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
          Save Profile
        </button>
      </div>

      <div className={styles.bentoGrid}>
        <div className={styles.bentoCard}>
          <div className={styles.bentoIcon} style={{ color: '#004AC6' }}>
            <svg width="23" height="12" viewBox="0 0 23 12" fill="none">
              <ellipse cx="6" cy="6" rx="6" ry="6" fill="currentColor" />
              <path d="M10 6h3M16 2v8M22 6h-3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h3 className={styles.bentoTitle}>Passkeys</h3>
          <p className={styles.bentoDesc}>Enable biometric login for faster access.</p>
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
          <h3 className={styles.bentoTitle}>Activity Log</h3>
          <p className={styles.bentoDesc}>Review your recent security events.</p>
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
          <h3 className={styles.bentoTitle}>Integrations</h3>
          <p className={styles.bentoDesc}>Connect your external creative tools.</p>
        </div>
      </div>
    </>
  );
}

function PlanBillingTab() {
  return (
    <>
      <div>
        <h1 className={styles.pageTitle}>Plan & Billing</h1>
        <p className={styles.pageSubtitle}>
          Manage your subscription, usage limits and billing history.
        </p>
      </div>

      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div>
            <div className={styles.planLabel}>Current Plan</div>
            <div className={styles.planName}>Free Plan</div>
          </div>
          <button className={styles.upgradeBtn}>Upgrade</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className={styles.planFeature}>
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            3 boards
          </div>
          <div className={styles.planFeature}>
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            1 collaborator per board
          </div>
          <div className={styles.planFeature}>
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            100 AI queries/month
          </div>
        </div>
      </div>

      <div className={styles.usageSection}>
        <span className={styles.usageSectionTitle}>Usage Limits</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className={styles.usageItem}>
            <div className={styles.usageHeader}>
              <div>
                <div className={styles.usageLabel}>Boards</div>
                <div className={styles.usageDesc}>Active workspace canvases</div>
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
                <div className={styles.usageLabel}>AI Queries</div>
                <div className={styles.usageDesc}>Whiteboard AI assistant requests</div>
              </div>
              <span className={styles.usageValue}>47 / 100</span>
            </div>
            <div className={styles.usageBar}>
              <div className={styles.usageBarFill} style={{ width: '47%' }} />
            </div>
          </div>
          <div
            className={styles.usageItem}
            style={{ opacity: 0.5, borderTop: '1px solid #EDEEEF', paddingTop: 16 }}
          >
            <div className={styles.usageHeader}>
              <div>
                <div className={styles.usageLabel}>Collaborators</div>
                <div className={styles.usageDesc}>Team members invited to boards</div>
              </div>
              <span className={styles.usageValue} style={{ color: '#BA1A1A' }}>
                1 / 1
              </span>
            </div>
            <div className={styles.usageBar}>
              <div className={styles.usageBarDanger} style={{ width: '100%' }} />
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: -0.5,
                textTransform: 'uppercase' as const,
                color: '#BA1A1A',
              }}
            >
              Limit reached — Upgrade to add more
            </span>
          </div>
        </div>
      </div>

      <div className={styles.usageSection}>
        <span className={styles.usageSectionTitle}>Recent Activity</span>
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
              <div className={styles.activityLabel}>Last Invoice</div>
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
              <div className={styles.activityLabel}>Next Reset</div>
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

  return (
    <>
      <div>
        <h1 className={styles.pageTitle}>Your Team</h1>
        <p className={styles.pageSubtitle}>
          Manage your collaborators, invite new team members, and control workspace permissions from
          one editorial dashboard.
        </p>
      </div>

      {/* Invite */}
      <div className={styles.formCard}>
        <span className={styles.usageSectionTitle}>Invite New Members</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            className={styles.fieldInput}
            style={{ flex: 1 }}
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <button className={styles.saveBtn} style={{ height: 48, padding: '14px 24px', gap: 8 }}>
            Invite
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="6" stroke="#006242" strokeWidth="1.5" />
            <path d="M7.5 5v3M7.5 10h0" stroke="#006242" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, color: '#434655' }}>
            Invited members will receive an email with instructions to join the Whiteboard AI
            workspace.
          </span>
        </div>
      </div>

      {/* Members */}
      <div className={styles.formCard} style={{ padding: 0, gap: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 32px',
            borderBottom: '1px solid rgba(193,198,215,0.1)',
          }}
        >
          <span className={styles.usageSectionTitle}>Active Members</span>
          <span
            style={{
              padding: '4px 8px',
              background: '#D5E3FC',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
              color: '#57657A',
            }}
          >
            8 Members
          </span>
        </div>
        {TEAM_MEMBERS.map((m, i) => (
          <div
            key={m.email}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 32px',
              borderTop: i > 0 ? '1px solid rgba(193,198,215,0.1)' : undefined,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 9999,
                  border: m.isOwner
                    ? '2px solid rgba(0,74,198,0.2)'
                    : '1px solid rgba(195,198,215,0.2)',
                  background: '#E7E8E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#414754',
                }}
              >
                {m.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#191C1D' }}>{m.name}</div>
                <div style={{ fontSize: 14, color: '#434655' }}>{m.email}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  padding: '8px 12px',
                  background: '#F3F4F5',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#434655',
                }}
              >
                {m.role}
              </div>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#C3C6D7',
                  padding: 8,
                }}
              >
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                  <circle cx="2" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="2" cy="14" r="1.5" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '24px 32px',
            background: 'rgba(243,244,245,0.5)',
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14,
              color: '#004AC6',
              fontFamily: 'Inter,sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Load more team members
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
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <span className={styles.usageSectionTitle}>Pending Invitations</span>
          <span style={{ width: 6, height: 6, background: '#BA1A1A', borderRadius: 9999 }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: '#F3F4F5',
            border: '1px solid rgba(195,198,215,0.1)',
            borderRadius: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                background: '#E7E8E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
              <div style={{ fontWeight: 700, fontSize: 14, color: '#191C1D' }}>
                jordan.smith@partner.co
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase' as const,
                  color: '#C3C6D7',
                }}
              >
                Sent 2 hours ago
              </div>
            </div>
          </div>
          <button
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              background: 'none',
              border: 'none',
              fontWeight: 700,
              fontSize: 12,
              color: '#434655',
              cursor: 'pointer',
              fontFamily: 'Inter,sans-serif',
            }}
          >
            Resend
          </button>
        </div>
      </div>

      {/* Transfer Ownership */}
      <div style={{ borderTop: '1px solid rgba(195,198,215,0.2)', paddingTop: 32 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 0.7,
            textTransform: 'uppercase' as const,
            color: '#BA1A1A',
            marginBottom: 16,
          }}
        >
          Transfer Ownership
        </div>
        <p style={{ fontSize: 12, lineHeight: '16px', color: '#434655', margin: '0 0 8px' }}>
          Changing the primary owner of this workspace will transfer all billing responsibilities
          and administrative rights. This action is permanent.
        </p>
        <button
          style={{
            padding: '8px 16px',
            border: '1px solid rgba(186,26,46,0.2)',
            borderRadius: 8,
            background: 'none',
            fontWeight: 700,
            fontSize: 14,
            color: '#BA1A1A',
            cursor: 'pointer',
            fontFamily: 'Inter,sans-serif',
          }}
        >
          Transfer Ownership
        </button>
      </div>
    </>
  );
}
