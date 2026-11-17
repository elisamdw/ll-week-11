---
title: "Adversarial Policies Beat Superhuman Go AIs"
kind: article
year: 2022
creators: ["Tony Tong Wang", "Adam Gleave", "Tom Tseng", "Kellin Pelrine", "Nora Belrose", "Joseph Miller", "Michael D. Dennis", "Yawen Duan", "Viktor Pogrebniak", "Sergey Levine", "Stuart Russell"]
id: wang-et-al-2022-adversarial-policies-beat-superhuman-go-ais
area: idle-automated-ai-play
tier: important
canonical_evidence: ["Accepted to ICML 2023 and given as an oral presentation (seen: https://icml.cc/virtual/2023/oral/25521); published in PMLR 202: 35655–35739 (seen: https://proceedings.mlr.press/v202/wang23g.html)", "About 54 citations in OpenAlex for the arXiv record, and a follow-up line of work such as 'Can Go AIs Be Adversarially Robust?' (AAAI 2025) (seen: https://api.openalex.org/works?search=Adversarial%20Policies%20Beat%20Superhuman%20Go%20AIs)", "Its human result made general news: co-author Kellin Pelrine, an amateur, 'managed to best the AI in 14 out of 15 games, according to the Financial Times' (seen: https://www.theregister.com/2023/02/20/human_go_ai_defeat/, Feb. 20, 2023)", "Discussed by Frank Lantz in 'The Afterlife of Go' (2023) (see ../theory/lantz-games-thinking-about-thinking.md)"]
access: "open access URL: https://arxiv.org/abs/2211.00241 (also https://proceedings.mlr.press/v202/wang23g.html); project site https://goattack.far.ai"
status: researched
sources: ["https://arxiv.org/abs/2211.00241", "https://proceedings.mlr.press/v202/wang23g.html", "https://icml.cc/virtual/2023/oral/25521", "https://api.openalex.org/works?search=Adversarial%20Policies%20Beat%20Superhuman%20Go%20AIs", "https://www.theregister.com/2023/02/20/human_go_ai_defeat/", "https://goattack.far.ai"]
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper"
---

# Adversarial Policies Beat Superhuman Go AIs

**Citation:** Wang, Tony Tong, Adam Gleave, Tom Tseng, Kellin Pelrine, Nora Belrose, Joseph Miller, Michael D. Dennis, Yawen Duan, Viktor Pogrebniak, Sergey Levine, and Stuart Russell. "Adversarial Policies Beat Superhuman Go AIs." arXiv:2211.00241, November 1, 2022. Revised and published in *Proceedings of the 40th International Conference on Machine Learning*, PMLR 202 (2023): 35655–35739.

**What it argues:** The authors trained adversarial policies against KataGo, a superhuman Go program, and won over 97 percent of games at superhuman settings, not by playing good Go: "Instead, they trick KataGo into making serious blunders" (arXiv abstract, seen). The exploit transfers to other superhuman Go programs, a human amateur can learn and execute it unaided, and versions of KataGo trained to resist it stay vulnerable, so superhuman performance can coexist with blind spots any weak player can find.

**Why it's canonical:** It is the standard citation for "superhuman is not the same as robust," presented as an ICML oral, followed by a line of robustness papers, and widely reported when an amateur beat the machine; it closes the arc from Deep Blue and AlphaGo in the history of AI play.

**Key terms:** adversarial policy, superhuman but not robust, transfer of attacks, adversarial training, KataGo.

**For the game (TH proposal):** (B) Move 78: once per game a human faction may name a pattern the AI's rule table cannot see and void one AI action, as amateurs beat superhuman Go programs (HI's `move-78`).

**Elsewhere here:** mechanic [Move 78](../mechanics/new/move-78.md); [Lantz, The Beauty of Games](../theory/lantz-games-thinking-about-thinking.md) (same proposal, and "The Afterlife of Go"); [Togelius, Playing Smart](../theory/togelius-playing-smart.md); [McCarthy, AI as Sport](mccarthy-1997-ai-as-sport.md).
