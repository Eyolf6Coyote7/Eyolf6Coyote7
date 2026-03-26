import { useEffect, useState } from "react";
import { api } from "../api";
import type { SensorData } from "../api/mock-client";

const statusColor: Record<string, string> = {
  normal: "#4caf50",
  warning: "#ff9800",
  critical: "#f44336",
};

export default function IoTDashboardPage() {
  const [sensors, setSensors] = useState<SensorData[]>([]);

  useEffect(() => {
    api.fetchSensors().then(setSensors);
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>IoT Sensor Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {sensors.map((s) => (
          <div key={s.id} style={{ background: "#161822", borderRadius: 12, border: "1px solid #2a2d3a", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</h3>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: statusColor[s.status] + "22",
                  color: statusColor[s.status],
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {s.status}
              </span>
            </div>

            <div style={{ fontSize: 32, fontWeight: 700, color: statusColor[s.status], marginBottom: 4 }}>
              {s.value}
              <span style={{ fontSize: 14, fontWeight: 400, color: "#8b8fa3", marginLeft: 4 }}>{s.unit}</span>
            </div>

            {/* Mini sparkline chart using SVG */}
            <svg viewBox="0 0 100 30" style={{ width: "100%", height: 40, marginTop: 12 }}>
              <polyline
                fill="none"
                stroke={statusColor[s.status]}
                strokeWidth="2"
                points={s.history
                  .map((v, i) => {
                    const min = Math.min(...s.history);
                    const max = Math.max(...s.history);
                    const range = max - min || 1;
                    const x = (i / (s.history.length - 1)) * 100;
                    const y = 28 - ((v - min) / range) * 26;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
