---
title: "A USB NFC reader"
description: "A desktop NFC reader and writer on a laptop's USB port, for writing a stack of tags from the command line or reading taps into a game on the laptop."
id: nfc-reader-usb
kind: technology
category: "Tags and readers"
tested: "No"
the_ll_has: "None yet. Task filed Nov 17, 2026, 05:15: 'set up a USB NFC reader (e.g. ACR122U) with free command-line tools (libnfc or nfcpy)'."
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (task, 05:15)"
  - "_content/prototypes/hybrid/every-tap-is-a-row.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md"
mechanics: [tap-to-move]
technologies: [nfc-tags, phones]
games: []
proposals: 0
---

# A USB NFC reader

## Definition

A small NFC reader and writer that plugs into a computer, so tags can be written in batches and read by software on the computer rather than by phones.

## Description

Not owned or tested yet. The task, Nov 17, 05:15: "set up a USB NFC reader (e.g. ACR122U) with free command-line tools (libnfc or nfcpy) for reading and writing the NFC cards" [1]. The *Every tap is a row* prototype already has a path for one: "click **teach** on a chip, tap a sticker on the reader, and that sticker is now that badge or part" [2]. Phones remain the readers for players; the week's research notes that phone apps can write tags in sequence too, and NXP's TagWriter lists "Write multiple Datasets in CSV format on multiple tags in sequence" [3].

## How to

Not written yet: waits on the reader.

## Why to

From the task: "reading and writing the NFC cards" from a laptop [1]; for a game, a reader at the table means players need no phone (the prototype's teach mode) [2].

## Home game version

### In a regular classroom

Not needed: students' phones read the tags [3].

### Digitally

Not applicable.

## Related

- [The tap](../ll/tap-to-move.md) (LL mechanic).
- [NFC tags](nfc-tags.md) and [Phones](phones.md) (technologies).

## Sources

1. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md` (task, 05:15)
2. `_content/prototypes/hybrid/every-tap-is-a-row.md`
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md`
