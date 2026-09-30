# ADR-003: Preserve raw input before enrichment

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Social URLs may be inaccessible, metadata may be incomplete, extraction can fail, and source posts can later change or disappear. If enrichment occurs before durable storage, the most important promise, never losing a discovery, cannot be trusted.

## Decision

Persist authenticated raw submissions before attempting extraction or normalization. Enrichment runs as a retryable later step.

## Consequences

- Capture can acknowledge success quickly.
- Failed extraction still produces a useful inbox item.
- Raw data requires retention and privacy controls.
- Duplicate and retry handling must be idempotent.
- Normalized fields retain links to their evidence.

## Alternatives considered

- Reject captures that cannot be parsed
- Extract synchronously before storage
- Store only normalized place records

