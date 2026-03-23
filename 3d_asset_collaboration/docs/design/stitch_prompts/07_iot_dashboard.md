# Screen: IoT Dashboard

> Route: `/iot` | Platform: Web | Figma Page: Screens — IoT Dashboard

## Stitch Prompt

The IoT sensor monitoring dashboard with time-series charts, sensor list, and alert history. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Logo — 3D cube icon + "AssetHub 3D" text.
- Center: "IoT Dashboard" in bold 18px #111827.
- Right: "Sensor Config" button (white bg, border 1px #D1D5DB, #374151 text, gear icon, radius 8px, 40px height) + notification bell + user avatar.

**Sensor sidebar** (240px wide, left, white background, border-right 1px #E5E7EB, full height below top bar, 16px padding):
- Header: "Sensors" bold 14px #111827 + count "(12 active)" in #9CA3AF.
- Sensor list (scrollable): Each sensor row is 48px height, 8px gap between items, radius 8px, padding 8px 12px. Each row:
  - Left: status dot (10px circle) — color-coded: green (#10B981) for normal, yellow (#F59E0B) for warning, red (#EF4444) for critical, gray (#9CA3AF) for stale.
  - Center: Sensor name (bold 14px #374151, e.g., "Motor Temp A") + current value (12px #6B7280, e.g., "42.3 C").
  - Right: tiny sparkline (40x16px, color matches status dot).
  - Active/selected row has #F9FAFB background + left border 3px #6366F1.
- Show 8 sensors: 5 green, 2 yellow, 1 red.
- **Alert summary** (bottom of sidebar, separated by 1px #E5E7EB line, 16px top padding):
  - "Active Alerts" bold 14px #111827.
  - Row: red dot + "2 Critical" bold 14px #EF4444.
  - Row: yellow dot + "5 Warnings" bold 14px #F59E0B.
  - Row: green dot + "5 Normal" 14px #10B981.

**Main dashboard area** (right of sidebar, fills remaining space, #F9FAFB background, 24px padding):

**Top row — Time range controls**: Left: "Last 24 hours" dropdown (border 1px #D1D5DB, radius 8px, 36px height, chevron down). Quick buttons: "1h" "6h" "24h" (active, indigo bg white text) "7d" "30d" — each 32px height, radius 8px, 8px gap. Right: "Auto-refresh" toggle (on, indigo #6366F1) + "every 5s" label in 12px #9CA3AF.

**Chart row 1** — Two equal-width charts side by side (16px gap):

Chart 1 — "Temperature (Last 24h)":
- White card, radius 12px, shadow 0 2px 8px rgba(0,0,0,0.08), padding 16px.
- Title: "Temperature" bold 14px #111827 + "Motor Temp A" 14px #9CA3AF.
- ECharts line chart: X-axis = time (00:00 to 24:00), Y-axis = temperature (20-100 C). Line is #6366F1 (indigo), with a gradient fill below (#6366F1 at 20% opacity fading to transparent). One red threshold line at 80 C (dashed, #EF4444) labeled "Critical: 80 C". The line has a spike crossing the threshold around 10:30, with a red dot marker at the crossing point.
- Bottom: "Current: 42.3 C" in 14px #374151 + "Peak: 83.1 C" in 14px #EF4444.

Chart 2 — "Vibration (Last 24h)":
- Same card style. Line chart with #F59E0B (yellow) line. Threshold at 5g (dashed #EF4444). Line fluctuates normally around 2-3g. Y-axis 0-8g.
- "Current: 2.8g" + "Peak: 4.2g" in #374151.

**Chart row 2** — Full width chart:

"All Sensors — Overview":
- White card, full width, same style. Multi-line chart with color-coded lines for each sensor type. Legend at top: colored dots + labels. Time axis same. Shows all sensor trends overlaid.

**Alert history table** (below charts, full width, white card, radius 12px, shadow):
- Header: "Alert History" bold 16px #111827 + "View all" link #6366F1 (right).
- Table columns: Severity (dot), Sensor, Threshold, Value, Time, Status.
- 5 rows:
  - Red dot | Motor Temp A | > 80 C | 83.1 C | 10:32 AM | "Active" (red pill)
  - Yellow dot | Vibration B | > 5g | 5.2g | 09:15 AM | "Acknowledged" (yellow pill)
  - Red dot | Motor Temp C | > 80 C | 81.0 C | 08:45 AM | "Resolved" (green pill)
  - Yellow dot | Pressure D | < 2 bar | 1.8 bar | 07:30 AM | "Resolved" (green pill)
  - Yellow dot | Vibration A | > 5g | 5.1g | 06:20 AM | "Resolved" (green pill)
- Table has alternating row bg (#F9FAFB / white), 14px text, 48px row height.

## Design Tokens

| Token | Value |
|-------|-------|
| Sidebar width | 240px |
| Sensor row height | 48px |
| Sparkline size | 40x16px |
| Status green | #10B981 |
| Status yellow | #F59E0B |
| Status red | #EF4444 |
| Status gray (stale) | #9CA3AF |
| Chart card radius | 12px |
| Chart card shadow | 0 2px 8px rgba(0,0,0,0.08) |
| Chart line indigo | #6366F1 |
| Threshold line | dashed #EF4444 |
| Primary | #6366F1 |
| Dashboard bg | #F9FAFB |
| Table row height | 48px |
| Table alt row bg | #F9FAFB |

## States to Generate

1. **Default** — All sensors active, charts loaded, alert table with 5 rows
2. **Alert active** — Red flash border on the sensor sidebar row for the critical sensor, toast notification in top-right "Motor Temp A exceeded 80 C threshold"
3. **Loading** — Chart cards show skeleton shimmer, sensor list shows gray placeholders
4. **No data** — Charts show "No data for selected time range" centered text, empty table
5. **Stale sensor** — One sensor row shows gray dot with "Stale — last update 5 min ago" in italics

## Style Direction

- Data-dense but organized — the sidebar provides quick status, charts provide detail
- Color-coded severity is consistent throughout: green = normal, yellow = warning, red = critical, gray = stale
- ECharts styling is clean with gradient fills — not busy or cluttered
- Threshold lines on charts make it immediately clear when values are dangerous
- Alert history table provides an audit trail
- Auto-refresh keeps data live — this is a real-time monitoring dashboard
- Professional industrial monitoring aesthetic, not flashy consumer dashboards

## Acceptance Criteria

- [ ] Top bar with "IoT Dashboard" title and Sensor Config button
- [ ] Sensor sidebar: 240px, list of sensors with color-coded status dots and sparklines
- [ ] Alert summary at bottom of sidebar: counts by severity
- [ ] Time range controls: dropdown + quick-select buttons
- [ ] Two side-by-side charts: Temperature and Vibration with threshold lines
- [ ] Full-width overview chart with multi-line sensor data
- [ ] Alert history table: severity, sensor, threshold, value, time, status pills
- [ ] Auto-refresh toggle
- [ ] Color-coded throughout: green/yellow/red/gray
