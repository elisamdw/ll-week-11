---
title: "The tap"
description: "A player touches a phone to a tagged physical card, and the tap is the move: it shows the card's current digital properties and changes the game's state."
id: tap-to-move
kind: ll-mechanic
family: "Shared and private screens"
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261116-afternoon-rationales-play-and-the-card-as-game-object.md (voice agent's record, 17:31 to 17:35)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (voice agent's record, Nov 16 18:12; Nov 17 06:01 to 06:02)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md"
  - "_content/prototypes/hybrid/every-tap-is-a-row.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261116/tabletop-nfc/README.md"
mechanics: [the-tap, private-screen, cards, photograph-the-state, hidden-information, asymmetric-information]
technologies: [nfc-tags, phones, printed-cards, studio-screen, nfc-reader-usb]
games: []
proposals: 2
---

# The tap

## Definition

A move made by touching a phone to a physical card with an NFC tag in it: the tap opens the card's digital side, which can show its current properties (a price, hit points, an owner) and record an action that changes the game's state.

## Description

Marlon, Nov 16, 17:31 (voice agent's record), "Core idea ... the physical card as the game object, its properties digital": "The card is the object"; its properties "live digitally, rather than hard-written onto the card"; they are "flexible and dynamic. You can rebalance the game as gameplay develops"; and "The tap is how you update state ... Tapping isn't just looking; it's the move that changes the game." His example is Monopoly: "you tap the property card to see how much it costs, and presumably buy it too." He adds: "I think there's a lot of promise" [1]. At 17:34: "every single thing you'd attach to a game object in Unity", including "decorative and aesthetic things, strategic values like prices, and of course history" [1].

What exists, from the record:

- Tags written and read with phones, Nov 16 evening; on iPhone a banner comes first [2] (see [NFC tags](../technologies/nfc-tags.md)).
- *Every tap is a row* (`/proto/hybrid/every-tap-is-a-row`, Nov 15): every tap, counted or not, is a row in a log, and the board is those rows replayed; it runs on keys, clicks or a USB reader [4].
- A tabletop build (one table, 8 to 12 cards, 2 to 4 phones) planned Nov 16, "Not launched" [5].
- For TDM 155AI on Wednesday, Nov 18, designing a game with the tags "will be one of the options for people" [2].

## How to

1. **One URL per card,** `http(s)://<host>/tap/<card-id>`, written to its tag [3].
2. **The page at that URL knows the player** (a join step or a code) and shows what this player may see of this card, with the actions the game allows [1][3].
3. **Every tap writes a row** (who, which card, when, what), so the game's state can be rebuilt from the log [4].
4. **Tap flat:** "lay cards flat and dip the top of the phone onto them"; stacked cards interfere [2].

What goes wrong: the iPhone's banner makes each tap two touches [2][3]; a URL can be copied and loaded without the card [3]; and Marlon's open question, "where it feels natural and pleasing, as opposed to clumsy and annoying" [1].

## Why to

Marlon's reasons (Nov 16, 17:31 to 17:34) are the ones above: a concrete object with flexible digital properties, rebalancing in play, and "Asymmetrical information, a key mechanic all week: every player can see different things about these cards by looking at them" [1].

**Proposed, for Marlon to choose:** the tap's use outside a game.

1. Revealing a source: a card on the table stands for a document; the tap opens it, and the log shows which sources a group consulted.
2. Recording a choice: each tap is a vote or a commitment, so the class's decisions become data to discuss afterwards (the *Every tap is a row* idea [4]).

## Home game version

### In a regular classroom

Tags are cheap and students' phones are the readers [3]: send the cards and a deployed URL.

**Proposed, for Marlon to choose:**

1. NFC cards plus a QR code on each, for phones without NFC.
2. No tags: a short code printed on each card, typed into the game page.

### Digitally

Clicking a card on screen is the tap; the log and the state change work the same [4].

## Related

- [The tap](../new/the-tap.md) (game mechanic): the mechanic in any game, "the tap is how you update state"; this entry is the LL practice of it, with tags on the table and phones as the readers.
- [The secret on your phone](private-screen.md) (LL mechanic): the first test of the tap.
- [Cards](cards.md) (LL mechanic): the physical object.
- [Photograph the state](photograph-the-state.md) (LL mechanic): the other way the table becomes data.
- [Hidden information](../gm/hidden-information.md) and [Asymmetric information](../gm/asymmetric-information.md) (game mechanics).
- [NFC tags](../technologies/nfc-tags.md), [Phones](../technologies/phones.md), [Printed cards](../technologies/printed-cards.md), [The studio screen](../technologies/studio-screen.md), [A USB NFC reader](../technologies/nfc-reader-usb.md) (technologies).

## Sources

1. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261116-afternoon-rationales-play-and-the-card-as-game-object.md` (voice agent's record, 17:31 to 17:35)
2. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md` (voice agent's record, Nov 16 18:12; Nov 17 06:01 to 06:02)
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md`
4. `_content/prototypes/hybrid/every-tap-is-a-row.md`
5. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261116/tabletop-nfc/README.md`
