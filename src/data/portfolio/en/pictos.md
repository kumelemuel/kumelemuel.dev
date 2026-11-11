---
# TODO: confirm role, start year and whether there is a public repository (inferred from the live app).
title: "Pictos"
translationKey: "pictos"
summary: "Cognitive accessibility PWA: it explains step by step, with pictograms, how to get things done at different services, and lets the community rate how accessible they are."
kind: featured
status: pwa
role: "Development"
year: 2025
stack: ["Vue 3", "Pinia", "Vue Router", "Vue I18n", "Vite", "PWA", "Web Speech API"]
links:
  site: "https://app.pictos.cl"
cover: "../../../assets/portfolio/pictos.webp"
coverAlt: "Pictos welcome screen: illustration of a person pressing the audio button on a phone and the text “Turn on audio”"
order: 2
---

## Context

For many people with cognitive disabilities, or who simply find reading hard, getting something done at an unfamiliar place is a barrier: confusing signage, long instructions and steps nobody explains. Pictos was created to make those tasks easier "in simple steps" and, at the same time, to let the community show which places are accessible and which need to improve.

## What I built

A progressive web app (PWA) that can be installed on a phone, with two main features:

- **Help with tasks**: you look up a place or service (for example, a metro station or a bus terminal) and the app lists the tasks you can do there, explained step by step with pictograms.
- **Accessibility ratings**: anyone can rate a place across several layers (how understandable messages and signs are, font size, colors and contrast, cleanliness, lighting and acoustics), with optional photos. The result is summarized as a level: poor, fair, good or excellent.

It also includes:

- **Audio on every screen** for people who cannot or prefer not to read.
- **Location**: nearby places with help available, with the option to change the area or see them on a map.
- **Community contributions**: suggesting new places or creating a task with 3 to 9 steps and its visual aids, subject to approval.
- **Installation guide** for each type of device, to add Pictos to the home screen.

## Decisions

- **PWA instead of a native app**: it installs from the browser without going through app stores, and a single codebase works on Android, iOS and desktop.
- **Vue 3 with Pinia and Vue Router**: centralized state for location, profile and rating progress, and screen-by-screen navigation designed as a guided flow.
- **Read-aloud with the Web Speech API**: audio uses the device's own speech synthesis, with no recorded or downloaded files.
- **Cognitively accessible design**: one idea per screen, short copy, large buttons, a "step X of Y" indicator and supporting illustrations.
- **Copy centralized with Vue I18n**, which makes it easier to adjust the wording and opens the door to other languages.

<!-- TODO: add a "What I learned" section. -->
