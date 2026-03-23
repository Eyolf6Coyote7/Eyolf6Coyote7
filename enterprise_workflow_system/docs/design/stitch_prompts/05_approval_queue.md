# Screen: Approval Queue

> Route: `/approvals` | Platform: Web | Figma Page: Screens — Approval Queue

## Stitch Prompt

A filterable list of pending approval requests for a manager in an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px) and side nav (220px). "Approval Queue" nav item is active (blue highlight, blue left border, badge "5" visible).

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left side: "Approval Queue" in 20px bold #303133, with a subtitle "5 requests awaiting your approval" in 14px #909399 below. Right side: a "Bulk Actions" dropdown button (outline style, 36px height, border 1px #DCDFE6, radius 4px, text "Bulk Actions" with down-chevron).

**Filter bar** (below header, 16px gap, white card, radius 8px, shadow, padding 16px, flex row, 12px gap between items): Filters: "Status" dropdown (120px wide, default "All Statuses"), "Type" dropdown (140px, default "All Types"), "Priority" dropdown (120px, default "All"), "Date Range" date picker (200px wide, placeholder "Select date range" with calendar icon), a "Search" text input (200px, placeholder "Search requests...", magnifying glass icon). Far right: a "Reset Filters" text button in #909399.

**Request list** (below filter bar, 16px gap): A vertical list of request cards, each card is white, full width, border-radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), padding 20px, 12px gap between cards.

**Request card layout** (flex row, 3 sections):

Left section (flex-grow): Top line: request ID "#WF-1234" in 14px bold #409EFF (link style), 8px gap, request title "Equipment Purchase — CNC Machine" in 14px bold #303133. Second line (8px gap below): requester "Wei Chen" with a 20px circular avatar, "Engineering" department in 12px #909399, "Submitted 2h ago" in 12px #909399, each separated by a dot (·). Third line: priority badge "High" (bg #FDF6EC, text #E6A23C, radius 10px, 12px font) and type badge "Purchase Order" (bg #ECF5FF, text #409EFF, radius 10px, 12px font), 8px gap between badges.

Center section (200px): Amount "¥45,000" in 16px bold #303133.

Right section (flex-shrink-0, flex row, 8px gap): Two action buttons: "Approve" (bg #67C23A, white text, 36px height, radius 4px, 14px, check icon left of text) and "Reject" (bg white, border 1px #F56C6C, text #F56C6C, 36px height, radius 4px, 14px, X icon left of text). Below the buttons, "View Details →" text link in 12px #409EFF.

Show 5 request cards with varying data. The second card shows "Urgent" priority (bg #FEF0F0, text #F56C6C) and has a red left border (4px, #F56C6C) to draw attention. The fourth card shows a "Travel Approval" type with "Low" priority (bg #F0F9EB, text #67C23A).

**Pagination** (below list, 16px gap, centered): Element Plus pagination component: "< 1 2 3 ... 8 >" in 14px, active page "1" has blue bg #409EFF with white text, others are #606266.

## Design Tokens

| Token | Value |
|-------|-------|
| Page title size | 20px bold |
| Card padding | 20px |
| Card radius | 8px |
| Card shadow | 0 2px 12px rgba(0,0,0,0.1) |
| Card gap | 12px |
| Filter bar padding | 16px |
| Filter dropdown width | 120-200px |
| Filter input height | 36px |
| Approve button bg | #67C23A |
| Reject button border | 1px #F56C6C |
| Reject button text | #F56C6C |
| Action button height | 36px |
| Priority High | bg #FDF6EC, text #E6A23C |
| Priority Urgent | bg #FEF0F0, text #F56C6C |
| Priority Low | bg #F0F9EB, text #67C23A |
| Type badge | bg #ECF5FF, text #409EFF |
| Urgent card left border | 4px #F56C6C |
| Request ID color | #409EFF |
| Pagination active bg | #409EFF |

## States to Generate

1. **Default** — 5 request cards with varying priorities, filter bar with all defaults
2. **Filtered** — Status dropdown shows "Pending", 2 cards visible, "Reset Filters" highlighted in blue
3. **Empty** — No pending approvals: illustration of a completed checkmark, "All caught up! No pending approvals." in 16px #909399, no cards shown
4. **Loading** — 5 skeleton card placeholders pulsing
5. **Bulk select** — Checkboxes appear on left of each card, 2 selected (blue checkbox), top bar shows "2 selected" with bulk "Approve All" and "Reject All" buttons

## Style Direction

- Card-based list is scannable — each request is a self-contained unit
- Quick actions (Approve/Reject) on each card reduce clicks for high-volume approvers
- Urgent items should visually stand out with the red left border accent
- Filter bar stays sticky at top when scrolling
- Priority and type badges provide instant categorization without reading details
- Amount is prominently displayed for financial approvals
- Professional, efficient — designed for managers processing many approvals

## Acceptance Criteria

- [ ] Page title with pending count subtitle
- [ ] Filter bar with Status, Type, Priority, Date Range, Search filters
- [ ] 5 request cards with ID, title, requester, department, time, priority badge, type badge
- [ ] Approve (green) and Reject (red outline) buttons on each card
- [ ] Urgent request card has red left border accent
- [ ] Amount displayed on each card
- [ ] View Details link on each card
- [ ] Pagination at bottom
- [ ] Bulk Actions dropdown button
- [ ] Filter Reset button
