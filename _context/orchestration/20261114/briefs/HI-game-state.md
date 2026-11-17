---
title: "Brief: HI, games as data: game state, templates, and instances"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
---

# HI: games as data

Read first: `_context/orchestration/20261114/voice-handoff-back.md` (Marlon's hour in voice mode, saved verbatim), sections 4 and 6.

**Marlon, Nov 14 (voice chat):** building a video game means persisting data; NPCs and mobs are instances of classes; the *Breath of the Wild* horse has standard properties, and yours are stored as you customize it ("that kind of Lev Manovich theory of database"). Look at *Civilization* and *Paperclips* as examples of how a game models its data: "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time." "In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state," including "how you would normalize the data or just structure the data," from overhead photos of Monopoly, Risk, Life, and a card game.

**You own, new:** `_content/game-state/`, plus `_content/history/` and `_content/mechanics/` as before.

1. **Check the voice Claude's two unverified claims:** that *Civilization* V and VI load their game definitions (units, buildings, techs) into SQLite and that modders change the game by editing that data; and that *Paperclips* saves its state in the browser's localStorage. Cite what you open. For *Paperclips*, describe what its saved state holds (the names of the stored values and what they mean) without copying its code or text.
2. **Worked examples, one file each:** Monopoly, Risk, The Game of Life, Texas Hold'em, *Paperclips*, and our *Data Center*. For each: the templates (the definitions printed on the board and cards, or set in the code), the instances (what a game in progress stores), what a photo of the table can and can't show (hidden hands), and the state as a small table or JSON, normalized where that helps. Mark these as your models, not the publishers'.
3. **A README** that frames it for Marlon's class on Nov 18: the move from a photo of a table to a game state, and how it connects to the readings (Manovich, Wardrip-Fruin; TH is adding both to the bibliography).

No purchases and no outward posts. Ping GL when it's ready to commit.
