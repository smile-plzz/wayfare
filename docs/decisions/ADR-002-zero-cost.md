# ADR-002: Zero-cost and no-card operation

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Wayfare is a personal experiment. The owner does not want to pay for subscriptions, enter a payment card, or risk metered charges.

## Decision

All required infrastructure must operate on continuing free tiers or user-controlled local resources without payment information. Optional paid capabilities must not be required or enabled by default.

## Consequences

- Service quotas and inactivity policies may interrupt availability.
- AI enrichment must be local, open-source, or omitted.
- Portability and replaceability are mandatory.
- The project may trade convenience and scale for cost certainty.
- Free-tier terms must be verified again before adoption.

## Alternatives considered

- Paid hosted AI APIs
- Free trials with payment cards
- Fully local-only operation
- Small monthly infrastructure budget

