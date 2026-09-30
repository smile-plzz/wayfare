# Product requirements document

## Problem statement

Interesting destinations discovered through social feeds are easy to lose and difficult to compare later. The source content, location, price, contact details, and emotional reason for saving often remain fragmented, preventing two travellers from turning accumulated discoveries into a practical decision.

## Initial release

The initial release is a **capture and review experiment**, not a complete travel planner. It must prove that real content can be saved from an iPhone quickly and converted into a trustworthy place record.

## Goals

1. Save a shared destination candidate in under 15 seconds.
2. Preserve 100% of received items even when enrichment fails.
3. Produce a useful draft record for at least 70% of the first 20 test items.
4. Allow either administrator to correct a record in under two minutes.
5. Make every important claim traceable to a source or explicitly marked uncertain.
6. Keep operation within free, no-card service limits.

## Non-goals for the initial release

- **Live prices or booking:** requires commercial integrations and creates accuracy obligations.
- **Google Timeline import:** valuable later, but unrelated to proving capture.
- **Automatic itinerary generation:** premature until the place collection is useful.
- **Background scraping:** fragile, potentially non-compliant, and unnecessary for personal capture.
- **Native iOS application:** a web app and Shortcut test the workflow with much lower effort.
- **Public accounts or discovery:** conflicts with the private personal purpose.
- **Large hosted AI models:** violates the zero-cost, no-card constraint.

## Personas

### Primary collector

Discovers places while browsing on an iPhone, wants nearly frictionless capture, and later manages the collection.

### Partner administrator

Can add, correct, rate, shortlist, and plan using the same collection while keeping an individually attributable opinion.

## Core user stories

### Capture

- As a collector, I want to share a link from another iPhone app so that the destination is preserved before I forget it.
- As a collector, I want to share a screenshot when a usable link is unavailable so that visual information is not lost.
- As a collector, I want saving to succeed even when parsing fails so that automation never becomes a blocker.

### Review

- As an administrator, I want to see the source beside extracted information so that I can verify it quickly.
- As an administrator, I want uncertain fields highlighted so that guesses are not mistaken for facts.
- As an administrator, I want to correct or complete the record so that it becomes useful for planning.

### Preference

- As either traveller, I want to rate a place independently so that our preferences remain distinct.
- As a couple, we want a combined match score so that mutually appealing places surface naturally.

### Find and decide

- As a traveller, I want to filter by category, budget, country, and visit state so that I can narrow the collection.
- As a traveller, I want to compare distance from home, current position, or another origin so that recommendations fit a real trip.
- As a traveller, I want to understand why a place ranks highly so that I can trust the result.

### Ownership

- As an administrator, I want to export the collection so that service failure or project abandonment cannot trap our data.

## P0 requirements

### P0.1 Authentication and administration

- Exactly two intended administrators can access the private collection.
- Each administrator has a distinct profile and rating identity.
- Relationship labels are configurable private metadata, not public profile text.
- Unauthenticated visitors cannot read place data or attachments.

### P0.2 iPhone capture

- An Apple Shortcut accepts URLs, text, and images from the Share Sheet.
- The Shortcut sends available inputs to an authenticated capture endpoint.
- The server acknowledges receipt quickly and processes enrichment separately.
- Duplicate-looking submissions are flagged but not silently discarded.

### P0.3 Durable inbox

- Every valid authenticated submission creates an inbox item.
- The original URL, received text, attachments, source app when known, sender, and timestamp are preserved.
- Failed enrichment produces a reviewable item with a visible error state.

### P0.4 Place review

- Administrators can confirm or edit name, description, coordinates, locality, country, category, price, currency, contact methods, amenities, and notes.
- Fields can carry evidence status: verified, extracted, estimated, stale, or missing.
- Original evidence remains visible during review.

### P0.5 Collection

- Places can be listed, searched, and filtered.
- Initial states are inbox, saved, shortlisted, planned, visited, rejected, and archived.
- Categories and tags are editable.

### P0.6 Preferences

- Each administrator can assign a 1-to-5 rating and private note.
- A combined score displays both ratings and never hides disagreement.

### P0.7 Portability

- Administrators can export structured data as JSON and tabular place data as CSV.
- Export includes source URLs and attachment references.

## P1 requirements

- Interactive map of saved places
- Distance from saved home coordinates
- Distance from current browser location after explicit permission
- Manually selectable origin
- Simple budget and travel-time filters
- OCR for screenshots
- Price-observation history rather than one overwritten price
- Transparent ranking explanation
- Visit record with actual cost and reflection

## P2 considerations

- Google Maps saved-list or Timeline import
- Route-aware travel time rather than straight-line distance
- International currency normalization
- Suggested itineraries
- Reminders to verify stale prices
- Offline-first capture queue
- Additional invited users or households
- Self-hosted local language model enrichment

## Initial match score

The first version should not pretend to use intelligent recommendation. A transparent weighted score is sufficient:

`match = individual ratings + budget fit + distance fit + category preference + evidence confidence`

The interface must show the contribution of each factor. Missing information should reduce confidence, not automatically imply a poor destination.

## Success measures

### Leading indicators

- Median capture time below 15 seconds
- Capture completion above 90% across 20 real attempts
- Zero lost submissions after server acknowledgement
- Useful draft extraction for at least 70% of test items
- Median review time below two minutes

### Lagging indicators

- Continued organic capture after four weeks
- At least one trip shortlist created from saved discoveries
- At least one visited place linked back to its original saved item
- Both administrators contribute ratings or corrections

## Release acceptance

- [ ] A Facebook link can be shared through the Shortcut and appears in the inbox.
- [ ] An Instagram link or screenshot can be captured even if the page cannot be fetched.
- [ ] A YouTube link preserves title, URL, and received context.
- [ ] A failed extraction remains editable and does not lose its evidence.
- [ ] Both administrators can sign in and cannot see each other's private notes unless configured otherwise.
- [ ] Ratings remain individually attributable.
- [ ] Collection export can recreate all structured place records.
- [ ] No required service asks for a payment card.

