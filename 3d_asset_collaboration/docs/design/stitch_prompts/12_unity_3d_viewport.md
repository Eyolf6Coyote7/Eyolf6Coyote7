# Screen: Unity 3D Viewport

> Platform: Unity (Desktop) | Figma Page: Screens — Unity

## Stitch Prompt

Desktop application (Unity), 1920x1080px.

The main Unity 3D viewport showing a factory floor model with IoT sensor markers overlaid. DARK theme. Desktop 1920x1080. This is the hero screen of the Unity client — a digital twin view.

**Menu bar** (28px height, #1E1E3A background, border-bottom 1px rgba(255,255,255,0.08)):
- Menu items in 13px #9CA3AF: "File" "View" "IoT" "Assets" "Help" — each with 12px horizontal padding. Hover: #252547 background.

**Toolbar** (36px height, #252547 background, border-bottom 1px rgba(255,255,255,0.08)):
- Left: Tool icons (24x24px each, 4px gap): Select (arrow, active = #6366F1 bg), Move (cross arrows), Rotate (circular arrows), Scale (diagonal arrows). Separator line (1px rgba(255,255,255,0.08), 20px height). Camera presets: "Top" "Front" "Free" buttons (24px height, 12px font, "Free" active with #6366F1 text).
- Center: Empty.
- Right: "IoT Overlay" toggle (pill switch, 40x20px, ON = #10B981 green) + "Sensors: 12" text in 12px #9CA3AF + Play/Pause button for simulation.

**3D Viewport** (fills majority of screen, #0F0F23 background — even darker than sidebar):
- Shows a 3D rendered factory floor scene: concrete floor with grid lines, industrial equipment (conveyor belt, robotic arm, motor assembly), warehouse-style lighting from above. The scene is viewed from a slightly elevated perspective angle (~30 degrees from horizontal).
- **IoT Sensor markers** (3D billboards floating above equipment, always facing camera):
  - **Sensor A** (green, normal): Green (#10B981) dot (12px) with label below "Motor A · 42 C" in white 11px on semi-transparent dark pill (rgba(0,0,0,0.7), radius 6px). Positioned above a motor on the left.
  - **Sensor B** (yellow, warning): Yellow (#F59E0B) dot with pulsing animation, label "Conv Belt · 4.2g" — positioned above conveyor belt center.
  - **Sensor C** (red, critical): Red (#EF4444) dot with stronger pulse + glow ring, label "Motor C · 95 C" + small "ALERT" badge (red bg, white text, 9px). Positioned above a motor on the right. The marker is larger and more prominent than others.
  - **Sensor D** (green): "Pressure · 3.1 bar" — above a pipe junction.
  - **Sensor E** (gray, stale): Gray (#9CA3AF) dot, label "Sensor E · --" + "Stale" in italic 9px, slightly transparent. Above a distant piece of equipment.
- **Connection lines**: Thin dashed lines (1px, rgba(255,255,255,0.15)) from each marker to its attachment point on the equipment.
- **Grid**: Faint ground grid (#1A1A2E lines at 10% opacity) on the factory floor.

**Bottom panel — split into two sections** (200px total height):

**Left panel — Sensor List** (60% width, #1E1E3A background, border-top 1px rgba(255,255,255,0.08), border-right 1px rgba(255,255,255,0.08)):
- Header: "Sensors" bold 13px #E5E7EB + "12 active" #6B7280 + "Configure" button (#6366F1 text, 12px).
- Scrollable list, 32px row height each:
  - Status dot (8px) + Sensor name (13px #E5E7EB) + Type (12px #6B7280, e.g., "Temperature") + Current value (13px #E5E7EB, right-aligned) + Sparkline (40x14px, color matches status).
  - Selected row: #252547 background, left border 2px #6366F1.
- Show 5 rows visible.

**Right panel — Properties** (40% width, #1E1E3A background):
- Header: "Properties" bold 13px #E5E7EB.
- Key-value pairs (12px labels in #6B7280, 13px values in #E5E7EB):
  - Name: Main Motor A
  - Type: Temperature
  - Current: 42.3 C
  - Min/Max (24h): 38.1 / 83.1 C
  - Status: "Normal" (green pill)
  - Last update: "2s ago"
  - Threshold: "> 80 C"
- "View History" button (#6366F1 text, 12px) and "Set Alert" button (border 1px #6366F1, #6366F1 text, radius 6px, 28px height).

**Viewport overlay elements**:
- Top-left: "FPS: 60" in 10px monospace #4B5563.
- Top-right: Compass/orientation gizmo (48x48px) showing X (red), Y (green), Z (blue) axes.
- Bottom-left: "Factory Floor v2 · Last sync: 5s ago" in 10px #4B5563.

## Design Tokens

| Token | Value |
|-------|-------|
| Menu bar height | 28px |
| Toolbar height | 36px |
| Viewport bg | #0F0F23 |
| Panel bg | #1E1E3A |
| Bottom panel height | 200px |
| Sensor marker green | #10B981 |
| Sensor marker yellow | #F59E0B |
| Sensor marker red | #EF4444 |
| Sensor marker gray | #9CA3AF |
| Marker label bg | rgba(0,0,0,0.7) |
| Marker label radius | 6px |
| Sensor row height | 32px |
| Tool icon size | 24x24px |
| Active tool bg | #6366F1 |
| Primary | #6366F1 |
| Text primary | #E5E7EB |
| Text secondary | #9CA3AF |
| Text muted | #6B7280 |
| Text dim | #4B5563 |
| Compass size | 48x48px |

## States to Generate

1. **Default** — Factory floor model loaded, 5 sensors visible (3 green, 1 yellow, 1 red), bottom panels showing
2. **Alert active** — Red sensor marker pulsing with glow, red flash border (4px #EF4444) around the entire viewport for 1 second, toast notification in top-right "CRITICAL: Motor C temperature 95 C exceeded threshold 80 C"
3. **Loading** — Viewport shows progress bar at center "Loading scene... 65%" on dark background
4. **IoT overlay OFF** — Factory model visible but no sensor markers, toggle is off, bottom panels show "Enable IoT overlay to view sensor data"
5. **Sensor selected** — One marker enlarged with detailed popup: name, value, sparkline chart (80x40px), threshold, "View Details" link

## Style Direction

- This is a digital twin visualization — the 3D scene is the primary focus
- Dark theme is mandatory — Unity Editor aesthetic with #1A1A2E/#0F0F23 backgrounds
- IoT markers use game-style HUD elements: billboards, health-bar-like indicators
- Color-coded severity is immediately readable in the 3D space
- Red critical sensors demand attention with size, glow, and pulse animations
- Bottom panels are compact — they supplement the viewport, never compete with it
- The scene feels alive with real-time sensor data updating
- Industrial aesthetic: factory equipment, clean geometry, functional lighting

## Acceptance Criteria

- [ ] Menu bar: File, View, IoT, Assets, Help
- [ ] Toolbar: transform tools, camera presets, IoT overlay toggle
- [ ] 3D viewport: factory floor scene with industrial equipment
- [ ] 5 IoT sensor markers: 3 green, 1 yellow, 1 red — color-coded with labels
- [ ] Stale sensor (gray) with "Stale" indicator
- [ ] Connection lines from markers to equipment
- [ ] Bottom left panel: scrollable sensor list with sparklines
- [ ] Bottom right panel: selected sensor properties
- [ ] Viewport overlays: FPS counter, compass gizmo, scene info
- [ ] Full dark theme — no light elements
