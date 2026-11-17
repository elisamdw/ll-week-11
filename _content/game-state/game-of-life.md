---
title: "The Game of Life as data"
description: "A path with branches, a player as linked records (career, salary, house, pegs, loans), and an edition history that changes the template."
order: 3
kind: worked-example
year: "1960"
creators: ["Hasbro (Milton Bradley)"]
sources:
  - https://instructions.hasbro.com/en-us/instruction/the-game-of-life-family-board-game
  - https://instructions.hasbro.com/api/download/F0800_en-us_the-game-of-life-family-board-game.pdf
  - https://instructions.hasbro.com/en-us/instruction/the-game-of-life-game
  - https://instructions.hasbro.com/api/download/E4304_en-us_the-game-of-life-game.pdf
  - https://en.wikipedia.org/wiki/The_Game_of_Life
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026; facts from Hasbro's F0800 and E4304 rulebooks via a research subagent; the data model is HI's"
---

# The Game of Life as data

[Game state index](README.md)

**Edition matters more here than in any other example.** Hasbro's current edition (F0800, 2021) starts each player with 250K and has Invest cards; the 2017 edition (E4304) started with 200K and had pets; 1991 added LIFE tiles; the 1960 original ended with a bet that could send you to the "Poor Farm". Check the LL's box first. Facts below are from F0800 unless noted. **The data model is HI's.**

## Templates

- **The board:** one track with branches. At the start, College (pay 100K; better careers) or Career. Later STOP spaces force a choice or a spin: graduate (spin 3 or more), get married (pay 50K, add a peg), grow your family, a midlife spinout (red or black picks the path), retire early. Space types: Payday, Action, Add-a-Peg, Career, House, Invest.
- **The spinner:** 1 to 10, with red and black for some choices.
- **Cards (F0800):** 90: 55 Action, 20 Career, 11 House, 4 Invest.
- **Money and loans:** 250K to start (1×100K, 2×50K, 5×10K). A loan certificate for each 50K borrowed, repaid at 60K.
- **Scoring:** retirement bonuses (200K / 100K / 50K / 10K by order of retiring); sell houses; +50K per peg in your car beyond your own; −60K per unpaid loan. Most money wins. (In E4304, Action and Pet cards were each worth 100K at the end; in F0800 Action cards are worth nothing.)

## Instances

Each car's position and the branch it took; each player's cash, career card, house cards, pegs (spouse, children, friends, pets), loans, and Invest number; who has retired, in what order; and the order of each deck.

## What a photo shows

| A photo shows | A photo doesn't show |
| --- | --- |
| Where each car is | Which branch a car took earlier (only where it is now) |
| The pegs in each car | Cash, unless spread out; loans, unless laid out |
| Career and house cards, if laid face up | The decks' order; Invest numbers, if kept in hand |
| Who has retired (cars at the end) | The order players retired in (it changes the bonus) |

## The state, normalized

```text
-- templates
spaces(id, kind, next_id, branch_choice)      -- a linked list with forks: each space points to the next
careers(id, title, salary, needs_degree)
houses(id, name, price, sale_price_red, sale_price_black)
action_cards(id, text, effect)

-- instances
players(id, color, space_id, cash, career_id, degree, retired_order, invest_number)
pegs(player_id, kind)                         -- spouse | child | friend | pet
house_holdings(player_id, house_id)
loans(player_id, count)
decks(deck, order)
```

As JSON:

```json
{
  "players": [
    { "id": "blue", "space": "s47", "cash": 310000, "career": "doctor", "degree": true,
      "pegs": ["self", "spouse", "child"], "houses": ["cozy-condo"], "loans": 1, "retired": null }
  ],
  "turn": "blue"
}
```

## What to notice

- **The board is a linked list with forks.** Each space points to the next; a STOP space points to two. That's a different data structure from Monopoly's loop or Risk's graph.
- **A player is a record linked to other records:** a career, houses, pegs, loans. It's the closest of these games to Marlon's *Breath of the Wild* horse: a standard kind of thing, made yours by what you attach to it.
- **The game's values are in its template.** What a life is worth (a degree, a marriage, a child, a house) is set by the numbers each edition prints, and Hasbro keeps changing them. Comparing two editions' templates is a quick way to read a game's argument.
