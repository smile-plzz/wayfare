# Validation plan

## Riskiest assumption

The riskiest assumption is that content shared from Facebook, Instagram, and YouTube on an iPhone provides enough URL, text, image, or metadata to create a useful place draft without requiring tedious manual entry.

If this is false, the proposed capture advantage disappears regardless of how good the later planner becomes.

## Capture spike

Build the smallest vertical slice:

1. Authenticated capture endpoint
2. Apple Shortcut accepting URLs, text, and images
3. Durable raw-capture record
4. Minimal inbox
5. Basic extraction report
6. Manual correction form

Do not build map, trip planning, or recommendation features during this spike.

## Test set

Use at least 20 real examples:

- 8 Facebook posts or advertisements
- 6 Instagram posts, reels, or advertisements
- 3 YouTube videos or shorts
- 3 Google Maps or ordinary website links
- At least 5 screenshot-based captures
- A mix of Bangladesh and international destinations

Do not commit private screenshots or personal tokens to a public repository. Sanitized fixtures may be created separately.

## Record for each attempt

- Source app and content type
- Inputs received by the Shortcut
- Capture duration
- Whether the raw item was stored
- Fields extracted correctly
- Fields extracted incorrectly
- Fields unavailable
- Manual review duration
- Whether the final record was useful

## Success threshold

Proceed to the collection MVP if:

- At least 90% of attempts create a durable inbox item.
- No acknowledged capture is lost.
- At least 70% produce a useful draft or can be corrected in under two minutes.
- The Share Sheet workflow feels easier than sending links to oneself or manually maintaining a spreadsheet.

If the threshold is missed, adjust the capture model before expanding scope. Possible responses include making screenshots the default evidence, reducing promised extraction, or using a chat-based inbox rather than continuing directly to a planner.

## Product validation after the spike

Over four weeks:

- Capture naturally encountered places without manufacturing volume.
- Review the inbox at least weekly.
- Create one real shortlist using budget and distance.
- Ask both administrators to rate candidates independently.
- Compare the outcome with a Google Maps-only workflow.

The experiment succeeds if the collection changes or accelerates a real travel decision.

