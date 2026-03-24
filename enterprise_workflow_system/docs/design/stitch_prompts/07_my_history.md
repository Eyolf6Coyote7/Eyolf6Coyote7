# Screen: My History

> Route: `/history` | Platform: Web | Figma Page: Screens — History

## Stitch Prompt

Desktop web page, 1440px width.

A table of past requests submitted by the current user in an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px) and side nav (220px). "My History" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left: "My History" in 20px bold #303133, subtitle "All requests you've submitted" in 14px #909399. Right: "Export CSV" button (outline, 36px height, border 1px #DCDFE6, radius 4px, download icon + text "Export" in 14px #606266).

**Filter bar** (below header, 16px gap, white card, radius 8px, shadow, padding 16px, flex row, 12px gap): "Status" dropdown (120px, options: All/Pending/In Progress/Approved/Rejected/Escalated), "Type" dropdown (140px, options: All/Leave/Purchase/Travel/Equipment/Expense/General), "Date Range" picker (200px, calendar icon), "Search" input (200px, placeholder "Search by title or ID..."). Far right: "Reset" text button #909399.

**Results summary** (below filter bar, 8px gap): "Showing 1-20 of 47 requests" in 14px #909399, left-aligned.

**Data table** (below, 8px gap, white card, radius 8px, shadow): Table fills the card width. Header row (background #F5F7FA, 48px height, 14px bold #909399 uppercase text): columns "Request ID" (120px), "Type" (140px), "Title" (flex-grow), "Status" (120px), "Submitted" (130px), "Resolved" (130px), "Duration" (100px). Sortable columns have a small up/down arrow icon — "Submitted" column shows a blue up arrow (currently sorted ascending).

Table body: 10 rows, each 52px height, 14px #606266 text, bottom border 1px #EBEEF5, hover bg #F5F7FA. Row data examples:
- Row 1: "#WF-1289", "Leave", "Annual Leave — Dec 20-31", badge "Approved" (bg #F0F9EB, text #67C23A), "Dec 10, 2024", "Dec 10, 2024", "2h"
- Row 2: "#WF-1267", "Purchase", "Office Chairs x20", badge "Rejected" (bg #FEF0F0, text #F56C6C), "Dec 5, 2024", "Dec 8, 2024", "3d"
- Row 3: "#WF-1255", "Travel", "Beijing Trip — Q1 Review", badge "In Progress" (bg #ECF5FF, text #409EFF), "Dec 1, 2024", "—", "—"
- Row 4: "#WF-1240", "Equipment", "Developer Laptop Upgrade", badge "Escalated" (bg #FDF6EC, text #E6A23C), "Nov 28, 2024", "—", "—"

Request IDs are clickable links (#409EFF). Status badges are pill-shaped (radius 10px). Each row has a right-arrow icon on the far right (#C0C4CC) indicating it's clickable.

**Pagination** (below table card, 16px gap, centered): Element Plus pagination with page size selector: "20 / page" dropdown on the left, page numbers "< 1 2 3 >" centered, "Go to" input on the right.

## Design Tokens

| Token | Value |
|-------|-------|
| Table header bg | #F5F7FA |
| Table header text | 14px bold #909399 |
| Table row height | 52px |
| Table row hover | #F5F7FA |
| Table border | 1px #EBEEF5 |
| Status Approved | bg #F0F9EB, text #67C23A |
| Status Rejected | bg #FEF0F0, text #F56C6C |
| Status In Progress | bg #ECF5FF, text #409EFF |
| Status Escalated | bg #FDF6EC, text #E6A23C |
| Status Pending | bg #FDF6EC, text #E6A23C |
| Badge radius | 10px |
| Sort icon active | #409EFF |
| Sort icon inactive | #C0C4CC |
| Export button | outline, 36px height |
| Pagination active | bg #409EFF, text white |

## States to Generate

1. **Default** — Table with 10 rows of mixed statuses, sorted by Submitted date
2. **Filtered** — Status filter set to "Rejected", showing 3 rows only, active filter highlighted
3. **Empty** — No history: centered illustration, "No requests yet. Start by submitting a new request!" text, blue CTA button "New Request"
4. **Loading** — 10 skeleton rows pulsing in the table area
5. **Sorted** — "Duration" column sorted descending, arrow icon highlighted blue pointing down

## Style Direction

- Data table is the primary pattern — optimized for scanning many rows quickly
- Sortable columns let users find what they need
- Status badges are consistent with the rest of the system
- Export functionality is important for compliance and personal record-keeping
- Duration column helps users understand typical processing times
- Clickable rows navigate to request detail
- Clean Element Plus table styling, no zebra striping, subtle hover

## Acceptance Criteria

- [ ] Page title with subtitle and Export CSV button
- [ ] Filter bar with Status, Type, Date Range, Search
- [ ] Results count summary text
- [ ] Data table with 7 columns including sortable indicators
- [ ] 10 rows with varied request types and statuses
- [ ] Status badges with consistent color coding
- [ ] Clickable request IDs (blue link style)
- [ ] Row hover state
- [ ] Pagination with page size selector
- [ ] Sort indicator on active column
