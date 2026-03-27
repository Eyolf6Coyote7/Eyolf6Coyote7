const sensors = [
  { name: "Motor A \u00b7 42\u00b0C", status: "#4EDEA3", top: "25%", left: "33%", lineH: 64 },
  {
    name: "Motor C \u00b7 95\u00b0C",
    status: "#FFB4AB",
    top: "33%",
    left: "37%",
    lineH: 96,
    alert: true,
    alertText: "ALERT",
  },
  { name: "Sensor E \u00b7 Stale", status: "#908FA0", top: "41%", left: "57%", lineH: 40, stale: true },
  { name: "Pressure \u00b7 3.1 bar", status: "#4EDEA3", top: "53%", left: "25%", lineH: 80 },
  { name: "Conv Belt \u00b7 4.2g", status: "#C4C2EE", top: "50%", left: "66%", lineH: 48 },
];

const tableRows = [
  { status: "#FFB4AB", name: "Motor C", type: "Thermal S-4", value: "95.4\u00b0C", valueColor: "#FFB4AB", alert: true },
  { status: "#4EDEA3", name: "Motor A", type: "Thermal S-4", value: "42.1\u00b0C", valueColor: "#4EDEA3" },
  { status: "#C4C2EE", name: "Conv Belt", type: "Vibration G-1", value: "4.2g", valueColor: "#C4C2EE" },
  { status: "#4EDEA3", name: "Pressure D", type: "Hydraulic P-2", value: "3.1 bar", valueColor: "#4EDEA3" },
];

