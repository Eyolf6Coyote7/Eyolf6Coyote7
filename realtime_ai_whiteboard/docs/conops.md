# ConOps: Realtime AI Whiteboard

## Product Vision

A collaborative whiteboard platform with an AI agent that helps users brainstorm, organize ideas, and create visual content — think Miro meets ChatGPT, running entirely on local infrastructure.

## Industry Context

**Industry:** SaaS (Software as a Service)

**Market:** The online whiteboard market is valued at $2.3B (2024) and growing 15% YoY. Key players include Miro, FigJam, Lucidboard, and Microsoft Whiteboard. AI-assisted creation is the emerging differentiator — Miro launched "Miro AI" in 2023, but it relies on cloud APIs (OpenAI). There is no major player offering a **fully local, privacy-first AI whiteboard**.

**Positioning:** Privacy-first AI collaboration — all AI inference runs locally via Ollama. No data leaves the user's machine. Ideal for enterprises with strict data sovereignty requirements.

## Competitive Analysis

| Competitor | Strengths | Weaknesses | Our Differentiator |
|-----------|-----------|------------|-------------------|
| Miro | Market leader, rich integrations, templates | AI depends on cloud (OpenAI), expensive at scale | Local AI, no data leaves machine |
| FigJam (Figma) | Tight Figma integration, design-focused | Limited AI, no standalone product | Full standalone product with AI agent |
| Microsoft Whiteboard | Free with M365, enterprise trust | Basic features, weak AI | Advanced AI (RAG, MCP tools, state machine) |
| Excalidraw | Open source, simple, fast | No AI, no realtime collaboration at scale | AI agent + CRDT-based realtime sync |

## Stakeholder Map

| Stakeholder | Role | Interest | Influence |
|-------------|------|----------|-----------|
| End User | Daily user — draws, brainstorms, collaborates | High — needs fast, intuitive experience | Low |
| Team Admin | Manages team workspace, billing, permissions | Medium — needs user management | Medium |
| Guest User | Anonymous viewer/editor via shared link | Low — just needs it to work | Low |
| Product Owner | Defines features, prioritizes roadmap | High — needs metrics and feedback | High |

## Target Users

| Persona | Role | Goal | Pain Point |
|---------|------|------|------------|
| **Alex (Product Manager)** | PM at a SaaS company | Quickly brainstorm features with team, get AI suggestions | Miro is slow, AI suggestions are generic (cloud-based), data privacy concerns |
| **Sam (Designer)** | UX designer | Sketch wireframes, collaborate with devs in realtime | Switching between Figma and whiteboard tools is tedious |
| **Jordan (Student)** | University student | Study notes, mind maps, AI-assisted summarization | Can't afford Miro Pro, wants AI help for free |
| **Taylor (Enterprise Lead)** | Engineering manager at semiconductor company | Team retrospectives, architecture diagrams | Corporate policy prohibits cloud AI (data sovereignty) |

## Assumptions & Constraints

| Type | Description |
|------|-------------|
| Assumption | Users have a modern browser (Chrome, Firefox, Safari, Edge) |
| Assumption | For AI features, users have a Mac with Apple Silicon (M1+) or a machine with 16GB+ RAM for Ollama |
| Assumption | Users have stable internet for initial page load and realtime sync (offline mode available after load) |
| Constraint | All infrastructure runs locally — no cloud services |
| Constraint | AI inference via Ollama only — no OpenAI, Anthropic, or other cloud LLM APIs |
| Constraint | Multi-tenancy is schema-per-tenant in PostgreSQL |
| Dependency | Ollama must support the target LLM model (Llama 3, Mistral, etc.) |
| Dependency | Yjs CRDT library for conflict-free realtime sync |

## Core Scenarios

### Scenario 1: Realtime Collaborative Brainstorming

**As a** Product Manager (Alex), **I want to** create a brainstorming board and invite my team to collaborate in realtime, **so that** we can generate and organize ideas together without scheduling a meeting.

