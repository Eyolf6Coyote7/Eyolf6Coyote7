import { useState } from "react";

const apiKeys = [
  { name: "Unity Client", lastUsed: "Last used 2h ago", key: "sk_••••••••••••v9f7", created: "Oct 12, 2023" },
  { name: "CI/CD Pipeline", lastUsed: "Last used 1d ago", key: "sk_••••••••••••n2k1", created: "Aug 01, 2023" },
  { name: "Dev Testing", lastUsed: "Never used", key: "sk_••••••••••••a8y3", created: "Jan 14, 2024", warn: true },
];

const notifications = [
  { title: "Asset uploaded", desc: "When a new asset is added to your project", channels: "EMAIL + PUSH", on: true },
  { title: "New version", desc: "When an existing asset is updated", channels: "EMAIL + PUSH", on: true },
  { title: "IoT alert critical", desc: "Immediate notification for system failures", channels: "PUSH ONLY", on: true },
  { title: "IoT alert warning", desc: "Non-critical performance warnings", channels: "PUSH ONLY", on: false },
  { title: "Someone shares", desc: "When an asset is shared with you", channels: "EMAIL + PUSH", on: true },
  { title: "Weekly digest", desc: "A summary of your account activity", channels: "EMAIL", on: false },
];

const sectionCard: React.CSSProperties = {
  background: "#FFF",
  boxShadow: "0px 1px 2px rgba(99,102,241,0.05)",
  borderRadius: 12,
  padding: 40,
};
const heading: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 24,
  fontWeight: 600,
  color: "#191C1D",
  margin: "0 0 4px",
};
const subtext: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 16,
  color: "#464554",
  margin: "0 0 32px",
};

export default function AccountPage() {
  const [notifState, setNotifState] = useState(notifications.map((n) => n.on));

  return (
    <div style={{ padding: "32px 112px", maxWidth: 1024 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 48, maxWidth: 800 }}>
        {/* Profile */}
        <div style={sectionCard}>
          <h1 style={heading}>Profile</h1>
          <p style={subtext}>Manage your personal information</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              paddingBottom: 40,
              borderBottom: "1px solid #EDEEEF",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 9999,
                background: "#4648D4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 30, fontWeight: 700, color: "#FFF" }}>MW</span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#4648D4",
                  cursor: "pointer",
                }}
              >
                Change avatar
              </span>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#464554", marginTop: 4 }}>
                JPG, GIF or PNG. Max size of 800K
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: 32 }}>
            {[
              { label: "Full Name", value: "Maya Watanabe" },
              { label: "Email", value: "maya@company.com", badge: "MANAGED BY SSO" },
              { label: "Job Title", value: "3D Artist" },
              { label: "Time Zone", value: "UTC-8 (Pacific Time)", select: true },
            ].map((f) => (
              <div key={f.label}>
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#464554",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {f.label}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    defaultValue={f.value}
                    readOnly={!!f.badge}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: f.badge ? "#EDEEEF" : "#F3F4F5",
                      border: "none",
                      borderRadius: 12,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      color: f.badge ? "#464554" : "#191C1D",
                      boxSizing: "border-box",
                    }}
                  />
                  {f.badge && (
                    <span
                      style={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "#E1E0FF",
                        borderRadius: 4,
                        padding: "4px 8px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textTransform: "uppercase" as const,
                        color: "#4648D4",
                      }}
                    >
                      {f.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            style={{
              padding: "12px 32px",
              background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
              border: "none",
              borderRadius: 12,
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#FFF",
              cursor: "pointer",
              boxShadow: "0px 4px 6px -1px rgba(70,72,212,0.2)",
            }}
          >
            Save Profile
          </button>
        </div>

        {/* API Keys */}
        <div style={sectionCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
            <div>
              <h2 style={heading}>API Keys</h2>
              <p style={{ ...subtext, margin: 0 }}>Manage machine-to-machine authentication keys</p>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                background: "#E7E8E9",
                border: "none",
                borderRadius: 12,
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: "#191C1D",
                cursor: "pointer",
              }}
            >
              + Generate New Key
            </button>
          </div>
          <div
            style={{
              background: "rgba(255,220,197,0.3)",
              borderLeft: "4px solid #904900",
              borderRadius: "0 12px 12px 0",
              padding: 16,
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <svg width="22" height="19" viewBox="0 0 22 19" fill="#904900">
              <path d="M11 0L22 19H0L11 0ZM11 7V12M11 14V16" />
            </svg>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#703700" }}>
              Never share your API keys in public repositories or client-side code.
            </span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #EDEEEF" }}>
                {["Name", "Key", "Created", "Actions"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "1px 8px 16px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase" as const,
                      color: "rgba(70,69,84,0.6)",
                      textAlign: i === 3 ? "right" : "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((k, i) => (
                <tr key={i} style={{ borderTop: i > 0 ? "1px solid #EDEEEF" : "none" }}>
                  <td style={{ padding: "20px 8px" }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#191C1D" }}>
                      {k.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12,
                        fontWeight: k.warn ? 500 : 400,
                        color: k.warn ? "#904900" : "#464554",
                      }}
                    >
                      {k.lastUsed}
                    </div>
                  </td>
                  <td style={{ padding: "20px 8px" }}>
                    <code
                      style={{
                        background: "#EDEEEF",
                        borderRadius: 4,
                        padding: "3px 8px",
                        fontFamily: "Liberation Mono, monospace",
                        fontSize: 12,
                        letterSpacing: 1.2,
                        color: "#191C1D",
                      }}
                    >
                      {k.key}
                    </code>
                  </td>
                  <td style={{ padding: "20px 8px", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#464554" }}>
                    {k.created}
                  </td>
                  <td style={{ padding: "20px 8px", textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#BA1A1A",
                        cursor: "pointer",
                        opacity: 0.7,
                      }}
                    >
                      Revoke
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications */}
        <div style={sectionCard}>
          <h2 style={heading}>Notifications</h2>
          <p style={subtext}>Choose what you want to be notified about</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {notifications.map((n, i) => (
              <div
                key={n.title}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid #EDEEEF",
                }}
              >
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#191C1D" }}>
                    {n.title}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#464554" }}>{n.desc}</div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: -0.5,
                      textTransform: "uppercase" as const,
                      color: "#4648D4",
                      marginTop: 4,
                    }}
                  >
                    {n.channels}
                  </div>
                </div>
                <div
                  onClick={() => {
                    const s = [...notifState];
                    s[i] = !s[i];
                    setNotifState(s);
                  }}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 9999,
                    background: notifState[i] ? "#4648D4" : "#E1E3E4",
                    position: "relative",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                      background: "#FFF",
                      border: "1px solid #FFF",
                      position: "absolute",
                      top: 2,
                      left: notifState[i] ? 22 : 2,
                      transition: "left 0.2s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
