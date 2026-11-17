---
title: "Games as data: game state, templates, and instances"
description: "From a photo of a table to a game state: Monopoly, Risk, The Game of Life, Texas Hold'em, Paperclips, Civilization, and our Data Center, each modeled as data."
order: 26
kind: index
status: draft
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026"
---

# Games as data: game state, templates, and instances

## Marlon's words (voice chat, November 14, as transcribed)

Building a video game means persisting data; NPCs and mobs are instances of classes; in *Breath of the Wild* a horse has standard properties, and as you customize it those properties are stored ("that kind of Lev Manovich theory of database"). Look at *Civilization* and *Paperclips* as examples of how a game models its data: "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time." "In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state," including "how you would normalize the data or just structure the data," from overhead photos of Monopoly, Risk, Life, and a card game, first in a neutral starting position and then in progress.

## The idea in four words

**Template, instance, state, view.**

- A **template** is what every copy of the game shares: the board, the printed cards, the price on a deed, the standard horse. In a board game it's printed; in a video game it's in the code or a data file.
- An **instance** is one particular thing in one particular game: *your* horse, with its name and saddle; *this* copy of Park Place, owned by the player in blue, with two houses.
- The **game state** is every instance at one moment: who owns what, who has how much, where everything is, whose turn it is, what's in the deck and in what order. Save the state and you can stop and come back; lose it and the game is gone.
- A **view** is what someone can see of the state. The table shows the board; your hand shows your cards; nobody sees the order of the deck. A photo is a view, never the whole state.

A save file, a database, or a JSON object is the state written down. Normalizing it means writing each fact once: the deed's printed rent belongs to the template, so the instance stores only "owned by blue, two houses" and points to the template by its id.

## The worked examples

Each page gives the templates, the instances, what a photo of the table can and can't show, and the state as a small table or JSON. **The models are HI's, not the publishers'.**

| Game | What it teaches |
| --- | --- |
| [Monopoly](monopoly.md) | Templates printed on deeds; ownership and buildings as instances; money as a number per player; the two decks' order as hidden state |
| [Risk](risk.md) | A map as a graph of territories; armies as counts per territory; cards in hand as hidden state; normalizing continents |
| [The Game of Life](game-of-life.md) | A path with branches; a player's career, salary, house and family as linked records; editions differ, so the template changes |
| [Texas Hold'em](texas-holdem.md) | The hardest photo: hole cards and deck order are hidden; the betting history is state too; the "lipstick cam" and RFID tables |
| [*Universal Paperclips*](paperclips.md) | A real game's save, read in the browser: about 230 values in one flat snapshot, plus lists for its 97 projects and its strategies |
| [*Civilization*](civilization.md) | Game definitions as a database that modders edit; the save as the instance |
| [*Data Center*](data-center.md) | Our own game: the ruleset file as template, the saved game as instance, side by side |

## For the class on November 18

*A proposal (HI), not a plan. Marlon decides.*

1. **Photograph a neutral board, then a game in progress** (Monopoly, Risk, Life, and a card game, from overhead). Put the two photos side by side: what changed is the state; what didn't is the template.
2. **Write the state from the photo,** in a table or JSON, with Claude's help. The photo turns into data by deciding what the things on the table *are* (a token is a player's position; a stack of bills is a number).
3. **List what the photo can't show:** cards in hand, the order of the decks, whose turn it is, debts and deals made out loud. That list is the hidden information, and the reason poker broadcasts use under-table cameras or RFID cards.
4. **Normalize it:** move everything printed on the board into a template table and keep only what changes in the state. Then compare with a real save: open *Paperclips*, play two minutes, and read `saveGame` in the browser's developer tools.
5. **Connect it to our game:** open `data-center.json` (the template) beside a saved game (the instance). A remix, done with Claude Code, changes the template; play changes the instance.

For Stafford's students, the index cards from September 28 could be the template layer: each card a node or an element, and play producing instances on top of it.

## Readings

- **Lev Manovich, "Database as Symbolic Form"** (1999; revised in *The Language of New Media*, 2001) argues that database and narrative are rival forms; a game hides its database behind an algorithm the player learns by playing. TH's entry: [`manovich-1999-database-as-symbolic-form`](../bibliography/manovich-1999-database-as-symbolic-form.md).
- **Noah Wardrip-Fruin, *Expressive Processing*** (2009) separates a game's data from its processes and shows how the processes carry meaning. TH's entry: [`wardrip-fruin-2009-expressive-processing`](../bibliography/wardrip-fruin-2009-expressive-processing.md).
- **Miguel Sicart, "Defining Game Mechanics"** (2008): mechanics as methods the player invokes to act on the game state. TH's entry: [`sicart-2008-defining-game-mechanics`](../bibliography/sicart-2008-defining-game-mechanics.md).
- The [mechanics inventory](../mechanics/README.md) is itself a template table; the [history](../history/README.md) has the games these examples come from.

(The summaries of the three readings are HI's one-line glosses; TH's bibliography entries are the fuller account.)