export default function UnityViewportPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#111125" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 8px",
          height: 28,
          background: "#1E1E32",
          borderBottom: "1px solid #28283D",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, fontWeight: 700, color: "#C0C1FF" }}>
            TwinEngine v1.0
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            {["FILE", "VIEW", "IOT", "ASSETS", "HELP"].map((t, i) => (
              <span
                key={t}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 12,
                  fontWeight: i === 0 ? 700 : 400,
                  letterSpacing: 0.6,
                  textTransform: "uppercase" as const,
                  color: i === 0 ? "#C0C1FF" : "#8083FF",
                  cursor: "pointer",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1].map((i) => (
            <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#8083FF" strokeWidth="1.2">
              <circle cx="7.5" cy="7.5" r="5.5" />
            </svg>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left tool sidebar */}
        <div
          style={{
            width: 48,
            background: "#1E1E32",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 4px" }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i === 0 ? "#28283D" : "transparent",
                  borderLeft: i === 0 ? "2px solid #C0C1FF" : "none",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  stroke={i === 0 ? "#C0C1FF" : "#8083FF"}
                  strokeWidth="1.2"
                >
                  <rect x="1" y="1" width="11" height="11" rx="2" />
                </svg>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 4px 16px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i === 2 ? "#28283D" : "transparent",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  stroke={i === 2 ? "#C0C1FF" : "#8083FF"}
                  strokeWidth="1.2"
                >
                  <circle cx="7.5" cy="7.5" r="5.5" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Viewport */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Viewport toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
              height: 34,
              background: "#28283D",
              borderBottom: "1px solid rgba(70,69,84,0.1)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0C0C20",
                  border: "1px solid rgba(70,69,84,0.2)",
                  borderRadius: 2,
                  padding: "2px 8px",
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: 12, background: "#4EDEA3" }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#C7C4D7" }}>
                  IoT OVERLAY ACTIVE
                </span>
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(199,196,215,0.7)" }}>
                SENSORS: 12
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#C0C1FF",
                  cursor: "pointer",
                }}
              >
                FREE CAMERA
              </span>
            </div>
          </div>

          {/* 3D Scene */}
          <div
            style={{
              flex: 1,
              background: "linear-gradient(180deg, rgba(26,26,46,0.1) 2.5%, rgba(26,26,46,0) 2.5%), #0F0F23",
              position: "relative",
            }}
          >
            {/* FPS overlay */}
            <div
              style={{
                position: "absolute",
                top: 9,
                left: 16,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "rgba(144,143,160,0.6)",
                lineHeight: "15px",
              }}
            >
              FPS: 60.0
              <br />
              LATENCY: 12ms
            </div>

            {/* Sensor overlays */}
            {sensors.map((s) => (
              <div
                key={s.name}
                style={{
                  position: "absolute",
                  top: s.top,
                  left: s.left,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  opacity: s.stale ? 0.6 : 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: s.alert ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.7)",
                    borderTop: `2px solid ${s.status}`,
                    backdropFilter: "blur(2px)",
                    borderRadius: 6,
                    padding: "4px 8px",
                    boxShadow: s.alert ? `0px 0px 0px 1px ${s.status}33` : "none",
                  }}
                >
                  <div
                    style={{ width: s.alert ? 8 : 6, height: s.alert ? 8 : 6, borderRadius: 12, background: s.status }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      fontWeight: s.alert ? 700 : 400,
                      color: s.stale ? "rgba(255,255,255,0.5)" : "#FFF",
                    }}
                  >
                    {s.name}
                  </span>
                  {s.alertText && (
                    <span
                      style={{
                        background: "#FFB4AB",
                        borderRadius: 2,
                        padding: "0 4px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#690005",
                      }}
                    >
                      {s.alertText}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    width: 1,
                    height: s.lineH,
                    borderLeft: `1px dashed ${s.alert ? "rgba(255,180,171,0.4)" : "rgba(255,255,255,0.2)"}`,
                  }}
                />
              </div>
            ))}

            {/* Bottom text */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "rgba(144,143,160,0.6)",
              }}
            >
              FACTORY FLOOR V2 &middot; LAST SYNC: 5S AGO
            </div>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div
        style={{ display: "flex", height: 192, background: "#0C0C20", borderTop: "1px solid #28283D", flexShrink: 0 }}
      >
        {/* Sensor Table */}
        <div style={{ flex: 1, borderRight: "1px solid rgba(70,69,84,0.1)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px",
              background: "#1E1E32",
              borderBottom: "1px solid rgba(192,193,255,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.325,
                  textTransform: "uppercase" as const,
                  color: "#E2E0FC",
                }}
              >
                SENSORS
              </span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#908FA0" }}>
                12 ACTIVE UNITS
              </span>
            </div>
            <button
              style={{
                background: "rgba(192,193,255,0.1)",
                border: "1px solid rgba(192,193,255,0.3)",
                borderRadius: 2,
                padding: "4px 12px",
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase" as const,
                color: "#C0C1FF",
                cursor: "pointer",
              }}
            >
              CONFIGURE
            </button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1A1A2E" }}>
                {["STATUS", "NAME", "TYPE", "VALUE", "TELEMETRY"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 16px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(199,196,215,0.6)",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((r, i) => (
                <tr
                  key={i}
                  style={{
                    background: r.alert ? "#252547" : "transparent",
                    borderLeft: r.alert ? "2px solid #C0C1FF" : "none",
                  }}
                >
                  <td style={{ padding: "9px 16px" }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 12,
                        background: r.status,
                        boxShadow: r.alert ? `0px 0px 0px 4px ${r.status}1A` : "none",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "9px 16px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: "#E2E0FC",
                    }}
                  >
                    {r.name}
                  </td>
                  <td
                    style={{
                      padding: "9px 16px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: "#C7C4D7",
                    }}
                  >
                    {r.type}
                  </td>
                  <td
                    style={{
                      padding: "9px 16px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      fontWeight: r.alert ? 700 : 400,
                      color: r.valueColor,
                    }}
                  >
                    {r.value}
                  </td>
                  <td style={{ padding: "8px 16px" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                      {[8, 12, 16, 12, 16].map((h, j) => (
                        <div
                          key={j}
                          style={{
                            width: 4,
                            height: h,
                            background: r.alert ? (j >= 2 ? r.status : `${r.status}66`) : `${r.status}66`,
                            borderRadius: 0,
                          }}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Properties Panel */}
        <div style={{ width: 360, padding: 16 }}>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.325,
              textTransform: "uppercase" as const,
              color: "#E2E0FC",
              marginBottom: 16,
            }}
          >
            PROPERTIES
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              ["NAME", "Motor Unit C-49"],
              ["STATUS", "\u25cf CRITICAL ALERT"],
              ["CURRENT VALUE", "95.42 \u00b0C"],
              ["THRESHOLD", "85.00 \u00b0C"],
              ["LAST UPDATE", "2023-11-24 14:02:44"],
              ["MIN/MAX (24H)", "38.2 / 96.1 \u00b0C"],
            ].map(([l, v]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                    color: "#908FA0",
                    marginBottom: 4,
                  }}
                >
                  {l}
                </div>
                <div
                  style={{
                    fontFamily: l === "CURRENT VALUE" ? "JetBrains Mono, monospace" : "Inter, sans-serif",
                    fontSize: l === "CURRENT VALUE" ? 24 : 12,
                    fontWeight: 600,
                    color: l === "STATUS" || l === "CURRENT VALUE" ? "#FFB4AB" : "#E2E0FC",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
