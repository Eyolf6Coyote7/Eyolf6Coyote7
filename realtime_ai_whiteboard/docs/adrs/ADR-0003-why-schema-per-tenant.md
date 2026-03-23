# ADR-0003: Why Schema-per-Tenant over Row-Level for Multi-Tenancy

## Status
Accepted

## Context
As a SaaS product, the whiteboard must support multi-tenancy. Options:
- **Row-level isolation** — all tenants share one schema, filtered by `tenant_id` column
- **Schema-per-tenant** — each tenant gets a separate PostgreSQL schema
- **Database-per-tenant** — each tenant gets a separate database (overkill)

## Decision
Use **schema-per-tenant** in PostgreSQL.

## Reason
- Stronger data isolation than row-level — a missing WHERE clause can't leak data across tenants
- Easier data export/deletion per tenant (GDPR compliance)
- Schema migrations run per tenant — can do rolling upgrades
- Moderate overhead: PostgreSQL handles hundreds of schemas efficiently
- Row-level requires `tenant_id` on every table and every query — easy to forget, hard to audit

## Consequences
- Schema creation must be automated on tenant signup
- Migrations must iterate over all tenant schemas
- Connection pooling is slightly more complex (schema switching per request)
- Not suitable for millions of tenants — but fine for SaaS with thousands
