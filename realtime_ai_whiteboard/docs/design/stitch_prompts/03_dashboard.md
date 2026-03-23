# Screen: Dashboard

> Route: `/dashboard` | Platform: Web | Figma Page: Screens — Dashboard

## Stitch Prompt

A SaaS dashboard page showing a grid of whiteboard boards. Clean, spacious layout.

**Top bar** (64px height, white, bottom border): Logo "Whiteboard AI" on the far left. In the center, a search bar (400px wide, rounded, with magnifying glass icon, placeholder "Search boards..."). On the far right, a notification bell icon, then a circular user avatar (32px) with dropdown arrow.

**Below top bar**: A horizontal area with a large heading "My Boards" on the left, and a prominent blue (#2563EB) button "+ New Board" on the right. Below that, filter tabs: "All", "Recent", "Shared with me", "Starred" — "All" is active (blue underline).

**Board grid**: A 3-column grid (4 boards per row on desktop) of board cards. Each card is 280px wide, border-radius 12px, subtle shadow. Card structure from top to bottom: a 160px tall thumbnail area showing a miniature preview of the board content (colorful shapes, stickies, lines on light gray bg). Below the thumbnail: board title in bold (e.g., "Sprint Planning", "Product Brainstorm"), last edited time in gray ("Edited 2 hours ago"), and a row showing 2-3 small overlapping user avatars (collaborators) on the left and a "..." more menu icon on the right.

**One special card**: The first position in the grid is a dashed-border card with a large "+" icon and text "New Board" — this is the quick-create card.

Style: Inter font, background #F9FAFB, cards white with shadow 0 2px 8px rgba(0,0,0,0.08), border-radius 12px. Hover state on cards: slight scale up (1.02) and deeper shadow.

## Design Tokens

| Token | Value |
|-------|-------|
| Page bg | #F9FAFB |
| Card bg | #FFFFFF |
| Card radius | 12px |
| Card shadow | 0 2px 8px rgba(0,0,0,0.08) |
| Card hover shadow | 0 4px 16px rgba(0,0,0,0.12) |
| Thumbnail height | 160px |
| Top bar height | 64px |
| Search bar width | 400px |

## States to Generate

1. **Default** — Grid with 6-8 board cards
2. **Empty** — No boards yet. Center illustration of a blank canvas with sparkles, heading "No boards yet", subtext "Create your first board and start collaborating", blue "Create Board" button
3. **Loading** — Skeleton cards: gray pulsing rectangles matching card layout (thumbnail block + 2 text lines)
4. **Search with no results** — Search bar has text, grid is empty, illustration with "No boards match your search"

## Style Direction

- Grid of visual cards with thumbnails — boards are visual, so show previews
- Quick-create card as first item encourages action
- Filter tabs keep dashboard organized without deep navigation
- Empty state illustration + CTA for new users

## Acceptance Criteria

- [ ] Top bar with logo, search, avatar
- [ ] "New Board" button prominent
- [ ] Filter tabs (All, Recent, Shared, Starred)
- [ ] Board cards with thumbnail, title, time, collaborators
- [ ] Quick-create dashed card
- [ ] Empty state with illustration + CTA
- [ ] Skeleton loading state
