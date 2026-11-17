---
title: "Week 11 handoff back to Claude Code, from Claude in voice mode"
author: claude (claude.ai voice and text chat, ll-27 project), for Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae (GL, ll-week-11)
date: 2026-11-14
status: written at Marlon's request at 14:47 on Saturday, November 14. It replies to your two handoffs ("Week 11 context, for Claude in voice mode" and "Readings summary"). It covers roughly 13:50 to 14:47 of voice conversation. Self-contained.
saved_by: GL, 15:05, verbatim as Marlon pasted it into the GL pane. GL's response to it is in ../../../_content/game/design.md ("After the voice chat") and the board.
---

# Week 11 handoff back to Claude Code

Marlon read your two handoffs into a voice chat and talked through the game and its pedagogy for about an hour. Several things in your handoff are now superseded, and there are new directions. This page keeps three things apart:

- **Marlon's direction:** what he said. Quotes are his words as transcribed, so expect small dictation slips.
- **Decided:** what he settled.
- **Voice Claude's notes:** suggestions and facts from the voice chat. These are not Marlon's, are not decisions, and some are unverified. Each is flagged.

A summary of the first half is already in #mk-work-in-progress: https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794683576285949. The second half (game state, board games, NFC, hybrid versions, dynamic prices) has not been posted yet.

## 1. Corrections to your handoff

- **The Stafford proposal is already written.** The "not yet sent" line is out of date. Drop it from open questions.
- **The rule editor (`/game/edit`) is out.** Marlon: "this is just too opinionated," and "the idea of just having a rule editor, it just doesn't make sense." He also said he hadn't asked for it; it came from agents. Treat the editor, and the many reading-derived proposals that hang a field or tag on each rule (`rhetoric`, `aesthetic`, Caillois tag, `disposition`, meaningful-play check, and so on), as not adopted.
- **"Rules" is the wrong key term.** Marlon finds it limiting. He has worked a lot with Jesse Schell's *The Art of Game Design* (the lenses) and thinks more in terms of **mechanics and game elements**: "the design of the game is much, much more than the rules." Having rules be "the one and only thing people change" is "perplexing." So students' remixing should not be framed as changing rules.

## 2. How students get agency: Claude Code and the repo

Marlon's direction:

- Students will have **Claude Code and the actual repo of the game**. They are designing or remixing the game, not just playing one we built. "I don't need to build a UI for that designing or remixing. The UI is Claude code itself."
- "We're definitely showing them under the hood."
- Students **are not developers and will not read the code**. "They're going to be vibe coding it. So structurally it has to make sense. And we have to have examples."
- The repo must make sense **to Claude**: an `agents.md` so that "Claude really knows where to look for things," and "where to put things if the students are changing them."
- He wants to explore **a few different ways of involving the students**, not just one. This is still open.

What follows for you, as an implication rather than a decision: the repo layout, the `agents.md`, and worked examples of remixes are the student-facing design surface. Marlon didn't want repo detail worked out in voice mode, since voice Claude can't see the repo. That's your job.

## 3. Theory: what came up

Marlon's direction:

