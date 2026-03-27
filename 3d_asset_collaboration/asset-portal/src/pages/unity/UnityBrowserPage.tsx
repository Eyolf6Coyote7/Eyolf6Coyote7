import { Link } from "react-router-dom";

const assets = [
  { id: "1", name: "Air Max Foundry v3", format: "GLB", size: "52.4 MB", version: "v3.41", selected: true },
  { id: "2", name: "Lase Bottle Fragrance", format: "FBX", size: "10.2 MB", version: "v2" },
  { id: "3", name: "HyperSport Concept", format: "GLB", size: "142.1 MB", version: "v2" },
  { id: "4", name: "Cyber Goggle Mk.II", format: "OBJ", size: "24.5 MB", version: "v1.2" },
  { id: "5", name: "Core Apparel Tee", format: "GLB", size: "3 MB", version: "v2.2" },
  { id: "6", name: "Brutalist Bench v2", format: "GLB", size: "6.4 MB", version: "v2.8" },
  { id: "7", name: "Task Chair Pro", format: "GLB", size: "21.0 MB", version: "v3.1" },
  { id: "8", name: "Horizon Watch S1", format: "OBJ", size: "15.7 MB", version: "v4.1" },
  { id: "9", name: "Explorer Pack v2", format: "GLB", size: "41.2 MB", version: "v2" },
  { id: "10", name: "Studio Audio X", format: "GLB", size: "21.9 MB", version: "v2.3" },
  { id: "11", name: "Retro Cam 35mm", format: "GLB", size: "16.1 MB", version: "v1.4" },
  { id: "12", name: "Falcon Drone Pro", format: "GLB", size: "67.0 MB", version: "v2.3" },
];

const sideNavItems = ["All Assets", "GLB", "FBX", "OBJ"];

export default function UnityBrowserPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#111125" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: 64,
          background: "#1A1A2E",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              background: "#C0C1FF",
              borderRadius: 12,
              padding: "4px 12px",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#1000A9",
              letterSpacing: -0.4,
            }}
          >
            N3e
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#E2E0FC" }}>
            Asset Browser
          </span>
        </div>
        <div style={{ flex: 1, maxWidth: 400, margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#C7C4D7"
              strokeWidth="1.5"
              style={{ position: "absolute", left: 12, top: 10 }}
            >
              <circle cx="6" cy="6" r="4.5" />
              <path d="M10 10L13 13" />
            </svg>
            <input
              placeholder="Search assets..."
              style={{
                width: "100%",
                padding: "7px 16px 8px 40px",
                background: "#0C0C1F",
                border: "1px solid rgba(70,69,84,0.15)",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#C7C4D7",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
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
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#C7C4D7" strokeWidth="1.5">
                {i === 0 && (
                  <>
                    <rect x="1" y="1" width="6" height="6" rx="1" />
                    <rect x="9" y="1" width="6" height="6" rx="1" />
                    <rect x="1" y="9" width="6" height="6" rx="1" />
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                  </>
                )}
                {i === 1 && <path d="M1 3H15M1 8H15M1 13H15" />}
                {i === 2 && (
                  <>
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5V11M5 8H11" />
                  </>
                )}
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 256,
            background: "#1A1A2E",
            padding: "16px 0",
            flexShrink: 0,
            boxShadow: "32px 0 32px rgba(12,12,31,0.5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "0 24px", marginBottom: 24 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 900, color: "#E2E0FC" }}>
              AssetHub 3D
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#C7C4D7" }}>142 assets</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 8px" }}>
            {sideNavItems.map((item, i) => (
              <div
                key={item}
                style={{
                  padding: "12px 16px",
                  borderRadius: 4,
                  background: i === 0 ? "#C0C1FF" : "transparent",
                  opacity: 0.9,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke={i === 0 ? "#1000A9" : "#C7C4D7"}
                  strokeWidth="1.5"
                >
                  <rect x="1" y="1" width="14" height="14" rx="2" />
                </svg>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: i === 0 ? "#1000A9" : "#C7C4D7",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", padding: "16px 24px", borderTop: "1px solid rgba(70,69,84,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 12,
                  background: "#8083FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#1000A9" }}>
                  JD
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#E2E0FC" }}>
                  John Doe
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 500, color: "#C7C4D7" }}>
                  Technical Artist
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div style={{ flex: 1, padding: 24, overflow: "auto", background: "#111125" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {assets.map((a) => (
              <Link to={`/unity/inspector/${a.id}`} key={a.id} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "#28283D",
                    border: a.selected ? "2px solid #C0C1FF" : "1px solid rgba(255,255,255,0.05)",
                    boxShadow: a.selected ? "0px 0px 20px rgba(192,193,255,0.2)" : "none",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 160,
                      background: "#0C0C1F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.2">
                      <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="#C7C4D7" strokeWidth="1" />
                    </svg>
                    <span
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: a.selected ? "#C0C1FF" : "#333348",
                        borderRadius: 2,
                        padding: "2px 6px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 900,
                        textTransform: "uppercase" as const,
                        color: a.selected ? "#1000A9" : "#C7C4D7",
                      }}
                    >
                      {a.format}
                    </span>
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span
                        style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#E5E7EB" }}
                      >
                        {a.name}
                      </span>
                      <span
                        style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700, color: "#C0C1FF" }}
                      >
                        {a.version}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#C7C4D7" }}>
                        {a.format}
                      </span>
                      <span
                        style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "#C7C4D7" }}
                      >
                        {a.size}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: 32,
          background: "#0C0C1F",
          borderTop: "1px solid rgba(199,196,215,0.15)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 12,
              background: "#C0C1FF",
              boxShadow: "0px 0px 8px rgba(192,193,255,0.8)",
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              letterSpacing: 1.1,
              textTransform: "uppercase" as const,
              color: "#E2E0FC",
            }}
          >
            Connected to AssetHub 3D
          </span>
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase" as const,
            color: "#E2E0FC",
          }}
        >
          PAGE 1 OF 12
        </span>
      </div>
    </div>
  );
}
