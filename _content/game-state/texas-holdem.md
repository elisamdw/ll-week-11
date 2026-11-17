---
title: "Texas Hold'em as data"
description: "The hardest photo: hole cards and deck order are hidden, the betting history is state too, and poker broadcasts have spent 25 years trying to see it."
order: 4
kind: worked-example
year: "traditional (origin not checked)"
creators: []
sources:
  - https://bicyclecards.com/how-to-play/texas-holdem-poker
  - https://www.pagat.com/docs/RobsPkrRulesHome.pdf
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026; rules from Bicycle Cards and Robert's Rules of Poker via a research subagent; the data model is HI's"
---

# Texas Hold'em as data

[Game state index](README.md) · poker AI in the history: [Libratus and Pluribus](../history/1-proving-ground.md)

Marlon (voice chat, November 14): set up "a Texas Hold'em situation" with small cameras; "let's just go with lipstick cams." **The data model is HI's.**

## Templates

- **The deck:** 52 cards, four suits of 13. Suits are equal in ranking.
- **The structure of a hand:** a dealer button that moves clockwise each hand; a small blind left of the button and a big blind left of that (usually twice the small blind); two hole cards face down to each player; four betting rounds: pre-flop, the flop (three community cards together), the turn (a fourth), the river (a fifth), with a card burned before each.
- **Winning:** the best five-card hand from your two hole cards and the five on the board (you may use both, one, or neither). Ties split the pot. Table stakes: you can bet only the chips in front of you, and an all-in player can win only a side pot's worth from players who bet more.
- **Hand rankings:** the standard poker ranking from high card to royal flush (a template every player carries in their head).

## Instances

The button's seat; each player's chip stack; each player's two hole cards; the board cards dealt so far; the burned cards; the rest of the deck, in order; the pot and any side pots; the current bet and who has acted, folded or gone all-in this round; and the betting history of the hand.

## What a photo shows

This is the example where the photo fails most, which is the point.

| An overhead photo shows | It doesn't show |
| --- | --- |
| The board cards (flop, turn, river) | Anyone's hole cards |
| Chip stacks (roughly; stacks are hard to count from above) | The deck's order, and the burned cards |
| The button | Who has folded, if cards were mucked face down |
| Chips in the pot | How the pot is split into side pots |
| | The betting history: who raised, who called, in what order |

**How television solved it** (from the voice chat's notes, not checked here): glass-topped tables with cameras underneath (*Late Night Poker*, about 1999); small "lipstick" cameras in the table rail aimed at each player's hole cards (*World Poker Tour*, about 2003); and now RFID chips in the cards, read by an antenna at each seat, which turn the table straight into game state. Marlon chose lipstick cams for the LL and ruled out RFID decks for card games.

## The state, normalized

```text
-- templates
cards(id, rank, suit)                          -- 52 rows
-- instances
seats(seat, player_id, stack, status)          -- status: active | folded | all_in | out
hole_cards(seat, card_id)                      -- 2 per seat; hidden from everyone else
board(position, card_id)                       -- flop 1-3, turn 4, river 5
deck(position, card_id)                        -- what's left, in order; hidden from everyone
actions(hand_no, order, seat, action, amount)  -- the betting history: post, fold, check, call, bet, raise
pots(id, amount, eligible_seats)               -- main pot and side pots
hand(hand_no, button_seat, round, to_act_seat, current_bet)
```

As JSON, on the turn:

```json
{
  "hand": 14, "button": 3, "round": "turn", "toAct": 5, "currentBet": 40,
  "board": ["Kh", "9c", "9d", "2s"],
  "seats": [
    { "seat": 1, "stack": 820, "status": "folded" },
    { "seat": 3, "stack": 0,   "status": "all_in", "hole": ["Ks", "Qs"] },
    { "seat": 5, "stack": 610, "status": "active", "hole": ["9h", "Ah"] }
  ],
  "pots": [{ "amount": 360, "eligible": [3, 5] }, { "amount": 80, "eligible": [5] }],
  "actions": [{ "round": "flop", "seat": 3, "action": "bet", "amount": 120 }]
}
```

## What to notice

- **The state includes things no one at the table can see.** The deck's order is real state, and nobody knows it, not even the dealer. A game system has to keep it; a player can only guess at it.
- **Each player has a different view of the same state:** their own hole cards plus everything public. That is what "imperfect information" means, and why poker became an AI milestone after chess (Libratus, 2017; Pluribus, 2019).
- **History is state.** In Monopoly you can mostly ignore how you got here. In poker, the betting so far is the main evidence about the hidden cards, so the `actions` table matters as much as the cards.
- **A good warm-up for the AI game:** the turn card in *Data Center* is hidden in the deck the same way.
