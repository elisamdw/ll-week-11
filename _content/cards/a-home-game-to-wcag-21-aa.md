---
title: "A home game built to WCAG, with buzzers that type"
description: "Harvard's policy points a classroom web game at WCAG 2.1 AA, better 2.2; for a buzzer game that means keys for everything, a visual for every sound, an adjustable timer, and buzzers that act as keyboards."
kind: reading
convolute: home-games
tags: [research, design, hardware, play]
audience: [ll, faculty]
links: [what-makes-a-home-game-accessible-across-campus, expos-40-home-game-for-terrys-class, the-are-you-serious-board, home-game-versions-of-other-things, tools-supports-and-props-for-active-learning, workshops-in-a-box]
sources: ["W11/research/classroom-game-accessibility.md", "https://news.harvard.edu/gazette/story/2019/04/harvard-adopts-university-wide-digital-accessibility/", "https://news.harvard.edu/gazette/story/2023/04/harvard-digital-accessibility-policy-revised-expanded/", "https://www.ada.gov/resources/2024-03-08-web-rule/", "https://www.ada.gov/resources/web-guidance/", "https://www.w3.org/TR/WCAG22/", "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html", "https://gameaccessibilityguidelines.com/full-list/", "https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101", "https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/107", "https://ess.fas.harvard.edu/teaching-learning/so-youre-teaching-av/", "https://essroombook.fas.harvard.edu/room.php?rm=rm0946", "https://getonline.harvard.edu/guest/harvard_stu_fac_staff.php?_browser=1", "https://compuphase.com/usbkey/usbbutton_en.htm", "https://trainerswarehouse.com/products/me-first-v-4-8-user-set-4-player-facilitator", "https://www.ablenetinc.com/hitch-2", "https://www.schoolhealth.com/ablenet-big-red-switch"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Harvard's digital accessibility policy asks for WCAG 2.1 AA, and since 2023 says course materials and web applications "should aim to be accessible." For a buzzer game that means every action on a key, a visual for every meaningful sound, a timer the host can change or turn off, no flashing, and text large enough for the back row. USB buzzers that type a key fit a web app with no driver, and adaptive switches can type the same keys.

---

**The answer to** [What makes a home game accessible across campus?](what-makes-a-home-game-accessible-across-campus.md), from a research pass on Nov 16; the full note is `W11/research/classroom-game-accessibility.md`.

**The standard.** Harvard's 2019 policy called for "Web Content Accessibility Guidelines version 2.1 AA" on public sites and web applications. The 2023 revision extends it, from June 1, 2023, to internal content including "course materials, documents, PDFs, web-based applications," which "should aim to be accessible," and technology Harvard builds "should strive to meet the most recent web accessibility standards," now WCAG 2.2 (both from the *Harvard Gazette*; Harvard's own policy pages refused automated access). The 2024 federal ADA rule (WCAG 2.1 AA) binds public universities, not Harvard.

**What it asks of this game** (WCAG 2.2):

- 2.1.1 Keyboard: "All functionality of the content is operable through a keyboard interface". This is also what lets buzzers and switches plug in.
- 2.2.1 Timing Adjustable: the user can turn off, adjust or extend each time limit, with exceptions for real-time events and limits that are "essential." A host control for the answer timer, including off, meets it.
- 2.3.1: nothing "flashes more than three times in any one second period" (buzz-in and time's-up effects on a projector).
- 1.4.3 contrast at least 4.5:1, more on a washed-out projector; 1.4.1 not color alone, so the winning team gets a name, not only green.
- Captions include "meaningful sound effects": a visual for buzz, right, wrong, time's up.

**From game guidelines.** Game Accessibility Guidelines: "Ensure no essential information is conveyed by sounds alone"; "Do not make precise timing essential to gameplay." Xbox's guidelines set 26 px at 1080p as the minimum text for TV distance, and warn against requiring many presses in a short time. For a first-to-buzz game, the researcher reads this as a host option for a fixed answer window or turn order instead of pure reaction speed.

**Campus rooms.** FAS classrooms usually have HDMI with USB-C and mini DisplayPort adapters and computer audio; seminar rooms usually have no amplification; check the room's ESS RoomBook page before class; in-class help is ESS at 617-495-9460. Running host and stage display from one laptop over HDMI, with USB buzzers, avoids depending on phones joining the network.

**Parts.** CompuPhase's USB Dome Button shows up as a one-key keyboard and "runs out of the box, no driver is needed." Trainers Warehouse's Me First v.4 is an 8-player wireless lockout kit; its page doesn't say whether its USB-C port types keys. AbleNet's Hitch 2 ($120.00 on its page) turns up to five adaptive switches into programmed keystrokes; a Big Red switch is $75.00 at one reseller.

**For the EXPOS 40 build, as KR reads it.** The game already runs on keys ([The Are You Serious?! board](the-are-you-serious-board.md)), which is most of the way: add on-screen cues for each sound, a timer control, and a check of contrast and type size on a projector. Harvard's Digital Accessibility Services could review it before it goes to Terry.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
