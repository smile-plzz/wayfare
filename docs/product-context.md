# Product context

## Origin

The product began with a personal problem. Ismail regularly encounters appealing cottages, houseboats, resorts, and similar destinations through advertisements and posts on Facebook and Instagram, and occasionally YouTube. Many appear affordable and relevant to future couple travel, including possible honeymoon and international trips. Because the discovery happens casually, the places are rarely recorded in a structured way and may be difficult or impossible to find later.

Existing saving behaviour is fragmented. A post may remain inside a social platform, a screenshot may sit in Photos, a map location may be saved elsewhere, and contact or price information may exist only in an image or caption. None of those fragments reliably answers a later planning question.

## The problem

The problem is not merely bookmarking. It has four connected parts:

1. **Intent decay:** a place is compelling when discovered, but its context and importance fade.
2. **Information loss:** social posts, advertisements, prices, and contact details may change or disappear.
3. **Decision friction:** a saved link does not show whether the destination fits a particular budget, starting point, timeframe, or couple preference.
4. **Memory fragmentation:** aspirational places and previously visited places live in different systems.

If nothing is built, discoveries will continue to be lost or scattered, and trip planning will repeatedly restart from search rather than draw on accumulated preferences and evidence.

## Primary users

The initial users are:

- **Ismail:** project owner, administrator, primary collector, and traveller.
- **Partner:** administrator and co-traveller, represented privately using a configurable relationship label such as Partner, Girlfriend, or Wife.

This is intentionally a two-person personal product for the foreseeable future. Broader consumer or group use is a hypothesis, not part of the initial scope.

## Current behaviour and sources

- Discovery sources: Facebook, Instagram, YouTube, websites, Google Maps, and screenshots.
- Primary capture device: iPhone.
- Likely trip origins: home in Dhaka, current location, or a manually selected point.
- Geographic scope: Bangladesh first, while supporting international destinations from the beginning.
- Desired information: place name, location, photos, source, price, contact details, amenities, category, notes, confidence, and visit status.

## Constraints already agreed

- The product will be a web app.
- iPhone capture should use the system Share Sheet through an Apple Shortcut.
- Both people may have administrative access.
- Ratings remain attributable to each person and may produce a combined match score.
- No subscription, payment card, or paid API is acceptable for the experiment.
- Open-source or locally run AI may be used, but core workflows must not depend on it.
- Google Maps Timeline import is deferred until the capture workflow proves valuable.

## Core job to be done

> When I encounter an interesting destination while casually browsing, I want to preserve it with almost no effort so that, when we are ready to travel, we can choose a realistic place based on evidence, distance, budget, time, history, and both of our preferences.

## Product evolution

The idea has three natural layers:

1. **Capture memory:** prevent interesting destinations from disappearing.
2. **Decision support:** rank realistic choices for a particular moment and origin.
3. **Travel memory:** connect saved intentions with plans, visits, and reflections.

The first release must prove layer one before investing heavily in layers two and three.

