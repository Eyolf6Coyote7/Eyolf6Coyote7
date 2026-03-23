# PRD: Realtime AI Whiteboard

## Overview

A SaaS collaborative whiteboard with AI-powered content generation, realtime multi-user editing via CRDT, and privacy-first local AI inference. See [ConOps](conops.md) for product vision and user personas.

## User Journey Map

### Alex (Product Manager) Journey

| Stage | Action | Touchpoint | Emotion | Opportunity |
|-------|--------|-----------|---------|-------------|
| Discover | Finds product via Product Hunt / colleague referral | Web | Curious | Landing page must show realtime + AI demo |
| Sign Up | Creates account with email | Web | Expects fast | < 30 seconds to first board |
| Onboard | Guided tour: create board, add sticky, try AI | Web | Excited | Show AI value immediately |
| First Value | Creates brainstorm board with team, AI suggests ideas | Web | Impressed | AI must feel useful, not gimmicky |
| Daily Use | Opens boards daily, collaborates, uses AI for summaries | Web + Mobile | Productive | Must be fast and reliable |
| Invite | Shares board link with team, guests join without signup | Web | Satisfied | Guest access must be frictionless |
| Upgrade | Hits free tier limit (5 boards), considers Pro | Web | Evaluating | Clear value prop for Pro vs Free |

## Feature List

| # | Feature | Priority | Platform | System | Status | Analytics Event |
|---|---------|----------|----------|--------|--------|----------------|
| F1 | Canvas with drawing tools | P0 | Web + Mobile | Web App + Mobile App | Planned | `board_created`, `drawing_started` |
| F2 | Realtime multi-user sync (CRDT) | P0 | Web + Mobile | BFF + API | Planned | `collaborator_joined` |
| F3 | Cursor presence (see other users) | P0 | Web + Mobile | BFF + API | Planned | — |
| F4 | AI chat assistant | P0 | Web + Mobile | AI Service | Planned | `ai_prompt_sent`, `ai_suggestion_accepted` |
| F5 | AI content generation (shapes, flows, mind maps) | P1 | Web | AI Service + MCP | Planned | `ai_content_generated` |
| F6 | Board templates (brainstorm, retro, kanban) | P1 | Web + Mobile | BFF + API | Planned | `template_used` |
| F7 | Export (PNG, PDF) | P1 | Web | Web App | Planned | `export_pdf`, `export_png` |
| F8 | Guest access via shared link | P1 | Web | BFF + API | Planned | `guest_joined` |
| F9 | Offline editing with auto-sync | P1 | Web + Mobile | Web App + Mobile App | Planned | `offline_sync_completed` |
| F10 | User authentication (JWT) | P0 | Web + Mobile | BFF + API | Planned | `user_signed_up`, `user_logged_in` |
| F11 | Multi-tenancy (team workspace) | P1 | Web | BFF + API | Planned | `workspace_created` |
| F12 | Subscription plans (Free / Pro) | P2 | Web | BFF + API | Planned | `plan_upgraded` |
| F13 | Usage metering (API calls, storage) | P2 | Web | BFF + API + Kafka | Planned | `usage_tracked` |
| F14 | Feature flags (gradual rollout) | P1 | All | Unleash | Planned | — |
| F15 | WebRTC voice/video collaboration | P2 | Web | Web App (P2P) | Planned | `voice_call_started` |
| F16 | Push notifications | P2 | Mobile | Kafka + FCM/APNs | Planned | `notification_sent` |
| F17 | Dark mode | P2 | Web + Mobile | Web App + Mobile App | Planned | `dark_mode_toggled` |
| F18 | i18n (English + Chinese) | P2 | Web + Mobile | All | Planned | — |

## Feature Details

### F1: Canvas with Drawing Tools

**User Story:** As a user, I want to draw shapes, add sticky notes, and write text on a canvas, so that I can visually organize my ideas.

**Acceptance Criteria:**
- [ ] Given a new board, when user opens it, then they see an empty canvas with toolbar
- [ ] Given the toolbar, when user selects "rectangle", then they can draw a rectangle on canvas
- [ ] Given the canvas, when user double-clicks, then they can add a text note
- [ ] Given any element, when user drags it, then it moves smoothly (60fps)
- [ ] Given any element, when user selects it, then they can resize, rotate, change color

**Supported Tools:** Rectangle, Circle, Line, Arrow, Sticky Note, Text, Freehand Draw, Image

**Edge Cases:**
- What if user draws off-screen? → Auto-pan canvas
- What if canvas has 1000+ elements? → Virtual rendering (only render visible area)

**Out of Scope:**
- Vector pen tool (Illustrator-level)
- Animation / transitions

**Analytics:**
- Event: `drawing_started`
- Properties: `{ tool: "rectangle", board_id: "..." }`
- Success metric: Avg elements created per session > 5

---

### F2: Realtime Multi-user Sync (CRDT)

