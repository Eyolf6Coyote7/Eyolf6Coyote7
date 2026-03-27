const accountItems = [
  { icon: "user", label: "Edit Profile" },
  { icon: "key", label: "API Keys", badge: "3" },
  { icon: "brand", label: "Brand: Nike" },
];
const notifItems = [
  { label: "Push Notifications", on: true },
  { label: "Email Notifications", on: true },
  { label: "IoT Alerts", on: true, green: true },
  { label: "Weekly Digest", on: false },
];
const prefItems = [
  { label: "Language", value: "English" },
  { label: "Time Zone", value: "UTC-8 Pacific" },
  { label: "Appearance", value: "System" },
];
const supportItems = [
  { label: "Help Center", external: true },
  { label: "Contact Support" },
  { label: "About", value: "v1.2.0" },
];

export default function MobileProfilePage() {
  return (
    <div
      style={{
        width: 390,
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "#F9F9FE",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
        paddingBottom: 72,
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "11px 32px 12px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1C1F" }}>9:41</span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: 44,
          background: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid rgba(226,232,240,0.5)",
          backdropFilter: "blur(6px)",
        }}
      >
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
          <path d="M9 1L1 8.5L9 16" stroke="#4F46E5" strokeWidth="1.5" />
        </svg>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#1A1C1F", letterSpacing: -0.4 }}>Profile</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4F46E5" strokeWidth="1.5">
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="2" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 23 }}>
        {/* User Card */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#FFF",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            borderRadius: 12,
            padding: "15px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 9999,
                background: "#4648D4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, color: "#FFF" }}>MW</span>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#1A1C1F" }}>Maya Watanabe</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#464554" }}>maya@company.com</div>
              <div style={{ fontSize: 14, color: "#767586", marginTop: 1 }}>3D Artist &middot; Nike</div>
            </div>
          </div>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1 1L6 6L1 11" stroke="#C7C4D7" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Account */}
        <Section title="ACCOUNT">
          {accountItems.map((item, i) => (
            <Row key={item.label} label={item.label} badge={item.badge} last={i === accountItems.length - 1} />
          ))}
        </Section>

        {/* Notifications */}
        <Section title="NOTIFICATIONS">
          {notifItems.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                height: 48,
                borderBottom: i < notifItems.length - 1 ? "1px solid #EDEDF2" : "none",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: "#1A1C1F" }}>{item.label}</span>
              <div
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 9999,
                  background: item.on ? (item.green ? "#10B981" : "#2563EB") : "#E1E3E4",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 9999,
                    background: "#FFF",
                    position: "absolute",
                    top: 2,
                    left: item.on ? 22 : 2,
                    boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>
          ))}
        </Section>

        {/* Preferences */}
        <Section title="PREFERENCES">
          {prefItems.map((item, i) => (
            <Row key={item.label} label={item.label} value={item.value} last={i === prefItems.length - 1} />
          ))}
        </Section>

        {/* Support */}
        <Section title="SUPPORT">
          {supportItems.map((item, i) => (
            <Row key={item.label} label={item.label} value={item.value} last={i === supportItems.length - 1} />
          ))}
        </Section>

        {/* Logout */}
        <div
          style={{
            background: "#FFF",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 49,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: "#EF4444" }}>Log Out</span>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "33px 0 32px" }}>
          <div style={{ fontSize: 12, color: "#94A3B8" }}>Version 2.4.0 (Build 102)</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 4 }}>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Terms of Service</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Privacy Policy</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#CBD5E1", marginTop: 4 }}>Build 2026.03.20</div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.65,
          textTransform: "uppercase" as const,
          color: "#767586",
          marginBottom: 8,
          paddingLeft: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{ background: "#FFF", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", borderRadius: 12, overflow: "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, badge, last }: { label: string; value?: string; badge?: string; last?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: 48,
        borderBottom: last ? "none" : "1px solid #EDEDF2",
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 500, color: "#1A1C1F" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {value && <span style={{ fontSize: 15, color: "#767586" }}>{value}</span>}
        {badge && (
          <span
            style={{
              background: "#F3F3F8",
              borderRadius: 8,
              padding: "2px 8px",
              fontSize: 13,
              fontWeight: 700,
              color: "#767586",
            }}
          >
            {badge}
          </span>
        )}
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path d="M1 1L6 6L1 11" stroke="#C7C4D7" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
