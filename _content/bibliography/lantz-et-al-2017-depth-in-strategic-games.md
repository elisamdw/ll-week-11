---
title: "Depth in Strategic Games"
kind: article
year: 2017
creators: ["Frank Lantz", "Aaron Isaksen", "Alexander Jaffe", "Andy Nealen", "Julian Togelius"]
id: lantz-et-al-2017-depth-in-strategic-games
area: design-and-formal-analysis
tier: adjacent
canonical_evidence: ["Source of the session 'Game/Content Evaluation' (Nov. 13, 2018) in Yale's CPSC 474, Fall 2018: the slides are headed 'From: Lantz, F., Isaksen, A., Jaffe, A., Nealen, A., & Togelius, J. (2017). Depth in strategic games' (seen: https://zoo.cs.yale.edu/classes/cs474/f2018/Examples/cpsc474_20181113.pdf)", "Answered by Raph Koster, 'Depth and Design: Contrasting AI and Human Understandings,' AAAI-18 Workshop on Knowledge Extraction from Games, which quotes 'Lantz et al define (a) depth: d' (seen: https://www.raphkoster.com/wp-content/uploads/2026/07/Depth-and-design.pdf)", "Taken as the reference position in Stephenson, Perez-Liebana, Nelson, Khalifa, and Zook, 'Game Complexity vs Strategic Depth' (2019 seminar report): 'Lantz et al. propose that strategic depth is an objective, measurable property of a game' (seen: https://www.um.edu.mt/library/oar/bitstream/123456789/82108/1/Game_Complexity_vs_Strategic_Depth_2019.pdf)", "Cited by 29 works in OpenAlex as of Nov 14, 2026 (seen: https://openalex.org/W2795147900, via the OpenAlex API)"]
access: "PDF in ../theory/articles/lantz-et-al-2017-depth-in-strategic-games.pdf (Marlon's copy; AAAI workshop paper)"
status: researched
sources: ["https://zoo.cs.yale.edu/classes/cs474/f2018/Examples/cpsc474_20181113.pdf", "https://www.raphkoster.com/wp-content/uploads/2026/07/Depth-and-design.pdf", "https://www.um.edu.mt/library/oar/bitstream/123456789/82108/1/Game_Complexity_vs_Strategic_Depth_2019.pdf", "https://openalex.org/W2795147900", "https://api.openalex.org/works?filter=title.search:Depth%20in%20Strategic%20Games"]
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper"
---

# Depth in Strategic Games

**Citation:** Frank Lantz, Aaron Isaksen, Alexander Jaffe, Andy Nealen, and Julian Togelius, "Depth in Strategic Games," in *The AAAI-17 Workshop on What's Next for AI in Games?*, Technical Report WS-17-15 (Palo Alto, CA: AAAI Press, 2017), 967–74.

**What it argues:** Depth, a game's capacity to reward a lifetime of study, can be modeled as a formal property **d**: line up the best strategy at each level of computational resources (a **strategy ladder**) and count the distinct steps between random and perfect play. Shallow games are all search or solved by one weird trick; deep games sit between.

**Why it's canonical:** It is the paper game-AI work cites when it tries to measure depth (Koster's AAAI-18 reply, the 2019 complexity-versus-depth report) and was the basis of a Yale game-AI lecture; it bridges designers' talk and AI research. Adjacent to the humanities canon.

**Key terms:** depth, d, strategy ladder, computational resources, weird trick, sustained learning.

**For the game (TH proposal):** (editor) A depth check for student rulesets: play each one with a random AI and a greedy AI, and if one simple rule of thumb always wins, the ruleset is shallow and goes back for revision.

**Elsewhere here:** [stored article with segments](../theory/articles/lantz-et-al-2017-depth-in-strategic-games.md), [TH's Lantz entry](../theory/lantz-games-thinking-about-thinking.md), [The Beauty of Games](lantz-2023-beauty-of-games.md).
