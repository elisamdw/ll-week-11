---
title: "Games written as data"
description: "Ludii, GDL and VGDL write a whole game as data a program can run; generators built on them recombine pieces and play the results to keep the good ones, which a flat list of mechanics can't yet do."
kind: reading
convolute: mechanics-not-rules
tags: [research, design, database, game-state]
audience: [ll, tdm155ai]
links: [are-there-languages-where-mechanics-are-data, a-game-generation-tool, a-game-is-data-and-a-loop, game-mechanics-inventory-in-the-class-repo, mechanics-and-elements-not-rules, a-gamified-way-into-the-mechanics, bibliography/sicart-2008-defining-game-mechanics]
sources: ["W11/research/game-description-languages.md", "https://ludii.games/", "https://ludii.games/lud/games/Yavalath.lud", "https://github.com/Ludeme/LudiiAICompetition", "https://arxiv.org/abs/1905.05013", "https://en.wikipedia.org/wiki/Game_Description_Language", "https://gaigresearch.github.io/gvgaibook/PDF/chapters/ch02.pdf", "https://www.cambolbro.com/games/yavalath/", "https://arxiv.org/abs/2407.09388", "https://arxiv.org/abs/2407.17404", "https://arxiv.org/abs/2404.08706", "https://nunc.ch/en/ai-reconstructs-the-rules-of-a-forgotten-roman-game/"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Game description languages write a whole game as data a program can run: who plays, the board and pieces, the starting state, the legal moves, how the state changes, when it ends and who wins. Ludii builds over a thousand games from "ludemes," its nearest thing to the LL's mechanics. Every generator built on these languages recombines pieces and then plays the results automatically to keep the playable ones.

---

**The answer to** [Are there languages where game mechanics are data?](are-there-languages-where-mechanics-are-data.md), from a research pass on Nov 16; the full note, with the Tic-Tac-Toe and Yavalath files quoted, is `W11/research/game-description-languages.md`.

**Three languages.**

- **Ludii** (Digital Ludeme Project, Browne, Piette and others): "Games are described as structured sets of ludemes (units of game-related information)" (ludii.games). Version 1.3.2 "includes over 1,000 games" (2022). A `.lud` file has a game block (players, equipment, rules: start, play, end), option blocks for variants, and metadata with plain-English rules and a source.
- **GDL**, Stanford's language for general game playing: a game as logical state transitions, `role`, `init`, `legal`, `next`, `terminal`, `goal` (Wikipedia; Stanford's own pages would not open).
- **VGDL**, for arcade games (Schaul; the GVGAI framework): sprites, what happens when two sprites meet, end conditions, and a level map.

**What has been generated.** Cameron Browne's Ludi system evolved Yavalath (2007), later published commercially. GAVEL (2024) evolved new Ludii games from 1,182 existing ones. Ludii simulations were used to reconstruct the rules of a Roman board game, Ludus Coriovalli (reported Feb 2026; the *Antiquity* article itself was not opened).

**Language models writing them.** Given the grammar, a model's Ludii games compiled 64% of the time instead of 27%, and 72% after fine-tuning (Tanaka and Simo-Serra, 2024). In VGDL only prompts with the grammar and examples produced correct games (Hu, Zhao and Liu, 2024). GAVEL's commonest failure was rules nothing in play ever used. A parser and an automatic playtest do much of the work.

**What a plain list lacks**, as the researcher infers: slots for each part of a game (players, equipment, start, play, end), parameters on each mechanic, rules for which mechanics combine, and a way to judge a result by playing it.

**For build 1, as KR reads it.** The inventory in `_content/mechanics/` could take a first step without a new language: tag each mechanic with the slot it fills (start, play, end, equipment). A "game generation tool" on that would draw one card per slot, and students playing the result would be the playtest that GAVEL runs by machine.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
