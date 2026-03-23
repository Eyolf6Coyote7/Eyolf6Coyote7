# ADR-0005: Why TimescaleDB over Plain PostgreSQL for IoT Time-Series Data

## Status
Accepted

## Context
IoT sensors produce time-stamped readings (temperature, vibration, pressure) at 1-10 Hz. Need efficient storage and query for time-bucketed aggregations. Options:
- **Plain PostgreSQL** — standard relational tables
- **TimescaleDB** — PostgreSQL extension optimized for time-series data

## Decision
Use **TimescaleDB** (separate instance on port 5433) for IoT time-series data.

## Reason
- TimescaleDB hypertables auto-partition by time — queries on recent data are fast without manual partitioning
- Built-in time-bucketed aggregation functions (`time_bucket`) for "avg temperature last 24h"
- 10-100x compression ratio for time-series data compared to plain PostgreSQL
- Retention policies auto-delete old data (e.g. raw data > 90 days, keep hourly aggregates forever)
- It's a PostgreSQL extension — same SQL, same drivers, same tooling

## Consequences
- Need a separate PostgreSQL/TimescaleDB instance (port 5433) — separate from main app DB
- IoT Consumer writes to TimescaleDB, not main PostgreSQL
- Developers need to learn hypertable concepts and `time_bucket` functions
- Not suitable for non-time-series data — use main PostgreSQL for asset metadata
