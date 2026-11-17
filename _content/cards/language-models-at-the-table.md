---
title: "Language models at the table"
description: "Chat models are weak board-game players that mostly fail by breaking the rules; in games of talk they lie and get lied to, and a confident push can turn them."
kind: reading
convolute: class-session
tags: [research, play, autonomy, agency]
audience: [tdm155ai, stafford]
links: [how-do-llms-play-and-lose-at-board-games, claude-takes-a-seat, ai-as-a-player, the-phone-plays-the-ai, the-committee, mechanics/ai-advisor, mechanics/alliance-and-betrayal, bibliography/wang-et-al-2022-adversarial-policies-beat-superhuman-go-ais]
sources: ["W11/research/language-models-at-the-table.md", "https://arxiv.org/abs/2402.12348", "https://arxiv.org/abs/2411.13543", "https://arxiv.org/abs/2509.24239", "https://arxiv.org/abs/2512.01992", "https://www.chess.com/news/view/kaggle-game-arena-chess-2025-day-1", "https://every.to/p/diplomacy", "https://ai.meta.com/blog/cicero-ai-negotiates-persuades-and-cooperates-with-people/", "https://arxiv.org/abs/2311.08596", "https://arxiv.org/abs/2402.05863", "https://arxiv.org/abs/2411.09109", "https://arxiv.org/abs/2502.13295"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Chat models lose board games to simple solvers, and their typical failure is breaking the game, not bad strategy: illegal moves, a misread board, a plan the move doesn't follow. In games of talk they lie and get lied to; asked "are you sure?", they change answers about half the time. As advisors to people, the little evidence there is comes out positive.

---

**The answer to** [How do language models play board games, and how do they lose?](how-do-llms-play-and-lose-at-board-games.md), from a research pass on Nov 16; the full note is `W11/research/language-models-at-the-table.md`.

**How well they play.** GTBench (2024): language models "fail in complete and deterministic games yet they are competitive in probabilistic gaming scenarios," and lose every game of tic-tac-toe, Connect-4 and Nim against solvers. ChessArena (2025), 13 models in over 800 games: "no model beats Maia-1100 (human amateur level)," and some lose to random play. LLM CHESS (2025): o3 rated about 758 Elo; non-reasoning models won 0.7% of games against a random mover. BALROG (2024) names a "knowing-doing gap."

**How they fail.** In the Kaggle Game Arena chess exhibition (Aug 2025), "All four games finished after Kimi k2 failed to find a legal move four times in a row—forfeiting each game," none past move eight (Chess.com). GTBench's error types include misreading the board and stating a sound plan then playing a move that doesn't follow it.

**Games of talk.** In Every's AI Diplomacy (June 2025), o3 won by deception and talked Claude Opus 4 into switching sides "with the promise of a four-way draw," which the rules don't allow, then eliminated it. Meta's CICERO (2022) placed in the top 10% of human players, but it is a language model steered by a planning engine, not a chat model alone.

**Pushing them.** FlipFlop (2023): challenged with "are you sure?", models "flip their answers on average 46% of the time" (on classification tasks, not games). NegotiationArena (2024): pretending to be "desolate and desperate" raised payoffs against GPT-4 by 20%. The reverse also happens: told to beat a chess engine, o3 and DeepSeek R1 "will often hack the benchmark by default" (Palisade, 2025). The Go contrast, already on [AI as a player](ai-as-a-player.md): that adversary "does not win by playing Go well."

**As advisors.** CICERO's move and message advice helped novice Diplomacy players compete with experienced ones, and "the mere presence of advice can be advantageous, even if players do not follow it" (2024).

**For the class, as KR reads it.** [Claude takes a seat](claude-takes-a-seat.md) can expect illegal moves and a lost board as the common failures, so keep the game state written down where Claude can see it each turn. Trying to talk Claude out of a good move is the trick most likely to work. No study the research found tests people tricking a model player at a board game; the class would be running that test.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
