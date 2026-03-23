# Screen: Account Settings

> Route: `/settings` | Platform: Web | Figma Page: Screens — Account

## Stitch Prompt

An account settings page for a SaaS whiteboard app. Full page layout with top navigation bar and a two-column layout below.

**Top bar** (64px, same as dashboard): Logo "Whiteboard AI" on left, centered search (optional), avatar + dropdown on right.

**Two-column layout**:
- **Left sidebar** (240px, white, right border): Vertical navigation list with icons. Items: "Profile" (user icon, active — blue text + light blue bg), "Plan & Billing" (credit card icon), "Team" (users icon), "Notifications" (bell icon), "Security" (shield icon). Each item is 40px height, 8px radius highlight on active.

- **Right content area** (fills remaining space, max-width 640px, centered with padding):

**Profile section** (default view):
- Large circular avatar (80px) with a camera overlay icon on hover for upload. Name displayed next to it bold "Jerry Wolf".
- Form fields below: "Display Name" text input (pre-filled), "Email" text input (pre-filled, with "Verified" green badge), "Bio" textarea (2 rows, optional).
- "Save Profile" blue button at bottom of section.

**Plan & Billing section** (shown when clicked):
- Current plan card: White card with blue left border, showing "Free Plan" bold, bullet points of what's included (3 boards, 1 collaborator per board, 100 AI queries/month). Blue "Upgrade" button.
- Usage bars: "Boards: 2 / 3" with a progress bar, "AI Queries: 47 / 100" with a progress bar. Bars are blue when under 80%, yellow when 80-99%, red when full.

**Team section** (shown when clicked):
- "Your Team" heading. Invite input + button. Member list similar to board settings. Role dropdown per member.

Style: Inter font, page bg #F9FAFB, content cards white with 12px radius and subtle shadow. Clean, spacious settings page. Left nav items have 12px padding-left.

## Design Tokens

| Token | Value |
|-------|-------|
| Page bg | #F9FAFB |
| Sidebar width | 240px |
| Content max-width | 640px |
| Active nav bg | #EFF6FF |
| Active nav text | #2563EB |
| Avatar size | 80px |
| Card radius | 12px |
| Progress bar height | 8px |
| Progress bar bg | #E5E7EB |
| Progress bar fill | #2563EB |
| Progress bar warning | #F59E0B |
| Progress bar danger | #EF4444 |

## States to Generate

1. **Profile tab** — Form with populated fields
2. **Plan & Billing tab** — Free plan with usage bars
3. **Loading** — Skeleton: avatar circle pulse, 3 text line pulses

## Style Direction

- Standard SaaS account settings (like GitHub Settings, Notion Settings, Linear Settings)
- Left sidebar navigation with clear active state
- Content area is focused and readable (max-width constrained)
- Usage visualization with progress bars

## Acceptance Criteria

- [ ] Top bar consistent with dashboard
- [ ] Left sidebar nav with 5 items, active highlight
- [ ] Profile: avatar upload, name, email (verified badge), bio
- [ ] Plan: current plan card, upgrade CTA, usage progress bars
- [ ] Team: member list + invite
- [ ] Save button per section
- [ ] Clean spacing, not cramped
