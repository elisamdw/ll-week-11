---
title: "The paperclip loop"
description: "One resource, one automation, one phase change: make clips, buy machines, let the machines build machines, and watch the count stop meaning clips."
kind: economy
week: 11
date: 2026-11-15
status: prototype
author: claude (PE, Claude Code 60324eb3-05fc-4804-ae52-5dde0d4b32c8, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/economy/paperclip-loop
mechanics: ["incremental-growth", "automate-this", "three-phase-arc", "core-loop", "goal-lock"]
readings: ["lantz-2017-universal-paperclips", "bostrom-2014-superintelligence", "fizek-2018-interpassivity-and-delegated-play", "fizek-2022-playing-at-a-distance", "lantz-2023-beauty-of-games"]
ideas: ["a-pile-of-paperclips"]
needs: "One laptop, alone or on a projector. Runs offline."
sources:
  - "ll-week-11: _content/paperclips/ (GL, Nov 14: no licence to reuse Lantz's code, so this is our own code and words)"
  - "ll-week-11: _content/game-ideas/a-pile-of-paperclips.md (GL, Nov 14)"
---

A clicker reduced to its parts: one resource (clips), one automation (machines that make clips), and one phase change (an offer to let the machines build machines). After that, the number on screen grows past anything it can mean, and the page changes what it counts. It is written from scratch in the spirit of Frank Lantz's *Universal Paperclips*; none of its code or text is reused (see `_content/paperclips/`). Students should play the real one too.

## How to play

1. Open `/proto/economy/paperclip-loop`. Press **Make a clip** (or Space) and **Buy a machine** (or M) when you can afford one. Each machine makes a clip a second and costs 15% more than the last.
2. At six machines, an offer appears: **Let the machines build machines**, for 120 clips. You can refuse it and stay at human scale.
3. If you take it, the machines multiply on their own. Your clicks still count, and the page shows what share of the total they are. **Stop the machines** works until the count passes a year of the world's steel.
4. Then the counter switches from clips to the share of Earth's iron. About a minute from start to finish.

Tested in headless Chrome with a player clicking five times a second who buys machines until the offer appears and then saves for it: the offer is taken at 0:25, Stop stops working at 0:52, and the iron runs out at 1:03. A player who keeps buying machines and doesn't save took 1:26 to reach the offer.

## What it shows

Mechanics from `mechanics.csv`: **incremental growth** (numbers that grow on their own while you tune the rate) and **automate this** (each upgrade removes a click and a decision, until you can only watch). The phase change is where they meet. Phases 1 and 2 follow the first two steps of the **three-phase arc** (humans beat the machine, then the machine beats everyone); the third step, humans designing with the machine as judge, is left out here and is a remix below. The Stop button that stops answering is a small version of **goal lock**.

What it argues (Claude's proposal): growth like this is hard to feel from a number, so the prototype shows it three ways. The pile on screen rescales: each mark is one clip, then ten, then a thousand, and the heap you built drops back to a tenth of its height each time. Your share of the total goes from 100% to a decimal with twenty zeros. And at the end the unit itself changes, from clips to tonnes to Earth's iron, because the count no longer describes clips. Bostrom's paperclip maximizer in *Superintelligence* is the thought experiment, and Lantz's game is the argument that you understand it by playing it. Fizek's work on delegated play is the reading for phase 2: the game keeps playing itself, and you are still its player.

The physical figures are rough, written into the tuning values so anyone can change them: a clip weighs about a gram, the world makes about 1.9 billion tonnes of steel a year, and Earth's iron is roughly a third of its mass (about 1.9 × 10^27 g). They come from general reference and were not checked in this session.

## Could go in the game as

- The AI's goal track in *Data Center*: the `goal` number already compounds each round (acceleration 1.25); show it as a pile that rescales instead of a number.
- The opening two minutes of the TDM 155AI class on Nov 18, before *Universal Paperclips* or the game, as the `a-pile-of-paperclips` idea proposes (that idea's AR pile on a table is a further step).
- The offer as a card a human faction can accept in the multiplayer game: it removes that faction's action from every later round.

## Remix it

All in `nextjs/app/proto/economy/paperclip-loop/PaperclipLoop.jsx`; the tuning values are at the top.

- "Change the goal from paperclips to something without weight, like cat pictures or poems, and decide what the counter switches to at the end." (`CLIP_GRAMS`, the end units in the counter, the words in `PHASES`)
- "Add the third phase of the three-phase arc: after stopping, the player designs and the machines judge." (a new entry in `PHASES`, and a step after `stop()`)
- "Make the offer free but irreversible, and show a warning first." (`SELF_BUILD.cost`, `letThemBuild()`)
- "Make it go twice as fast, then ten times slower, and see when it stops being fun." (`SELF_BUILD.rate`, `SELF_BUILD.accel`)
- "Let the machines refuse the Stop button more politely." (the Stop button's text)

## Needs

One laptop, alone or on a projector. Runs offline, no model calls.
