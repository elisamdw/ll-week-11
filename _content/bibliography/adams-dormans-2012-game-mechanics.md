---
title: "Game Mechanics: Advanced Game Design"
kind: book
year: 2012
creators: ["Ernest Adams", "Joris Dormans"]
id: adams-dormans-2012-game-mechanics
area: design-and-formal-analysis
tier: important
canonical_evidence: ["OpenAlex shows 262 citing works, checked Nov 14, 2026 (seen: https://api.openalex.org/works?search=Game%20Mechanics:%20Advanced%20Game%20Design)", "Its diagram language is Dormans's doctoral work: Engineering Emergence: Applied Theory for Game Design, University of Amsterdam, defended January 13, 2012, open under CC BY-NC 3.0 NL; 78 citing works on OpenAlex (seen: https://eprints.illc.uva.nl/id/eprint/2118/1/DS-2012-12.text.pdf; https://api.openalex.org/works?filter=title.search:engineering%20emergence)", "Machinations assigned in Uppsala University's Mechanics Design course (5SD002), 2013: 'we have to make an Economic mechanics design using this tool' (seen, a student's course blog: https://babel.speldesign.uu.se/?p=5187)", "Machinations.io, the tool's commercial successor, says it is taught at '150+ universities' (seen, the company's own claim: https://machinations.io/)", "No syllabus assigning the book itself was found in four searches"]
access: "in print (New Riders); Dormans's dissertation open access at https://eprints.illc.uva.nl/id/eprint/2118/1/DS-2012-12.text.pdf; publisher's sample (front matter and ch. 4, pp. 59-68) at https://ptgmedia.pearsoncmg.com/images/9780321820273/samplepages/0321820274.pdf; Machinations free tier at https://machinations.io/"
status: researched
sources: ["https://ptgmedia.pearsoncmg.com/images/9780321820273/samplepages/0321820274.pdf", "https://eprints.illc.uva.nl/id/eprint/2118/1/DS-2012-12.text.pdf", "https://gamedeveloper.com/design/the-designer-s-notebook-machinations-a-new-way-to-design-game-mechanics", "https://machinations.io/", "https://babel.speldesign.uu.se/?p=5187", "https://api.openalex.org/works?search=Game%20Mechanics:%20Advanced%20Game%20Design", "https://api.openalex.org/works?filter=title.search:engineering%20emergence"]
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper"
---

# Game Mechanics: Advanced Game Design

**Citation:** Adams, Ernest, and Joris Dormans. *Game Mechanics: Advanced Game Design*. Berkeley, CA: New Riders, 2012. Its formal basis: Dormans, Joris. "Engineering Emergence: Applied Theory for Game Design." PhD diss., University of Amsterdam, 2012.

**What it argues:** Gameplay emerges from mechanics, and the part designers can model is a game's **internal economy**, resources that "sources" create, "drains" remove, "converters" turn into other resources, and "traders" exchange (pp. 61-62, seen). Feedback gives an economy its shape: negative feedback holds an equilibrium, and "Positive feedback creates an exponential curve" (p. 66, seen) that amplifies small leads into an arms race. **Machinations**, Dormans's diagram language and simulator, draws those flows so a designer can run a game a thousand times before building it; the book adds a library of patterns (engines, friction, stopping mechanism, attrition, escalation, arms race, trade; Appendix B, seen in the contents) and closes on "Meaningful Mechanics," the semiotics of simulations (ch. 12). It builds on Juul's games of emergence and progression (acknowledgments, seen).

**Why it's canonical:** It gave game design a shared notation for economies: cited by 262 works on OpenAlex, taught through its free tool (Uppsala, 2013), and carried on as Machinations.io, which now offers models to AI agents as well. The evidence is the citations and the tool, not syllabi: no course assigning the book was found.

**Key terms:** internal economy, sources/drains/converters/traders, pools and gates, positive and negative feedback, emergence vs. progression, engines and friction, design patterns, simulated playtests, meaningful mechanics.

**For the game (TH proposal):** (B, editor) every rule in `/game/edit` declares itself a source, drain, converter, or trader on named resources (energy, water, compute, trust), so the editor can draw the ruleset as a Machinations diagram: the AI's spread shows up as a positive feedback loop and each human tool must be a drain or a gate on it.

**Elsewhere here:** mechanics [Profitable harm](../mechanics/new/profitable-harm.md), [Commitments track](../mechanics/new/commitments-track.md), [Cascading failure](../mechanics/new/cascade-failure.md), [Bottleneck inputs](../mechanics/new/bottleneck.md), and [The Director](../mechanics/new/director.md) (HI's links), with `incremental-growth`, `escalation`, `resource-management`, `engine-building`, and `crafting-and-combining` in [the mechanics inventory](../mechanics/mechanics.csv); fitting the patterns as well: [Harden a node](../mechanics/new/harden-node.md) (friction), [Stop button and open board](../mechanics/new/stop-button.md) (stopping mechanism), [Externality card](../mechanics/new/externality-card.md) and [Present-harms track](../mechanics/new/present-harms-track.md) (drains), and [Compute cap](../mechanics/new/compute-cap.md) (a gate). Emergence and progression: [Juul, Half-Real](juul-2005-half-real.md); tight coupling: [Perrow, Normal Accidents](perrow-1984-normal-accidents.md); the lens it extends: [MDA](hunicke-et-al-2004-mda.md).
