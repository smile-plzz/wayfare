# Roadmap

The roadmap is evidence-gated. Dates should be assigned only after the remote repository and implementation environment exist.

## Phase 0: Foundation

- Agree on working name and repository
- Review and correct product documentation
- Choose license and repository visibility
- Confirm free, no-card deployment options
- Create sanitized test fixtures

**Exit condition:** documentation reflects shared intent and no blocking ownership or privacy question remains.

## Phase 1: Capture spike

- Create authenticated capture endpoint
- Build Apple Shortcut
- Persist URL, text, image, sender, and timestamp
- Display captures in a minimal inbox
- Record extraction diagnostics
- Test 20 real examples

**Exit condition:** validation thresholds in `validation-plan.md` are met or the capture concept is deliberately revised.

## Phase 2: Place collection MVP

- Normalize captures into place records
- Add review and correction experience
- Add categories, tags, lifecycle states, contacts, and evidence
- Add separate ratings for both administrators
- Add JSON and CSV export

**Exit condition:** the users maintain a useful collection without external spreadsheets or self-messaging.

## Phase 3: Spatial decision support

- Add map view
- Configure home origin
- Request current location only when needed
- Add manually selected origin
- Calculate distance
- Add budget, category, and location filters
- Explain combined match scoring

**Exit condition:** the app can produce a credible shortlist for a real trip.

## Phase 4: Travel memory

- Add trips and visit records
- Record actual spending and reflections
- Link saved intent to completed travel
- Explore Google Maps export import

**Exit condition:** previous travel meaningfully informs a new decision.

## Parking lot

- Route-aware travel-time estimates
- Currency conversion
- Price verification reminders
- Offline capture queue
- Local language model enrichment
- Rich itinerary generation
- Booking links
- Public or group accounts

