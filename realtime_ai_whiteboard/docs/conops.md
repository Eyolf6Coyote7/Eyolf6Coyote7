# ConOps: Realtime AI Whiteboard

## Product Vision

A collaborative whiteboard with an AI agent — think Miro meets ChatGPT, running entirely local. Unlike Miro/FigJam (cloud-dependent AI, expensive at scale), this is **privacy-first**: all AI inference runs locally via Ollama, no data leaves the machine.

**Industry:** SaaS | **Differentiator:** Local AI, zero cloud dependency

## Target Users

| Persona | Role | Goal | Pain Point |
|---------|------|------|------------|
| Alex (PM) | Product Manager | Brainstorm with team, get AI suggestions | Miro is slow, AI is generic, data privacy concerns |
| Sam (Designer) | UX Designer | Sketch wireframes, collaborate with devs | Switching between Figma and whiteboard tools |
| Jordan (Student) | University student | Mind maps, AI-assisted summarization | Can't afford Miro Pro |
| Taylor (Enterprise) | Engineering Manager | Team retros, architecture diagrams | Corporate policy prohibits cloud AI |

## Core Scenarios

**1. Realtime Collaboration** — Create board → share link → 4 users edit simultaneously → CRDT auto-merges → export PNG

**2. AI Content Generation** — Type "create user flow for checkout" → AI agent plans steps → MCP tool places shapes on canvas → user adjusts

**3. Guest Access** — Share read-only link → guest views without signup → owner can toggle edit permission

**4. Offline Editing** — Edit on train without internet → reconnect → CRDT auto-merges with zero conflicts

**5. SaaS Multi-tenancy** — Team workspace with usage dashboard → Free (5 boards) / Pro (unlimited) → feature flags gate plan features

## OKR / Success Metrics

| Metric | Target |
|--------|--------|
| Time to first board | < 2 minutes |
| D7 retention | > 40% |
| AI suggestion acceptance rate | > 30% |

## Key Risks

| Risk | Mitigation |
|------|------------|
| CRDT sync edge cases | Fuzz testing + Yjs is battle-tested |
| Ollama too slow on older machines | Default 7B 4-bit model, show loading state |
| Multi-tenant data isolation breach | Schema-per-tenant + integration tests |

## ADRs

- [ADR-0001: Why Yjs (CRDT) over OT](adrs/ADR-0001-why-yjs-over-ot.md)
- [ADR-0002: Why Ollama over cloud LLM](adrs/ADR-0002-why-ollama-over-cloud-llm.md)
- [ADR-0003: Why schema-per-tenant](adrs/ADR-0003-why-schema-per-tenant.md)
