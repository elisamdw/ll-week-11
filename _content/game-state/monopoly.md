---
title: "Monopoly as data"
description: "Title deeds as templates, ownership and houses as instances, money as a number per player, and two shuffled decks as hidden state."
order: 1
kind: worked-example
year: "1935"
creators: ["Hasbro (Parker Brothers)"]
sources:
  - https://instructions.hasbro.com/en-ca/instruction/monopoly-game
  - https://instructions.hasbro.com/api/download/C1009_en-ca_monopoly-game.pdf
  - https://instructions.hasbro.com/en-us/instruction/monopoly-board-game-for-ages-8-for-2-6-players-includes-8-tokens-tokens-may-vary
  - https://www.hasbro.com/common/instruct/00009.pdf
  - https://en.wikipedia.org/wiki/Monopoly_(game)
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026; facts from Hasbro's C1009 rulebook via a research subagent; the data model is HI's"
---

# Monopoly as data

[Game state index](README.md)

**Edition.** Facts are from Hasbro's current standard rulebook (item C1009, US names and dollars from the Canadian printing, because Hasbro's US download serves the UK edition). Check the LL's box: older editions differ in starting money and taxes, and a January 2025 edition renamed Oriental Avenue to Rhode Island Avenue. **The data model below is HI's, not Hasbro's.**

## Templates (printed, the same in every copy)

- **The board:** 40 spaces in a loop: 28 properties, 3 Chance, 3 Community Chest, Income Tax ($200), Luxury Tax ($100), and four corners (GO, Jail / Just Visiting, Free Parking, Go To Jail).
- **Properties:** 28 title deeds: 22 streets in 8 color groups (two groups of 2, six of 3), 4 railroads ($200 each; rent $25 / $50 / $100 / $200 for owning 1–4), and 2 utilities ($150 each; rent 4× the dice with one, 10× with both).
- **A deed** prints: rent; rent with the color set (double); rent with 1, 2, 3, 4 houses and a hotel; the house and hotel cost; and, on the back, the mortgage value. Illinois Avenue: rent 20, set 40, then 100 / 300 / 750 / 925, hotel 1,100; houses $150.
- **Cards:** 16 Chance and 16 Community Chest.
- **Bank stock:** 32 houses and 12 hotels (a limit that matters: when they run out, nobody can build).
- **Starting money:** $1,500 per player (current rulebook illustration: 2×$500, 4×$100, 1×$50, 1×$20, 2×$10, 1×$5, 5×$1). GO pays $200.

## Instances (what one game in progress has)

Each token's position; each player's cash; who owns each property, how many houses or a hotel it has, and whether it's mortgaged; who holds a Get Out of Jail Free card; who's in Jail and for how many turns; the order of the two decks; whose turn it is; and how many doubles they've rolled this turn.

## What a photo of the table shows

| A photo shows | A photo doesn't show |
| --- | --- |
| Where each token is | The order of the Chance and Community Chest decks |
| Houses and hotels on each street | Who owns a property, unless deeds are laid out in front of players |
| Deeds in front of each player, if they're spread out | Mortgaged deeds, unless turned face down |
| Stacks of money (roughly; counting bills from overhead is hard) | Exact cash, and money held in hand |
| | Whose turn it is, doubles rolled, turns left in Jail |
| | Rent owed but not yet asked for (rent is due only if the owner asks before the next roll) |
| | Deals made out loud |

## The state, normalized

**Template tables** (written once, never change in play):

```text
spaces(id, position, name, kind)                       -- 40 rows: property | chance | chest | tax | corner
properties(id, space_id, group, price, house_cost,      -- 28 rows
           rent, rent_set, rent_1, rent_2, rent_3, rent_4, rent_hotel, mortgage)
cards(id, deck, text, effect)                          -- 32 rows: chance | chest
```

**Instance tables** (one game; these change every turn):

```text
players(id, token, cash, position, in_jail, jail_turns, doubles_this_turn)
holdings(property_id, owner_id, houses, hotel, mortgaged)   -- only owned properties appear
decks(deck, order)                                           -- the hidden order of each deck
game(turn_player, bank_houses_left, bank_hotels_left)
```

The same state as one JSON snapshot, a few turns in:

```json
{
  "turn": "car",
  "bank": { "housesLeft": 30, "hotelsLeft": 12 },
  "players": [
    { "id": "car", "cash": 1240, "position": 24, "inJail": false, "jailCards": 0 },
    { "id": "dog", "cash": 1560, "position": 10, "inJail": true, "jailTurns": 1 }
  ],
  "holdings": [
    { "property": "illinois-ave", "owner": "car", "houses": 2, "mortgaged": false },
    { "property": "reading-railroad", "owner": "dog", "houses": 0, "mortgaged": true }
  ],
  "decks": { "chance": ["c07", "c12", "..."], "chest": ["k03", "..."] }
}
```

Illinois Avenue's rent with two houses ($300) isn't in the state: it's looked up from the template. That's the normalization.

## What to notice

- **The bank's 32 houses are state, not just a template:** the shortage is a rule (you can't build when they're gone), so it has to be counted.
- **Money is the easiest thing to store and the hardest to photograph.** A camera sees paper; the game needs a number.
- **The phone could hold the deed.** Marlon's hybrid idea: if prices and rents lived in an app instead of on printed cards, they could be rebalanced before a game or move with demand during one.