```
Flow:
1. Alex creates a new board → selects "Brainstorm" template
2. Alex shares the board link with 3 team members
3. All 4 users see each other's cursors in realtime
4. Users add sticky notes, draw connections, group ideas
5. All changes sync instantly via CRDT (no conflicts)
6. Alex exports the board as PNG for the meeting notes
```

### Scenario 2: AI-Assisted Content Generation

**As a** Designer (Sam), **I want to** ask the AI to generate user flow diagrams from a text description, **so that** I can quickly visualize my ideas without drawing from scratch.

```
Flow:
1. Sam opens a board and types in the AI chat: "Create a user flow for e-commerce checkout"
2. AI Agent (LangGraph) classifies intent → action execution
3. Agent plans steps: search existing board content → generate flow → place on canvas
4. MCP Task Tool creates shapes and connectors on the board
5. Sam sees the flow appear on the canvas in realtime
6. Sam adjusts the layout and asks AI: "Add a payment failure branch"
7. Agent reflects on the request, modifies the flow, updates canvas
```

### Scenario 3: Guest Access via Shared Link

**As a** Team Lead (Taylor), **I want to** share a read-only link to stakeholders who don't have an account, **so that** they can view the board without signing up.

```
Flow:
1. Taylor clicks "Share" → generates a guest link
2. Guest opens the link → sees the board (no login required)
3. Guest has anonymous JWT token → read-only access
4. Guest can view but cannot edit (feature flag controlled)
5. Taylor can toggle guest editing on/off via board settings
```

### Scenario 4: Offline Editing with Auto-Sync

**As a** Student (Jordan), **I want to** edit my mind map on the train without internet, and have it sync when I'm back online, **so that** I don't lose my work.

```
Flow:
1. Jordan opens a board while online → Yjs loads full CRDT state
2. Jordan goes offline → continues editing locally
3. All changes are stored in local Yjs document
4. Jordan reconnects → CRDT auto-merges local and remote changes
5. No conflicts — CRDT guarantees convergence
```

### Scenario 5: SaaS Multi-Tenancy and Subscription

**As a** Team Admin, **I want to** manage my team's workspace, see usage, and upgrade our plan, **so that** my team has the right features and storage.

```
Flow:
1. Admin logs in → sees dashboard with team usage (boards, storage, AI calls)
2. Admin sees current plan: Free (5 boards, 100MB storage, 50 AI calls/month)
3. Admin clicks "Upgrade to Pro" → unlocks unlimited boards, 10GB storage, unlimited AI
4. Usage metering tracks API calls + storage per tenant → writes to Kafka
5. Feature flags (Unleash) gate Pro features
```

## OKR / Success Metrics

| Objective | Key Result | Target |
|-----------|-----------|--------|
| Users find value quickly | Time to first board creation | < 2 minutes |
| Users return regularly | D7 retention rate | > 40% |
| AI is useful | AI suggestion acceptance rate | > 30% |
| Realtime works smoothly | WebSocket reconnect time | < 3 seconds |
| System is reliable | API p99 latency | < 200ms |
| SaaS conversion | Free → Pro upgrade rate | > 5% |
| Platform works everywhere | Mobile DAU / Total DAU ratio | > 20% |

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| CRDT sync conflict edge cases | High | Medium | Fuzz testing + fallback to server state + Yjs is battle-tested |
| Ollama model too slow on older machines | High | Medium | Default to smaller model (7B 4-bit), show loading state, allow model selection |
| WebSocket connections drop under load | Medium | Low | Redis Pub/Sub for multi-instance, auto-reconnect with exponential backoff |
| Canvas performance with many objects | Medium | Medium | Virtual rendering (only render visible area), limit objects per board |
| Multi-tenant data isolation breach | Critical | Low | Schema-per-tenant, row-level security, integration tests per tenant |
| AI generates inappropriate content | Medium | Low | Content filter on AI output, rate limiting, user report mechanism |

## ADRs Created

- ADR-0001: Why Yjs (CRDT) over Operational Transform for collaborative editing
- ADR-0002: Why Ollama over cloud LLM APIs for AI inference
- ADR-0003: Why schema-per-tenant over row-level for multi-tenancy