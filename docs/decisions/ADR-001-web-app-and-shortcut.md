# ADR-001: Web app with Apple Shortcut capture

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The primary capture device is an iPhone, and most discoveries occur inside Facebook, Instagram, and YouTube. The application should remain inexpensive and easy to iterate. A web app is preferred, but iOS does not reliably allow an installed PWA to register as a Share Sheet target.

## Decision

Build a mobile-first web app and use an Apple Shortcut as the Share Sheet bridge for URLs, text, and images.

## Consequences

- The main product remains cross-platform and web-based.
- Initial setup includes installing a Shortcut.
- Shortcut authentication and update distribution require deliberate design.
- A native iOS app is unnecessary for the experiment.

## Alternatives considered

- Manual copy and paste into the web app
- Telegram or WhatsApp bot capture
- Native iOS application
- PWA Share Target without a Shortcut

