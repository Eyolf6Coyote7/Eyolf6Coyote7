# Screen: Feature Toggles

> Route: `/admin/features` | Platform: Web | Figma Page: Screens — Admin Features

## Stitch Prompt

A feature toggle management page for admins in an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px, Admin badge) and admin side nav (220px). "Feature Toggles" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left: "Feature Toggles" in 20px bold #303133, subtitle "Enable or disable system features" in 14px #909399. Right: "Add Toggle" button (outline, 36px, border 1px #DCDFE6, plus icon + "Add Toggle" text #606266).

**Info banner** (below header, 12px gap): A light blue banner (bg #ECF5FF, border-left 4px #409EFF, radius 4px, padding 12px 16px): info icon (16px, #409EFF) + "Changes take effect immediately. Use caution when toggling features in production." in 14px #409EFF.

**Toggle list** (below banner, 16px gap): A vertical list of toggle cards. Each card is white, full width, radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), padding 20px, 12px gap between cards.

**Toggle card layout** (flex row, align-center):

Left section (flex-grow): Feature name in 16px bold #303133 (e.g., "Auto-Escalation"). Below (4px gap), description in 14px #606266 ("Automatically escalate requests that exceed the deadline by 2x"). Below (8px gap), metadata row: "Created: Nov 1, 2024" in 12px #C0C4CC, "·", "Last toggled: Dec 15, 2024 by Li Wei" in 12px #C0C4CC, "·", tag badge "Workflow" (bg #ECF5FF, text #409EFF, 11px, radius 8px).

Right section (flex-shrink-0, flex row, align-center, 24px gap): A large toggle switch (48px wide, 24px height, rounded pill). When ON: bg #67C23A with white circle right. When OFF: bg #DCDFE6 with white circle left. To the right of the toggle: a text label "ON" in 14px bold #67C23A (or "OFF" in #909399). Further right: a three-dot menu icon (20px, #909399).

**Toggle cards to show** (8 items):

1. "Auto-Escalation" — ON, tag "Workflow", description about deadline escalation
2. "Parallel Approvals" — ON, tag "Workflow", parallel step processing
3. "Email Notifications" — ON, tag "Notifications", email for all events
4. "SMS Alerts" — OFF, tag "Notifications", SMS for urgent escalations — card has a subtle gray overlay/opacity to show it's disabled
5. "Mobile Push" — ON, tag "Notifications", push notifications for mobile
6. "Audit Log Retention (90d)" — ON, tag "Compliance", auto-delete logs older than 90 days
7. "Dark Mode" — OFF, tag "UI", experimental dark mode — has a "Beta" badge (bg #F0F9EB, text #67C23A, 11px, radius 8px) next to the name
8. "Bulk Approval" — OFF, tag "Workflow", approve multiple requests at once — has a "Beta" badge

**Disabled card styling**: Cards with toggle OFF have the description text slightly faded (#909399 instead of #606266), and the left border is gray (#DCDFE6) instead of none.

## Design Tokens

| Token | Value |
|-------|-------|
| Toggle switch width | 48px |
| Toggle switch height | 24px |
| Toggle ON bg | #67C23A |
| Toggle OFF bg | #DCDFE6 |
| Toggle circle size | 20px |
| Card padding | 20px |
| Card gap | 12px |
| Feature name size | 16px bold |
| Description size | 14px |
| Tag badge radius | 8px |
| Tag badge text | 11px |
| Beta badge | bg #F0F9EB, text #67C23A |
| Info banner bg | #ECF5FF |
| Info banner border-left | 4px #409EFF |
| Disabled description color | #909399 |
| Disabled left border | 4px #DCDFE6 |

## States to Generate

1. **Default** — 8 toggle cards with mix of ON/OFF states
2. **Toggle animation** — Mid-toggle: switch circle transitioning, brief yellow highlight on card
3. **Confirmation dialog** — Toggling a critical feature shows a popover: "Disable Auto-Escalation? This affects all active workflows." with Cancel and "Disable" (red) buttons
4. **Loading** — 8 skeleton cards pulsing
5. **Search/filter** — A search input appears at top filtering toggles, showing 3 matches

## Style Direction

- Simple toggle list — feature flags should be quick to scan and change
- ON/OFF state must be immediately visible through both color and text label
- Critical features should require confirmation before toggling off
- Tags categorize features (Workflow, Notifications, Compliance, UI)
- Beta badge indicates experimental features
- Info banner warns about production impact
- Professional, admin-tool aesthetic — inspired by feature flag management tools like Unleash/LaunchDarkly

## Acceptance Criteria

- [ ] Page title with Add Toggle button
- [ ] Info banner warning about immediate effect
- [ ] 8 toggle cards with name, description, metadata, tag badges
- [ ] Large toggle switch with ON/OFF label text
- [ ] ON toggles green, OFF toggles gray
- [ ] OFF cards visually dimmed
- [ ] Beta badges on experimental features
- [ ] Three-dot action menu on each card
- [ ] Tag badges categorizing each feature
- [ ] Confirmation dialog for critical toggle changes
