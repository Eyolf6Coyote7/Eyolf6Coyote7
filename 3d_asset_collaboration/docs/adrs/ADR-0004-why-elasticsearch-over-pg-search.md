# ADR-0004: Why Elasticsearch over PostgreSQL Full-Text Search for Asset Discovery

## Status
Accepted

## Context
Users need to search assets by name, tags, description, format, and campaign. Options:
- **PostgreSQL full-text search** — built-in `tsvector` + `tsquery`, no extra service
- **Elasticsearch** — dedicated search engine, inverted index, relevance scoring

## Decision
Use **Elasticsearch** for asset search.

## Reason
- Elasticsearch is 100x faster than PostgreSQL LIKE for full-text search at scale
- Supports fuzzy matching, synonyms, multi-field search with relevance scoring
- Faceted search (filter by format, brand, date range) is native in Elasticsearch
- Autocomplete/suggest is built-in
- PostgreSQL full-text search works for simple cases but lacks relevance tuning and scalability

## Consequences
- Need to run Elasticsearch (Docker, ~0.5GB RAM)
- Data must be indexed from PostgreSQL to Elasticsearch (sync on write)
- Eventual consistency between PostgreSQL (source of truth) and Elasticsearch (search index)
- Need to handle index rebuild if Elasticsearch data is lost
