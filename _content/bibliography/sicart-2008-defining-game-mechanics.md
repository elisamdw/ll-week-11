---
title: "Defining Game Mechanics"
kind: article
year: 2008
creators: ["Miguel Sicart"]
id: sicart-2008-defining-game-mechanics
area: design-and-formal-analysis
tier: important
canonical_evidence: ["Peer-reviewed article in Game Studies 8, no. 2 (December 2008), ISSN 1604-7982 (seen: the journal page in the Internet Archive copy, https://web.archive.org/web/2024id_/http://gamestudies.org/0802/articles/sicart; the IT University of Copenhagen record, https://researcher.itu.dk/en/publications/defining-game-mechanics/)", "OpenAlex records 401 citing works, checked 2026-11-14 (seen: https://api.openalex.org/works?search=defining%20game%20mechanics)", "Sicart's later lexicon entry 'Mechanics,' in Debugging Game History (MIT Press, 2016), pp. 297-304, is assigned in FMS 321, Interactive Digital Narratives, Fall 2016, Aug. 29, at Davidson (institution inferred from the site's domain) (seen: https://courses.digitaldavidson.net/fms321/); no syllabus assigning the 2008 article itself was found"]
access: "open access URL http://gamestudies.org/0802/articles/sicart (the site refused connections on 2026-11-14; Internet Archive copy https://web.archive.org/web/2024id_/http://gamestudies.org/0802/articles/sicart)"
status: researched
sources: ["https://web.archive.org/web/2024id_/http://gamestudies.org/0802/articles/sicart", "https://researcher.itu.dk/en/publications/defining-game-mechanics/", "https://api.openalex.org/works?search=defining%20game%20mechanics", "https://courses.digitaldavidson.net/fms321/"]
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper"
---

# Defining Game Mechanics

**Citation:** Sicart, Miguel. "Defining Game Mechanics." *Game Studies* 8, no. 2 (December 2008). http://gamestudies.org/0802/articles/sicart. (Volume, issue, and month from the journal page, seen in the Internet Archive copy; the live site was down.)

**What it argues:** Borrowing the vocabulary of object-oriented programming, Sicart defines a mechanic as a verb an agent can call: "game mechanics are methods invoked by agents, designed for interaction with the game state" (section "Defining Game Mechanics," seen; the abstract has "for interacting with the game world"). Against Lundgren and Björk, who treat mechanics as a summary of rules, he separates the two: rules "provide the possibility space where that interaction is possible, regulating as well the transition between states," so "rules are modeled after agency, while mechanics are modeled for agency" (same section, seen), and in the conclusion, "rules are normative, while mechanics are performative" (seen). His example: *Shadow of the Colossus* has a "climb" mechanic, a stamina rule, and a game loop that checks one against the other. Because a method does not care who calls it, "we can analyze game mechanics as available both to human and artificial agents" (seen). A later section sorts core, primary, and secondary mechanics.

**Why it's canonical:** It is the definition papers cite when they need "mechanic" to mean something other than "a kind of rule" (401 citing works on OpenAlex), and it is open and short. Courses we found teach the idea through Sicart's 2016 lexicon entry "Mechanics" rather than the article, so the tier is important, not core.

**Key terms:** mechanics as methods invoked by agents, rules vs. mechanics (normative vs. performative), game state, game loop, core, primary, and secondary mechanics, contextual mechanics, human and artificial agents.

**For the game (TH proposal):** (B, debrief) Verbs before rules: list each agent's mechanics on its own (the AI's spread; the humans' harden, repair, and protest) apart from the rules that bound them (upkeep, yields, the harm threshold), so a Claude Code remix adds one verb and one bounding rule and the table plays to see which changed the game more; the AI and the humans call methods on the same game state, which is Sicart's point about artificial agents.

**Elsewhere here:** [Games as data](../game-state/README.md) (the state his mechanics act on; [Data Center as data](../game-state/data-center.md)); mechanics [Harden a node](../mechanics/new/harden-node.md), [Readable personalities](../mechanics/new/readable-personalities.md) (each AI behavior a named method), [Token test](../mechanics/new/token-test.md), and `core-loop` in [the mechanics inventory](../mechanics/mechanics.csv). The frameworks he answers: [MDA](hunicke-et-al-2004-mda.md), [Fullerton](fullerton-et-al-2004-game-design-workshop.md) ("game procedures"); beside it, [Schell](schell-2008-art-of-game-design.md) and [Adams and Dormans](adams-dormans-2012-game-mechanics.md). His turn from formal mechanics to play: [Against Procedurality](../theory/articles/sicart-2011-against-procedurality.md) and [Play Matters](sicart-2014-play-matters.md).
