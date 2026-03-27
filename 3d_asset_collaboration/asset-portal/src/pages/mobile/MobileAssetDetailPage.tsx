import { Link } from "react-router-dom";

const details = [
  ["Format", "GLB"],
  ["Vertices", "124,500"],
  ["Textures", "4"],
  ["Created", "Mar 15, 2026"],
  ["Author", "Maya Chen"],
  ["Size", "52 MB"],
];
const tags = ["shoe", "hero", "campaign-2026", "air-max"];
const versions = [
  { label: "v3 (current)", date: "Mar 20, 2026", active: true },
  { label: "v2", date: "Mar 15, 2026" },
  { label: "v1", date: "Mar 1, 2026" },
];

export default function MobileAssetDetailPage() {
  return (
    <div
      style={{
        width: 390,
        maxWidth: "100vw",
        background: "#F8F9FA",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
        paddingBottom: 77,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: 44,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(6px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Link to="/mobile/assets" style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#4648D4" strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#4648D4", letterSpacing: -0.45 }}>Library</span>
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="#4648D4" strokeWidth="1.5">
            <path d="M4 8L1 10V16H5V12H9V16H13V10L10 8" />
            <path d="M5 1H9L11 4H3L5 1Z" />
          </svg>
          <svg width="16" height="4" viewBox="0 0 16 4" fill="#4648D4">
            <circle cx="2" cy="2" r="1.5" />
            <circle cx="8" cy="2" r="1.5" />
            <circle cx="14" cy="2" r="1.5" />
          </svg>
        </div>
      </div>

      {/* Preview Image */}
      <div
        style={{
          height: 260,
          background: "#1A1A2E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.3">
          <path d="M40 5L75 22V58L40 75L5 58V22L40 5Z" stroke="#C7C4D7" strokeWidth="1.5" />
        </svg>
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(2px)",
            borderRadius: 8,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 500,
            color: "#FFF",
            letterSpacing: -0.3,
          }}
        >
          GLB &middot; 52 MB
        </span>
        <div style={{ position: "absolute", bottom: 16, display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" stroke="#FFF" strokeWidth="1">
            <path d="M6 1L11 5V10H1V5L6 1Z" />
          </svg>
          <span style={{ fontSize: 12, color: "#FFF" }}>3D preview available on desktop</span>
        </div>
      </div>

      {/* Asset Info */}
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#191C1D", letterSpacing: -0.5, margin: "0 0 16px" }}>
          Air Max 2026 — Hero Shot
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span
            style={{
              background: "#E1E0FF",
              borderRadius: 9999,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 700,
              color: "#4648D4",
            }}
          >
            Nike
          </span>
          <span
            style={{
              background: "#ECFDF5",
              borderRadius: 9999,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 700,
              color: "#10B981",
            }}
          >
            Approved
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#464554" }}>v3</span>
        </div>
        <p style={{ fontSize: 15, color: "#464554", lineHeight: "24px", margin: 0 }}>
          Hero shot render of the Air Max 2026 for Q3 campaign. Final approved version for international digital
          marketing assets.
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <button
          style={{
            width: "100%",
            height: 50,
            background: "linear-gradient(90deg, #4648D4 0%, #6063EE 100%)",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            color: "#FFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="1.5">
            <path d="M8 1V15M8 15L3 10M8 15L13 10" />
          </svg>
          Download
        </button>
        <button
          style={{
            width: "100%",
            height: 50,
            background: "#FFF",
            border: "1px solid #C7C4D7",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            color: "#191C1D",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191C1D" strokeWidth="1.5">
            <path d="M10 1L18 5V15L10 19L2 15V5L10 1Z" />
            <circle cx="10" cy="10" r="3" />
          </svg>
          Open in Unity
        </button>
      </div>

      {/* Details */}
      <div style={{ padding: "23px 24px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.65, color: "#464554", marginBottom: 12 }}>
          DETAILS
        </h2>
        <div
          style={{
            background: "#FFF",
            border: "1px solid rgba(199,196,215,0.3)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {details.map(([l, v], i) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: i < details.length - 1 ? "1px solid rgba(199,196,215,0.1)" : "none",
              }}
            >
              <span style={{ fontSize: 14, color: "#464554" }}>{l}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#191C1D" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: "0 24px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.65, color: "#464554", marginBottom: 12 }}>TAGS</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                background: "#E7E8E9",
                borderRadius: 9999,
                padding: "5px 16px",
                fontSize: 13,
                fontWeight: 500,
                color: "#191C1D",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Versions */}
      <div style={{ padding: "0 24px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.65, color: "#464554", marginBottom: 12 }}>
          VERSIONS
        </h2>
        <div
          style={{
            background: "#FFF",
            border: "1px solid rgba(199,196,215,0.3)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {versions.map((v, i) => (
            <div
              key={v.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                minHeight: 56,
                borderBottom: i < versions.length - 1 ? "1px solid rgba(199,196,215,0.1)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{ width: 8, height: 8, borderRadius: 9999, background: v.active ? "#10B981" : "#C7C4D7" }}
                />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#191C1D" }}>{v.label}</div>
                  <div style={{ fontSize: 12, color: "#464554" }}>{v.date}</div>
                </div>
              </div>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="#C7C4D7" strokeWidth="1.5" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 390,
          maxWidth: "100vw",
          background: "#FFF",
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          justifyContent: "space-around",
          padding: "4px 0 8px",
        }}
      >
        {["Library", "Search", "Activity", "Profile"].map((t, i) => (
          <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 12px" }}>
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              stroke={i === 0 ? "#4338CA" : "#94A3B8"}
              strokeWidth="1.5"
            >
              <rect x="2" y="1" width="16" height="14" rx="2" />
            </svg>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 0.25,
                color: i === 0 ? "#4338CA" : "#94A3B8",
                marginTop: 2,
              }}
            >
              {t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
