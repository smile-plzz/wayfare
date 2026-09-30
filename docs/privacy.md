# Privacy and data ownership

## Privacy posture

Wayfare is private by default and designed initially for two administrators. It may contain home coordinates, current-location-derived data, travel intentions, relationship metadata, source screenshots, contact details, budgets, and visit history. These should be treated as sensitive personal data even though the project is informal.

## Principles

- Collect only what supports capture, decision-making, or travel memory.
- Do not create a public profile or public collection by default.
- Do not sell, advertise against, or train models on personal content.
- Ask before accessing current location.
- Keep each administrator's private notes private unless deliberately shared.
- Make complete export and account deletion possible.
- Preserve provenance so imported or extracted data is not confused with user-authored truth.

## Sensitive fields

- Home coordinates and named home location
- Current location requests
- Planned travel dates
- Visited-place history
- Relationship label
- Personal ratings and notes
- Screenshots of private or targeted social content
- Phone numbers and other contact details

## Recommended controls

- Store approximate home location when exact precision is unnecessary.
- Keep a separate display label from raw coordinates.
- Remove access tokens and transient credentials from logs.
- Redact sensitive fields from error telemetry.
- Provide attachment deletion separately from place deletion.
- Warn before exporting sensitive location or relationship data.
- Support periodic local backup.

## Social-content handling

The project should preserve content supplied by its users for private reference, not crawl social platforms broadly or republish advertisements. The original source URL and capture time should remain attached. The application should avoid implying ownership or ongoing accuracy of third-party content.

## Data retention

Default retention can be indefinite for saved places, but rejected captures and raw processing artifacts should have an explicit cleanup policy. No automatic deletion policy has yet been agreed.

