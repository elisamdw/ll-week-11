---
title: "Where to play each mechanic"
description: "Cross the 105 mechanics with the prototypes and the game's versions, so each printed mechanic says where in the room you can play it now."
kind: idea
convolute: builds-this-week
tags: [print, design, space]
audience: [tdm155ai, llufs, ll]
links: [game-mechanics-inventory-in-the-class-repo, games-written-as-data, game-mechanics-printed-throughout-the-space, a-gamified-way-into-the-mechanics, change-one-card, a-sign-for-every-station, activities/tdm155ai/draw-three]
order: 5
sources: ["_content/mechanics/mechanics.csv", "_content/prototypes/README.md", "W11/builds.md", "W11/marlon/20261113-games-and-interaction.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

The mechanics inventory says what each of 105 mechanics is; the seventeen prototypes each list the mechanics they show. Joining the two answers a question the printed inventory can't yet: where can I play this one? A column on the inventory and a wall chart would send a student who draws "hidden information" to the ten prototypes that run it, which makes the inventory a way into the room.

---

> make sure that we have great up-to-date inventories of game mechanics that are printable and displayable throughout the space, and there could be a gamified way of interacting with them

Marlon, Nov 13, dictated (`W11/marlon/20261113-games-and-interaction.md`). It is build 1 on the builds list (`W11/builds.md`).

**What it finds.** Each prototype card has a `mechanics:` list of ids from `_content/mechanics/mechanics.csv`. Read on Nov 16, the seventeen prototypes cover 44 of the 105 mechanics; `hidden-information` appears in ten of them. The CSV's `InOurGame` column already says, for every row, whether the AI game at `/game` uses the mechanic. So a third column, `PlayItAt`, can be computed, not written by hand.

**What it is.** A script that adds `PlayItAt` (the prototype routes) to the inventory's table, so it travels to Airtable with the rest when Marlon picks the base; a line on each mechanic's printed card, "Play it at /proto/players/the-readout"; and an 11x17 wall chart with mechanics down the side and the prototypes and game versions across the top. The 42 mechanics that neither a prototype nor the game plays yet are a list too: the gaps a student or an LLUF could build next.

**Who it is for.** Wednesday's *Draw three* and *Change one card*, where a student draws a mechanic and can go play it; the LLUFs choosing what to build; and the LL's walls.

**What it reuses.** The inventory, the prototype frontmatter, and the print views. It is a step toward "a gamified way of interacting with them" without building a new game.

**What it would take.** An hour for the script and the column, two more for the chart. It touches `_content/mechanics/`, which another workspace made, so the column needs its owner's or Marlon's say. KR's `games-written-as-data` proposes a second column for the same pass: the slot each mechanic fills (start, play, end, equipment), which a game generator could draw from one card per slot. Both are proposals; neither is in the inventory.

**What Marlon would decide.** Whether the inventory in the class repo (`tdm155ai-week-11`) or this repo's copy is the one to extend; and whether the gap list goes to the LLUFs this week.

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
