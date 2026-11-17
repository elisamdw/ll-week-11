---
title: "Game ideas"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
status: Claude's proposals, to think with; not decisions and not Marlon's words unless quoted
---

# Game ideas

Marlon, Nov 14: "we are building not just for william but for my class and just experiments for the week, so we'll think about some other stuff too. I'd like a zone of game idea cards to think about (like the card brainstorming we've done before). one bunch involving NFC, another involve interssection of table-top and phone, another AR/XR with phone."

Twenty-four cards in three bunches, one Markdown file each, in the same views as Marlon's own idea cards: browse at `/game-ideas`, print and cut at `/game-ideas/print`, arrange at `/game-ideas/board` and `/game-ideas/graph` (arrangements save in `_layouts/`). Each card has the idea, a **Try it this week** line sized for the LL's kit, and what it **draws on** (readings, mechanics, Marlon's voice-chat directions). They are GL's proposals; the cards that build on Marlon's own words quote them.

## Start here

- [Prices that move](prices-that-move.md)
- [Photo to game state](photo-to-game-state.md)
- [Index cards that answer](index-cards-that-answer.md)
- [The turn only the phone knows](the-turn-only-the-phone-knows.md)
- [See the data centers](see-the-data-centers.md)
- [Hold'em with lipstick cams](holdem-with-lipstick-cams.md)
- [The phone plays the AI](the-phone-plays-the-ai.md)
- [Every tap is a row](every-tap-is-a-row.md)

## The bunches

- **NFC (8):** a tap reveals, places, identifies, or logs. NFC reads at a few centimetres, so a read means someone meant it. The kit is on Marlon's task list for today (a USB reader and NTAG213 stickers); phones read NFC too.
- **Tabletop and phone (8):** the board stays physical and simple; the phone holds what a board can't: prices that move, private goals, the AI's turn, the state of the game over time.
- **AR/XR with a phone (8):** the phone as a lens on the board: things only the machine shows, for one player or for the audience.

## Can a phone browser do this? (from week 10's research)

Marlon asked in week 10 how much browser image tracking and phone AR can do now. RS researched it on November 9: `ll-week-10/_context/research/04-between-digital-and-physical.md`. The short version, from that page:

- **Yes, as a plain web page, on iPhone and Android, with no app.** MindAR (MIT, JavaScript, three.js and A-Frame builds) does image tracking and tracks several images at once; its target compiler runs in the browser. The 8th Wall engine went open source (MIT) in February 2026 when its hosted service closed.
- **Not through the standard yet.** WebXR image tracking is behind a flag in Android Chrome, iOS Safari has no WebXR, and WebXR wasn't in Interop 2026. So the routes that work everywhere use the camera directly rather than WebXR.
- **Markers beat pictures.** A QR code or ArUco marker is "the most robust option." Plain or line-art images track badly; give targets texture (the students' index cards would need a printed pattern).
- **Recognition is also possible without tracking:** MediaPipe's image embedder in the browser can tell which picture the camera sees.
- **Ground rules:** the camera needs HTTPS (or localhost), so phones can't use the laptop's dev server over plain `http://` on the network; it needs a tunnel or a deploy. iOS plays video without a tap only when it's muted.

What that means for the cards (GL's reading): the AR cards are buildable this week as web pages, best with printed markers or textured targets on the board, and the AR layer over a board game is closer to "the phone sees the board and draws on it" than to full room-scale XR.
