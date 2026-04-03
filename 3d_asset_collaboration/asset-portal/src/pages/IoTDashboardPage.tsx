import { useEffect, useState } from "react";
import { api } from "../api";
import type { SensorData } from "../api/mock-client";

const timeRanges = ["1h", "6h", "24h", "7d", "30d"];
const alertData = [
  {
    severity: "#BA1A1A",
    sensor: "Motor Temp A",
    threshold: "80.0 C",
    value: "83.1 C",
    valueColor: "#BA1A1A",
    time: "10:30:14",
    status: "Active",
    statusBg: "#FFDAD6",
    statusColor: "#93000A",
  },
  {
    severity: "#F59E0B",
    sensor: "Hydraulic C-1",
    threshold: "5.0g",
    value: "4.2g",
    valueColor: "#464554",
    time: "09:12:45",
    status: "Acknowledged",
    statusBg: "#D6E0F4",
    statusColor: "#596374",
  },
  {
    severity: "#006C49",
    sensor: "Bearing Press B",
    threshold: "150 PSI",
    value: "124 PSI",
    valueColor: "#464554",
    time: "08:45:20",
    status: "Resolved",
    statusBg: "#00885D",
    statusColor: "#FFFFFF",
  },
  {
    severity: "#BA1A1A",
    sensor: "Pump Intake 4",
    threshold: "Low Level",
    value: "Critical",
    valueColor: "#BA1A1A",
    time: "07:59:02",
    status: "Active",
    statusBg: "#FFDAD6",
    statusColor: "#93000A",
  },
  {
    severity: "#F59E0B",
    sensor: "Inlet Temp D",
    threshold: "75.0 C",
    value: "76.2 C",
    valueColor: "#464554",
    time: "07:22:18",
    status: "Acknowledged",
    statusBg: "#D6E0F4",
    statusColor: "#596374",
  },
];

