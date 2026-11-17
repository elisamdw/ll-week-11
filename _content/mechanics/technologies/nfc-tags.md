---
title: "NFC tags"
description: "Cheap passive chips in a card or sticker that a phone reads by touch; written with a URL, a tag opens a page on the phone that touches it."
id: nfc-tags
kind: technology
category: "Tags and readers"
tested: "Yes"
the_ll_has: "NTAG215 cards, arrived by Nov 16, 2026, and written that evening (voice agent's record, Nov 16, 18:12; Nov 17, 05:14). How many is not in the record. No USB reader yet (a task filed Nov 17)."
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (voice agent's record, Nov 16 18:12; Nov 17 05:14, 05:15, 06:01 to 06:02)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261116-afternoon-rationales-play-and-the-card-as-game-object.md (voice agent's record, 17:31 to 17:35)"
  - "_content/prototypes/hybrid/every-tap-is-a-row.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261116/tabletop-nfc/README.md"
mechanics: [the-tap, tap-to-move, private-screen, cards, hidden-information, asymmetric-information]
technologies: [phones, nfc-reader-usb, printed-cards, studio-screen]
games: []
proposals: 2
---

# NFC tags

## Definition

Near-field communication tags are small passive chips with an antenna, sold as stickers or cards, that a phone powers and reads when it touches them. Written with a web address (an NDEF URI record), a tag makes any modern phone that touches it offer to open that page [1].

## Description

What the tags are, from the week's research (sources opened by a research subagent, Nov 16) [1]:

- **Phones read them without an app.** "iPhone XS and later support background tag reading": the iPhone shows a notification, and tapping it opens an http or https link in Safari. Android phones with NFC on send a URL tag to the browser; Android 16 opens it directly, and Android 17 first shows an "open link" notification.
- **The chips.** NXP's NTAG213, 215 and 216 hold 144, 504 or 888 bytes for data. They can mirror the chip's unique ID and a read counter into the URL, which makes each tap's address different, but that is "plain ASCII, not signed": anyone who reads one URL can forge others. NTAG 424 DNA adds AES-signed messages for taps that must be proven.
- **Web NFC** (reading tags inside a web page) works only in Chrome on Android, over HTTPS.

What the LL has done with them, from the record:

- **Nov 16, evening.** The voice agent's record: "the NTAG215 cards work (nfc.cool writes them; NFC Tools didn't). A plain URL on a tag always shows iOS's 'open in Safari' banner first" [2]. Also from that night: "iPhone reads at the top edge of the back (lay cards flat and dip the top of the phone onto them); stacked cards interfere" [2].
- **Nov 17, 05:14.** "MK did get the NFC cards. Assigning them with a phone is a little quirky, but not impossible; definitely doable" [2].
- **The first proof of concept, proposed Nov 17, 06:01:** "a card for each position around the table, people tapping their phones there and then seeing whatever the secret information is on their phone" [2]. For TDM 155AI on Wednesday, designing a game with the tags "will be one of the options for people" (06:02) [2].
- **The idea behind it, Nov 16, 17:31 to 17:34:** the physical card is the game object, "its properties live digitally", and "the tap is how you update state" [3].
- **A prototype that can use a reader:** *Every tap is a row* (`/proto/hybrid/every-tap-is-a-row`, Nov 15) logs every tap; with a USB reader, a sticker can be taught to stand for a badge or a part [4]. It runs on keys and clicks without one.
- **The tabletop build, planned Nov 16:** "one table, 8 to 12 cards, 2 to 4 phones on the same Wi-Fi; join, tap a card ... see it as that player sees it, act, watch the table screen change". The plan was written but "Not launched: it waits on Marlon's go" [5].

## How to

From the record:

