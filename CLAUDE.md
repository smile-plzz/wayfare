This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Wayfare is a private, zero-cost place-capture and trip-decision tool for two administrators. The first implementation is a mobile-first web prototype that validates capture, review, preference, and export before hosted infrastructure or trip planning is added.

## Commands

Run commands from `apps/web` using pnpm:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

No test runner or deployment configuration exists yet. The prototype does not require environment variables.

## Architecture

- `apps/web/src/App.tsx`: current vertical slice. Owns prototype domain types, sample data, local persistence, URL-based capture, filters, profiles, ratings, export, dialogs, and composition.
- `apps/web/src/App.css`: responsive product styling.
- `apps/web/src/index.css`: global tokens, fonts, and reset.
- `docs/prd.md`: product requirements and acceptance criteria. Treat it as the scope authority.
- `docs/technical-direction.md`: provisional system direction and zero-cost constraints.
- `docs/decisions/`: durable decisions. Add an ADR when changing an accepted constraint.

## Data and storage

The prototype stores `Place[]` in browser `localStorage` under `wayfare:places:v1`. It starts with clearly labeled sample records. JSON export is available from the top bar. This is a validation seam, not the final shared backend.

The `?url=` or `?text=` query parameter opens capture with the shared value prefilled. This is the browser-side contract intended for the Apple Shortcut spike.

## Conventions to preserve when editing

- Persist a capture before attempting future enrichment. Extraction failure must never discard the raw submission.
- Keep facts and inference visibly distinct through evidence status.
- Keep Ismail and Partner ratings individually attributable even when displaying a combined score.
- Do not introduce a paid API, card-gated trial, or service capable of accidental charges.
- Label sample or placeholder information visibly. Never present demo data as a live result.
- Keep the core workflow usable without AI.
- Do not add map, itinerary, or Timeline complexity until the capture experiment meets `docs/validation-plan.md` thresholds.
