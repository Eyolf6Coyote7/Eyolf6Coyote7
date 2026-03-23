# Screen: Mobile Request Detail

> Route: `/request/:id` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

A full-screen mobile request detail view in an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content).

**Navigation bar** (44px, white bg, bottom border 1px #EBEEF5): Left: back arrow (44x44px touch area) + "Back" text in 17px #409EFF. Center: "#WF-1234" in 17px bold #303133. Right: share icon (24px, #606266).

**Scrollable content** (below nav bar, above action bar, bg #F5F7FA):

**Header card** (white, no radius on top, padding 16px, bottom border 1px #EBEEF5): Title "Equipment Purchase — CNC Machine" in 18px bold #303133. Below (8px gap): row with status badge "In Progress" (bg #ECF5FF, text #409EFF, radius 10px, 13px bold) and priority badge "High" (bg #FDF6EC, text #E6A23C, radius 10px, 13px). Below (8px gap): "Submitted by Wei Chen · Engineering" in 14px #909399. Below (4px gap): "March 15, 2024 · 14:32" in 13px #C0C4CC.

**Status timeline** (below header, 8px gap, white card, radius 8px in content area, shadow, padding 16px, margin 16px horizontal): Section title "Status Timeline" in 15px bold #303133. Below (12px gap), a **vertical** timeline (mobile uses vertical, not horizontal). Left side: connected circles (20px) with vertical lines (2px). Right side: step name and date.

Step 1: green filled circle (#67C23A) with check icon, green line below. Right: "Submitted" in 14px bold #303133, "Mar 15, 14:32" in 12px #909399.
Step 2: green filled circle with check, green line below. Right: "Manager Review — Approved" in 14px bold #303133, "Mar 16, 09:15" in 12px #909399, "Approved by Li Wei" in 12px #67C23A.
Step 3: blue filled circle (#409EFF) with pulsing dot, half-blue/half-gray line below. Right: "Finance Review" in 14px bold #409EFF, "In Review" in 12px #409EFF.
Step 4: gray circle (#DCDFE6), gray line below. Right: "Director Approval" in 14px #909399, "Pending" in 12px #C0C4CC.
Step 5: gray circle. Right: "Complete" in 14px #909399.

**Details section** (below timeline, 8px gap, white card, radius 8px, shadow, padding 16px, margin 16px): Section title "Request Details" in 15px bold #303133. Below, label-value rows (label on top in 12px #909399, value below in 14px #303133, 16px gap between items):
- "Type" / "Equipment Purchase"
- "Department" / "Engineering"
- "Amount" / "¥45,000" in 16px bold
- "Description" / Multi-line text in 14px #606266
- "Justification" / Multi-line text

**Attachments section** (below details, 8px gap, white card, radius 8px, shadow, padding 16px, margin 16px): "Attachments (2)" title. Two file rows: each has file icon (PDF red or XLSX green), file name in 14px #303133, size in 12px #909399, download icon on right. Each row is 48px height with bottom border.

**Comments section** (below attachments, 8px gap, white card, radius 8px, shadow, padding 16px, margin 16px): "Comments (3)" title. Three comments: each has 24px avatar, name in 14px bold #303133, time in 12px #909399 to the right, comment text in 14px #606266 below, bottom border 1px #EBEEF5. Below comments: text input (full width, 40px, radius 8px, border #DCDFE6, placeholder "Add comment...") with blue send button (40x40px).

**Sticky action bar** (bottom, above tab bar, 60px height, white bg, top shadow 0 -2px 8px rgba(0,0,0,0.08), padding 8px 16px, flex row, 8px gap): "Approve" button (flex 1, 44px height, bg #67C23A, white text 16px bold, radius 8px, check icon) and "Reject" button (flex 1, 44px height, bg white, border 1px #F56C6C, text #F56C6C 16px bold, radius 8px, X icon).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Nav bar height | 44px |
| Action bar height | 60px |
| Timeline circle size | 20px |
| Timeline line width | 2px |
| Timeline completed | #67C23A |
| Timeline current | #409EFF |
| Timeline pending | #DCDFE6 |
| Section card margin | 16px horizontal |
| Section card radius | 8px |
| Section card padding | 16px |
| Title size | 18px bold |
| Section title size | 15px bold |
| Label size | 12px #909399 |
| Value size | 14px #303133 |
| Comment avatar | 24px |
| Comment input height | 40px |
| Action button height | 44px |
| Action button radius | 8px |
| Action bar shadow | 0 -2px 8px rgba(0,0,0,0.08) |
| File row height | 48px |

## States to Generate

1. **Default — In Progress** — Vertical timeline at step 3, details, attachments, comments, action bar
2. **Approved** — All steps green, status badge green, action bar replaced with "Approved" green banner
3. **Rejected** — Timeline stopped at red X, status badge red, action bar replaced with "Rejected" red banner
4. **Loading** — Skeleton content sections
5. **Scrolled** — Content scrolled showing attachments/comments, action bar stays sticky at bottom

## Style Direction

- Full-screen detail view optimized for mobile reading
- Vertical timeline is the hero — shows exactly where the request stands
- Content is organized in card sections for visual separation
- Sticky action bar at bottom keeps approve/reject accessible at all times
- All touch targets minimum 44x44px
- Vertical labels (label above value) save horizontal space on mobile
- Professional, clean — information-dense but not cluttered
- Comments enable mobile collaboration

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Nav bar with back arrow, request ID, share icon
- [ ] Header with title, status badge, priority badge, requester, date
- [ ] Vertical status timeline with 5 steps, current step highlighted
- [ ] Request details with label-value pairs
- [ ] Attachments section with 2 file rows and download icons
- [ ] Comments section with 3 comments and reply input
- [ ] Sticky action bar with Approve/Reject buttons (44px height)
- [ ] All touch targets at least 44x44px
- [ ] Scrollable content between nav bar and action bar
