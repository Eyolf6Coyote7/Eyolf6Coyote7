# Screen: Unity Asset Browser

> Platform: Unity (Desktop) | Figma Page: Screens — Unity

## Stitch Prompt

Desktop application (Unity), 1920x1080px.

A grid-based 3D asset browser panel within the Unity client. DARK theme. Desktop 1920x1080. This is a panel that appears within the Unity Editor layout, similar to Unity's own Project window.

**Panel frame**: Full screen, #1A1A2E background. The entire UI uses Unity-style dark theme.

**Top toolbar** (48px height, #252547 background, border-bottom 1px rgba(255,255,255,0.08)):
- Left: "Asset Browser" title in bold 14px #E5E7EB + brand pill "Nike" (indigo #6366F1 bg, white text, radius 16px, 12px, padding 2px 10px).
- Center: Search bar — 400px wide, 36px height, #1A1A2E background, border 1px rgba(255,255,255,0.12), radius 8px. Magnifying glass icon (#6B7280) + placeholder "Search assets..." in 14px #4B5563. Focus: indigo border.
- Right: View toggle (grid/list icons, 28x28px, grid active with #6366F1 bg) + Sort dropdown "Newest" (#252547 bg, border rgba(255,255,255,0.12), 14px #9CA3AF, 32px height) + "Refresh" icon button (28x28px, #6B7280).

**Filter bar** (below toolbar, 40px height, #1E1E3A background, padding 0 16px):
- Horizontal row of filter pills: "All" (active, #6366F1 bg, white text), "GLB", "FBX", "OBJ" (inactive, rgba(255,255,255,0.08) bg, #9CA3AF text). Each pill: radius 16px, 12px font, 28px height, 8px gap.
- Right: Result count "142 assets" in 12px #6B7280.

**Asset grid** (fills remaining space, #1A1A2E background, 16px padding, scrollable):
- Grid: 4 columns, 12px gap. Each asset card:
  - Thumbnail area: 100% width, 160px height, #0F0F23 (darker) background, radius 8px 8px 0 0. Shows a 3D model render (sneaker, car, packaging, etc.) centered with subtle lighting. Format badge "GLB" top-right corner (rgba(0,0,0,0.6) bg, white text, 10px, radius 4px, 6px from edges).
  - Card body: #252547 background, padding 8px 10px, radius 0 0 8px 8px.
    - Asset name: bold 13px #E5E7EB, single line, truncate with ellipsis (e.g., "Air Max 2026 Hero").
    - Bottom row: "v3" in 11px #6B7280 (left) + "52 MB" in 11px #6B7280 (right).
  - Card border: 1px rgba(255,255,255,0.06). Hover: border 1px #6366F1, slight elevation.
  - Selected card: border 2px #6366F1, subtle indigo glow.
- Show 12 cards (3 rows of 4).

**Bottom status bar** (32px height, #252547 background, border-top 1px rgba(255,255,255,0.08)):
- Left: "Connected to AssetHub 3D" + green dot (#10B981) in 12px #6B7280.
- Center: Pagination — "Page 1 of 12" in 12px #9CA3AF, left/right arrow buttons.
- Right: "Last synced: 2 min ago" in 12px #4B5563.

## Design Tokens

| Token | Value |
|-------|-------|
| Screen bg | #1A1A2E |
| Toolbar bg | #252547 |
| Filter bar bg | #1E1E3A |
| Card bg | #252547 |
| Card thumbnail bg | #0F0F23 |
| Card border | 1px rgba(255,255,255,0.06) |
| Card hover border | 1px #6366F1 |
| Card selected border | 2px #6366F1 |
| Card radius | 8px |
| Grid columns | 4 |
| Grid gap | 12px |
| Thumbnail height | 160px |
| Toolbar height | 48px |
| Filter bar height | 40px |
| Status bar height | 32px |
| Search width | 400px |
| Search height | 36px |
| Primary | #6366F1 |
| Text primary | #E5E7EB |
| Text secondary | #9CA3AF |
| Text muted | #6B7280 |
| Text dim | #4B5563 |
| Connected dot | #10B981 |

## States to Generate

1. **Default** — Grid with 12 asset cards, search empty, "All" filter active
2. **Search active** — Search bar focused (indigo border), filtered grid showing 3 matching results
3. **Loading** — Grid shows 12 skeleton cards: dark rectangles pulsing with subtle shimmer
4. **Empty** — Center of grid area: 3D cube outline icon (48px, #4B5563) + "No assets found" 16px #9CA3AF + "Try a different search or filter" 14px #4B5563
5. **Selected** — One card has indigo border glow, bottom status bar shows "Selected: Air Max 2026 Hero · GLB · 52 MB"
6. **Offline** — Status bar: red dot + "Disconnected — showing cached assets" in #EF4444

## Style Direction

- Matches Unity Editor aesthetic — dark backgrounds, subtle borders, compact spacing
- Cards are smaller and denser than the web version — this is a tool panel, not a browsing experience
- Thumbnail backgrounds are darker than the card body for depth
- Indigo selection state is the primary visual feedback mechanism
- Status bar at bottom provides connection state — critical for a desktop client
- No rounded corners on the outer panel — it should feel like a docked Unity window
- Filter pills are compact and horizontal — quick format filtering

## Acceptance Criteria

- [ ] Full dark theme: #1A1A2E background throughout
- [ ] Top toolbar: title, brand pill, search bar, view toggle, sort, refresh
- [ ] Filter bar: horizontal format pills (All, GLB, FBX, OBJ)
- [ ] Asset grid: 4 columns, cards with dark thumbnails and metadata
- [ ] Card states: default, hover (indigo border), selected (indigo glow)
- [ ] Format badge on each thumbnail
- [ ] Bottom status bar: connection status, pagination, last synced
- [ ] Compact spacing — suited for a Unity Editor panel
