---
title: "How Civilization models its data"
description: "Look at how Civilization, or any territorial-acquisition game, models its data, as a guide to the Stafford 4X game's own."
kind: idea
convolute: game-state
tags: [civilization, game-state, database]
audience: [stafford, tdm155ai]
follows: games-persist-state-as-data
links: [game-state/civilization, the-4x-genre-for-stafford, games-persist-state-as-data]
sources: ["_context/orchestration/20261114/voice-handoff-back.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794693099657649"]
voice: mixed
author: CI
date: 2026-11-14
week: 11
status: draft
---

On Nov 14 Marlon named *Civilization*,

> any territorial acquisition type game

as an example of how a game's data gets modeled (voice chat, handoff back, section 4; the phrase is his, the framing voice Claude's summary).

Voice Claude's notes from the second Slack post that day, flagged there as Claude's and not Marlon's: in *Civilization* the definitions (units, techs, buildings) live in a SQLite database that mods edit, while the live game state is separate and changes through Lua; *Unciv*, an open-source remake of *Civilization V*, splits the data the same way in plain JSON (a ruleset of definitions, and one object for the game in progress that names its ruleset); *Freeciv* uses text ruleset files and plays in the browser. *Civilization* itself grew out of board games: Francis Tresham's 1980 *Civilization* (the first tech tree) and, by Sid Meier's account, an adaptation of *Risk*.

Why it matters now, as CI reads it: on Nov 15 the Stafford game became a 4X. The genre's own split between a ruleset and a game in progress is a ready-made design for a game students will remix with Claude: they change the ruleset (the firms, the places, the prices), and play makes new games from it. The Nov 14 page at `_content/game-state/civilization.md` has more.

*CI's reading, Nov 15. Not Marlon's words unless quoted.*
