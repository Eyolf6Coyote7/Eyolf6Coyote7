# Screen: Audit Log

> Route: `/admin/audit` | Platform: Web | Figma Page: Screens — Admin Audit

## Stitch Prompt

Desktop web page, 1440px width.

An audit log viewer for admins in an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px, Admin badge) and admin side nav (220px). "Audit Log" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left: "Audit Log" in 20px bold #303133, subtitle "System-wide activity log for compliance" in 14px #909399. Right: "Export" dropdown button (outline, 36px height, border 1px #DCDFE6, text "Export ▾", options: CSV, JSON, PDF) with a download icon.

**Filter bar** (below header, 16px gap, white card, radius 8px, shadow, padding 16px, flex row wrap, 12px gap): "Event Type" dropdown (160px, default "All Events", options: All/Login/Logout/Request Created/Request Approved/Request Rejected/Role Changed/Template Modified/Config Changed), "User" searchable dropdown (160px, placeholder "All Users", autocomplete with avatar + name), "Date Range" date-time picker (260px, showing "Dec 1, 2024 00:00 — Dec 20, 2024 23:59" with calendar icon), "Severity" dropdown (100px, options: All/Info/Warning/Error). Far right: "Apply" button (primary blue, 36px) and "Reset" text link.

**Event log table** (below filter, 16px gap, white card, radius 8px, shadow): Header row (bg #F5F7FA, 48px, 14px bold #909399): columns "Timestamp" (180px), "Event" (200px), "User" (160px), "Details" (flex-grow), "IP Address" (130px), "Severity" (80px).

Table body — 15 rows, each 48px, 13px text, bottom border 1px #EBEEF5:

Row 1: "Dec 20, 2024 14:32:15" in 13px monospace #606266. Event: "Request Approved" with a green dot (6px). User: "Li Wei" with 20px avatar. Details: "#WF-1234 Equipment Purchase — Approved with comment" in 13px #606266 (truncated, hover for full text). IP: "192.168.1.45". Severity: "Info" badge (bg #ECF5FF, text #409EFF, radius 10px, 11px).

Row 3: Event "Login Failed" with red dot. User: "Unknown". Details: "3 failed attempts for wei.chen@company.com". Severity: "Warning" badge (bg #FDF6EC, text #E6A23C). This row has a subtle yellow-tinted background (#FFFBF0).

Row 7: Event "Role Changed" with blue dot. Details: "Zhang Min: Employee → Manager (by Admin Li Wei)". Severity: "Info".

Row 10: Event "Config Changed" with orange dot. Details: "Feature toggle 'auto-escalation' enabled". Severity: "Warning" badge.

Alternate between various event types to show the range of audit events. Timestamps are in 13px monospace font for alignment.

**Pagination** (below table, 16px gap): "Showing 1-15 of 2,847 events" on left, page numbers centered ("< 1 2 3 ... 190 >"), "50 / page" size dropdown on right (options: 15, 50, 100).

**Live indicator** (top-right of table card, before the header): A small green pulsing dot (8px) with "Live" text in 12px #67C23A. New events auto-appear at top of table with a brief yellow highlight animation.

## Design Tokens

| Token | Value |
|-------|-------|
| Timestamp font | 13px monospace |
| Event dot size | 6px |
| Event dot colors | green=#67C23A, red=#F56C6C, blue=#409EFF, orange=#E6A23C |
| Severity Info | bg #ECF5FF, text #409EFF |
| Severity Warning | bg #FDF6EC, text #E6A23C |
| Severity Error | bg #FEF0F0, text #F56C6C |
| Warning row bg | #FFFBF0 |
| Table row height | 48px |
| Table text size | 13px |
| Live dot | 8px #67C23A pulsing |
| Export button | outline, 36px |
| Date-time picker width | 260px |
| Monospace font | 'SF Mono', 'Consolas', monospace |

## States to Generate

1. **Default** — 15 event rows with mixed types and severities, live indicator
2. **Filtered** — Event Type "Login Failed" selected, 4 rows shown, warning-tinted rows
3. **Loading** — Skeleton rows pulsing
4. **Empty filter** — No events match: "No events found for the selected filters" with reset link
5. **Export in progress** — Export button shows spinner, disabled state

## Style Direction

- Audit log is a compliance tool — every detail matters
- Monospace timestamps ensure vertical alignment for easy scanning
- Severity badges and colored dots provide quick visual classification
- Live indicator shows the log is real-time (WebSocket-fed)
- Warning/error rows have tinted backgrounds to stand out
- Export is critical for compliance reporting — multiple format options
- Dense but readable — admins may scan thousands of events
- Professional, utilitarian — inspired by log viewer tools

## Acceptance Criteria

- [ ] Page title with Export dropdown (CSV, JSON, PDF)
- [ ] Filter bar with Event Type, User, Date Range, Severity filters
- [ ] Event table with Timestamp, Event, User, Details, IP, Severity columns
- [ ] Timestamps in monospace font
- [ ] Severity badges color-coded (Info blue, Warning yellow, Error red)
- [ ] Warning/error rows with tinted backgrounds
- [ ] Live indicator (green pulsing dot + "Live" text)
- [ ] 15 rows showing variety of event types
- [ ] Pagination with large total count and page size options
- [ ] Apply and Reset filter controls
