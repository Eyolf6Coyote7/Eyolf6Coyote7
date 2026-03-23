# ADR-0004: Why Laravel for Admin Panel Instead of Spring Boot

## Status
Accepted

## Context
The Admin Panel needs a backend for CMS-like operations: user management (via Keycloak API), workflow template CRUD, remote config editing, and analytics dashboard. Options:
- **Spring Boot** — same as main Workflow API, shared codebase
- **Laravel (PHP)** — separate lightweight service, optimized for admin/CMS use cases

## Decision
Use **Laravel** as a separate Admin Panel backend.

## Reason
- Demonstrates PHP expertise in the portfolio (tech diversity — 7 languages)
- Laravel excels at admin/CMS patterns: Eloquent ORM, form validation, middleware
- Separates admin concerns from core workflow API — different release cycle, different access patterns
- Admin Panel has simpler requirements (CRUD, config) than the core API (GraphQL, Temporal, Kafka)
- Reduces blast radius — admin bugs don't affect the core approval system

## Consequences
- Two backend services for one project (Spring Boot + Laravel)
- Need to keep shared data models in sync between Kotlin and PHP
- Laravel connects to the same PostgreSQL but uses its own tables (admin-specific)
- Slightly more complex deployment (two services instead of one)
