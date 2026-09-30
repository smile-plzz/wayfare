# Wayfare web prototype

The first Wayfare product slice is a mobile-first React application for testing capture, review, couple preferences, and collection ownership.

## Run

```bash
pnpm install
pnpm dev
```

Production and static checks:

```bash
pnpm build
pnpm lint
```

## Current behaviour

- Starts with three visibly labeled sample places.
- Stores the collection in browser `localStorage` under `wayfare:places:v1`.
- Accepts `?url=` or `?text=` to prefill the capture dialog for the Apple Shortcut spike.
- Preserves incomplete submissions in the inbox.
- Supports status filters, search, two profile identities, individual ratings, match scores, and JSON export.
- Shows map and trip planning as intentionally unimplemented next phases.

This is not yet a deployed multi-device application. See the repository documentation for validation gates and the planned shared backend.
