---
title: "Guess the category"
description: "Fifteen terms appear one at a time on the studio screen; the first to name the category they share wins more the fewer terms it took."
kind: idea
convolute: builds-this-week
tags: [play, design, hidden-information]
audience: [llufs, tdm155ai, ll]
links: [mechanics/hidden-information, mechanics/timer-and-countdown, mechanics/score-and-points, classic-texts-on-learning-games, a-little-glossary]
order: 8
sources: ["W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826706823819", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826715446109", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826721313709", "_content/mechanics/mechanics.csv", "W11/research/semantle.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

Marlon wants to bring back a guessing game from the LL's earlier LLM-driven games: a category, fifteen terms in it, shown one by one on the studio screen, and the fewer terms you need to name the category, the more you win. The build is a full-screen page and a few decks Claude writes ahead of time, some drawn from the week's own material, so it can run at the LLUFs' table today.

---

> • A moment to bring back the guessing game from an earlier era of our LLM-driven games. Pretty simple: come up with a category and 15 terms in it, and display them one by one, slowly.

> • ...on the screen in the studio, and people have to try to guess the category.

> • The fewer words it takes you to guess the category, the more you win.

The voice agent's record of Marlon's direction, Nov 16, 05:58, in #mk-work-in-progress (permalinks in `sources`). These are the voice agent's summaries of what he said, not a transcript.

**What it is.** A page, `/games/guess`, made for the studio screen: huge type, one term at a time on a timer (eight seconds, adjustable), a count of terms shown, and a key to stop the reveal when someone calls out. The host enters who guessed and whether they were right; a right guess scores 16 minus the number of terms shown. Decks are plain JSON files, one per category, with the fifteen terms ordered from most oblique to most obvious. Claude writes the decks beforehand in Claude Code, so nothing calls a model during play and nothing is spent.

**Decks from the week.** A deck can be any category, but the week supplies good ones: the ten families in the mechanics inventory (six to fourteen mechanics each, so the shorter decks score from fewer terms), the AI apocalypse films, the game-design glossary. Played that way it is also review, which is the learning-game point.

**Who it is for.** The LLUFs this afternoon, who are to try learning games and basic mechanics (Marlon's Nov 16 posts); a warm-up for Wednesday's class; and any session in the studio.

**What it reuses.** Nothing built yet. Comparables KR found (`W11/research/semantle.md`): Pyramid's Winner's Circle (guess the category from clues), Only Connect and LinkedIn's Pinpoint (an earlier guess scores more); no published game reveals fifteen terms this way. KB has not found the earlier LL game in the sources read; if it exists in an older repo, its decks or code may come back with it. Mechanics it shows: `hidden-information`, `timer-and-countdown`, `score-and-points`.

**What it would take.** About two hours for the page and five decks, in this repo on the laptop, or in a small repo of its own if word games become a set (the timed-list game and Semantle are the next ones Marlon named; they are not on this card).

**What Marlon would decide.** Which earlier game he means and whether its code exists; whether it lives in `ll-week-11` or in a repo of word games; and whether the LLUFs play it today.

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
