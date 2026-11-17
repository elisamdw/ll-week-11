---
title: "Can a model read the board from a photo?"
description: "How well vision models and classic computer vision turn an overhead photo of a board game into game state, and what to do so they read it better."
kind: question
convolute: research-questions
tags: [research, cameras, game-state, tabletop]
audience: [tdm155ai, stafford, llufs]
links: [photo-to-game-state, photo-to-game-state-then-read-a-save-file, from-board-game-to-game-state, photograph-the-neutral-state, marker-corners, game-state/README]
sources: ["_content/cards/photo-to-game-state.md", "_content/game-state/README.md"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Wednesday's photo activity asks Claude to read an overhead photo of Monopoly or a card table into game state, with students pinning pieces by hand if Claude reads it badly. How well do vision models read boards, what does classic computer vision do differently, and what makes a photo easier to read?

---

**Why the week needs it.** [Photo to game state, then read a save file](photo-to-game-state-then-read-a-save-file.md) runs 30 minutes on Wednesday; PB's [prototype](photo-to-game-state.md) proposes a turn that grades a vision model against a person's pins. Knowing the documented failure rates turns a bad reading into the lesson instead of a stall.

**What would answer it.** The chess-from-a-photo papers and their accuracy and method (find the corners, square the board, classify each square); studies of multimodal models counting, locating and reading grids and boards, with numbers; which practices (straight overhead, markers at the corners, JSON output, a grid overlay) have a source behind them.

**Where to look.** arXiv: chess-position recognition (Wölflein and Arandjelović 2021), "Vision language models are blind" (2024), counting and spatial-reasoning benchmarks; OpenCV's ArUco documentation for [marker corners](marker-corners.md).

*KR's proposal, Nov 16.*
