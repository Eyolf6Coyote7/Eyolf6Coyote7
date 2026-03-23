# Screen: Search Results

> Route: `/search?q=...` | Platform: Web | Figma Page: Screens — Search

## Stitch Prompt

The search results page showing filtered 3D assets matching a query. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Logo — 3D cube icon + "AssetHub 3D" text.
- Center: Search bar (480px, pill shape, radius 20px, indigo border 2px #6366F1 indicating focused state). Contains the search query "hero shot shoe" in 14px #111827 with a clear X icon on the right.
- Right: Brand switcher, notification bell, user avatar (same as asset library).

**Search summary** (below top bar, full width, #F9FAFB bg, 12px vertical padding, 24px horizontal padding):
- Left: "247 results for" in 14px #6B7280 + "hero shot shoe" in bold 14px #111827. Below: "Showing results across all brands" in 12px #9CA3AF.
- Right: Sort dropdown "Relevance" (default, also: Newest, Oldest, Largest, Name A-Z) — border 1px #D1D5DB, radius 8px, 36px height.

**Faceted filters** (left sidebar, 240px wide, white bg, border-right 1px #E5E7EB, 16px padding):
- "Refine Results" heading bold 14px #111827 + "Clear" link in #6366F1.
- Active filters bar (if any active): row of small pills showing active filters — "GLB" with X, "Nike" with X — each is #EEF2FF bg, #6366F1 text, radius 16px, 12px.
- Sections same as Asset Library sidebar: Format, Brand, Date Range, Tags. Counts update based on search results.

**Results grid** (right of sidebar, fills remaining space, 24px padding):
- Grid: 3 columns, 16px gap. Each card identical to Asset Library cards but with **search highlight**: matched terms in the asset name are highlighted with a yellow (#FEF3C7) background span. For example, in "Air Max 2026 — **Hero Shot**", "Hero Shot" has yellow highlight.
- Show 6 result cards with variety.
- Below each card's name: a "relevance snippet" — 12px #9CA3AF text showing "...tagged with **shoe**, **hero** in campaign-2026..." with matched terms in bold.

**Pagination** (bottom center): Same as asset library — numbered pages with indigo active state.

**No results state** (when search yields 0): Centered in grid area — magnifying glass icon (48px, #D1D5DB) + "No assets match 'xyz'" bold 16px #374151 + "Try different keywords or clear your filters" 14px #9CA3AF + "Clear search" button (indigo text, white bg, border, radius 8px).

## Design Tokens

| Token | Value |
|-------|-------|
| Search bar focused border | 2px #6366F1 |
| Search summary bg | #F9FAFB |
| Highlight bg | #FEF3C7 |
| Sidebar width | 240px |
| Grid columns | 3 |
| Grid gap | 16px |
| Card radius | 12px |
| Card shadow | 0 2px 8px rgba(0,0,0,0.08) |
| Active filter pill bg | #EEF2FF |
| Active filter pill text | #6366F1 |
| Primary | #6366F1 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Tag radius | 16px |

## States to Generate

1. **Default** — Results grid with 6 cards, highlighted matched terms, faceted filters
2. **No results** — Empty state with "No assets match" message and clear button
3. **Loading** — Skeleton cards with shimmer, search bar shows spinner icon
4. **Filtered** — Active filter pills shown, result count updated, fewer cards

## Style Direction

- Search results feel fast and relevant — highlighted terms confirm the match
- Faceted filters let users narrow down without retyping
- Active filter pills at the top of the sidebar provide clear feedback on what is filtering
- Relevance snippets below each card explain why the result matched
- Professional search experience inspired by enterprise search tools
- The search bar remains prominent and editable — encouraging query refinement

## Acceptance Criteria

- [ ] Search bar in top bar: focused state with indigo border, query text visible
- [ ] Search summary: result count, query echoed, sort dropdown
- [ ] Faceted filters sidebar: Format, Brand, Date, Tags with counts
- [ ] Active filter pills with remove (X) capability
- [ ] Result grid: 3 columns, cards with highlighted matched terms (yellow bg)
- [ ] Relevance snippets below card names
- [ ] Pagination at bottom
- [ ] No results empty state with icon and clear button
