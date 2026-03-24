# Screen: User Management

> Route: `/admin/users` | Platform: Web | Figma Page: Screens — Admin Users

## Stitch Prompt

Desktop web page, 1440px width.

An admin user management page for an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px, Admin badge) and admin side nav (220px). "User Management" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left: "User Management" in 20px bold #303133, subtitle "Manage employees and roles" in 14px #909399. Right: "Invite User" button (primary, bg #409EFF, white text, 36px height, radius 4px, plus icon + "Invite User" text, 14px bold).

**Stats row** (below header, 16px gap, 3 small metric pills inline): "Total: 156" (bg #ECF5FF, text #409EFF, radius 16px, padding 4px 16px, 13px), "Active: 148" (bg #F0F9EB, text #67C23A), "Deactivated: 8" (bg #FEF0F0, text #F56C6C). These are inline, 8px gap between each.

**Filter/search bar** (below stats, 12px gap, flex row, 12px gap): "Role" dropdown (120px, default "All Roles", options: All/Admin/Manager/Employee), "Department" dropdown (140px, default "All Depts"), "Status" dropdown (100px, default "Active"), search input (240px, placeholder "Search by name or email...", magnifying glass icon).

**User table** (below filter bar, 16px gap, white card, radius 8px, shadow): Header row (bg #F5F7FA, 48px height, 14px bold #909399): columns "User" (flex-grow), "Email" (200px), "Role" (120px), "Department" (140px), "Status" (100px), "Last Active" (130px), "Actions" (100px).

Table body — 10 rows, each 56px height, 14px text, bottom border 1px #EBEEF5:

Row 1: User column has a 32px circular avatar + "Wei Chen" in 14px bold #303133, below "EMP-001" in 12px #909399. Email: "wei.chen@company.com" in 14px #606266. Role: badge "Admin" (bg #ECF5FF, text #409EFF, radius 10px, 12px). Department: "Engineering". Status: green dot (8px circle #67C23A) + "Active" in 14px #67C23A. Last Active: "2 min ago". Actions: three-dot menu icon (click reveals dropdown: Edit, Deactivate, Reset Password, View Activity).

Row 2: "Li Wei" with role badge "Manager" (bg #F0F9EB, text #67C23A). Department: "Engineering". Active.

Row 3: "Zhang Min" with role badge "Employee" (bg #F5F7FA, text #606266). Department: "Finance". Active.

Row 7: "Deactivated User" — Status: gray dot + "Deactivated" in #909399, entire row text is slightly faded (#909399). Role badge has gray styling.

Show 10 rows total with a mix of roles and departments.

**Pagination** (below table, 16px gap): "Showing 1-10 of 156 users" text on left, page numbers centered, page size dropdown on right.

**Invite User modal** (overlaid state): Same overlay pattern as approve/reject modal. Modal (480px wide): Title "Invite New User", form with fields: "Email Address" (required), "Full Name" (required), "Role" (dropdown: Admin/Manager/Employee), "Department" (dropdown), "Send Welcome Email" checkbox (checked by default). Footer: "Cancel" and "Send Invitation" (primary blue) buttons.

## Design Tokens

| Token | Value |
|-------|-------|
| Avatar size (table) | 32px |
| Role Admin badge | bg #ECF5FF, text #409EFF |
| Role Manager badge | bg #F0F9EB, text #67C23A |
| Role Employee badge | bg #F5F7FA, text #606266 |
| Status Active | dot #67C23A, text #67C23A |
| Status Deactivated | dot #909399, text #909399 |
| Status dot size | 8px |
| Table row height | 56px |
| Invite button | bg #409EFF, 36px height |
| Metric pill radius | 16px |
| Metric pill padding | 4px 16px |
| Action menu icon | 20px #909399 |
| Invite modal width | 480px |

## States to Generate

1. **Default** — Table with 10 users, mixed roles and departments
2. **Search active** — Search input has "chen" typed, table filtered to 2 matching rows
3. **Invite modal open** — Modal overlay with invite form, background dimmed
4. **Empty search** — No users match filter: "No users found matching your criteria" with reset link
5. **Loading** — Skeleton table with 10 pulsing rows

## Style Direction

- User management table is the standard enterprise admin pattern
- Role badges provide instant role recognition through color coding
- Status indicators use both color dot and text for accessibility
- Three-dot action menu keeps the row clean while providing full functionality
- Metric pills at the top give quick counts without taking too much space
- Invite flow is a modal to avoid leaving the page
- Professional, utilitarian — this is an admin tool

## Acceptance Criteria

- [ ] Page title with Invite User button
- [ ] Stats pills showing total, active, deactivated counts
- [ ] Filter bar with Role, Department, Status dropdowns and search
- [ ] User table with avatar, name, employee ID, email, role badge, department, status, last active
- [ ] Role badges color-coded by role type
- [ ] Status with colored dot and text
- [ ] Three-dot action menu on each row
- [ ] Deactivated users visually dimmed
- [ ] Pagination with count summary
- [ ] Invite User modal with form fields
