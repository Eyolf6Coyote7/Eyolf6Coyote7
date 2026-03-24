# Screen: Remote Config

> Route: `/admin/config` | Platform: Web | Figma Page: Screens — Admin Config

## Stitch Prompt

Desktop web page, 1440px width.

A remote configuration page for admins covering branding and notification templates in an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px, Admin badge) and admin side nav (220px). "Remote Config" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header**: "Remote Config" in 20px bold #303133, subtitle "Brand settings and notification templates" in 14px #909399.

**Tab navigation** (below header, 16px gap): Two tabs side by side (Element Plus tab style): "Brand Settings" (active — text #409EFF, bottom border 2px #409EFF) and "Notification Templates" (inactive — text #909399, no border). Each tab is 14px, 40px height, 24px horizontal padding.

**Tab 1 — Brand Settings** (below tabs, 16px gap):

Card 1 — "Company Branding" (white, radius 8px, shadow, padding 24px): A form with sections:

"Logo" section: current logo preview (80x80px, gray placeholder square with "Logo" text) on the left. To the right: "Upload Logo" outline button (36px, border #DCDFE6) and "Remove" text button (#F56C6C). Below: "Recommended: 200x200px, PNG or SVG, max 2MB" in 12px #C0C4CC.

"Company Name" text input (full width, value "Acme Corporation", 36px height).

"Primary Color" section: color picker input (200px) showing #409EFF with a color swatch square (24x24px, filled with #409EFF) to the left. Preview text: "This color is used for buttons, links, and active states" in 12px #909399.

"Login Page Message" textarea (full width, 80px height, value "Welcome to the Acme Workflow System. Please sign in with your company credentials.").

"Footer Text" text input (full width, value "© 2025 Acme Corporation. All rights reserved.").

Bottom: "Save Changes" button (primary blue, 36px) and "Reset to Defaults" text link (#909399).

Card 2 — "Email Branding" (white, radius 8px, shadow, padding 24px, 16px gap below card 1):

"Email Header Color" color picker (same style, value #409EFF). "Email Footer Text" textarea (full width, 60px, value "This is an automated message from the Acme Workflow System. Please do not reply."). "Include Company Logo in Emails" toggle switch (ON, green).

**Tab 2 — Notification Templates** (shown when second tab is active):

A list of notification template cards, each white, radius 8px, shadow, padding 20px, 12px gap between:

Template 1: "Request Submitted" — title in 16px bold #303133. Trigger: "When a new request is created" in 14px #909399. Channels row: badges "Email" (bg #ECF5FF, text #409EFF) + "Push" (bg #ECF5FF, text #409EFF) + "SMS" (bg #F5F7FA, text #909399, strikethrough — disabled). Right side: "Edit" button (outline, 32px).

Template 2: "Approval Required" — same layout. Channels: Email + Push + SMS (all active blue).

Template 3: "Request Approved" — Channels: Email + Push.

Template 4: "Request Rejected" — Channels: Email + Push.

Template 5: "Escalation Notice" — Channels: Email + Push + SMS (all active).

Template 6: "Deadline Reminder" — Channels: Email + Push.

Each template card, when expanded (clicking Edit), shows: "Subject" text input (e.g., "Action Required: Request #{request_id} needs your approval"), "Body" rich text editor area (200px height, showing template with merge tags like `{{requester_name}}`, `{{request_title}}`, `{{approval_url}}`), and channel toggles for Email/Push/SMS. Merge tag helper: a row of clickable tag chips below the editor: `{{requester_name}}`, `{{request_title}}`, `{{request_id}}`, `{{approval_url}}`, `{{deadline}}`.

## Design Tokens

| Token | Value |
|-------|-------|
| Tab active | text #409EFF, border-bottom 2px #409EFF |
| Tab inactive | text #909399 |
| Tab height | 40px |
| Logo preview size | 80x80px |
| Color swatch size | 24x24px |
| Color picker width | 200px |
| Template card padding | 20px |
| Channel badge active | bg #ECF5FF, text #409EFF |
| Channel badge disabled | bg #F5F7FA, text #909399 |
| Merge tag chip | bg #ECF5FF, text #409EFF, radius 4px, 12px, padding 2px 8px |
| Rich text editor height | 200px |
| Card gap | 12px |

## States to Generate

1. **Brand Settings tab** — Form with logo placeholder, color pickers, text fields filled
2. **Notification Templates tab** — List of 6 notification templates with channel badges
3. **Template editing** — One template expanded with subject, body editor, merge tags visible
4. **Save success** — Green toast "Configuration saved successfully" at top-right
5. **Unsaved changes** — Yellow warning bar at top: "You have unsaved changes" with "Save" and "Discard" buttons

## Style Direction

- Configuration page is tabbed to separate branding from notifications
- Brand settings use real form inputs with live preview where possible
- Color picker is inline, not a modal
- Notification templates use a card-list pattern with expandable editing
- Merge tags are clickable chips to insert into the template body
- Channel badges show at-a-glance which channels each notification uses
- Professional admin tool — no decorative elements
- Follows Element Plus form and tab patterns

## Acceptance Criteria

- [ ] Tab navigation: Brand Settings and Notification Templates
- [ ] Brand Settings: logo upload, company name, primary color picker, login message, footer text
- [ ] Email branding section with color and footer
- [ ] Save Changes and Reset to Defaults buttons
- [ ] Notification Templates: 6 template cards with titles, triggers, channel badges
- [ ] Channel badges (Email, Push, SMS) with active/disabled states
- [ ] Expandable template editor with subject, body, merge tag chips
- [ ] Merge tags are clickable to insert into body
- [ ] Unsaved changes warning
- [ ] Toast notification on save
