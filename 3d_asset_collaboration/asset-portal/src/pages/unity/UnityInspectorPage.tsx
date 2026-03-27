import { Link } from "react-router-dom";

const details = [
  ["FORMAT", "GLB"],
  ["VERTICES", "124,500"],
  ["TEXTURES", "4 (4K)"],
  ["SIZE", "52 MB"],
  ["CREATED", "2026-03-15"],
  ["UPDATED", "2026-03-20"],
];
const tags = ["shoe", "hero", "campaign-2026", "air-max"];
const versions = [
  { id: "v3", label: "v3", date: "2026-03-20", current: true, badge: "CURRENT" },
  { id: "v2", label: "v2", date: "2026-03-15" },
  { id: "v1", label: "v1", date: "2026-03-01" },
];

export default function UnityInspectorPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#10102C" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: 64,
          background: "#10102C",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#E2DFFF",
              letterSpacing: -1,
            }}
          >
            Digital Observatory
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["DESIGN", "ANIMATE", "SYNC", "RENDER"].map((t, i) => (
              <span
                key={t}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: 0.55,
                  textTransform: "uppercase" as const,
                  color: i === 2 ? "#E2DFFF" : "#C7C4D7",
                  borderBottom: i === 2 ? "2px solid #6366F1" : "none",
                  paddingBottom: i === 2 ? 4 : 0,
                  cursor: "pointer",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="#818CF8" strokeWidth="1.5">
                <circle cx="9.5" cy="9.5" r="7" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", paddingLeft: 80 }}>
        {/* Left sidebar nav */}
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 64,
            width: 80,
            height: "calc(100vh - 64px)",
            background: "#10102C",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 0",
            gap: 16,
            zIndex: 10,
          }}
        >
          {["ULTRA", "HIERARCHY", "PROJECT", "CONSOLE", "INSPECTOR", "ASSETS"].map((label, i) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: i === 2 ? "#6366F1" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke={i === 2 ? "#FFF" : "#818CF8"}
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="14" height="14" rx="2" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textTransform: "uppercase" as const,
                  color: i === 2 ? "#FFF" : "#818CF8",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Main dimmed grid */}
        <div style={{ flex: 1, padding: 24, opacity: 0.4, overflow: "auto" }}>
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.1,
                textTransform: "uppercase" as const,
                color: "#C7C4D7",
                marginBottom: 8,
              }}
            >
              PROJECT / ASSETS / MODELS / FOOTWEAR
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#E2DFFF" }}>
              Campaign Assets 2026
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {["Air Max 2026", "Cortez Low Poly", "Stadium Bleachers", "Sky HDR Sunset"].map((n, i) => (
              <div
                key={n}
                style={{
                  background: "#1D1D39",
                  border: i === 0 ? "2px solid rgba(192,193,255,0.4)" : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 132,
                    background: "#272744",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" opacity="0.2">
                    <path d="M15 2L28 9V21L15 28L2 21V9L15 2Z" stroke="#C7C4D7" strokeWidth="1" />
                  </svg>
                </div>
                <div style={{ padding: 12 }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 0.55,
                      textTransform: "uppercase" as const,
                      color: "#E2DFFF",
                    }}
                  >
                    {n}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#C7C4D7" }}>
                    GLB &middot; 52 MB
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspector Panel */}
        <div
          style={{
            width: 360,
            background: "#1E1E3A",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
            overflowY: "auto",
            boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
              height: 48,
              background: "#252547",
            }}
          >
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#E5E7EB" }}>
              Inspector
            </span>
            <div style={{ display: "flex", gap: 12 }}>
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="#6B7280" strokeWidth="1.5">
                <path d="M1 1L7 7.5L1 14" />
              </svg>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#6B7280" strokeWidth="1.5">
                <path d="M1 1L9 9M9 1L1 9" />
              </svg>
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              height: 240,
              background: "#0F0F23",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.4">
              <path d="M40 5L75 23V57L40 75L5 57V23L40 5Z" stroke="#6366F1" strokeWidth="1.5" />
              <circle cx="40" cy="40" r="20" stroke="#6366F1" strokeWidth="1" />
            </svg>
            <span
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                background: "rgba(0,0,0,0.6)",
                borderRadius: 4,
                padding: "2px 8px",
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "#FFF",
                letterSpacing: 1,
              }}
            >
              GLB
            </span>
            <span
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                background: "rgba(0,0,0,0.6)",
                borderRadius: 4,
                padding: "2px 8px",
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "#FFF",
                letterSpacing: 1,
                textTransform: "uppercase" as const,
              }}
            >
              52 MB
            </span>
          </div>

          {/* Content */}
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Title + Pills */}
            <div>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#E5E7EB",
                  margin: "0 0 12px",
                }}
              >
                Air Max 2026 — Hero Shot
              </h2>
              <div style={{ display: "flex", gap: 8 }}>
                <span
                  style={{
                    background: "#4F46E5",
                    borderRadius: 9999,
                    padding: "4px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase" as const,
                    color: "#FFF",
                  }}
                >
                  NIKE
                </span>
                <span
                  style={{
                    background: "#10B981",
                    borderRadius: 9999,
                    padding: "4px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase" as const,
                    color: "#FFF",
                  }}
                >
                  APPROVED
                </span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.1,
                  textTransform: "uppercase" as const,
                  color: "#6B7280",
                  marginBottom: 16,
                }}
              >
                Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {details.map(([l, v]) => (
                  <div key={l}>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 500,
                        textTransform: "uppercase" as const,
                        color: "#C7C4D7",
                        marginBottom: 4,
                      }}
                    >
                      {l}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#E2DFFF" }}>
                      {v}
                    </div>
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: "uppercase" as const,
                      color: "#C7C4D7",
                      marginBottom: 4,
                    }}
                  >
                    BY
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 9999,
                        background: "#00885D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 700, color: "#FFF" }}>
                        MC
                      </span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#E2DFFF" }}>
                      Maya Chen
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.1,
                  textTransform: "uppercase" as const,
                  color: "#6B7280",
                  marginBottom: 12,
                }}
              >
                Tags
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "#252547",
                      borderRadius: 4,
                      padding: "4px 8px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: "#C7C4D7",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Versions */}
            <div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.1,
                  textTransform: "uppercase" as const,
                  color: "#6B7280",
                  marginBottom: 16,
                }}
              >
                Version History
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {versions.map((v) => (
                  <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 9999,
                        background: v.current ? "#6366F1" : "rgba(107,114,128,0.4)",
                        boxShadow: v.current ? "0px 0px 0px 4px rgba(99,102,241,0.2)" : "none",
                      }}
                    />
                    <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: v.current ? "#E2DFFF" : "#C7C4D7",
                          }}
                        >
                          {v.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 10,
                            color: "#C7C4D7",
                            opacity: v.current ? 1 : 0.6,
                          }}
                        >
                          {v.date}
                        </span>
                      </div>
                      {v.badge && (
                        <span
                          style={{
                            background: "rgba(16,185,129,0.1)",
                            borderRadius: 4,
                            padding: "2px 6px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: "uppercase" as const,
                            color: "#10B981",
                          }}
                        >
                          {v.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/unity/browser"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#6366F1",
                  marginTop: 12,
                  textDecoration: "none",
                }}
              >
                COMPARE VERSIONS &rarr;
              </Link>
            </div>

            {/* Download button */}
            <button
              style={{
                width: "100%",
                height: 44,
                background: "#6366F1",
                border: "none",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFF",
                cursor: "pointer",
              }}
            >
              Download to Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
