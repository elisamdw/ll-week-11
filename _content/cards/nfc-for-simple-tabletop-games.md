---
title: "NFC for simple tabletop games"
description: "Try game mechanics with NFC and sensors this week, experimenting with hardware ourselves on simple tabletop games, not 52-card decks."
kind: idea
convolute: room-as-board
tags: [nfc, hardware, tabletop]
audience: [ll, llufs, tdm155ai]
follows: hybrid-versions-of-the-ai-game
links: [every-tap-is-a-row, place-to-commit, gpu-chips, index-cards-that-answer, game-ideas/the-turn-only-the-phone-knows, game-ideas/faction-badges, game-ideas/the-ai-rewrites-the-tag, activities/tdm155ai/a-tap-station]
sources: ["_context/orchestration/20261114/voice-handoff-back.md", "W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826372577929", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826394441329", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826409803699"]
voice: mixed
author: CI
date: 2026-11-14
week: 11
status: draft
---

Marlon, Nov 14: "doing some game mechanics with NFC is great, and we should try that this week", on simple tabletop games rather than the RFID decks broadcast poker uses. A few NFC stickers and one reader are cheap, and a tap is deliberate, so every read is a player's move. The prices on the card are voice Claude's rough figures, to check before buying; Web NFC doesn't run on iPhone.

---

> doing some game mechanics with NFC is great, and we should try that this week.

Marlon, Nov 14, in the voice chat, as transcribed by voice Claude (handoff back, section 5). In voice Claude's summary of the rest: likewise with sensors; but for simpler tabletop games, not 52-card decks, "we're better off just experimenting ourselves and doing things with hardware and not bothering to do that with the regular card games" (his words). No RFID poker cards, no PokerGFX.

The scope is the decision. RFID card decks and per-seat antennas are how broadcast poker turns a table into data, and they are expensive and fiddly. A few NFC stickers and one reader are cheap, and a tap is deliberate (NFC reads at a few centimetres), so every read means a player did something.

Voice Claude's rough prices, to verify before buying: an ACR122U USB reader about $40; NTAG213 stickers about $10–20 a pack. Phones read NFC natively, but Web NFC doesn't run on iPhone. The kit went on Marlon's Airtable task list on Nov 14 (builds list, build 8).

The mechanics GL proposed for it on Nov 14 are in `game-ideas/`: tap to reveal, place to commit, identity badges, a tag the AI rewrites, every tap a row. PB built two as prototypes (every tap is a row, place to commit); the rest wait on the kit.

**Nov 16.** The order of the hardware days, in the voice agent's record of his direction in #mk-work-in-progress, a summary, not a transcript (05:52 and 05:53, permalinks in `sources`, gathered in `W11/marlon/20261116-morning-games-active-learning.md`): "NFC stuff probably won't be ready today; that'll have to be tomorrow (Tue)." "Today could try some camera-based AR and sensor-based things." "Things involving asymmetrical information on the phone: good." The same morning KR found that recent iPhones and Androids open a URL written on a sticker with no app (`iphones-open-a-url-tag-without-an-app`), which KB's `tags-that-open-a-page` builds on: phone taps may not need the USB reader.

*CI's reading, Nov 15. Not Marlon's words unless quoted. The Nov 16 paragraph was added by KB at KL's request.*
