# Screen: AI Chat Panel (Standalone View)

> Route: `/board/:id` (side panel) | Platform: Web | Figma Page: Screens — AI Chat

## Stitch Prompt

A detailed view of the AI chat side panel for a collaborative whiteboard app. This is the right-side panel shown at 350px width, designed as a standalone Figma frame for component-level detail.

**Panel header** (48px height): Left side has a sparkle icon and bold text "AI Assistant". Right side has a minimize (dash) icon and close (X) icon. Thin bottom border separator.

**Chat message area** (scrollable, fills remaining space minus input bar): Show a conversation with 5-6 messages alternating between user and AI:

1. **User message** (right-aligned, blue #DBEAFE bubble, 8px radius): "What's on the board right now?"
2. **AI message** (left-aligned, white bubble with light gray #F3F4F6 border, small sparkle icon before "AI"): "I can see 5 sticky notes and 3 connected shapes. The sticky notes contain brainstorming ideas about user onboarding."
3. **User message**: "Summarize the sticky notes into 3 key themes"
4. **AI message** with structured content: A numbered list with bold theme titles and short descriptions. Shows AI can produce formatted output.
5. **User message**: "Generate a flowchart for the onboarding process"
6. **AI message — tool result**: Shows a status card with a green checkmark icon, text "Generated flowchart — 8 nodes added to canvas", and a small "View on canvas" blue link button. This represents AI taking action on the canvas.

Between messages, show subtle timestamps ("2 min ago", "Just now") in small gray text, centered.

**Typing indicator**: Below the last AI message, show three animated dots in a small gray bubble (the "AI is thinking" state).

**Input bar** (fixed at bottom, 56px height, top border): A rounded text input (8px radius, light gray bg #F9FAFB) with placeholder "Ask AI anything about this board..." taking up most of the width. Right side of the input has a blue (#2563EB) circular send button with an up-arrow icon. Above the input, show 3 small suggestion chips: "Summarize", "Generate diagram", "Organize layout" — each is a rounded pill with light blue bg (#EFF6FF) and blue text.

Style: Inter font 14px body, 12px timestamps. Clean, chat-app feel. Messages have 12px padding inside bubbles. 8px gap between messages.

## Design Tokens

| Token | Value |
|-------|-------|
| Panel width | 350px |
| User bubble bg | #DBEAFE |
| AI bubble bg | #FFFFFF |
| AI bubble border | #F3F4F6 |
| Suggestion chip bg | #EFF6FF |
| Suggestion chip text | #2563EB |
| Input bg | #F9FAFB |
| Send button bg | #2563EB |
| Timestamp text | #9CA3AF |
| Message padding | 12px |
| Message gap | 8px |
| Bubble radius | 8px |

## States to Generate

1. **Active conversation** — Multiple messages, AI responded with text + tool result
2. **Empty / First use** — No messages, center illustration of sparkle icon, text "Ask AI to help with your board", 3 suggestion chips below
3. **AI processing** — User sent message, typing indicator dots visible, input disabled with spinner
4. **Error** — AI message bubble with red (#FEE2E2) background, error icon, text "Something went wrong. Try again.", retry button

## Style Direction

- Chat-app conversational feel (like Slack DM or ChatGPT side panel)
- AI messages feel distinct from user messages (left vs right, different bg)
- Tool results (canvas actions) are visually distinct from text responses — use a card with icon + action description
- Suggestion chips encourage exploration

## Acceptance Criteria

- [ ] Panel header with title and close button
- [ ] User messages right-aligned, AI messages left-aligned
- [ ] AI tool result shown as action card (not plain text)
- [ ] Typing indicator (3 dots)
- [ ] Input bar with suggestion chips above
- [ ] Send button
- [ ] Empty state with onboarding prompt
- [ ] Error state with retry
