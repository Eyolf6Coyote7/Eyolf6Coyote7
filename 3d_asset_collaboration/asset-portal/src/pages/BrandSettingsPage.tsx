import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DemoTooltip } from "../components/DemoTooltip";

const members = [
  { name: "Sarah Bowerman", email: "sarah.b@acme-studio.io", role: "Owner", joined: "Jan 12, 2024", removable: false },
  { name: "Marcus Wood", email: "m.wood@acme-studio.io", role: "Editor", joined: "Feb 05, 2024", removable: true },
  { name: "Jessica Lane", email: "jess.l@acme-studio.io", role: "Viewer", joined: "Mar 10, 2024", removable: true },
  { name: "Tunde Kalu", email: "t.k@acme-studio.io", role: "Editor", joined: "Mar 22, 2024", removable: true },
  { name: "Elena Rossi", email: "e.rossi@acme-studio.io", role: "Viewer", joined: "Apr 02, 2024", removable: true },
];

const sharedLinks = [
  {
    name: "Summer '24 Collection Preview",
    detail: "34 Assets \u00b7 Public Access",
    status: "ACTIVE",
    statusBg: "#00885D",
    statusColor: "#FFF",
    expires: "Never",
  },
  {
    name: "Marketing Agency Assets",
    detail: "126 Assets \u00b7 Password Protected",
    status: "EXPIRED",
    statusBg: "#D6E0F4",
    statusColor: "#596374",
    expires: "May 01, 2024",
  },
];

const label: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-primary)",
  letterSpacing: -0.35,
  marginBottom: 8,
  display: "block",
};
const input: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--input-bg)",
  border: "1px solid var(--input-border)",
  borderRadius: 8,
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "var(--text-primary)",
  boxSizing: "border-box",
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
  fontSize: 30,
  fontWeight: 800,
  color: "var(--text-primary)",
  letterSpacing: -0.75,
};

export default function BrandSettingsPage() {
  const { t } = useTranslation();
  const [brandName, setBrandName] = useState("Acme Studio");
  const [desc, setDesc] = useState(
    "Acme Studio\u2019s mission is to empower creative teams with collaborative 3D asset management. We make digital creation seamless and accessible for everyone.",
  );

  return (
    <div style={{ padding: "48px 72px", maxWidth: 896 + 144, margin: "0 auto" }}>
      {/* Section 1: Brand Profile */}
      <div style={{ marginBottom: 64 }}>
        <h1 style={{ ...sectionTitle, margin: "0 0 4px" }}>Brand Profile</h1>
        <p
          style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--text-secondary)", margin: "0 0 32px" }}
        >
          Update your brand identity, logo, and core information displayed across AssetHub.
        </p>
        <div
          style={{ background: "var(--bg-surface)", boxShadow: "var(--card-shadow)", borderRadius: 12, padding: 32 }}
        >
          <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
            <div style={{ width: 256 }}>
              <span style={label}>Brand Logo</span>
              <div
                style={{
                  width: 128,
                  height: 128,
                  background: "var(--bg-elevated)",
                  border: "2px dashed var(--border)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M5 30L15 15L25 25L35 10" stroke="#4648D4" strokeWidth="2" />
                  <circle cx="30" cy="12" r="3" fill="#4648D4" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  lineHeight: "18px",
                }}
              >
                Recommended 800x800px. PNG or SVG preferred.
              </p>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <span style={label}>Brand Name</span>
                <input value={brandName} onChange={(e) => setBrandName(e.target.value)} style={input} />
              </div>
              <div>
                <span style={label}>Description</span>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  style={{ ...input, height: 106, resize: "none" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <DemoTooltip message={t("demo.saveRequired")}>
              <button
                style={{
                  padding: "10px 32px",
                  background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
                  border: "none",
                  borderRadius: 8,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#FFF",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </DemoTooltip>
          </div>
        </div>
      </div>

      {/* Section 2: Members */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h2 style={{ ...sectionTitle, margin: "0 0 4px" }}>Members</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
              Manage who has access to your brand assets and define their permission levels.
            </p>
          </div>
          <DemoTooltip message={t("demo.inviteRequired")}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
                border: "none",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFF",
                cursor: "pointer",
              }}
            >
              + Invite Member
            </button>
          </DemoTooltip>
        </div>
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
                {["User", "Role", "Joined", ""].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "16px 32px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      textTransform: "uppercase" as const,
                      color: "var(--text-secondary)",
                      textAlign: i === 3 ? "right" : "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr
                  key={m.email}
                  style={{
                    background: i % 2 === 1 ? "var(--bg-elevated)" : "var(--bg-surface)",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <td style={{ padding: "16px 32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 9999,
                          background: "var(--accent-surface)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {m.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                          }}
                        >
                          {m.name}
                        </div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--text-secondary)" }}>
                          {m.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 32px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: m.removable ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    {m.role}
                  </td>
                  <td
                    style={{
                      padding: "16px 32px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {m.joined}
                  </td>
                  <td style={{ padding: "16px 32px", textAlign: "right" }}>
                    {m.removable ? (
                      <DemoTooltip message={t("demo.removeRequired")}>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#BA1A1A",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </span>
                      </DemoTooltip>
                    ) : (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: 0.6,
                          textTransform: "uppercase" as const,
                          color: "var(--text-muted)",
                        }}
                      >
                        DEFAULT
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Shared Links */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h2 style={{ ...sectionTitle, margin: "0 0 4px" }}>Shared Links</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
              Control external access to specific asset collections and track engagement.
            </p>
          </div>
          <DemoTooltip message={t("demo.createLinkRequired")}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
                border: "none",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFF",
                cursor: "pointer",
              }}
            >
              Create Link
            </button>
          </DemoTooltip>
        </div>
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-elevated)" }}>
                {["Link Name", "Status", "Expires", "Actions"].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "16px 32px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      textTransform: "uppercase" as const,
                      color: "var(--text-secondary)",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sharedLinks.map((l) => (
                <tr key={l.name} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "16px 32px" }}>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {l.name}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--text-secondary)" }}>
                      {l.detail}
                    </div>
                  </td>
                  <td style={{ padding: "16px 32px" }}>
                    <span
                      style={{
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        background: l.statusBg,
                        color: l.statusColor,
                      }}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px 32px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {l.expires}
                  </td>
                  <td style={{ padding: "16px 32px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["copy", "disable", "delete"].map((a) => (
                        <DemoTooltip
                          key={a}
                          message={a === "delete" ? t("demo.deleteRequired") : t("demo.actionRequired")}
                        >
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              stroke={a === "delete" ? "#BA1A1A" : "var(--text-muted)"}
                              strokeWidth="1.5"
                            >
                              {a === "copy" && (
                                <>
                                  <rect x="4" y="4" width="8" height="8" rx="1" />
                                  <path d="M10 4V2H2V10H4" />
                                </>
                              )}
                              {a === "disable" && (
                                <>
                                  <circle cx="7" cy="7" r="5" />
                                  <path d="M3 11L11 3" />
                                </>
                              )}
                              {a === "delete" && (
                                <>
                                  <path d="M2 4H12M5 4V2H9V4M3 4V12H11V4" />
                                </>
                              )}
                            </svg>
                          </div>
                        </DemoTooltip>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
