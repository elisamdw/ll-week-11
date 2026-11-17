---
title: "Tags that open a page"
description: "Write a web address onto each NFC sticker so any phone that taps it opens the game on the laptop and logs the tap, with no USB reader and no Web NFC."
kind: idea
convolute: builds-this-week
tags: [nfc, phones, hardware]
audience: [tdm155ai, llufs, stafford]
links: [nfc-for-simple-tabletop-games, can-every-phone-tap-a-tag-into-the-game, iphones-open-a-url-tag-without-an-app, every-tap-is-a-row, index-cards-that-answer, faction-badges, the-turn-only-the-phone-knows, prototypes/hybrid/every-tap-is-a-row, activities/tdm155ai/a-tap-station]
order: 3
sources: ["_content/prototypes/hybrid/every-tap-is-a-row.md", "W11/research/nfc-tags-and-phones.md", "nextjs/next.config.mjs", "_content/cards/nfc-for-simple-tabletop-games.md", "_content/cards/index-cards-that-answer.md", "W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826372577929"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

The NFC prototypes assume a USB reader that types tag IDs, or Web NFC, which runs only in Android Chrome over HTTPS. A third path may be simpler: each sticker holds a web address on the laptop, so a tap opens the page and the page logs who tapped what. KR found that recent iPhones and Androids open such tags with no app, so Tuesday's NFC session may need only stickers and phones; one test on a real iPhone is left.

---

> NFC stuff probably won't be ready today; that'll have to be tomorrow (Tue).

The voice agent's record of Marlon's direction, Nov 16, 05:52, in #mk-work-in-progress (Slack permalink in `sources`; gathered in `W11/marlon/20261116-morning-games-active-learning.md`). It is the voice agent's summary, not a transcript.

**The gap.** *Every tap is a row* (`prototypes/hybrid/every-tap-is-a-row`) reads a USB reader in keyboard mode, and its notes say phone NFC works only in Android Chrome over HTTPS, so not on the laptop's `http://` dev server. The `index-cards-that-answer` card says the same: "Web NFC doesn't run on iPhone." Both are right about Web NFC. Neither tries the plainer route, where the tag carries a URL and the phone's own NFC reading opens it.

**What it is.** Each sticker is written once with a URL such as `http://<laptop address>:3111/proto/hybrid/every-tap-is-a-row?tag=gpu-3`. A tap opens that page on the phone; the page records the tag, the time, and which phone (a name the player typed once, kept in that phone's browser) as one row through the shared room state the prototypes already use (`useRoom`). The board on the laptop updates. The same stickers still work with the USB reader.

**Who it is for.** Tuesday's NFC session with the LLUFs, Wednesday's optional tap station, and the index cards for Stafford, if Marlon wants them to answer when tapped.

**What it would take.** A pack of NTAG213 stickers (already on Marlon's list), a free tag-writing app, and about two hours to add a `?tag=` path to the prototype. KR's answer (`iphones-open-a-url-tag-without-an-app`, notes in `W11/research/nfc-tags-and-phones.md`, Nov 16): iPhone XS and later read a URL sticker with no app, as a notification the player taps to open Safari, so two touches a tap; Android opens the browser too; Apple's list of schemes includes plain HTTP; NXP TagWriter and NFC Tools write URLs for free. Untested: whether a local address with a port opens, and whether a second tap on the same sticker gives a second notification. Try both on one iPhone before Tuesday. The dev server already allows phones on the laptop's network address (`nextjs/next.config.mjs`, `allowedDevOrigins`), as the prototypes need.

**What Marlon would decide.** Whether to try this path on Tuesday alongside the USB reader; and who runs the one-iPhone test (a local address with a port, and a second tap on the same sticker) before the session.

*KB's proposal, Nov 16, not tested. Not Marlon's words unless quoted.*
