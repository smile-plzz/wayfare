# Experience and information model

## Primary flow

### 1. Capture

The user encounters a post or advertisement and chooses `Share` followed by `Save to Wayfare`. The Shortcut accepts whatever the source app supplies: URL, title, selected text, or image. It submits immediately and confirms that the item was saved.

### 2. Enrich

The system records the raw payload first. It then attempts inexpensive enrichment such as URL metadata, known-source parsing, OCR, contact-pattern recognition, location hints, and duplicate detection.

### 3. Review

The inbox emphasizes uncertain and missing fields. Review should feel like approving a draft, not completing a database form.

### 4. Organize

The item becomes a place with tags, state, ratings, source evidence, and potentially multiple observed prices.

### 5. Decide

The users select an origin and constraints. The app filters and ranks eligible places while explaining the score.

### 6. Remember

After travel, a visit record captures dates, actual spending, notes, and revisit interest.

## Proposed navigation

- **Inbox:** unreviewed and failed captures
- **Places:** searchable cards and filters
- **Map:** geographic view of the same collection
- **Trips:** shortlists and later planned journeys
- **Settings:** profiles, home location, relationship label, export, and system status

## Core entities

### Household

The private shared boundary containing users, settings, and data.

### User

An administrator with a display name and relationship label. The label should be user-controlled because Girlfriend, Partner, Fiancée, and Wife may be correct at different times.

### Capture

The immutable-enough record of what entered the system: URL, text, files, sender, timestamp, source type, and processing state.

### Place

The normalized destination: name, description, coordinates, address components, country, categories, contacts, amenities, and lifecycle state.

### Evidence

A connection between a claim and its origin. Evidence may be a source URL, screenshot region, received text, manual confirmation, or later verification.

### Price observation

A dated amount or range, currency, basis such as per night or per person, evidence, and verification state. Prices should accumulate rather than overwrite history.

### Preference

A user-specific rating, interest state, note, and relevant category preferences.

### Visit

A past journey to a place, including dates, actual cost, companions, reflection, and revisit rating.

### Trip shortlist

A decision workspace with origin, dates or available duration, budget, candidates, and eventual selection.

## Evidence states

- **Verified:** explicitly confirmed by an administrator or authoritative current source
- **Extracted:** directly read from supplied content but not independently confirmed
- **Estimated:** inferred from incomplete information
- **Stale:** previously supported but old enough to require checking
- **Missing:** not known

## Empty and failure states

- No captures: explain how to install and use the Shortcut.
- Extraction failed: show the saved evidence and a short manual form.
- Location missing: allow dropping a pin or pasting a map link.
- Price missing: preserve the place without inventing a budget.
- Duplicate suspected: show both records and offer merge, keep both, or cancel.
- Current location denied: continue with home or manual origin.

