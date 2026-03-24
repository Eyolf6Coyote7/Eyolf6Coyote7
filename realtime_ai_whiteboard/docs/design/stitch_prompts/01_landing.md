# Screen: Landing Page

> Route: `/` | Platform: Web | Figma Page: Screens — Landing

## Stitch Prompt

Desktop web page, 1440px width.

A modern SaaS landing page for a realtime collaborative AI whiteboard app called "Whiteboard AI". Clean, minimal design with lots of white space.

**Hero section**: Large heading "Think together, in real time" with subheading "A collaborative whiteboard powered by AI — draw, brainstorm, and let AI turn your sketches into polished visuals." Below the text, two buttons side by side: a solid blue (#2563EB) "Get Started Free" button and a white outlined "Watch Demo" button. To the right of the text, a hero illustration showing a whiteboard canvas with colorful sticky notes, shapes, and two user cursors collaborating — one blue, one green.

**Feature cards section**: Three cards in a row on a light gray (#F9FAFB) background. Each card has a 48px icon on top, a bold title, and a 2-line description. Card 1: pencil icon, "Draw Anything" — freehand, shapes, connectors, sticky notes. Card 2: users icon, "Collaborate in Real Time" — see cursors, edits appear instantly. Card 3: sparkles icon, "AI-Powered" — ask AI to generate diagrams, summarize stickies, brainstorm ideas.

**Social proof section**: A row of 5 small grayscale company logos with text "Trusted by teams at..." above them.

**CTA section**: Full-width blue (#2563EB) background with white text "Start your first board in 30 seconds" and a white "Sign Up Free" button.

**Footer**: Dark gray (#1F2937) background. Logo on left, navigation links (Product, Pricing, Docs, Blog), and social icons on right.

Style: Inter font, primary blue #2563EB, border-radius 12px on cards, subtle shadows (0 2px 8px rgba(0,0,0,0.08)). Desktop width 1440px.

## Design Tokens

| Token | Value |
|-------|-------|
| Primary | #2563EB |
| Background | #FFFFFF |
| Section alt bg | #F9FAFB |
| CTA bg | #2563EB |
| Footer bg | #1F2937 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Font | Inter |
| Card radius | 12px |
| Card shadow | 0 2px 8px rgba(0,0,0,0.08) |

## States to Generate

1. **Default** — Full page with content loaded
2. **Mobile (< 768px)** — Single column, hero stacked vertically, feature cards stacked

## Style Direction

- Modern SaaS landing page feel — hero + features + social proof + CTA
- Generous white space, large typography for headings
- Illustration-driven hero (not screenshot-driven)
- Trust signals: logo strip, clear pricing CTA

## Acceptance Criteria

- [ ] Hero section with heading, subtext, 2 CTA buttons, illustration
- [ ] 3 feature cards with icons
- [ ] Social proof / logo strip
- [ ] Full-width CTA banner
- [ ] Footer with nav links
- [ ] Feels modern, clean, trustworthy
