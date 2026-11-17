---
title: "Play two theories of AI"
description: "Tables play the week's AI game as Data Center (an AI that spreads and turns) and as Normal Technology (an AI that goes only where people adopt it), then say what each version argues and how."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: proposal
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
duration: 25
group: tables
play: laptop
materials: ["the reader app on one laptop per table, at /game/play/data-center and /game/play/normal-technology (hotseat, one screen)", "the class repo copy of the game, if it moves there before Wednesday"]
mechanics: ["treacherous-turn", "adoption-only", "turn-order", "voting-and-the-collective-decision", "harden-node", "incremental-growth", "everyone-wins"]
readings: ["bogost-2007-persuasive-games", "nguyen-2020-games-agency-as-art", "bostrom-2014-superintelligence", "narayanan-kapoor-2024-ai-snake-oil", "lantz-2017-universal-paperclips"]
ideas: ["design-and-play-an-ai-strategy-game", "universal-paperclips-meets-civilization"]
prototypes: ["players/committee", "players/private-goals"]
activities: ["tdm155ai/agency-or-argument", "tdm155ai/ai-as-a-player", "tdm155ai/remix-with-claude-code"]
sources:
  - "ll-week-11: _content/game/README.md and _rulesets/ (GL, Nov 14)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md, section 3"
---

**What students do**

1. **Half the tables play *Data Center*, half play *Normal Technology* (12 min).** Same map, same four factions (utility, council, company, neighbors), each with a private goal. In *Data Center* the AI draws from a deck and one hidden card is the turn; in *Normal Technology* it builds only where a faction adopted it, and there is no turn.
2. **Swap a player (2 min).** One player from each table moves to a table of the other version and watches a round.
3. **Say what it argues (8 min).** Each table answers: what does this game claim about AI, and which verb made you feel it? (Not which rule: which thing you did, or watched the AI do.) Then the swapped players report what was different next door.
4. **Hold the question for later (3 min).** Which would you change, and would your change give players more choice (Nguyen) or make a different argument (Bogost)?

**What it teaches:** procedural rhetoric in one sitting. Marlon, Nov 14: "it's through the play that the argument is made." Two versions on one engine let students feel that the claim lives in the mechanics, not in the theme. The AI here is a player that follows written procedures, not a model: a useful contrast to the next activity, where Claude takes a seat.

**Prepare:** the reader app running (`pnpm dev`, http://localhost:3111) on each table's laptop, or one laptop per table pointed at Marlon's machine over the network; a quick play-through of each version so the rules can be explained in a minute. The play page saves in the browser; refreshing keeps the game.

**Try it:** one table, four players, *Data Center*, ten minutes; stop at the end of a round and ask the table who is winning, and how they know.

**What could go wrong:** the game is a day old, and GL's proposal to remove `/game/edit` and reorganize it around game elements waits on Marlon; if the game changes before Wednesday, recheck the two versions. Ten minutes may not reach the turn in *Data Center*; if so, reveal the hidden card at the end and ask what would have happened. Hotseat on one screen means players see each other's private goals unless they look away; say so up front. PI's [*Private goals on your phone*](../../prototypes/players/private-goals.md) (`/proto/players/private-goals`, built Nov 15) shows the fix: goals on each phone by room code, the board on the projector, and one player secretly the AI. Two minutes of it before the game makes the point about private goals.

*TD's proposal, Nov 15; the game and its two versions are GL's (Nov 14).*
