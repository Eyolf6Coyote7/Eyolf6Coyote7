# Screen: Request Detail

> Route: `/request/:id` | Platform: Web | Figma Page: Screens — Request Detail

## Stitch Prompt

Desktop web page, 1440px width.

A detailed view of a single workflow request in an enterprise approval system. Desktop viewport 1440x900px. Standard layout with top bar (64px) and side nav (220px). No nav item is highlighted as active (this is a drill-down from multiple paths).

**Main content area** (background #F5F7FA, padding 24px):

**Breadcrumb** (top, 14px text): "Dashboard / My Requests / #WF-1234" — each segment in #909399 with "/" separators, last segment in #303133 bold.

**Header row** (below breadcrumb, 16px gap, flex row, justify-between): Left side: title "#WF-1234 — Equipment Purchase Request" in 20px bold #303133. Right side: status badge "In Progress" (bg #ECF5FF, text #409EFF, border-radius 10px, padding 4px 12px, 12px bold) and a "..." more-actions dropdown button (outline, 32x32px).

**Two-column layout** (below header, 16px gap, main column 65% width, sidebar 35% width, 24px gap between):

**Left column — Details card** (white, radius 8px, shadow, padding 24px):

Section 1 — "Status Timeline" heading (16px bold #303133). Below, a horizontal timeline with 5 connected steps. Each step is a 24px circle with an icon inside, connected by 2px horizontal lines. Steps: "Submitted" (filled #67C23A green, check icon, date "Mar 15" below in 12px #909399), "Manager Review" (filled #67C23A green, check icon, "Mar 16"), "Finance Review" (filled #409EFF blue, pulsing dot animation to indicate current, "In Review"), "Director Approval" (border #DCDFE6, gray, "Pending"), "Complete" (border #DCDFE6, gray, "—"). Lines between completed steps are green; line between current and next is half blue/half gray.

Section 2 — "Request Details" heading (16px bold #303133, 24px top margin). A description list: rows of label-value pairs separated by 1px #EBEEF5 borders. Labels (14px #909399, 140px fixed width): "Type", "Department", "Priority", "Amount", "Description", "Justification". Values (14px #303133): "Equipment Purchase", "Engineering", priority badge "High" (bg #FDF6EC, text #E6A23C, radius 10px), "¥45,000", multi-line description text, justification text. Each row has 12px vertical padding.

Section 3 — "Attachments" heading (16px bold #303133, 24px top margin). Two file cards in a row: each card has a file-type icon (PDF red, XLSX green), file name in 14px #303133, size in 12px #909399, and a download icon button. Cards are outlined (1px #EBEEF5, radius 4px, padding 12px).

**Right column — Activity sidebar**:

Card 1 — "Approver Chain" (white, radius 8px, shadow, padding 20px): A vertical list of approvers. Each row (48px height): 32px circular avatar, name in 14px bold #303133, role in 12px #909399 below name, and a status icon on the right — green check for "Approved", blue clock for "In Review", gray dash for "Pending". Approvers: "Li Wei — Engineering Manager" (green check), "Zhang Min — Finance Lead" (blue clock, highlighted row with light blue #ECF5FF bg), "Wang Jun — Director" (gray dash).

Card 2 — "Comments" (white, radius 8px, shadow, padding 20px, 16px top gap from card 1): A scrollable thread. Each comment: 28px circular avatar (left), name in 14px bold #303133, timestamp in 12px #909399, comment text in 14px #606266 below, bottom border 1px #EBEEF5. Show 3 comments. At the bottom, a text input (full width, 36px, border 1px #DCDFE6, radius 4px, placeholder "Add a comment...") with a blue "Send" button (32px, #409EFF, arrow icon) to its right.

## Design Tokens

| Token | Value |
|-------|-------|
| Breadcrumb text | 14px #909399, active #303133 |
| Title size | 20px bold |
| Timeline circle size | 24px |
| Timeline line width | 2px |
| Timeline completed color | #67C23A |
| Timeline current color | #409EFF |
| Timeline pending color | #DCDFE6 |
| Detail label width | 140px |
| Detail row padding | 12px |
| Approver row height | 48px |
| Avatar size (approver) | 32px |
| Avatar size (comment) | 28px |
| File card border | 1px #EBEEF5 |
| File card radius | 4px |
| Left column width | 65% |
| Right column width | 35% |
| Column gap | 24px |

## States to Generate

1. **Default — In Progress** — Timeline at step 3, two approvers done, comments thread active
2. **Approved** — All timeline steps green with checks, status badge green "Approved", all approvers show green checks
3. **Rejected** — Timeline stops at step 2 with red X, status badge red "Rejected", rejection comment highlighted in red border
4. **Loading** — Skeleton loaders for timeline, detail fields, and sidebar cards
5. **Escalated** — Status badge orange "Escalated", timeline step 3 has orange warning icon, escalation notice banner at top

## Style Direction

- Information-dense but well-organized — two-column layout separates static details from dynamic activity
- Timeline is the hero element — it immediately communicates where the request stands
- Approver chain shows faces and roles — makes the process human and traceable
- Comments thread enables collaboration without leaving the request
- File attachments are downloadable inline
- Color coding on timeline and badges is consistent throughout the system
- Professional, structured, no wasted space

## Acceptance Criteria

- [ ] Breadcrumb navigation at top
- [ ] Request title with ID and status badge
- [ ] Horizontal status timeline with 5 steps and current-step indicator
- [ ] Request details as label-value description list
- [ ] Attachments section with file cards and download buttons
- [ ] Approver chain sidebar with avatars, names, roles, status icons
- [ ] Comments thread with avatars, timestamps, and reply input
- [ ] Two-column layout (65/35 split)
- [ ] Status colors consistent: green=approved, blue=in-progress, yellow=pending, red=rejected
