---
title: "The paperclip loop"
description: "One resource, one automation, one phase change: make clips, buy machines, let the machines build machines, and watch the count stop meaning clips, in about a minute."
kind: prototype
convolute: paperclip-loop
tags: [paperclips, economy, autonomy, remix]
audience: [tdm155ai, stafford]
links: [prototypes/economy/paperclip-loop, game-ideas/a-pile-of-paperclips, paperclips/README, universal-paperclips-meets-civilization, remix-a-mechanic-with-claude-code, activities/tdm155ai/games-that-play-themselves, activities/stafford/play-paperclips-and-log-the-easy-moments, mechanics/incremental-growth, mechanics/automate-this, mechanics/three-phase-arc, mechanics/goal-lock, mechanics/core-loop, play-universal-paperclips-before-the-workshop, incremental-growth, automate-this, core-loop]
sources: ["_content/prototypes/economy/paperclip-loop.md", "_content/paperclips/", "_content/activities/README.md", "W11/marlon/20261113-games-and-interaction.md", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

**What it is.** A clicker reduced to its parts, built by PE on November 15 at `/proto/economy/paperclip-loop`. It is written from scratch in the spirit of Frank Lantz's *Universal Paperclips*; no code or text is reused, because that game has no published licence (GL's note in `_content/paperclips/`). Students should play the real one too.

**How it plays.** Press *Make a clip*, and *Buy a machine* when you can afford one; each machine makes a clip a second and costs 15% more than the last. At six machines an offer appears: *Let the machines build machines*, for 120 clips. You can refuse and stay at human scale. Take it, and the machines multiply on their own; your clicks still count, and the page shows what share of the total they are. *Stop the machines* works until the count passes a year of the world's steel. Then the counter switches from clips to the share of Earth's iron. In PE's headless test, a fast player takes the offer at 0:25, loses the Stop button at 0:52, and runs out of iron at 1:03.

**What it does for learning.** Growth like this is hard to feel from a number, so the prototype shows it three ways: the pile on screen rescales (each mark one clip, then ten, then a thousand), your share drops toward a decimal with twenty zeros, and the unit itself changes because the count no longer describes clips. The mechanics are *incremental growth* and *automate this*, meeting at the phase change; the Stop button that stops answering is a small *goal lock*. In PE's reading, Bostrom's paperclip maximizer is the thought experiment, Lantz's game the argument that you understand it by playing, and Fizek on delegated play the reading for the second phase, where the game plays itself and you are still its player.

**Which of Marlon's ideas it serves.**

> Something that's a cross between Universal Paperclips and Civilization or something like that.

Marlon, Nov 13, dictated to MX (`W11/marlon/20261113-games-and-interaction.md`), describing the AI strategy game for William Stafford's workshop. On November 14 he added, of *Paperclips*' game state: "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time."

**In the week:** the third of AL's chains, from TDM's *Games that play themselves* to the Stafford homework, *Play Paperclips and log the easy moments*. It is also the fallback starting point for [Remix a mechanic with Claude Code](remix-a-mechanic-with-claude-code.md), because its tuning values sit at the top of one file (`PaperclipLoop.jsx`); PE's remixes include a weightless goal, a third phase where humans design and machines judge, and a free but irreversible offer. Runs offline. The physical figures (a gram a clip, Earth's iron) are rough and unchecked.

*CM's account of PE's prototype, Nov 15. Not Marlon's words unless quoted.*