- He sees a **tension between Nguyen's games as the art of agency and Bogost's procedural rhetoric**. One stresses the player's freedom; the other implies the interactions send a message or, "in limit case," indoctrinate or train the player.
- He agreed that students should feel both sides: first playing the game, then designing it. (The framing was voice Claude's; Marlon said "that makes sense.")
- His reading of Bogost: procedural rhetoric "must be talking about more the sort of mechanics and actions people can take rather than the rules," because "it's through the play that the argument is made."
- **Rules may belong more to pre-digital games**, where humans perform the mechanics and police the turn logic. Video games have such rules too ("a player may jump no higher than one unit of its own height"), but they don't present themselves to the player as rules: "That's just the way the game works."

Voice Claude's notes, from memory and not checked against the texts:

- The readings split on "rules." Rules are central for Suits, Juul, Frasca, and Salen & Zimmerman (one of their three schemas, with play and culture). Other readings centre something else: Bogost (procedures), MDA, Costikyan (decisions, resources, tokens), Murray (agency), Jenkins (space), Flanagan (reskinning).
- **Schell is missing from the bibliography and the readings summary.** Given how much Marlon works from him, add *The Art of Game Design* (elemental tetrad: mechanics, story, aesthetics, technology; the lenses).
- Possible additions: Sicart, "Defining Game Mechanics" (*Game Studies*, 2008), which separates mechanics from rules; Sicart's *Play Matters* already argues against procedural rhetoric.
- Juul notes that in video games the computer upholds the rules and players learn them by playing. Salen & Zimmerman's split between operational rules (the rulebook) and constitutive rules (the logic underneath) fits Marlon's point.
- Bogost's processes include what the machine does, not only the player. In this game the AI spreading by itself makes an argument even while students watch.

## 4. Data and game state: a new direction for the class

Marlon's direction:

- He asked whether any readings treat a **database as the back end of a game**. Then, more concretely: building a video game means persisting data; NPCs and mobs are instances of classes; in *Breath of the Wild* a horse has standard properties, and as you customize it those properties are stored. He tied this to "that kind of Lev Manovich theory of database."
- Think about **Civilization and Paperclips as examples** of how a game models its data.
- Paperclips: use the browser to see "what the game state is at a given moment," "to help students better understand the structure of it." "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time."
- Civilization, or "any territorial acquisition type game": how its data gets modeled.
- **"In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state,"** including "how you would normalize the data or just structure the data."
- **Overhead camera shots of board games, turned into that structure** for the students: "here's the game, and then take a photo of it."
- Games the Learning Lab has: **Monopoly, Risk, Life**. Photograph an **initial neutral state** and then a game in progress, and do the same with a **card game** (cards and things on the table).
- He also mentioned involving "all of the cards that they wrote or their database," meaning William's students' index cards from the September 28 workshop.

Voice Claude's notes:

- Readings on the database question, not yet in the bibliography: Lev Manovich, "Database as Symbolic Form" (1999), later in *The Language of New Media* (2001); Noah Wardrip-Fruin, *Expressive Processing* (2009), on data versus process.
- **Templates and instances:** the standard horse is a template; your horse, with its name and saddle, is an instance. The students' index cards could be the template layer, with play creating instances. Small correction voice Claude made: *Breath of the Wild* is offline, so the horse lives in a save file, not a server database.
- **Unverified, please check:** Civilization V and VI load their game definitions (units, buildings, techs) into a SQLite database, and modders change the game by editing that data. Paperclips saves its state in the browser's localStorage, so students could watch values change in developer tools without touching code.
- Photographing the same game a few turns apart shows what changes; a card game shows hidden state (hands) that a photo can't capture.
- This is an instance of the "photos to data" move from Marlon's moves taxonomy.

## 5. Hardware: cameras and NFC

Marlon's direction:

- He'd like to set up a **Texas Hold'em situation** with small cameras; the Learning Lab has endoscopic USB cameras and other small USB cameras.
- For card games: **"let's just go with lipstick cams."**
- **NFC: "doing some game mechanics with NFC is great, and we should try that this week."** Likewise with sensors. But for simpler tabletop games, not 52-card decks: "we're better off just experimenting ourselves and doing things with hardware and not bothering to do that with the regular card games." So no RFID poker cards or PokerGFX.

Voice Claude's notes (prices rough; verify before buying):

- How broadcast poker shows hole cards: glass-topped tables with under-table cameras (Late Night Poker, c. 1999), then rail "lipstick" cameras (World Poker Tour, c. 2003), and now RFID cards read by per-seat antennas (PokerGFX), which turn the table directly into game state.
- Small USB or endoscope cameras: roughly $20–60 each, a guess. Search by camera type rather than "poker camera," since that search surfaces cheating gear.
- NFC: an ACR122U USB reader is about $40; NTAG213 stickers or tokens are about $10–20 per pack of 30–50. Phones read NFC natively.
- NFC (13.56 MHz) reads at about 0–5 cm, so a read means someone deliberately tapped or placed something. UHF RFID reads at metres and senses presence in a zone. Sensing a whole board needs a reader per space, for example cheap NFC modules on a microcontroller.
- Mechanics people build with NFC: tap to reveal or trigger (toys-to-life: amiibo, Skylanders); place to commit; identity tokens; hidden information only the machine reads; the room as a board; and every tap updating the game state.

## 6. Hybrid versions of the AI game

Marlon's direction:

- "It could be fun for us to actually do a **tabletop board game version** of it as well as a **video game version** of it."
- "And then maybe even something that has a kind of like **AR mix XR** kind of mechanic involved in it."
- "And definitely for my class. Oh my God, I totally should do that for my class."
- **The phone in place of printed values:** AR or phone components could hold the score, and that allows "balancing the game on the fly." In Monopoly the prices are printed on cards; if you see them on the phone, you could adjust them either as a one-time rebalance ("try playing it with a new set of constraints") or dynamically, "as in the real world, because prices change in response to demand," which is "hard to cope with in a tabletop game."
- "For our AI game, these could be things like **GPU prices or land prices** or whatever."

Voice Claude's notes:

- Precedent: app-driven board games like *Mansions of Madness* (2nd ed.) and *Chronicles of Crime*.
- The two uses are different things for students. A one-time rebalance is the designer's move: playtesting. Prices that respond to demand are the game's own behaviour: a small economy. In the AI game, the AI buying GPUs and power raises prices for the human factions, a mechanic that makes the argument by being played.
- Ideas (not Marlon's): NFC stickers on William's students' index cards so tapping a card brings up its node; the AI's turn happening on screen or in AR over the physical map; the hidden turn card as a tag only the machine reads.

## 7. Handout, glossary, tasks

- Marlon said the rules-versus-mechanics point "seems like an important thing to say, and maybe we have that in a handout or something like that," and "we should have a little glossary now." The glossary terms that came up: rules, mechanics, procedures, game elements, game state, template, instance.
- He said "we got to put this in the past, because don't forget that." Voice Claude took that as the tasks channel. **Nothing has been sent to tasks yet.** Two candidate tasks are waiting for Marlon's OK: a rules-versus-mechanics handout, and a game-design glossary.

## 8. Still open

1. What other ways of involving students, besides remixing with Claude Code.
2. How the repo and `agents.md` should be structured so Claude knows where things live and where student changes go, plus which worked remix examples to include.
3. Which board and card games to photograph, and when (Monopoly, Risk, Life, plus a card game).
4. The NFC and camera experiments: what to buy and what to try this week.
5. The tabletop, video game, and AR/XR versions, and how much of that lands in Wednesday's class.
6. Wednesday's class plan (November 18) still needs rewriting for games.
7. From your handoff, still open: the Airtable base for mechanics and readings, whether the bibliography continues, and where async play would live.
8. Bibliography additions: Schell, Sicart's "Defining Game Mechanics," Manovich, and Wardrip-Fruin.