1. **Write the tags with a phone app.** On Nov 16 nfc.cool wrote the NTAG215 cards and NFC Tools did not [2]. Write one URL per tag, of the form `http(s)://<host>/tap/<tag-id>` [1].
2. **Point the URL somewhere every phone can reach.** A deployed site, or the laptop on the same Wi-Fi: `next dev` listens on all interfaces, so phones reach `http://<laptop-LAN-IP>:3111/...`, and the LAN host must be added to Next's `allowedDevOrigins` in development [1]. Write an IP, not a `.local` name, on a tag [1].
3. **Tap.** Lay cards flat and "dip the top of the phone onto them" [2]. The phone must be unlocked and in use [1].
4. **Lock last, if at all.** Locking a tag is permanent; "lock only after the URL (and host) is final, which a laptop LAN IP is not" [1].

What goes wrong, from the record:

- **The iPhone banner.** Every tag tap on an iPhone shows a notification first, so a tap is two touches [1][2]. The 18:12 post lists three ways past it: Shortcuts automations (each tag registered by hand on every phone), App Clips or Universal Links (still a confirmation card), or a native app with a persistent Core NFC session, possibly "a thin shell" around the web app [2].
- **Stacked cards interfere** [2].
- **A typo is a security hole.** "a 'vercell.app' typo on a tag led to a typosquatted scareware page ('your iPhone has been hacked')" [2].
- **A URL is not proof of a tap:** anyone can copy and load it [1].

## Why to

From Marlon's direction (voice agent's record):

- **Asymmetrical information at the table.** "the dealing of a hand, or something that's metaphorically a hand — the starting coordinates of some kind of game, your identity in a playful guessing game, your teammates — a revealing of asymmetrical information" (Nov 17, 06:01) [2]. He notes "Clearly this could just be done with phones" with codes, Jackbox-style; the card at each seat is the proof of concept [2].
- **A physical object with a digital side.** The card as game object whose properties (prices, hit points, history) change in play, and the tap as the move (Nov 16) [3]. He also asked where tapping "feels natural and pleasing, as opposed to clumsy and annoying" [3].

**Proposed, for Marlon to choose:** beyond games, what a tap is for in teaching or presenting.

1. Check-in and grouping: a tag at each table or station; the tap records who is where and deals a role or a prompt.
2. Handouts that open: a tag on a printed card or poster opens its fuller digital text, the "abbreviated print, fuller digital" pattern of this week's cards without QR codes.
3. A presenter's deck in objects: each tag on the table cues the next slide or clip on the studio screen.

## Home game version

### In a regular classroom

Tags are cheap and need no reader beyond students' phones [1], so the physical version travels as it is: a stack of written cards and a URL that is deployed rather than on the LL's laptop.

**Proposed, for Marlon to choose:**

1. Deployed site plus printed tagged cards, sent to the instructor in an envelope.
2. QR codes printed on the same cards as the no-NFC fallback, for phones without NFC or with it off.

### Digitally

Without tags, each player opens a link or enters a code on their phone, the Jackbox-style pattern Marlon names [2]; the "secret on your phone" works the same without the tap.

## Related

- [The tap](../new/the-tap.md) (game mechanic) and [the LL's practice of it](../ll/tap-to-move.md) (LL mechanic): the move NFC makes possible.
- [The secret on your phone](../ll/private-screen.md) (LL mechanic): the first proof of concept.
- [Cards](../ll/cards.md) (LL mechanic): what the tags are inside.
- [Hidden information](../gm/hidden-information.md) (game mechanic) and [Asymmetric information](../gm/asymmetric-information.md) (game mechanic): what a private tap reveals.
- [Phones](phones.md) (technology): the reader.
- [A USB NFC reader](nfc-reader-usb.md) (technology): writing tags from a laptop.
- [Printed cards](printed-cards.md) (technology) and [The studio screen](studio-screen.md) (technology): the card the tag sits in, and the shared readout.

## Sources

1. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md`
2. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md` (voice agent's record, Nov 16 18:12; Nov 17 05:14, 05:15, 06:01 to 06:02)
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261116-afternoon-rationales-play-and-the-card-as-game-object.md` (voice agent's record, 17:31 to 17:35)
4. `_content/prototypes/hybrid/every-tap-is-a-row.md`
5. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261116/tabletop-nfc/README.md`
