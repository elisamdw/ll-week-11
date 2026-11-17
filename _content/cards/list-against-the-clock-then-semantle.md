---
title: "List against the clock, then Semantle"
description: "Two short word games for the fellows: name as many examples of a category as you can before a timer runs out, then play Semantle, where an AI scores how close each guess is."
kind: activity
convolute: ll-week
tags: [play, design, rhetoric]
audience: [llufs, tdm155ai]
follows: your-five-most-played-games
links: [guess-the-category, classic-texts-on-learning-games, games-are-machines-for-capturing-interaction, mechanics/timer-and-countdown, mechanics/score-and-points, mechanics/hidden-information]
order: 7
sources: ["W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826605563599", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826611424059", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826758593939", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826787773289", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826882161379", "W11/research/semantle.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

Marlon named two more word games for the week beside guessing a category: listing as many examples of a category as you can on a timer, and Semantle, "because it's connected to AI." This pairs them for the fellows: a paper round where people judge which answers count, then Semantle, where a model judges how close a word is. The contrast is the point: who, or what, decides that two words are near.

---

> • That's clearly one category of word-based game. There are also games where there's a category and you list as many examples as you can think of in it, within a few minutes or some timer.

> • Finding more games like that would be good. And Semantle, obviously, is a good one because it's connected to AI.

The voice agent's record of Marlon's direction, Nov 16, 05:59, in #mk-work-in-progress (permalinks in `sources`), a summary by the voice agent, not a transcript. Just before, at 05:56: "And think about word games and things." and "Like the New York Times games." This card is distinct from `guess-the-category`, where the terms are given and the category is hidden; here the category is given and the terms are yours.

**How it plays (KB's proposal, about twenty-five minutes).**

1. **List (3 rounds, 2 minutes each).** The host names a category (kinds of game mechanic, things a data center needs, AI apocalypse films). Each fellow writes as many examples as they can. Then read aloud: an answer anyone else also wrote scores nothing, a unique one scores a point, and the table votes on any answer someone challenges. The scoring is KB's proposal, borrowed from category games like Scattergories; Marlon named only the category and the timer.
2. **Semantle (10 min, in pairs).** Play Semantle: each guess is scored by how close it is in meaning to a hidden word, as a model measures it. Pairs say out loud why they think a guess scored high or low.
3. **Talk (5 min).** In round 1 people decided what counted. In Semantle a model's map of meaning decided. Where did the model's "close" surprise you, and would you have accepted it at the table?

**What it is for.** Word games are the learning games the fellows are asked to try (Marlon, 05:53, voice record: "Things about learning games: definitely good"), and they need nothing but paper. Semantle puts an AI inside a game as a judge rather than a player, which is a role the week's AI game doesn't have yet. Either round could open Wednesday's class.

**Further games, Claude's list, not Marlon's.** At 06:01 the voice agent posted its own suggestions, labeled as Claude's: Contexto, Codenames, Connections, Taboo, Wavelength, Twenty Questions, Just One, Pyramid, with Contexto, Codenames and Wavelength as "the most AI-adjacent." None of these is Marlon's choice and none was checked here.

**How Semantle decides "close" (KR's research, `W11/research/semantle.md`, Nov 16).** It uses word2vec vectors trained on Google News; the similarity shown is the cosine between two words' vectors times 100, and "N/1000" is a guess's rank among the secret word's thousand nearest words, worked out in advance on the server. An offline version can run in the browser, and for the week's 300 to 500 glossary terms a precomputed table of closeness would be small (KR's researcher estimates under 1.5 MB). That is a build for later, not for today: play the public game first. The judge in round 3's talk is therefore a word model trained on news articles, which is worth saying to the fellows.

**Materials.** Paper, pens, a timer on the studio screen, two or three laptops or phones for Semantle.

*KB's proposal for the activity, Nov 16, from the voice agent's record of Marlon's direction. Not Marlon's words unless quoted.*
