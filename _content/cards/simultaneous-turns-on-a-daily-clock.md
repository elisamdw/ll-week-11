---
title: "Simultaneous turns on a daily clock"
description: "Games that keep a group playing over days use simultaneous turns with a fixed deadline, a default for missed turns, and a referee who can replace a player; one-at-a-time turns stall a class."
kind: reading
convolute: stafford-game
tags: [research, turns, play, design]
audience: [stafford]
links: [how-does-a-class-play-one-game-for-a-week, the-stafford-game-as-an-async-online-experience, a-round-a-day, come-back-later, a-game-william-can-take-with-him, activities/stafford/session-async]
sources: ["W11/research/async-class-games.md", "https://raw.githubusercontent.com/longturn/www/HEAD/templates/intro.html", "https://raw.githubusercontent.com/longturn/www/HEAD/templates/rules.html", "https://webdiplomacy.net/rules.php", "https://webdiplomacy.net/contrib/phpBB3/viewtopic.php?p=74360", "https://diplom.org/Zine/F1995M/Nelson/Dropout.html", "https://devtrackers.gg/polytopia/p/366d81c7-the-rise-of-the-tournament-update", "https://raw.githubusercontent.com/yairm210/Unciv/master/core/src/com/unciv/models/metadata/GameParameters.kt", "https://www.travellerrpg.com/threads/playing-by-e-mail-an-informal-survey.1596", "https://ajet.org.au/index.php/AJET/article/download/2696/1424/11424", "https://www.ascilite.org/conferences/brisbane99/papers/kinderfardon.pdf", "https://en.doc.boardgamearena.com/Turn_based_FAQ"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Groups that stay in one game for days play simultaneous turns on a fixed clock: everyone moves by the deadline, the turn resolves, and it ends early once all have moved. A missed turn gets a default (units hold, the turn is skipped), and after a few misses a referee or an AI takes the seat. Games where players move one at a time stall when one of fifteen is slow, so they suit "a round a day" badly.

---

**The answer to** [How does a class play one game for a week?](how-does-a-class-play-one-game-for-a-week.md), from a research pass on Nov 16; the full note is `W11/research/async-class-games.md`.

**What holds a group.** Freeciv's LongTurn: "one game turn lasts one day"; the server runs constantly and players connect "when they get the time," and games "have been known to gather many tens of players" (its site's templates, read on GitHub because the live site blocks bots). Diplomacy sites resolve all orders at each phase deadline; on webDiplomacy, "If every player has readied their orders, the game will process to the next phase regardless of when the deadline is."

**What happens to a missed turn.** Diplomacy: units hold ("civil disorder"). LongTurn: a player idle "for more than 3 turns" can be replaced. Polytopia, per a developer post of about 2022: "Anyone who runs out of time gets skipped, and they'll automatically get kicked after 3 skips." Unciv's code allows a skip after 24 hours, but another player has to press the button. webDiplomacy lets a teacher be game director of class games, able to "pause the game, replace players that have given up or are not submitting orders."

**How people drop.** Mostly at the start, and after falling behind. webDiplomacy's average member had missed about 9 of 150 phases (2019). Postal Diplomacy averaged "2.86 +/- 1.65" dropouts per game (Nelson, 1994). A play-by-email player: "Games that stall or move too slowly seem to end up stalling permanently."

**In courses.** Deakin's Middle East Politics Simulation (Hardy and Totman, 2017) runs two to three weeks, 24/7, with 80 to 145 students per run; "around four or five students" drop out, effort averaged "about 4 1/2 hours per day," and shared team log-ins left it "vulnerable to group dysfunction." A University of Western Australia Security Council simulation (Kinder, Fardon and Yasmeen) ran in tutorial groups of 12 to 15, close to William's class; its live chat failed because it was hard to find group members online. No peer-reviewed study of drop-out in async strategy games turned up.

**For Nov 23, as KR reads it.** If the game goes async: one simultaneous turn a day with a fixed deadline, an early close when all firms have moved, a written default for a missed turn, the LL (or William) as the referee who can hand a seat to the AI, and a first turn in the room so nobody signs up and never plays.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
