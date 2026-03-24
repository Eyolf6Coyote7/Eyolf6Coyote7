# Screen: Pricing

> Route: `/pricing` | Platform: Web | Figma Page: Screens — Pricing

## Stitch Prompt

Desktop web page, 1440px width.

A pricing page for a SaaS whiteboard app. Clean, centered layout with plan comparison.

**Top navigation** (64px): Same as landing page — logo on left, nav links (Product, Pricing, Docs) in center, "Sign Up" and "Log In" buttons on right.

**Page header**: Centered, large bold heading "Simple, transparent pricing". Subtext in gray: "Start free. Upgrade when you need more." Below, a toggle switch for "Monthly" / "Yearly" billing — yearly shows a small green badge "Save 20%".

**Pricing cards**: Three cards side by side, centered. Each card is 320px wide, white, border-radius 16px, subtle shadow. The middle card (recommended) is slightly elevated with a blue (#2563EB) top border (4px) and a "Most Popular" badge at the top.

**Card 1 — Free**:
- Plan name: "Free" in bold
- Price: "$0" large, "/month" small gray
- Description: "For individuals getting started"
- Feature list with checkmark icons (green): "3 boards", "1 collaborator per board", "100 AI queries/month", "Basic shapes & tools", "PNG export"
- Gray outlined button "Current Plan" (disabled style)

**Card 2 — Pro** (highlighted):
- "Most Popular" blue badge at top
- Plan name: "Pro" in bold
- Price: "$12" large, "/month" small gray (or "$10/mo" if yearly toggle is on)
- Description: "For teams that collaborate"
- Feature list: everything in Free plus "Unlimited boards", "Up to 10 collaborators", "1,000 AI queries/month", "Templates library", "SVG + PDF export", "Priority support"
- Blue solid button "Upgrade to Pro"

**Card 3 — Team**:
- Plan name: "Team" in bold
- Price: "$29" large, "/month" small gray
- Description: "For organizations at scale"
- Feature list: everything in Pro plus "Unlimited collaborators", "Unlimited AI queries", "Custom templates", "Admin controls", "SSO / SAML", "Dedicated support"
- Dark gray solid button "Contact Sales"

**FAQ section** below cards: 4-5 accordion items. Each has a question in bold with a chevron icon that expands to show the answer. Questions like "Can I switch plans?", "What happens when I hit my AI query limit?", "Is there a student discount?".

**Bottom CTA**: Centered text "Still not sure? Try free for 14 days." with blue "Start Free Trial" button.

Style: Inter font, white page bg, cards have shadow 0 2px 12px rgba(0,0,0,0.08). Feature checkmarks in green #10B981. Clean, trustworthy.

## Design Tokens

| Token | Value |
|-------|-------|
| Card width | 320px |
| Card radius | 16px |
| Card shadow | 0 2px 12px rgba(0,0,0,0.08) |
| Highlighted card border-top | 4px solid #2563EB |
| Price text size | 48px bold |
| Feature check color | #10B981 |
| Badge bg | #2563EB |
| Badge text | #FFFFFF |
| Yearly savings badge bg | #D1FAE5 |
| Yearly savings badge text | #065F46 |

## States to Generate

1. **Monthly billing** — Default pricing shown
2. **Yearly billing** — Toggle on, prices change, "Save 20%" visible
3. **Mobile (< 768px)** — Cards stacked vertically, full width

## Style Direction

- Clean SaaS pricing page (like Linear, Notion, Vercel pricing)
- Three-tier pricing is standard and recognizable
- Highlighted middle card draws attention
- Feature comparison uses simple checkmark lists (not complex table)

## Acceptance Criteria

- [ ] 3 pricing cards side by side
- [ ] Middle card visually highlighted (border + badge)
- [ ] Monthly/Yearly toggle with savings indicator
- [ ] Feature lists with checkmarks
- [ ] Clear CTA buttons per plan
- [ ] FAQ accordion section
- [ ] Bottom CTA for trial
