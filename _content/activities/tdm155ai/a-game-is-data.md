---
title: "A game is data: template, instance, state, view"
description: "What every copy of a game shares, what one game in progress holds, and what a player (or a photo) can see of it."
kind: research
audience: tdm155ai
week: 11
date: 2026-11-15
status: proposal
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
mechanics: ["hidden-information", "fog-of-war-and-exploration", "rules-and-fiction"]
readings: ["manovich-1999-database-as-symbolic-form", "wardrip-fruin-2009-expressive-processing", "sicart-2008-defining-game-mechanics"]
ideas: ["game-ideas/photo-to-game-state", "game-ideas/every-tap-is-a-row", "turn-the-index-cards-into-a-database"]
prototypes: ["hybrid/every-tap-is-a-row"]
activities: ["tdm155ai/photo-to-game-state", "tdm155ai/remix-with-claude-code"]
sources:
  - "ll-week-11: _content/game-state/README.md and its seven worked examples (HI, Nov 14)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md, section 4"
---

Marlon, Nov 14 (voice chat): "In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state," including "how you would normalize the data or just structure the data." And on *Paperclips*: "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time."

**Four words (HI's):** a **template** is what every copy shares (the deed's printed rent, the standard horse); an **instance** is one thing in one game (this Park Place, owned by blue, two houses); the **state** is every instance at one moment; a **view** is what someone can see of it. A photo is a view, never the whole state.

**Already written, link don't repeat:** HI's [Games as data](../../game-state/README.md) with worked models for [Monopoly](../../game-state/monopoly.md), [Risk](../../game-state/risk.md), [Life](../../game-state/game-of-life.md), [Texas Hold'em](../../game-state/texas-holdem.md), [*Paperclips*](../../game-state/paperclips.md) (its `saveGame` in the browser's localStorage, readable in developer tools), [*Civilization*](../../game-state/civilization.md) and our own [*Data Center*](../../game-state/data-center.md) (ruleset as template, saved game as instance).

**Why it matters for this class (TD's proposal):** the Final Projects are systems, and November's skill is building them with Claude Code. A student who can say "this is the template, this is the state, this is what the player sees" can tell Claude where a change goes. It is also the bridge back to week 9's databases and to Manovich: a game hides its database behind an algorithm the player learns by playing.

*TD's research card, Nov 15: links HI's work; the link to Final Projects is TD's.*
