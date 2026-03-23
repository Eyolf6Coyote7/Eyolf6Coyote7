# ADR-0002: Why GraphQL over REST for the Workflow API

## Status
Accepted

## Context
The Workflow frontend needs to query complex relational data: workflows with steps, assignees, attachments, comments, and audit history. Options:
- **REST** — simple, well-understood, but requires multiple requests for nested data
- **GraphQL** — single request for complex nested queries, client controls the shape

## Decision
Use **GraphQL** (via Spring Boot + DGS framework) for the primary Workflow API.

## Reason
- Approval workflows are deeply relational: Workflow → Steps → Assignees → Comments → Attachments
- REST would require 4-5 API calls or complex include/embed parameters to fetch one workflow view
- GraphQL lets the frontend fetch exactly what it needs in a single request
- Admin dashboard has many different views (list, detail, audit) — GraphQL avoids over-fetching
- GraphQL Playground provides self-documenting API exploration

## Consequences
- Need DataLoader to prevent N+1 query problems
- Caching is more complex than REST (no HTTP cache by default)
- File upload requires multipart extension (not native to GraphQL)
- Learning curve for developers unfamiliar with GraphQL