export default function IoTDashboardPage() {
  const [_sensors, setSensors] = useState<SensorData[]>([]);
  const [activeRange, setActiveRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    api.fetchSensors().then(setSensors);
  }, []);

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Time Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <select
            style={{
              padding: "8px 16px",
              background: "#FFF",
              border: "1px solid #C7C4D7",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#151C27",
            }}
          >
            <option>Last 24 hours</option>
          </select>
          <div style={{ display: "flex", background: "#F0F3FF", borderRadius: 8, padding: 4 }}>
            {timeRanges.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  border: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: r === activeRange ? "#4648D4" : "transparent",
                  color: r === activeRange ? "#FFF" : "#555F70",
                  boxShadow: r === activeRange ? "0px 1px 2px rgba(0,0,0,0.05)" : "none",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#151C27" }}>
            Auto-refresh
          </span>
          <div
            onClick={() => setAutoRefresh(!autoRefresh)}
            style={{
              width: 32,
              height: 16,
              borderRadius: 9999,
              background: autoRefresh ? "#4648D4" : "#C7C4D7",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#FFF",
                position: "absolute",
                top: 2,
                left: autoRefresh ? 18 : 2,
                transition: "left 0.2s",
              }}
            />
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#767586" }}>
            every 5s
          </span>
        </div>
      </div>

      {/* Row 1: Two Chart Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            title: "Temperature",
            sub: "MOTOR TEMP A",
            color: "#4648D4",
            current: "42.3 C",
            peak: "83.1 C",
            threshold: "Critical: 80 C",
            path: "M0,60 C40,20 80,70 120,30 C160,10 200,50 240,25 C280,40 320,15 360,35 C400,50 440,20 448,30",
          },
          {
            title: "Vibration",
            sub: "HYDRAULIC C-1",
            color: "#F59E0B",
            current: "2.8g",
            peak: "4.2g",
            threshold: "Threshold: 5g",
            path: "M0,70 C40,65 80,60 120,55 C160,50 200,45 240,50 C280,55 320,60 360,40 C400,35 440,45 448,50",
          },
        ].map((chart) => (
          <div
            key={chart.title}
            style={{
              background: "#FFF",
              boxShadow: "0px 12px 32px rgba(21,28,39,0.06)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#151C27" }}>
                  {chart.title}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.55,
                    textTransform: "uppercase" as const,
                    color: "#767586",
                  }}
                >
                  {chart.sub}
                </div>
              </div>
              <svg width="16" height="4" viewBox="0 0 16 4" fill="#767586">
                <circle cx="2" cy="2" r="1.5" />
                <circle cx="8" cy="2" r="1.5" />
                <circle cx="14" cy="2" r="1.5" />
              </svg>
            </div>
            <div
              style={{
                position: "relative",
                height: 112,
                borderLeft: "1px solid rgba(199,196,215,0.2)",
                borderBottom: "1px solid rgba(199,196,215,0.2)",
                marginBottom: 16,
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 448 112"
                preserveAspectRatio="none"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <path d={chart.path} fill="none" stroke={chart.color} strokeWidth="2.5" />
                <line x1="0" y1="35" x2="448" y2="35" stroke="#BA1A1A" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 10,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#BA1A1A",
                }}
              >
                {chart.threshold}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px" }}>
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: "uppercase" as const,
                    color: "#767586",
                  }}
                >
                  Current
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#151C27" }}>
                  {chart.current}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: "uppercase" as const,
                    color: "#767586",
                  }}
                >
                  Peak
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#BA1A1A" }}>
                  {chart.peak}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Overview Multi-chart */}
      <div
        style={{ background: "#FFF", boxShadow: "0px 12px 32px rgba(21,28,39,0.06)", borderRadius: 12, padding: 24 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#151C27",
              letterSpacing: -0.35,
              textTransform: "uppercase" as const,
            }}
          >
            All Sensors \u2014 Overview
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { label: "Temp", color: "#4648D4" },
              { label: "Vibe", color: "#F59E0B" },
              { label: "Press", color: "#006C49" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 9999, background: l.color }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#767586" }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 175, borderBottom: "1px solid rgba(199,196,215,0.2)", position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 944 175" preserveAspectRatio="none">
            <path
              d="M0,60 C100,30 200,80 300,50 C400,20 500,70 600,40 C700,60 800,30 944,50"
              fill="none"
              stroke="#4648D4"
              strokeWidth="2"
            />
            <path
              d="M0,100 C100,85 200,110 300,90 C400,105 500,80 600,95 C700,110 800,85 944,90"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <path
              d="M0,130 C100,120 200,140 300,125 C400,135 500,115 600,130 C700,120 800,135 944,125"
              fill="none"
              stroke="#006C49"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Row 3: Alert History */}
      <div
        style={{
          background: "#FFF",
          boxShadow: "0px 12px 32px rgba(21,28,39,0.06)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#151C27" }}>
            Alert History
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#4648D4",
              cursor: "pointer",
            }}
          >
            View all
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(240,243,255,0.5)" }}>
              {["Severity", "Sensor", "Threshold", "Value", "Time", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.1,
                    textTransform: "uppercase" as const,
                    color: "#767586",
                    textAlign: h === "Status" ? "right" : "left",
                    borderBottom: "none",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alertData.map((a, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 1 ? "rgba(240,243,255,0.3)" : "#FFF",
                  borderBottom: "1px solid rgba(199,196,215,0.1)",
                }}
              >
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 9999, background: a.severity }} />
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#464554",
                  }}
                >
                  {a.sensor}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#464554",
                  }}
                >
                  {a.threshold}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: a.valueColor,
                  }}
                >
                  {a.value}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#767586",
                  }}
                >
                  {a.time}
                </td>
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-block",
                      borderRadius: 9999,
                      padding: "2px 12px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      background: a.statusBg,
                      color: a.statusColor,
                    }}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