**User Story:** As a team member, I want to see other people's changes appear instantly on my canvas, so that we can collaborate in realtime without conflicts.

**Acceptance Criteria:**
- [ ] Given 2+ users on the same board, when one user adds a shape, then all others see it within 200ms
- [ ] Given 2 users editing the same text, when both type simultaneously, then changes merge without conflict (CRDT)
- [ ] Given a user goes offline, when they reconnect, then local changes auto-merge with remote changes
- [ ] Given 10 concurrent users, when all editing, then no data loss and no conflicts

**Edge Cases:**
- What if 2 users delete the same element simultaneously? → CRDT tombstone, element disappears for both
- What if network is flaky? → WebSocket auto-reconnect with exponential backoff, Yjs handles partial sync

**Out of Scope:**
- Undo/redo across users (only local undo)

---

### F4: AI Chat Assistant

**User Story:** As a user, I want to ask the AI assistant questions about my board content and get intelligent suggestions, so that I can brainstorm more effectively.

**Acceptance Criteria:**
- [ ] Given the AI chat panel, when user types a prompt, then AI responds within 5 seconds
- [ ] Given the AI response, when it streams, then user sees token-by-token typing effect (SSE)
- [ ] Given the board has content, when user asks "summarize this board", then AI uses RAG to include board context
- [ ] Given user asks "create a user flow for checkout", then AI uses MCP Task Tool to place shapes on canvas
- [ ] Given Ollama is not running, when user opens AI chat, then they see "AI unavailable — start Ollama" message

**AI Agent Flow:**
```
User prompt → Intent Classifier → Plan (ReAct) → Execute (RAG or MCP) → Reflect → Respond (SSE stream)
```

**Edge Cases:**
- What if AI generates inappropriate content? → Content filter on output
- What if prompt is too long? → Truncate to model context window, warn user
- What if Ollama is slow? → Show loading state, allow cancel

**Analytics:**
- Event: `ai_prompt_sent`
- Properties: `{ prompt_length: 42, intent: "action", model: "llama3" }`
- Success metric: AI suggestion acceptance rate > 30%

---

### F8: Guest Access via Shared Link

**User Story:** As a board owner, I want to share a link that lets anyone view (or optionally edit) my board without creating an account, so that I can collaborate with external stakeholders.

**Acceptance Criteria:**
- [ ] Given a board, when owner clicks "Share", then a unique guest link is generated
- [ ] Given a guest link, when guest opens it, then they see the board without login
- [ ] Given guest access is read-only, when guest tries to edit, then they see "View only" indicator
- [ ] Given owner enables "Guest can edit", when guest opens link, then they can edit with anonymous identity
- [ ] Given guest link, when owner disables it, then link returns 404

**Edge Cases:**
- What if 100 guests open the same board? → Rate limit guest connections per board
- What if guest link is leaked? → Owner can regenerate or disable link

---

### F9: Offline Editing with Auto-Sync

**User Story:** As a mobile user, I want to keep editing my board when I lose internet, and have changes sync automatically when I'm back online.

**Acceptance Criteria:**
- [ ] Given user is online, when they lose connection, then editing continues without interruption
- [ ] Given user is offline, when they add/modify elements, then changes are stored in local Yjs document
- [ ] Given user comes back online, when WebSocket reconnects, then CRDT auto-merges local and remote changes
- [ ] Given merge completes, when user views board, then no data is lost from either side

**Edge Cases:**
- What if user is offline for 24 hours? → Full Yjs state sync on reconnect (may take a few seconds)

## Non-functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | Canvas 60fps with < 500 elements. API p99 latency < 200ms |
| Availability | 99.9% uptime (< 8.7h downtime/year) |
| Security | OWASP Top 10 mitigated, JWT token rotation, input validation |
| Scalability | Support 50 concurrent boards, 10 users per board |
| i18n | English (en) + Traditional Chinese (zh-TW) |
| a11y | WCAG 2.1 AA (keyboard navigable, screen reader, contrast) |
| Offline | Full editing capability, auto-sync on reconnect |

## Release Criteria

- [ ] All P0 features implemented and tested
- [ ] No P0/P1 bugs open
- [ ] API p99 latency < 200ms under load
- [ ] SAST/SCA security scan passes
- [ ] UI matches Figma (Final status)
- [ ] Storybook components up to date
- [ ] E2E tests pass for all core scenarios
- [ ] AI features gracefully degrade when Ollama is offline

## Dependencies

| Dependency | Type | Impact |
|-----------|------|--------|
| Yjs | NPM package | Core — CRDT sync |
| Ollama | Local service | AI features — graceful degradation if unavailable |
| PostgreSQL | Docker service | Data storage |
| Redis | Docker service | Cache, Pub/Sub, AI task queue |
| MinIO | Docker service | File storage (exports, images) |
| Unleash | Docker service | Feature flags |
