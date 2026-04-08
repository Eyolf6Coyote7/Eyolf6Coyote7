# AI Workflow Harness — Index

This monorepo implements the **6-harness** AI workflow design from the slide deck at [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md).

## The 6 harnesses

| # | Harness file | Status | Why this is its own harness |
|---|---|---|---|
| 1 | [`skill_impl_fe_ssr.md`](skill_impl_fe_ssr.md) | spec-only | Server component runtime — top-level `await`, `generateMetadata`, server-side fetch with secret tokens. SEO is the core existence reason. |
| 2 | [`skill_impl_fe_csr.md`](skill_impl_fe_csr.md) | **implemented** | Client component runtime — `'use client'`, browser-only state, react-query / Zustand. The 22 FE + 5 Mobile leaves below all write back into this. |
| 3 | [`skill_impl_fe_isr.md`](skill_impl_fe_isr.md) | spec-only | Server component + cache key + revalidate window. Designing the cache key correctly is the entire harness. |
| 4 | [`skill_impl_fe_ab.md`](skill_impl_fe_ab.md) | spec-only | Variant matrix at the bundle level + flag SDK + sticky bucket + per-variant observability. |
| 5 | [`skill_impl_be.md`](skill_impl_be.md) | **implemented** | Core business logic + 3 wrapper patterns (checkpoint / chunk / idempotency) covers all 5 architectural styles. The 9 BE leaves below all write back into this — across **5 different language stacks**. |
| 6 | [`skill_impl_ops.md`](skill_impl_ops.md) | spec-only | Single declarative-config mental model (HCL / YAML / Rego / PromQL) covers FE/BE/Data infra consumers. HITL mandatory at apply step. |

**Total: 4 FE + 1 BE + 1 Ops = 6 harnesses.**

This matches the slide section 二 conclusion: **理想 3 vs 現實 6** — multiplied to 6 because FE render mode forces 4 paths, while BE and Ops each stay at 1.

---

## Status legend

- **`implemented`** = leaf scenario skills in `<project>/skills/` cite real `file:line` in committed source code. The harness is end-to-end usable today.
- **`spec-only`** = the harness's runtime is not present in any portfolio project (no Next.js, no IaC, no flag SDK). The harness is a design document; it will become `implemented` once a project with the matching runtime joins the workspace.

The 2 `implemented` harnesses (CSR + BE) cover **the entire current portfolio**. Each portfolio project is built end-to-end as CSR frontend + a backend in some stack:

| Project | FE harness | BE harness |
|---|---|---|
| `realtime_ai_whiteboard` | `skill_impl_fe_csr` (React Vite + Yjs) + Mobile (Expo Router) | `skill_impl_be` (NestJS) |
| `enterprise_workflow_system` | `skill_impl_fe_csr` (Vue 3 Vite + Element Plus) + Mobile (Compose / SwiftUI) | `skill_impl_be` (Spring Boot Kotlin DGS + Laravel + Spring Kafka) |
| `3d_asset_collaboration` | `skill_impl_fe_csr` (React Vite + r3f) + Mobile (Expo Router) | `skill_impl_be` (ASP.NET Core + .NET Kafka + FastAPI) |

---

## Why this matters for the slide narrative

The slide's central question (section 二) is:

> Given an existing TXOne system (Next.js + Go + Terraform/K8s), how many independent harnesses do we need to build for the AI workflow?
> Answer: **6.** (4 FE + 1 BE + 1 Ops)

The slide answers with Go and Next.js as the reference stacks. **This portfolio answers it with a different proof:**

- **CSR harness**: 27 leaf scenario skills citing real code across 3 different FE stacks (React Vite + Vue Vite + r3f Vite + RN + Compose + SwiftUI). The CSR harness is **the** harness — the leaves don't fragment it.
- **BE harness**: 9 leaf scenario skills citing real code across **5 different backend languages** (TypeScript / Kotlin / PHP / C# / Python). The slide claims convergence across 5 architectural styles in 1 language; the portfolio proves convergence across **5 languages × multiple architectural styles**, which is structurally a stronger claim.

**The portfolio is empirical proof that the 6-harness design holds — even when the runtime stack is completely different from the slide's reference stack.**

The 4 spec-only harnesses (SSR / ISR / A-B / Ops) are the design surface — they document what the harness WOULD look like if/when the relevant runtime joins the workspace. They are part of the harness design even though the leaves are not yet populated.

---

## Cross-cutting governance (per slide section 七)

These apply to ALL 6 harnesses; not maintained as separate skill files because they are policy, not code-generation skills.

| Component | Where it's enforced |
|---|---|
| Model routing | Opus 4.6 for architecture / review; Sonnet 4.6 for implementation; Haiku 4.5 for lint / format / micro-fixes. Configured in `~/.claude/settings.json`. |
| skill.md governance | This monorepo: skill changes go through PR review (this is one of those PRs). Versioning via git history. |
| Workflow eval / regression | Future work: a regression test set that diffs generated code before/after a skill change. Not yet built. |
| Permissions / sandbox | `.claude/settings.json` `permissions` block + tool allowlist. |
| Audit log / trace | Git history is the audit log for skill changes. Per-task AI interaction logs are not currently stored. |
| Secrets handling | `.gitignore` covers `.env*`; `gitleaks` runs in CI. |
| Cost / token budget | Manual: per-session cost monitoring via the Claude Code statusline. |
| Human-in-the-loop | All `harness/skill_impl_ops.md` apply steps. All `git push` to `dev`/`stable` (per workspace CLAUDE.md). |
| Onboarding | This file is the entry point. Adoption KPI is the count of leaves under `<project>/skills/` (currently 36). |

---

## How to use

1. **For new feature work**: identify the feature's runtime characteristic (CSR? BE? Ops?). Open the matching `skill_impl_*.md`. Read the 7-stage operating instructions. Generate code.
2. **For learning the harness**: read all 6 harness files in order — that's the slide deck rendered as code-citable Claude skills.
3. **For seeing real evidence**: each `implemented` harness has a `## Memory writeback evidence` section linking to the leaf scenario skills under each project's `skills/` folder. Open any leaf to see the 5-language / 3-frontend-stack diversity collapsing into 1 harness.
4. **For interview narrative**: use this file as the slide-3 backing artifact. Each row of the table above maps directly to a slide claim, with a clickable file as evidence.

---

## File map

```
fullstack_ai_workspace/
├── harness/                              # ← the 6 harnesses (this folder)
│   ├── HARNESS.md                        # ← you are here
│   ├── skill_impl_fe_ssr.md              # spec-only
│   ├── skill_impl_fe_csr.md              # implemented (links to 27 leaves)
│   ├── skill_impl_fe_isr.md              # spec-only
│   ├── skill_impl_fe_ab.md               # spec-only
│   ├── skill_impl_be.md                  # implemented (links to 9 leaves across 5 languages)
│   └── skill_impl_ops.md                 # spec-only
│
├── skills/                               # workspace-level index
│   └── README.md                         # cross-project skill catalog
│
├── realtime_ai_whiteboard/skills/        # 10 leaf scenario skills
├── enterprise_workflow_system/skills/    # 13 leaf scenario skills
└── 3d_asset_collaboration/skills/        # 13 leaf scenario skills
```

---

*This document is maintained alongside the slide deck at `MyGuide/slide/ai_workflow_harness_engineer.md`. Slide changes should propagate here; structural changes here should propagate to the slide.*
