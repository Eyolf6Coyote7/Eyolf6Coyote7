# Screen: Mobile AI Chat (Full Screen)

> Route: `/board/:id/ai` | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A full-screen AI chat view on mobile for a whiteboard app. iPhone 14 frame (390x844px). This screen slides in from the right when the user taps the AI button on the canvas toolbar.

**Navigation bar** (44px): Left has a back chevron ("<") and text "Back to Board" in blue. Center has "AI Assistant" in bold. Right has a vertical "..." menu icon.

**Chat area** (scrollable, fills space between nav and input): White background. Messages have 16px horizontal padding.

Messages shown:
1. **User message** (right-aligned, blue #DBEAFE rounded bubble 16px radius, max-width 75%): "What elements are on my board?"
2. **AI message** (left-aligned, light gray #F3F4F6 rounded bubble, max-width 85%): Has a small sparkle icon + "AI" label above the bubble. Message: "I can see 3 sticky notes about onboarding ideas, 1 flowchart with 4 nodes, and some freehand annotations."
3. **User message**: "Turn the sticky notes into a to-do list"
4. **AI message — action card**: A card with green checkmark icon, text "Created to-do list from 3 sticky notes", and a button "View on Board" with blue text and arrow icon. This card has a white bg with blue-left border (3px), distinguishing it from regular text messages.
5. **AI message**: "I've organized them by priority. Anything else you'd like me to do?"

Timestamps between message groups: "Today, 2:30 PM" centered, small gray text.

**Suggestion chips** (above input, horizontally scrollable): 4 pill-shaped chips: "Summarize board", "Create diagram", "Organize layout", "Export notes". Each chip: rounded full, light blue (#EFF6FF) bg, blue (#2563EB) text, 32px height. Horizontally scrollable with a fade-out on the right edge.

**Input bar** (fixed at bottom, above safe area, 52px): White bg, thin top border. Rounded text input (#F9FAFB bg, 24px radius) with placeholder "Message AI..." fills most of the width. Right side has a blue (#2563EB) circle send button (36px) with white up-arrow icon. When keyboard is open, input bar moves up with the keyboard.

Style: Chat-app native feel (like iMessage or WhatsApp). Inter or SF Pro font. Body 16px (mobile readable). Clean, spacious message bubbles.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| User bubble bg | #DBEAFE |
| User bubble max-width | 75% |
| AI bubble bg | #F3F4F6 |
| AI bubble max-width | 85% |
| Bubble radius | 16px |
| Action card border-left | 3px solid #2563EB |
| Suggestion chip bg | #EFF6FF |
| Suggestion chip text | #2563EB |
| Suggestion chip height | 32px |
| Input bg | #F9FAFB |
| Input radius | 24px |
| Send button size | 36px |
| Send button bg | #2563EB |
| Body font size | 16px |
| Message padding | 12px 16px |

## States to Generate

1. **Active conversation** — Multiple messages with text + action card
2. **Empty / First use** — No messages, centered sparkle illustration, heading "Your AI board assistant", subtext "Ask me to summarize, organize, or generate content for your board", suggestion chips visible below
3. **AI typing** — Last message is user's, below it 3 animated dots in a small gray bubble
4. **Keyboard open** — Input bar pushed up, chat scrolled to bottom, suggestion chips hidden

## Style Direction

- Native mobile chat feel — full screen, not a cramped side panel
- Messages are large and readable (16px body)
- Action cards (AI did something on canvas) are visually distinct from text responses
- Horizontal scrolling suggestion chips for quick actions
- Smooth transition back to canvas

## Acceptance Criteria

- [ ] Navigation bar: back to board, title, menu
- [ ] Chat messages: user (right), AI (left) with proper bubbles
- [ ] AI action card with "View on Board" link
- [ ] Suggestion chips horizontally scrollable
- [ ] Input bar with send button
- [ ] Empty state with onboarding illustration
- [ ] AI typing indicator
- [ ] All touch targets ≥ 44x44px
- [ ] Feels like a native chat app, not a web panel
