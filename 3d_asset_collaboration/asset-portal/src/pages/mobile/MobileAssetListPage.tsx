import { Link } from "react-router-dom";

const assets = [
  {
    id: "1",
    name: "Air Max 2026 \u2014 Hero Shot",
    format: "GLB",
    version: "v3",
    detail: "52 MB \u00b7 3 days ago",
    brand: "Nike",
  },
  {
    id: "2",
    name: "Jumpman Pro Low Poly",
    format: "GLB",
    version: "v1",
    detail: "12 MB \u00b7 1 day ago",
    brand: "Nike",
  },
  {
    id: "3",
    name: "Superstar Classic",
    format: "GLB",
    version: "v2",
    detail: "45 MB \u00b7 5 days ago",
    brand: "Adidas",
  },
  {
    id: "4",
    name: "Tech Fleece Hoodie",
    format: "GLB",
    version: "v4",
    detail: "30 MB \u00b7 1 week ago",
    brand: "Nike",
  },
  { id: "5", name: "Forum 84 High", format: "GLB", version: "v1", detail: "55 MB \u00b7 2 days ago", brand: "Adidas" },
  {
    id: "6",
    name: "Pegasus 40 Performance",
    format: "GLB",
    version: "v2",
    detail: "48 MB \u00b7 4 days ago",
    brand: "Nike",
  },
  {
    id: "7",
    name: "Ultra Boost DNA",
    format: "GLB",
    version: "v3",
    detail: "38 MB \u00b7 1 week ago",
    brand: "Adidas",
  },
];

const navItems = [
  { label: "ASSETS", active: true },
  { label: "SEARCH" },
  { label: "NOTIFICATIONS", badge: 3 },
  { label: "PROFILE" },
];

export default function MobileAssetListPage() {
  return (
    <div
      style={{
        width: 390,
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "#F9F9FF",
        margin: "0 auto",
        position: "relative",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 32px 8px",
          height: 23,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#191C1D" }}>9:41</span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: 64,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#4F46E5",
              letterSpacing: -0.45,
            }}
          >
            Nike
          </span>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#4F46E5" strokeWidth="1.5" />
          </svg>
        </div>
        <div style={{ position: "relative", padding: 8 }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="#64748B" strokeWidth="1.5">
            <path d="M1 1H17M1 6H17M1 11H17" />
          </svg>
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#BA1A1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FFF" }}>2</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "8px 16px", background: "#F1F3FF" }}>
        <div style={{ position: "relative" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="#767586"
            strokeWidth="1.5"
            style={{ position: "absolute", left: 15, top: 13 }}
          >
            <circle cx="7.5" cy="7.5" r="5" />
            <path d="M11.5 11.5L15.5 15.5" />
          </svg>
          <input
            placeholder="Search assets..."
            style={{
              width: "100%",
              padding: "11px 16px 11px 40px",
              background: "#FFF",
              border: "1px solid rgba(199,196,215,0.2)",
              borderRadius: 12,
              fontSize: 16,
              color: "#191C1D",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          height: 36,
          background: "rgba(70,72,212,0.05)",
          gap: 8,
        }}
      >
        {["GLB", "NIKE"].map((f) => (
          <span
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#BDBEFE",
              borderRadius: 9999,
              padding: "4px 12px",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.55,
                textTransform: "uppercase" as const,
                color: "#494B83",
              }}
            >
              {f}
            </span>
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M1 1L7 7M7 1L1 7" stroke="#494B83" strokeWidth="1.2" />
            </svg>
          </span>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.55,
            textTransform: "uppercase" as const,
            color: "#4648D4",
          }}
        >
          CLEAR ALL
        </span>
      </div>

      {/* Asset list */}
      <div style={{ paddingBottom: 88 }}>
        {assets.map((a) => (
          <Link to={`/mobile/assets/${a.id}`} key={a.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 16,
                height: 100,
                borderBottom: "1px solid rgba(199,196,215,0.1)",
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 8,
                  background: "#1A1A2E",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.3">
                  <path d="M16 2L30 9V23L16 30L2 23V9L16 2Z" stroke="#C7C4D7" strokeWidth="1" />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 4,
                    padding: "2px 6px",
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: 0.8,
                    color: "#FFF",
                  }}
                >
                  {a.format}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 600, color: "#141B2B" }}>
                    {a.name}
                  </span>
                  <span
                    style={{
                      background: "#BDBEFE",
                      borderRadius: 9999,
                      padding: "2px 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#494B83",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {a.brand}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span
                    style={{
                      background: "rgba(70,72,212,0.1)",
                      borderRadius: 4,
                      padding: "0 6px",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#4648D4",
                    }}
                  >
                    {a.version}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#464554" }}>{a.detail}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
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
          background: "rgba(255,255,255,0.8)",
          borderTop: "1px solid rgba(241,245,249,0.2)",
          boxShadow: "0px -10px 30px rgba(73,75,214,0.05)",
          backdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 0 32px",
        }}
      >
        {navItems.map((n) => (
          <div
            key={n.label}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke={n.active ? "#4F46E5" : "#94A3B8"}
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="16" height="16" rx="3" />
            </svg>
            {n.badge && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -6,
                  width: 16,
                  height: 16,
                  borderRadius: 9999,
                  background: "#BA1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 8, fontWeight: 700, color: "#FFF" }}>{n.badge}</span>
              </div>
            )}
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: 0.25,
                textTransform: "uppercase" as const,
                color: n.active ? "#4F46E5" : "#94A3B8",
                marginTop: 4,
              }}
            >
              {n.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
