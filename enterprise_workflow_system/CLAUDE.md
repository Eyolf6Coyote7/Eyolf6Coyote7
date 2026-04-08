# Enterprise Workflow System

A workflow approval platform demonstrating polyglot backend architecture (3 different language stacks behind one product) and a Vue 3 admin/employee dual frontend with feature toggles and audit logging. The portfolio's reference implementation for **CSR + GraphQL + Kafka heterogeneous backend**.

## Stack

| Layer | Tech |
|---|---|
| Frontend — admin dashboard | Vue 3 + Vite + Element Plus + Pinia + vue-i18n + vue-echarts |
| Frontend — employee portal | Vue 3 + Vite + Element Plus + Pinia + Storybook 8 |
| Mobile — Android | Kotlin + Jetpack Compose + Material 3 |
| Mobile — iOS | Swift + SwiftUI + NavigationStack |
| Backend — workflow-api | Spring Boot + Kotlin + Netflix DGS GraphQL + JPA + PostgreSQL |
| Backend — admin-api | Laravel 11 + PHP 8 + Eloquent + PostgreSQL |
| Backend — notification-worker | Spring Boot + Kotlin + Spring Kafka + email service |

## Skills in this project

This project's skills are organized by the **6-harness AI workflow design** from [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md). Of the 6 harnesses, this project has **2 implemented** (CSR + BE) and **4 spec-only**.

This project is the **strongest empirical proof** that BE = 1 harness even across language boundaries. The 3 backend services run in **3 different languages** (Kotlin / PHP / Kotlin) and use **3 different paradigms** (GraphQL / REST / Kafka) — all 3 collapse into the same Core + wrapper mental model.

### CSR frontend harness — implemented (10 skills)

Both Vue 3 SPAs (admin-dashboard + employee-portal) plus the Compose / SwiftUI mobile screens are 100% client-rendered. Each leaf is a CSR memory-writeback adapted to this project's Vue / Compose / SwiftUI stack.

| Skill | What it does |
|---|---|
| [`vue-multi-step-form-wizard`](.claude/skills/vue-multi-step-form-wizard/SKILL.md) | 3-step Vue 3 wizard (template picker → form → review/submit) |
| [`vue-filterable-data-table`](.claude/skills/vue-filterable-data-table/SKILL.md) | List page with stat chips + multi-filter + table + pagination |
| [`vue-echarts-kpi-dashboard`](.claude/skills/vue-echarts-kpi-dashboard/SKILL.md) | 4-column KPI cards + tree-shaken echarts charts |
| [`vue-rbac-auth-flow`](.claude/skills/vue-rbac-auth-flow/SKILL.md) | Pinia auth store + router guard + isMock auto-login |
| [`vue-mock-real-api-client`](.claude/skills/vue-mock-real-api-client/SKILL.md) | VITE_MOCK dual client with shared TypeScript types |
| [`vue-i18n-element-plus-bootstrap`](.claude/skills/vue-i18n-element-plus-bootstrap/SKILL.md) | main.ts bootstrap recipe (Pinia + i18n + Element Plus + icons) |
| [`vue-feature-toggle-config-page`](.claude/skills/vue-feature-toggle-config-page/SKILL.md) | Feature toggle admin page with category badges |
| [`vue-audit-log-viewer`](.claude/skills/vue-audit-log-viewer/SKILL.md) | Audit log table with multi-field filter bar + live indicator |
| [`compose-approval-queue-screen`](.claude/skills/compose-approval-queue-screen/SKILL.md) | Jetpack Compose Material 3 list with segmented control + LazyColumn |
| [`swiftui-approval-queue-screen`](.claude/skills/swiftui-approval-queue-screen/SKILL.md) | SwiftUI counterpart with NavigationStack + custom segmented control |

### BE harness — implemented (3 skills, 3 languages, 3 paradigms)

| Skill | What it does | Language / paradigm |
|---|---|---|
| [`kotlin-dgs-graphql-jpa-crud`](.claude/skills/kotlin-dgs-graphql-jpa-crud/SKILL.md) | Spring Boot + Netflix DGS + JPA spring-data method-name queries | Kotlin / GraphQL CRUD |
| [`laravel-rest-crud-with-audit`](.claude/skills/laravel-rest-crud-with-audit/SKILL.md) | Thin Laravel controller with `paginate(20)` + inline `validate()` | PHP / REST CRUD |
| [`kotlin-kafka-notification-worker`](.claude/skills/kotlin-kafka-notification-worker/SKILL.md) | Spring Boot `@KafkaListener` with try/catch + service injection | Kotlin / Kafka event-driven |

All three share the same Core mental model: `resolve user/context → check permission → call domain service → persist → emit metric/log → return result OR ack message`. The wrapper around the Core changes (HTTP handler vs Kafka listener), but the Core does not.

### Harnesses NOT implemented in this project

| Harness | Why spec-only here |
|---|---|
| **SSR** | Both Vue SPAs are Vite — no Nuxt 3 / Next.js. |
| **ISR** | Same — requires a server-rendered framework with cache key + revalidate. |
| **A/B** | The `vue-feature-toggle-config-page` is mock-state admin UI, not a real flag SDK doing runtime variant routing. |
| **Ops** | Local-only via `docker-compose.yml`. No Terraform / K8s / OPA / Prometheus. |

## How Claude Code uses these skills

The 13 SKILL.md files under `.claude/skills/` are auto-loaded by Claude Code when their `description` / `when_to_use` triggers match the user's task. Run `claude` from this project's root and ask for any of the scenarios above.

## Related docs

- Workspace root: [`../CLAUDE.md`](../CLAUDE.md) — git workflow, conventional commits, gh CLI account
- Slide deck: [`../../MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md) — the 6-harness design this project's skills implement
