# Screen: Board Canvas

> Route: `/board/:id` | Platform: Web | Figma Page: Screens — Canvas

## Stitch Prompt

Desktop web page, 1440px width.

A collaborative whiteboard canvas application interface, similar to Miro or FigJam. The canvas takes up the entire screen with minimal chrome.

**Top bar** (48px height, semi-transparent white with blur backdrop): Left side has a back arrow icon and the app logo (small). Center has an editable board title "Product Brainstorm" (click to rename). Right side has: a green dot + "3 online" collaborator count, a blue "Share" button (border-radius 8px), and 3 small overlapping circular user avatars with colored borders (blue, green, orange — matching their cursor colors).

**Left toolbar** (48px wide, vertical, floating with rounded corners 12px, shadow, semi-transparent white background, centered vertically on the left edge, 8px gap between icons): Tool icons top to bottom: cursor/select (arrow icon), rectangle, circle, line, arrow/connector, text (T), sticky note, freehand pen, image upload. The currently active tool (rectangle) has a blue (#2563EB) background highlight. Each icon is 40x40px.

**Canvas area** (center, fills remaining space): Light gray (#FAFAFA) background with subtle dot grid pattern (dots every 20px, very light gray #E5E7EB). On the canvas, show several elements: 3 yellow (#FEF3C7) sticky notes with handwritten-style text, 2 blue (#DBEAFE) rectangles with labels, red (#FEE2E2) circle, black arrows connecting elements, and some freehand pen strokes in dark gray. Two other users' cursors are visible: one blue cursor labeled "Alice" and one green cursor labeled "Bob" — each cursor is a small arrow with a colored rounded name tag.

**Right side — AI Chat Panel** (350px wide, white background, border-left, slide-in from right): Top has "AI Assistant" title with a close (X) button. Below is a scrollable chat area with messages: a user message bubble (light blue bg, right-aligned) saying "Summarize all the sticky notes", and an AI response bubble (white bg, left-aligned, with a small sparkle icon) showing a bulleted summary. At the bottom, a text input bar with placeholder "Ask AI anything..." and a blue send button (arrow icon).

**Bottom bar** (48px, semi-transparent): Left side has zoom controls: minus button, "75%" zoom percentage text, plus button, and a "fit to screen" icon. Center has a small minimap (120x80px, showing a tiny overview of the full canvas with a highlighted viewport rectangle). Right side shows "Page 1 of 1".

Style: Inter font, everything semi-transparent with backdrop blur for overlays. Primary blue #2563EB. Canvas bg #FAFAFA. Minimal, professional, tool-focused. Desktop 1440x900.

## Design Tokens

| Token | Value |
|-------|-------|
| Canvas bg | #FAFAFA |
| Dot grid color | #E5E7EB |
| Toolbar bg | rgba(255,255,255,0.9) + backdrop-blur |
| Toolbar width | 48px |
| Tool icon size | 40x40px |
| Active tool bg | #2563EB |
| Active tool icon color | #FFFFFF |
| AI Panel width | 350px |
| Sticky yellow | #FEF3C7 |
| Shape blue | #DBEAFE |
| Shape red | #FEE2E2 |
| Top bar height | 48px |
| Bottom bar height | 48px |
| Minimap size | 120x80px |

## States to Generate

1. **Default** — Canvas with elements, AI panel open, 2 remote cursors
2. **AI Panel closed** — Full canvas, no right panel, toggle button visible on right edge
3. **Empty canvas** — New board, blank canvas, center text "Click a tool to start drawing" with subtle arrow pointing to toolbar
4. **Loading** — Canvas area shows skeleton: pulsing gray blocks where elements would be

## Style Direction

- Canvas-first: UI chrome is minimal, semi-transparent, and floatable
- Toolbar is compact and icon-only — doesn't compete with canvas content
- AI panel is a side drawer, not a modal — user can see canvas while chatting
- Remote cursors make collaboration feel alive and real-time
- Dot grid gives spatial orientation without being distracting

## Acceptance Criteria

- [ ] Top bar: back, title (editable), share button, avatar stack
- [ ] Left toolbar: 9 tools, vertical, floating, active state highlighted
- [ ] Canvas: dot grid background, multiple element types visible
- [ ] Remote cursors: 2 users with name labels and distinct colors
- [ ] AI Panel: chat messages (user + AI), input bar, close button
- [ ] Bottom bar: zoom controls, minimap, page indicator
- [ ] Canvas feels spacious — chrome is minimal
- [ ] Semi-transparent overlays with backdrop blur
