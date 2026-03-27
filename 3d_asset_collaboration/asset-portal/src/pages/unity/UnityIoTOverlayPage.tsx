export default function UnityIoTOverlayPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0F0F23" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 32px",
          height: 64,
          background: "rgba(15,15,35,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0px 0px 32px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 24,
              fontWeight: 900,
              color: "#22D3EE",
              letterSpacing: -1.2,
            }}
          >
            HELIOS-V IoT
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["TELEMETRY", "DIAGNOSTICS", "SIMULATION", "ASSETS"].map((t, i) => (
              <span
                key={t}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: -0.35,
                  textTransform: "uppercase" as const,
                  color: i === 1 ? "#22D3EE" : "#94A3B8",
                  borderBottom: i === 1 ? "2px solid #06B6D4" : "none",
                  paddingBottom: i === 1 ? 4 : 0,
                  cursor: "pointer",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                <circle cx="10" cy="10" r="7" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Main viewport */}
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
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(15,15,35,0.3) 0%, #0F0F23 70%)",
          }}
        />

        {/* Simulated 3D motor view */}
        <div
          style={{
            width: "80%",
            height: "80%",
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(30,30,58,0.8), rgba(15,15,35,0.9))",
            border: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" opacity="0.15">
            <circle cx="100" cy="100" r="80" stroke="#22D3EE" strokeWidth="1" />
            <circle cx="100" cy="100" r="50" stroke="#22D3EE" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="20" stroke="#22D3EE" strokeWidth="0.5" />
            <path d="M20 100H180M100 20V180" stroke="#22D3EE" strokeWidth="0.3" />
          </svg>

          {/* Sensor popup - expanded */}
          <div style={{ position: "absolute", top: "30%", left: "25%", width: 280 }}>
            <div
              style={{
                background: "rgba(10,10,30,0.95)",
                border: "1px solid rgba(255,180,171,0.3)",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 8, background: "#FFB4AB" }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#FFF",
                      letterSpacing: 0.3,
                    }}
                  >
                    MOTOR C — TEMP
                  </span>
                </div>
                <span
                  style={{
                    background: "#FFB4AB",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#690005",
                  }}
                >
                  CRITICAL
                </span>
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#FFB4AB",
                  marginBottom: 16,
                }}
              >
                95.2 <span style={{ fontSize: 18, color: "#C7C4D7" }}>&deg;C</span>
              </div>
              <div
                style={{
                  height: 40,
                  background: "rgba(255,180,171,0.1)",
                  borderRadius: 4,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="240" height="30" viewBox="0 0 240 30" fill="none">
                  <path
                    d="M0,25 C30,20 60,15 90,18 C120,21 150,10 180,8 C200,12 220,5 240,8"
                    stroke="#FFB4AB"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                {[
                  ["MIN", "38.7\u00b0C"],
                  ["AVG", "52.4\u00b0C"],
                  ["MAX", "96.2\u00b0C"],
                ].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textTransform: "uppercase" as const,
                        color: "#908FA0",
                      }}
                    >
                      {l}
                    </div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#E2E0FC",
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
              <button
                style={{
                  width: "100%",
                  height: 32,
                  background: "#22D3EE",
                  border: "none",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0F0F23",
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              >
                VIEW FULL HISTORY
              </button>
              <button
                style={{
                  width: "100%",
                  height: 32,
                  background: "transparent",
                  border: "1px solid rgba(255,180,171,0.4)",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FFB4AB",
                  cursor: "pointer",
                }}
              >
                ACKNOWLEDGE ALERT
              </button>
            </div>
          </div>

          {/* Critical Alert Toast */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 260,
              background: "rgba(186,26,26,0.15)",
              border: "1px solid rgba(255,180,171,0.3)",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="#FFB4AB">
                <path d="M10 0L20 18H0L10 0Z" />
              </svg>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#FFB4AB",
                  letterSpacing: 0.5,
                }}
              >
                CRITICAL ALERT
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: "#C7C4D7",
                margin: "0 0 12px",
                lineHeight: "16px",
              }}
            >
              Motor C temperature has exceeded 85 C threshold. Operational failure imminent.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#22D3EE",
                  cursor: "pointer",
                }}
              >
                DETAILS
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FFB4AB",
                  cursor: "pointer",
                }}
              >
                DISMISS
              </span>
            </div>
          </div>

          {/* Right side status */}
          <div
            style={{ position: "absolute", right: 24, bottom: 80, display: "flex", flexDirection: "column", gap: 12 }}
          >
            {[
              ["UNIT C4 STATUS", ""],
              ["Throughput", "1,340 p/h"],
              ["Ovr.Load", "12.4 kW"],
            ].map(([l, v], i) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase" as const,
                    color: "#908FA0",
                  }}
                >
                  {l}
                </div>
                {v && (
                  <div
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 600, color: "#E2E0FC" }}
                  >
                    {v}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom toolbar */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            background: "rgba(0,0,0,0.6)",
            borderRadius: 8,
            padding: 8,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: i === 0 ? "rgba(34,211,238,0.2)" : "transparent",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke={i === 0 ? "#22D3EE" : "#94A3B8"}
                strokeWidth="1.5"
              >
                <circle cx="8" cy="8" r="5" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
