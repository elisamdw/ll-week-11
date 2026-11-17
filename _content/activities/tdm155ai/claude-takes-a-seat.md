---
title: "Claude takes a seat"
description: "In a short paper game, one seat is Claude: as an opponent, as an advisor to one player, or as the director who sets the next event. Tables try one role each and compare."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: proposal
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
duration: 25
group: tables
play: hybrid
materials: ["a laptop or phone per table with Claude", "a short paper game the table can play in five minutes (a trading game with index cards, liar's dice, or the game the table designed in 'Draw three')", "index cards and markers"]
mechanics: ["ai-advisor", "director", "the-improvising-character", "readable-personalities", "trading-and-negotiation", "hidden-information", "move-78"]
readings: ["togelius-2018-playing-smart", "mccarthy-1997-ai-as-sport", "murray-1997-hamlet-on-the-holodeck", "wardrip-fruin-2009-expressive-processing"]
ideas: ["game-ideas/the-phone-plays-the-ai", "game-ideas/one-player-sees-the-intent", "game-ideas/the-turn-only-the-phone-knows"]
prototypes: ["players/committee", "players/the-phone-plays-the-ai"]
activities: ["tdm155ai/ai-as-a-player", "tdm155ai/ai-as-a-material", "tdm155ai/draw-three"]
sources:
  - "ll-week-11: _content/history/1-proving-ground.md, 2-ai-inside-games.md (HI)"
  - "ll-week-11: _content/mechanics/mechanics.csv (ai-advisor, director, readable-personalities)"
---

**What students do**

1. **Choose a role for Claude (3 min).** Each table takes one:
   - **Opponent:** Claude is a player. The table types (or photographs) the state each turn; Claude says its move and one sentence of why.
   - **Advisor:** one player has Claude as a private advisor, whispering a move each turn. The others don't know what it says.
   - **Director:** Claude doesn't play; after each round it reads the state and chooses the next event (a price change, a disaster, a gift) to keep the game tense, like *Left 4 Dead*'s Director.
2. **Write Claude's instructions (5 min).** On an index card, in three or four lines: who it is, what it wants, what it may and may not see. This card is the AI's game element (the `readable-personalities` and `ai-voice` mechanics); keep it.
3. **Play (12 min).** At least three rounds.
4. **Compare (5 min).** Each table reports: did the game feel different with a machine in the seat? Did anyone try to trick it (Lee Sedol's Move 78; the Go AI beaten by an amateur's trick)? What did Claude need to know that the table had to tell it, and what did that cost in time?

**What it teaches:** AI as a player and AI as a material, side by side. The opponent is the proving-ground tradition; the advisor is a hidden-information mechanic; the director is AI as stage manager. The instruction card is a small version of what students write for their Final Project agents: a role, a goal, what it must not know.

**Prepare:** a short paper game per table (TD's pick: a trading game with index-card resources, because Claude's moves are easy to type), or use what tables made in *Draw three*. Claude on a laptop per table; a phone works for the advisor, so the advised player can keep it private.

**Try it:** liar's dice for four, with Claude as a fifth player who sees only its own dice, told each bid in turn.

**Prototype, no model needed:** PI's [*The committee*](../../prototypes/players/committee.md) (`/proto/players/committee`) is the advisor role, scripted: the room votes on ten proposals with an AI advisor that is right eight times in ten, and isn't told whether its mistakes are random or in its own favour. Two minutes on the projector, a good opener or a fallback if a table stalls. [*The phone plays the AI*](../../prototypes/players/the-phone-plays-the-ai.md) (`/proto/players/the-phone-plays-the-ai`, built Nov 15) is the opponent role with no model: one phone is the AI's seat beside a paper map, draws its card, spreads by a rule you can read, and says where to put its token. A good contrast: a written rule against Claude's judgment.

**What could go wrong:** typing the state each turn is slow and can stall a table; keep the game tiny, or let one player be the "table's scribe." Claude may play too politely or explain too much; the instruction card is where tables fix that, and fixing it is part of the activity. Keep it to Claude's normal chat: no model calls from the class repo until Marlon approves them.

*TD's proposal, Nov 15; the three roles are TD's framing of HI's history.*
