import { Link } from "react-router-dom";

const leftVersion = { label: "v2 \u2014 2026-03-15", color: "#825100", dotColor: "#825100" };
const rightVersion = { label: "v3 \u2014 2026-03-20 (current)", color: "#6FFBBE", dotColor: "#6FFBBE" };

const leftMeta = { size: "48MB", vertices: "118,200", textures: 3 };
const rightMeta = { size: "52MB", vertices: "124,500", textures: 4 };

export default function VersionComparePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1A1A2E" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: 56,
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          flexShrink: 0,
        }}
      >
        <Link
          to="/assets/1"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "#64748B",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8L10 14" stroke="#64748B" strokeWidth="1.5" />
          </svg>
          Back to Asset
        </Link>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: -0.4,
            }}
          >
            Compare Versions
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "#64748B" }}>
            Air Max 2026 \u2014 Hero Shot
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#475569" }}>
              Sync rotation
            </span>
            <div
              style={{
                width: 40,
                height: 20,
                borderRadius: 12,
                background: "#4648D4",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 12,
                  background: "#FFF",
                  position: "absolute",
                  top: 2,
                  left: 20,
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4F46E5" strokeWidth="1.5">
            <path d="M2 8A6 6 0 0 1 14 8M14 8A6 6 0 0 1 2 8" />
            <path d="M11 5L14 8L11 11" />
          </svg>
        </div>
      </div>

      {/* Main Canvas */}
      <div style={{ flex: 1, display: "flex", position: "relative" }}>
        {/* Vertical Split Line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(255,255,255,0.1)",
            zIndex: 10,
          }}
        />

        {/* Left Panel (v2) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#1A1A2E",
              opacity: 0.6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.2">
              <path d="M60 10L110 35V85L60 110L10 85V35L60 10Z" stroke="#4EDEA3" strokeWidth="1" />
              <circle cx="60" cy="60" r="30" stroke="#4EDEA3" strokeWidth="0.5" />
            </svg>
          </div>
          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 12,
              padding: "6px 16px",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 12, background: leftVersion.dotColor }} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#FFF",
                letterSpacing: 0.275,
              }}
            >
              {leftVersion.label}
            </span>
          </div>
          {/* Warning */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#A36700",
              borderRadius: 12,
              padding: "4px 12px",
            }}
          >
            <svg width="13" height="11" viewBox="0 0 13 11" fill="#FFFBFF">
              <path d="M6.5 0L13 11H0L6.5 0Z" />
            </svg>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "#FFFBFF",
                letterSpacing: 0.5,
                textTransform: "uppercase" as const,
              }}
            >
              Textures Differ
            </span>
          </div>
          {/* Toolbar */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 8,
              padding: 6,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#FFF" strokeWidth="1.2">
                  {i === 0 && (
                    <>
                      <path d="M3 7.5A4.5 4.5 0 0 1 12 7.5" />
                      <path d="M10 5L12 7.5L10 10" />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <circle cx="6.5" cy="6.5" r="4" />
                      <path d="M10 10L14 14" />
                    </>
                  )}
                  {i === 2 && <path d="M7.5 2V13M2 7.5H13" />}
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel (v3) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#1A1A2E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.4">
              <path d="M60 10L110 35V85L60 110L10 85V35L60 10Z" stroke="#6FFBBE" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="30" stroke="#6FFBBE" strokeWidth="1" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 12,
              padding: "6px 16px",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 12, background: rightVersion.dotColor }} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#FFF",
                letterSpacing: 0.275,
              }}
            >
              {rightVersion.label}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 25,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 8,
              padding: 6,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#FFF" strokeWidth="1.2">
                  {i === 0 && (
                    <>
                      <path d="M3 7.5A4.5 4.5 0 0 1 12 7.5" />
                      <path d="M10 5L12 7.5L10 10" />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <circle cx="6.5" cy="6.5" r="4" />
                      <path d="M10 10L14 14" />
                    </>
                  )}
                  {i === 2 && <path d="M7.5 2V13M2 7.5H13" />}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 32px",
          height: 64,
          background: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
          flexShrink: 0,
        }}
      >
        {/* Left meta */}
        <div style={{ display: "flex", gap: 24 }}>
          {Object.entries(leftMeta).map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "#94A3B8",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#334155" }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Diffs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#F1F3FF",
            borderRadius: 8,
            padding: "8px 16px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "#FFDAD6",
              borderRadius: 2,
              padding: "2px 8px",
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#93000A",
            }}
          >
            <span style={{ width: 7, height: 1, background: "#93000A" }} />
            \u2212 2 textures
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "#6CF8BB",
              borderRadius: 2,
              padding: "2px 8px",
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#00714D",
            }}
          >
            + 3 textures
          </span>
          <div style={{ width: 1, height: 16, background: "#CBD5E1", margin: "0 4px" }} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase" as const,
                color: "#64748B",
              }}
            >
              Vertex Diff
            </div>
            <div
              style={{
                background: "#00714D",
                borderRadius: 2,
                padding: "0 6px",
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#6CF8BB",
              }}
            >
              +6,300 (+5.3%)
            </div>
          </div>
        </div>

        {/* Right meta */}
        <div style={{ display: "flex", gap: 24, textAlign: "right" }}>
          {Object.entries(rightMeta).map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "#94A3B8",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: k === "size" ? "#4F46E5" : "#334155",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
