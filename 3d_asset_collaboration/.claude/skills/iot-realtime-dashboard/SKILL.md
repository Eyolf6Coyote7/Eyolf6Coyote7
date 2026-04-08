---
name: iot-realtime-dashboard
description: Build a React IoT dashboard page with hand-drawn SVG line charts, KPI metric cards, time-range selector, auto-refresh toggle, and alert history table.
when_to_use:
  - add an IoT / sensor / telemetry dashboard page
  - show real-time metric charts that don't need a charting library
  - mentions `IoTDashboardPage`, `alertData`, hand-SVG paths, `time-range`, `Auto-refresh
  - visualize sensor history without pulling in echarts / recharts
tech_stack:
  - react
  - svg-charts
  - iot-telemetry
harness: fe-csr
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add an IoT / sensor / telemetry dashboard page
- show real-time metric charts that don't need a charting library
- mentions `IoTDashboardPage`, `alertData`, hand-SVG paths, `time-range`, `Auto-refresh`
- visualize sensor history without pulling in echarts / recharts

DO NOT use this skill for general business KPI dashboards — use a charting library instead. THIS skill is specifically about minimal SVG path charts for low-density telemetry display.

## Context

`asset-portal/src/pages/IoTDashboardPage.tsx:1-459` is the canonical IoT dashboard. Defining traits:

1. **NO charting library** — line charts use raw `<svg>` + `<path d="...">` strings. Each chart is one SVG element, ~448 viewBox width, ~112 height, with a `preserveAspectRatio="none"` rectangle scaling.
2. **Time range selector** — pill-shaped row of `<button>`s for `1h | 6h | 24h | 7d | 30d`. Selected button has `background: "#4648D4"` + `color: "#FFF"`. Wrap in `background: "#F0F3FF", borderRadius: 8, padding: 4`.
3. **Auto-refresh toggle** — custom pill switch (NOT `<input type="checkbox">`). 32×16 div with absolute-positioned 12×12 thumb. Animates via `transition: left 0.2s`.
4. **Threshold lines** — hardcoded as `<line x1="0" y1="35" x2="448" y2="35" stroke="#BA1A1A" strokeDasharray="4 4" />`. Threshold label rendered as positioned `<div>` overlay.
5. **Alert history table** — tabular `<table>` with severity dot, sensor name, threshold, value, time, status pill. Status colors come from a per-row data object (`statusBg`, `statusColor`).
6. **Loaded data is unused** — `api.fetchSensors().then(setSensors)` fires but the page renders mostly static demo content. The fetch is documentation that the route exists, not the data source. This is intentional for portfolio screenshots.
7. **Inline styles** — every style is a JS object literal, no CSS modules / styled-components / theme files. The page is intentionally a single self-contained file.

## Operating instructions

When adding a new IoT chart card:

1. Open `IoTDashboardPage.tsx` and add to the existing chart array (line 152) with `{ title, sub, color, current, peak, threshold, path }`. The `path` is a hand-drawn cubic Bezier curve string.
2. To author a path: viewBox is `0 0 448 112`. Use `M0,<y>` then `C` cubic Bezier control points. Higher Y = lower position. Keep within ~10-110 range.
3. For threshold lines: add `<line x1="0" y1="<y>" x2="448" y2="<y>" stroke="#BA1A1A" strokeWidth="1" strokeDasharray="4 4" />` inside the same `<svg>`.
4. For new alert rows: add to `alertData` array (line 6) with `{ severity, sensor, threshold, value, valueColor, time, status, statusBg, statusColor }`.
5. To add real-time updates, wire a polling effect: `useEffect(() => { const i = setInterval(() => api.fetchSensors().then(setSensors), 5000); return () => clearInterval(i); }, [autoRefresh])` — but only if asked; the canonical page does NOT actually refresh.
6. NEVER pull in `recharts` / `echarts` / `chart.js` for this page. Stay with hand-SVG.

## Reusable prompts / code patterns

Time range selector:
```tsx
const timeRanges = ["1h", "6h", "24h", "7d", "30d"];
const [activeRange, setActiveRange] = useState("24h");

<div style={{ display: "flex", background: "#F0F3FF", borderRadius: 8, padding: 4 }}>
  {timeRanges.map((r) => (
    <button
      key={r}
      onClick={() => setActiveRange(r)}
      style={{
        padding: "4px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
        background: r === activeRange ? "#4648D4" : "transparent",
        color: r === activeRange ? "#FFF" : "#555F70",
      }}
    >
      {r}
    </button>
  ))}
</div>
```

Custom pill toggle (auto-refresh):
```tsx
<div
  onClick={() => setAutoRefresh(!autoRefresh)}
  style={{
    width: 32, height: 16, borderRadius: 9999,
    background: autoRefresh ? "#4648D4" : "#C7C4D7",
    position: "relative", cursor: "pointer", transition: "background 0.2s",
  }}
>
  <div style={{
    width: 12, height: 12, borderRadius: 9999, background: "#FFF",
    position: "absolute", top: 2, left: autoRefresh ? 18 : 2, transition: "left 0.2s",
  }} />
</div>
```

Hand-drawn SVG line chart with threshold:
```tsx
<svg width="100%" height="100%" viewBox="0 0 448 112" preserveAspectRatio="none">
  <path
    d="M0,60 C40,20 80,70 120,30 C160,10 200,50 240,25 C280,40 320,15 360,35 C400,50 440,20 448,30"
    fill="none" stroke="#4648D4" strokeWidth="2.5"
  />
  <line x1="0" y1="35" x2="448" y2="35" stroke="#BA1A1A" strokeWidth="1" strokeDasharray="4 4" />
</svg>
```

## Anti-patterns

- Do NOT pull in a charting library — this page deliberately uses hand-SVG.
- Do NOT replace inline styles with CSS modules — keep the file self-contained.
- Do NOT use `<input type="checkbox">` for the auto-refresh toggle — use the custom pill div.
- Do NOT make the alert table sortable / paginated — it's a static demo display.
- Do NOT animate SVG path morphing — keep paths static.

## References

- `asset-portal/src/pages/IoTDashboardPage.tsx:152-273` — chart card array + SVG render
- `asset-portal/src/pages/IoTDashboardPage.tsx:308-330` — multi-line overview SVG
- `asset-portal/src/pages/IoTDashboardPage.tsx:333-456` — alert history table
- `asset-portal/src/api/mock-client.ts:72-119` — `SensorData` type + mock sensors
