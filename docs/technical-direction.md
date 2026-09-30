# Technical direction

## Decision status

This document records constraints and a provisional direction. A final stack should be selected after the capture spike, not before it.

## System shape

1. **Installable web app:** mobile-first interface for inbox, collection, review, and planning.
2. **Apple Shortcut:** iPhone Share Sheet entry that receives URLs, text, and images and sends them to the capture endpoint.
3. **Authenticated backend:** persists raw captures before enrichment and exposes private application data.
4. **Background enrichment:** metadata parsing, OCR, pattern matching, geocoding, and optional local AI.
5. **Portable storage model:** structured export and explicit attachment references.

## Why the Shortcut is necessary

An installed web app on iOS can behave like an application, but WebKit still does not provide reliable Web Share Target support for receiving arbitrary shares directly into a PWA. Apple Shortcuts can receive URLs, images, and text from other applications through the Share Sheet and are therefore the lowest-cost bridge.

References:

- [Apple: launch a Shortcut from another app](https://support.apple.com/en-tm/guide/shortcuts/apd163eb9f95/10.0/ios/27)
- [WebKit issue: Web Share Target support](https://bugs.webkit.org/show_bug.cgi?id=194593)

## Zero-cost architecture criteria

Any hosted component must:

- Offer a continuing free tier rather than a short trial.
- Be usable without adding a payment card.
- Fail closed or become temporarily unavailable at quota rather than incur charges.
- Support private authentication and access control.
- Allow complete data export.
- Be replaceable without rewriting the product domain model.

Service eligibility must be rechecked at implementation time because free plans change. Supabase currently documents a Free Plan with two free projects and bounded quotas, while Cloudflare documents free Workers and D1 availability. Neither should be adopted solely from marketing claims; the no-card onboarding and quota behaviour must be verified with a disposable prototype account.

References:

- [Supabase billing and Free Plan](https://supabase.com/docs/guides/platform/billing-on-supabase)
- [Cloudflare D1 overview](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)

## Map direction

OpenStreetMap data is suitable for a personal experiment, but the public tile servers are a community-funded service rather than unlimited free infrastructure. The app must show attribution, avoid prefetching or bulk downloading, respect caching, and keep usage modest. Map rendering and geocoding should remain replaceable.

Reference: [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)

## AI and extraction strategy

Use a capability ladder:

1. Preserve the raw input.
2. Read URL and standard page metadata.
3. Apply source-specific parsers where lawful and reliable.
4. Detect phone numbers, currencies, prices, and location phrases with deterministic rules.
5. Run browser or local OCR for supplied screenshots.
6. Offer optional local-model enrichment from a user-controlled computer.
7. Ask for manual correction when confidence is low.

The first release should not call paid or card-gated AI APIs. Open-source model weights do not make hosted inference free, so local AI is an optional enhancement rather than a default backend dependency.

## Reliability requirements

- Persist before enrichment.
- Make processing idempotent so retries do not create uncontrolled duplicates.
- Retain the original input even after a place is edited.
- Track extraction version and timestamp.
- Never convert an inference into verified data automatically.
- Make destructive merges reversible where practical.

## Security baseline

- Deny unauthenticated access by default.
- Authorize every record by household, not merely by knowing an identifier.
- Validate file type and size on capture.
- Treat shared URLs and extracted page content as untrusted input.
- Store authentication secrets only in managed secret storage.
- Avoid exposing home coordinates in logs, exports intended for sharing, or client error reports.

## Proposed repository shape

```text
wayfare/
├── README.md
├── docs/
│   ├── decisions/
│   ├── product-context.md
│   ├── vision.md
│   ├── market-fit.md
│   ├── prd.md
│   ├── experience.md
│   ├── technical-direction.md
│   ├── privacy.md
│   ├── validation-plan.md
│   ├── roadmap.md
│   └── open-questions.md
├── apps/
│   └── web/
├── packages/
│   ├── domain/
│   └── extraction/
├── shortcut/
├── fixtures/
└── scripts/
```

Application directories will be created only after the implementation stack is selected.

