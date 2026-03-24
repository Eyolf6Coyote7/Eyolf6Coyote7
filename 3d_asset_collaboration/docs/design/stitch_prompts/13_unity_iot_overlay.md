# Screen: Unity IoT Overlay

> Platform: Unity (Desktop) | Figma Page: Screens — Unity

## Stitch Prompt

Desktop application (Unity), 1920x1080px.

A close-up view of the Unity 3D viewport focused on IoT sensor interaction — showing a sensor marker tooltip popup with live data, sparkline, and alert flash. DARK theme. Desktop 1920x1080.

**Background**: Same factory floor 3D scene as the viewport screen, but zoomed in closer to a cluster of equipment (a motor assembly and conveyor belt). The camera is at eye-level, ~3 meters from the equipment. Dark viewport background #0F0F23.

**IoT sensor markers visible** (5 markers in the scene):
- 3 green markers at various distances (smaller when further away).
- 1 yellow marker on a conveyor belt, medium distance.
- 1 red marker (the focus point) — close to camera, on a motor assembly.

**Active tooltip popup** (attached to the red critical sensor marker, positioned to the right of the marker):
- Popup container: 280px wide, #252547 background, border 1px rgba(255,255,255,0.12), border-radius 10px, shadow 0 8px 32px rgba(0,0,0,0.5). A small triangular arrow pointing left toward the marker (6px triangle, same #252547 bg).
- **Header** (padding 12px, border-bottom 1px rgba(255,255,255,0.08)):
  - Left: Red dot (#EF4444, 10px, pulsing) + "Motor C — Temperature" bold 14px #E5E7EB.
  - Right: "CRITICAL" badge (red #EF4444 bg, white text, 10px bold, radius 4px, padding 2px 6px).
- **Current value** (padding 12px):
  - Large value: "95.2 C" in bold 32px #EF4444 (red because critical).
  - Below: "Threshold: > 80 C" in 12px #9CA3AF.
  - Below: "Updated 1s ago" in 11px #4B5563.
- **Sparkline chart** (full popup width minus padding, 60px height):
  - Time-series mini chart showing last 30 minutes of data. Line color transitions from #10B981 (green) on the left (normal range) to #EF4444 (red) on the right where it exceeds the 80 C threshold. Threshold line is a horizontal dashed line in #EF4444 at 40% opacity. The area below the line is filled with a subtle gradient. X-axis has "30m ago" (left) and "now" (right) in 9px #4B5563. Y-axis shows "40" and "100" in 9px #4B5563.
- **Quick stats row** (padding 12px, border-top 1px rgba(255,255,255,0.08)):
  - Three mini stat cards in a row (equal width, 4px gap):
    - "Min" 10px #6B7280, "38.1 C" 13px #10B981 (green, normal)
    - "Avg" 10px #6B7280, "52.4 C" 13px #E5E7EB
    - "Max" 10px #6B7280, "95.2 C" 13px #EF4444 (red, critical)
- **Action buttons** (padding 12px, border-top 1px rgba(255,255,255,0.08)):
  - "View Full History" button (full width, 32px height, #6366F1 bg, white text, 12px, radius 6px).
  - "Acknowledge Alert" button (full width, 32px height, transparent bg, border 1px #EF4444, #EF4444 text, 12px, radius 6px, 4px top margin).

**Alert flash effect** (overlaying the viewport):
- A red (#EF4444) border glow around the entire viewport edge — 4px width, with a soft glow (box-shadow inset 0 0 40px rgba(239,68,68,0.15)). This flash effect pulses 3 times when an alert triggers.

**Other markers in background** (not selected):
- Green markers: simple dot + one-line label (e.g., "Motor A · 42 C") on dark pill.
- Yellow marker: dot + label "Conv Belt · 4.2g" with subtle pulse.

**Toast notification** (top-right of viewport, 16px from edges):
- 320px wide, #252547 bg, border-left 4px #EF4444, radius 8px, shadow 0 4px 16px rgba(0,0,0,0.3), padding 12px.
- Red alert icon (20px) + "CRITICAL ALERT" bold 12px #EF4444 (first line) + "Motor C temperature exceeded 80 C threshold (current: 95.2 C)" 13px #E5E7EB (second line).
- "Dismiss" link in 12px #6B7280 (right side) + timestamp "10:32 AM" 11px #4B5563.

## Design Tokens

| Token | Value |
|-------|-------|
| Viewport bg | #0F0F23 |
| Tooltip bg | #252547 |
| Tooltip width | 280px |
| Tooltip radius | 10px |
| Tooltip border | 1px rgba(255,255,255,0.12) |
| Tooltip shadow | 0 8px 32px rgba(0,0,0,0.5) |
| Sparkline height | 60px |
| Critical color | #EF4444 |
| Warning color | #F59E0B |
| Normal color | #10B981 |
| Stale color | #9CA3AF |
| Alert flash border | 4px #EF4444 |
| Alert glow | inset 0 0 40px rgba(239,68,68,0.15) |
| Toast width | 320px |
| Toast border-left | 4px #EF4444 |
| Action button height | 32px |
| Action button radius | 6px |
| Primary | #6366F1 |
| Large value size | 32px bold |
| Text primary | #E5E7EB |
| Text secondary | #9CA3AF |
| Text muted | #6B7280 |

## States to Generate

1. **Default — Tooltip open** — Red sensor selected, tooltip showing with sparkline, alert flash border, toast notification
2. **Green sensor selected** — Tooltip for a normal sensor: value in green, no alert badge, sparkline fully green, no flash border
3. **Yellow warning selected** — Tooltip with yellow value, "WARNING" badge, sparkline transitions yellow at threshold
4. **Stale sensor selected** — Tooltip with gray styling, value shows "--", "Last seen: 5 min ago" in italic, "No recent data" in sparkline area
5. **No tooltip** — All markers visible but none selected, clean viewport

## Style Direction

- The tooltip is the detailed drill-down — clicking a sensor in the 3D scene opens this rich popup
- Sparklines in the tooltip provide temporal context without leaving the viewport
- Color transitions in the sparkline (green to red) make threshold crossings visually obvious
- The alert flash border is an urgent, game-style visual cue
- Toast notifications layer on top for critical events
- Everything stays dark — this is a monitoring/operations view
- The tooltip arrow pointing to the marker maintains spatial connection
- Quick stats (min/avg/max) give range context at a glance

## Acceptance Criteria

- [ ] 3D viewport with zoomed-in factory scene
- [ ] 5 sensor markers visible: 3 green, 1 yellow, 1 red
- [ ] Active tooltip popup on red sensor: header, large value, threshold, sparkline, quick stats, action buttons
- [ ] Sparkline shows color transition from green to red at threshold crossing
- [ ] Quick stats: min (green), avg (white), max (red)
- [ ] Alert flash: red border glow around viewport
- [ ] Toast notification: top-right, red left border, alert details
- [ ] Tooltip arrow pointing to the marker
- [ ] "Acknowledge Alert" button on critical tooltip
- [ ] Full dark theme throughout
