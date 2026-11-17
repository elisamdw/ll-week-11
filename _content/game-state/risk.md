---
title: "Risk as data"
description: "A map as a graph of 42 territories, armies as counts, continents as a lookup, and cards in hand as hidden state."
order: 2
kind: worked-example
year: "1959"
creators: ["Hasbro (Parker Brothers / Avalon Hill)"]
sources:
  - https://instructions.hasbro.com/en-us/instruction/risk-game
  - https://consumercare.hasbro.com/api/download/B7404_en-us
  - https://media.wizards.com/2015/downloads/ah/Risk_rules.pdf
  - https://www.buffalolib.org/sites/default/files/gaming-unplugged/inst/Risk%20Instructions.pdf
  - https://en.wikipedia.org/wiki/Risk_(game)
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026; facts from Hasbro's B7404 rulebook via a research subagent; the data model is HI's"
---

# Risk as data

[Game state index](README.md) · the closest board-game relative of *Data Center* and *Civilization*: a territorial map.

**Edition.** Facts are from Hasbro's current rulebook (item B7404, © 2015). The 2010 edition is different (star cards, a Cease Fire card, a territory-count win). Continent bonuses are printed only on the board; the figures below are from Wikipedia. **The data model is HI's.**

## Templates

- **The map:** 42 territories in 6 continents, connected by shared borders and by dashed sea lines (Alaska links to Kamchatka).
- **Continents and bonuses:** North America 9 territories (+5), South America 4 (+2), Europe 7 (+5), Africa 6 (+3), Asia 12 (+7), Australia 4 (+2).
- **Cards:** 56: 42 territory cards (each a territory and a picture: infantry, cavalry or artillery), 2 wild cards, 12 secret missions.
- **Pieces:** per army, 40 infantry (worth 1), 12 cavalry (5) and 8 artillery (10). The pieces are change for a number.
- **Rules as numbers:** starting armies 35 / 30 / 25 for 3 / 4 / 5 players; reinforcements are territories ÷ 3 (at least 3) plus continent bonuses plus card sets; set values rise 4, 6, 8, 10, 12, 15, then +5 each; the attacker rolls up to 3 dice, the defender up to 2, ties to the defender.

## Instances

Who holds each territory and how many armies are on it; each player's hand of cards (and secret mission); how many sets have been traded in the whole game (it sets the next set's value); whose turn it is and which phase (reinforce, attack, fortify); whether the player has captured a territory this turn (it earns a card); and the order of the card deck.

## What a photo shows

| A photo shows | A photo doesn't show |
| --- | --- |
| Which color holds each territory | Each player's cards and secret mission |
| The pieces on each territory (and so, after counting, the army size) | The deck's order |
| Cards traded in, if left face up | How many sets have been traded (unless someone keeps a tally) |
| | Whose turn, which phase, whether this turn earned a card |

Counting armies from a photo means knowing the template: a cannon is ten, a horse is five. The photo shows pieces; the state needs a number.

## The state, normalized

**Templates:**

```text
continents(id, name, bonus)                 -- 6 rows
territories(id, name, continent_id)         -- 42 rows
borders(territory_a, territory_b)           -- one row per connection: the map is a graph
cards(id, territory_id, picture)            -- 44 rows (+ 12 missions)
```

**Instances:**

```text
players(id, color, mission_id, eliminated)
occupation(territory_id, player_id, armies)  -- 42 rows, always full: every territory is held
hands(player_id, card_id)
game(turn_player, phase, sets_traded, captured_this_turn, deck_order)
```

As JSON (part of one game):

```json
{
  "turn": { "player": "red", "phase": "attack", "capturedThisTurn": true },
  "setsTraded": 3,
  "occupation": {
    "alaska":    { "player": "red",  "armies": 4 },
    "kamchatka": { "player": "blue", "armies": 7 },
    "peru":      { "player": "red",  "armies": 2 }
  },
  "hands": { "red": ["card-peru", "card-ural"], "blue": ["wild-1"] }
}
```

## What to notice

- **The map is a graph:** `borders` is the whole geography. *Data Center*'s nodes and links, and *Civilization*'s tiles, are the same structure.
- **Continent control is derived, not stored:** a player holds Australia if they hold all four of its territories. Storing it as well would let the two disagree; computing it from `occupation` keeps one truth.
- **Pieces are a view of a number.** Whether you use one cannon or ten soldiers, the state is "10".
