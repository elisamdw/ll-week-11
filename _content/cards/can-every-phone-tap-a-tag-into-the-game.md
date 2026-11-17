---
title: "Can every phone in the room tap a tag into the game?"
description: "Web NFC runs only on Android Chrome; can iPhones still tap an NFC sticker into a browser game with no app, and how does the tap reach a laptop?"
kind: question
convolute: research-questions
tags: [research, nfc, phones, hardware]
audience: [tdm155ai, llufs, stafford]
links: [nfc-for-simple-tabletop-games, every-tap-is-a-row, the-ai-rewrites-the-tag, a-phone-reveals-a-cards-secret, activities/tdm155ai/a-tap-station]
sources: ["_content/cards/the-ai-rewrites-the-tag.md", "_content/cards/the-browser-not-unity.md", "W11/builds.md"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

The week's NFC build assumes a phone tap becomes a row in the game. Web NFC doesn't run on iPhone, so the question is whether a URL written on each sticker, opened by the phone's own tag reading, does the job for every phone in the room, and how that tap reaches a game running on a laptop.

---

**Why the week needs it.** Build 8 on `W11/builds.md` (NFC game mechanics, "we should try that this week"), [Every tap is a row](every-tap-is-a-row.md), and the tap station in the class activities all depend on taps from students' own phones. Voice Claude's note on Nov 14 already says Web NFC doesn't work on iPhone ([The AI rewrites the tag](the-ai-rewrites-the-tag.md)); nobody has yet checked what does.

**What would answer it.** Which iPhones read a URL sticker without an app and what the user sees; what Android does with the same sticker; whether a cheap NTAG213 can put its own ID or a tap counter into the URL; how many bytes a sticker holds; how a phone on the room's Wi-Fi reaches `localhost:3111`; two or three games that already use NFC.

**Where to look.** Apple's Core NFC documentation on background tag reading, NXP's NTAG213/215/216 datasheet, the Web NFC page on MDN and Chrome Platform Status, NXP TagWriter, and the toy-to-life games (Amiibo, Skylanders).

*KR's proposal, Nov 16.*
