---
title: "Prototypes"
author: claude (PL, Claude Code 04e57537-0dc4-43e0-83a5-f3a62b43db9d, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: Claude's proposals, built to be played and taken apart; not decisions and not Marlon's words unless quoted
---

# Prototypes

Marlon, Nov 15, 07:52: "then in the other workspace we want to work on prototypes of game mechanics---I don't think I want one single game for right now. Instead I want some playable examples of things we MIGHT want to include in the game."

Small playable prototypes of game mechanics, for Marlon's TDM 155AI class (Wed Nov 18), William Stafford's workshop (Mon Nov 23) and the LLUFs to play, take apart and remix. Each shows one mechanic, or two that interact, and plays in a couple of minutes. Play them at `/proto` (the playground on the laptop, http://localhost:3111/proto) and browse the cards at `/prototypes`; each has a card here, one Markdown file in its family's folder.

## The families

- **Economy and the AI as a system** (`economy/`): prices that move, growth loops, resources, escalation, the AI's demand.
- **Information and players** (`players/`): hidden information, private goals on a phone, voting and committees, negotiation, the turn only the phone knows.
- **The body, the room and hybrid play** (`hybrid/`): NFC taps, photos and cameras to game state, cards and markers, AR with a phone, the audience layer.

## A card

Frontmatter: `title`, `description`, `kind` (the family), `week: 11`, `date`, `status` (`prototype`), `author`, `route` (`/proto/<family>/<slug>`), `mechanics` (ids from [`../mechanics/mechanics.csv`](../mechanics/mechanics.csv)), `readings` (slugs from [`../bibliography/`](../bibliography/)), `ideas` (slugs from [`../game-ideas/`](../game-ideas/)), `sources`. Body: **How to play**, **What it shows**, **Could go in the game as**, **Remix it** (changes a student could ask Claude Code for, with the files to touch), and what it **needs** (devices, kit).

## Remixing one

Each prototype's page is one folder, `nextjs/app/proto/<family>/<slug>/`, with its tuning values at the top of the main file. Prototypes don't share an engine; copy one to start a new one. Prototypes that run on several devices keep their shared state through `nextjs/app/proto/_shared/room.js` (`useRoom`), which the laptop's dev server holds in `_raw/proto-rooms/` (not committed). Phones join at the laptop's network address, shown on the host screen.
