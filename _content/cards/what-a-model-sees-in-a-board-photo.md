---
title: "What a model sees in a board photo"
description: "Vision models read sparse, clean boards well and dense, cluttered ones badly; for Wednesday, let the model propose the state and have students check stacks, piles and overlaps."
kind: reading
convolute: game-state
tags: [research, cameras, game-state, tabletop, hidden-information]
audience: [tdm155ai, stafford, llufs]
links: [can-a-model-read-the-board-from-a-photo, photo-to-game-state-then-read-a-save-file, photo-to-game-state, marker-corners, photograph-the-neutral-state, hidden-information]
sources: ["W11/research/photo-to-game-state.md", "https://arxiv.org/abs/2104.14963", "https://arxiv.org/html/2310.04086v3", "https://arxiv.org/html/2503.02358v1", "https://arxiv.org/abs/2407.06581", "https://vlmsareblind.github.io/", "https://arxiv.org/html/2506.05440v1", "https://iclr.cc/virtual/2026/poster/10009317", "https://arxiv.org/abs/2310.11441", "https://arxiv.org/abs/2402.12058", "https://platform.claude.com/docs/en/build-with-claude/vision"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Models read clean, sparse boards almost perfectly and dense ones badly: in one 2025 test Claude 3.5 Sonnet transcribed tic-tac-toe boards at 98.5% of cells and chess at 55%. Overlap, stacks and many small pieces are where every reader fails. For Wednesday: let the model propose the state as JSON, one region at a time, and have students check it by hand.

---

**The answer to** [Can a model read the board from a photo?](can-a-model-read-the-board-from-a-photo.md), from a research pass on Nov 16; the full note with every number is `W11/research/photo-to-game-state.md`.

**Classic computer vision.** The chess pipeline finds the board's corners, warps it to a square and classifies each square. On synthetic images it misreads 0.23% of squares (Wölflein and Arandjelović 2021). On 10,800 real phone photos from varied angles (ChessReD, 2023) the same pipeline found the board in 34% of images and got 2.3% of boards fully right; the best system on those photos gets 15%. Low angles hide pieces behind pieces; a top view avoids that but makes similar pieces harder to tell apart.

**Multimodal models.** LVLM-Playground (2025) asked models to transcribe board images into a grid, cell by cell:

- Claude 3.5 Sonnet: tic-tac-toe 0.985, Reversi 0.992, chess 0.554.
- GPT-4o: tic-tac-toe 0.709, chess 0.271.

"Vision language models are blind" (2024) found counting a grid's rows and columns ran from 39% (GPT-4o, Gemini 1.5 Pro) to 74% (Claude 3.5 Sonnet), and every model did better when the cells held text. BYO-Eval (2025) found GPT-4.1 counts chess pieces at 94% up to four pieces and 54% from ten to twenty-one, and undercounts overlapping cards at every degree of overlap. On tabletop strategy-game scenes the best models reach about 68% on simple perception questions (LudoBench, ICLR 2026). Anthropic's own docs say Claude's counts and positions are approximate.

**What helps, with a source behind it.** A clear, correctly rotated image, cropped with care and not shrunk too far. Marks or a dot grid drawn on the image for the model to refer to (Set-of-Mark, 2023; Scaffold, 2024): this supports labeling Monopoly's spaces before asking. Fiducial tags at the corners to recover the board's angle (AprilTag), which is [Marker corners](marker-corners.md). JSON constrained to a schema, which fixes the format but not whether the values are right.

**What no source covers.** No benchmark of current models on real photos of Monopoly, Risk, Life or a card table; nothing on face-down cards. The newest models on clean rendered chess boards are near perfect (MET-Bench, 2026), so Wednesday's photos may do better than the 2025 numbers, or worse, because they are photos.

**For the class, as KR reads it.** The failures are the lesson the activity already wants: the money piles, houses, stacked armies and fanned hands are where the photo stops being the state. Have Claude list what it is unsure of, then let students' pins in PB's [prototype](photo-to-game-state.md) grade it.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
