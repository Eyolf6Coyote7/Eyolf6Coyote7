# Screen: Mobile Board Canvas

> Route: `/board/:id` | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile whiteboard canvas screen. iPhone 14 frame (390x844px). The canvas dominates the screen with minimal UI overlay.

**Top bar** (44px, semi-transparent white with backdrop blur): Left has a back chevron ("<") icon. Center has the board title "Sprint Planning" (tappable to rename). Right has a blue "Share" button (small, rounded) and a small avatar stack (2 overlapping circles showing online collaborators).

**Canvas area** (fills most of the screen): Light gray (#FAFAFA) background with subtle dot grid. Show several elements on canvas: 2 yellow (#FEF3C7) sticky notes with short text, a blue (#DBEAFE) rectangle, connecting arrows, and some freehand pen strokes. One other user's cursor visible — a small colored dot (green) with name label "Alice" that fades. The canvas is zoomed to ~60% to show multiple elements.

**Floating toolbar** (bottom, above safe area, centered horizontally): A rounded pill-shaped bar (border-radius 24px, white bg, shadow, 56px height). Contains two rows of tool icons:
- Row 1: select (arrow), rectangle, circle, line
- Row 2: arrow/connector, text (T), sticky note, freehand pen
- Below rows, centered: an "AI" button with sparkle icon (slightly larger, blue tint)
Each tool icon is 44x44px touch target. Active tool (freehand pen) has blue (#2563EB) circular background.

**Zoom indicator** (top-left corner, below top bar): Small rounded pill showing "60%" in small text, semi-transparent background. Appears on pinch-zoom, fades after 2 seconds.

**No tab bar** on this screen — canvas is immersive. Tab bar only shows on Home/Search/Settings.

Style: Minimal chrome, maximum canvas. Semi-transparent overlays. Touch-friendly large targets. Inter font.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| Canvas bg | #FAFAFA |
| Top bar bg | rgba(255,255,255,0.9) + backdrop-blur |
| Top bar height | 44px |
| Toolbar height | 56px per row |
| Toolbar radius | 24px |
| Toolbar shadow | 0 4px 16px rgba(0,0,0,0.12) |
| Tool icon touch target | 44x44px |
| Active tool bg | #2563EB |
| AI button tint | #EFF6FF bg, #2563EB icon |
| Sticky yellow | #FEF3C7 |
| Shape blue | #DBEAFE |

## States to Generate

1. **Default** — Canvas with elements, toolbar visible, 1 remote cursor
2. **Drawing mode** — Freehand tool active, finger is mid-stroke, ink trail visible behind finger position
3. **Element selected** — Tap on a sticky note: blue selection border + 4 corner resize handles + floating action bar above element (duplicate, delete, color icons)
4. **Empty canvas** — Blank, center text "Draw with your finger or tap a tool to start"

## Style Direction

- Immersive canvas experience — like tldraw mobile, Apple Freeform, or Concepts app
- Floating toolbar that doesn't feel heavy
- Touch targets all ≥ 44px (Apple HIG)
- Semi-transparent overlays keep focus on canvas content

## Acceptance Criteria

- [ ] Top bar: back, title, share, avatar stack
- [ ] Canvas fills screen with dot grid
- [ ] Elements visible: stickies, shapes, arrows, freehand
- [ ] Floating toolbar with 9 tools + AI button
- [ ] Active tool highlighted
- [ ] Remote cursor visible with name
- [ ] Element selection state with handles + action bar
- [ ] No tab bar (immersive mode)
- [ ] All touch targets ≥ 44x44px
