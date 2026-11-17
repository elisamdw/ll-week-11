---
title: "Strand 4: AI in game development"
description: "Procedural generation, ML upscaling and animation, generative tools, the voice actors' strike, and studios' AI policies, 1978–2026."
order: 4
kind: strand
year: "1978–2026"
creators: []
sources:
  - https://en.wikipedia.org/wiki/Procedural_generation
  - https://en.wikipedia.org/wiki/Elite_(video_game)
  - https://en.wikipedia.org/wiki/.kkrieger
  - https://en.wikipedia.org/wiki/Dwarf_Fortress
  - https://thenextweb.com/news/pac-man-tetris-simcity-and-11-other-games-land-in-the-museum-of-modern-arts-new-collection
  - https://en.wikipedia.org/wiki/SpeedTree
  - https://en.wikipedia.org/wiki/Spore_(2008_video_game)
  - https://en.wikipedia.org/wiki/Minecraft
  - http://pcgbook.com/
  - https://en.wikipedia.org/wiki/No_Man%27s_Sky
  - https://www.nvidia.com/en-us/geforce/news/nvidia-dlss-2-0-a-big-leap-in-ai-rendering/
  - https://www.nvidia.com/en-us/geforce/news/dlss4-multi-frame-generation-ai-innovations/
  - https://www.videogameschronicle.com/news/theyre-completely-wrong-nvidia-ceo-responds-to-widespread-criticism-of-dlss-5
  - https://www.gdcvault.com/play/1022985/Motion-Matching-and-The-Road
  - https://www.ubisoft.com/en-us/studio/laforge/news/3NWqwcMU9lMfumgfPAEfka/learned-motion-matching
  - https://gdcvault.com/play/1024994/Robocalypse-Now-Using-Deep-Learning
  - https://www.ea.com/seed/news/automated-game-testing-deep-reinforcement-learning
  - https://news.ubisoft.com/en-us/article/7Cm07zbBGy4Xml6WgYi25d/the-convergence-of-ai-and-creativity-introducing-ghostwriter%E2%80%8B
  - https://about.roblox.com/newsroom/2025/03/introducing-roblox-cube
  - https://www.microsoft.com/en-us/research/blog/introducing-muse-our-first-generative-ai-model-designed-for-gameplay-ideation/
  - https://www.gamedeveloper.com/production/players-lambast-activision-after-publisher-confirms-generative-ai-was-used-in-black-ops-6
  - https://www.engadget.com/gaming/arc-raiders-replaced-some-of-its-ai-generated-voice-lines-with-professional-actors-184915627.html
  - https://www.engadget.com/gaming/the-indie-game-awards-snatches-back-two-trophies-from-clair-obscur-over-its-use-of-generative-ai-164730842.html
  - https://www.videogameschronicle.com/news/holy-f-guys-were-not-replacing-artists-larian-boss-responds-to-ai-backlash
  - https://www.engadget.com/ai/subnautica-publisher-transforms-into-ai-first-company-and-introduces-voluntary-resignation-policy-181042212.html
  - https://www.ea.com/news/ea-partners-with-stability-ai
  - https://www.videogameschronicle.com/news/square-enix-says-it-wants-generative-ai-to-be-doing-70-of-its-qa-and-debugging-by-the-end-of-2027/
  - https://www.videogameschronicle.com/news/steam-pages-will-now-disclose-which-games-use-ai-generated-content/
  - https://www.videogameschronicle.com/news/valve-has-significantly-rewritten-steams-rules-for-how-developers-much-disclose-ai-use
  - https://www.videogameschronicle.com/news/steam-games-disclosing-generative-ai-use-are-up-800-this-year/
  - https://gdconf.com/article/gdc-2026-state-of-the-game-industry-reveals-impact-of-layoffs-generative-ai-and-more/
  - https://aftermath.site/big-walk-ai-igf-jurors-controversy/
  - https://aftermath.site/video-games-no-ai/
  - https://gamedeveloper.com/business/ninja-theory-other-triple-a-devs-reportedly-using-ai-voice-acting-tech-over-people
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026, from a research subagent's notes"
---

# Strand 4: AI in game development

[History index](README.md) · [Timeline](timeline.md) · previous: [Strand 3, Games about AI](3-games-about-ai.md) · next: [Strand 5, Games, AI, and learning](5-learning.md)

Item files: [*No Man's Sky*'s generator](items/no-mans-sky.md) · [The SAG-AFTRA video-game strike, 2024–25](items/sag-aftra-video-game-strike.md)

## The essay

Game developers used generated content long before anyone called it AI, and the history of AI in game development is mostly a history of three trades: **memory for rules, labor for tools, and authorship for scale.**

**Rules instead of memory (1978–2008).** The first roguelikes, *Beneath Apple Manor* (1978) and *Rogue* (1980), generated a new dungeon every game. *Elite* (Braben and Bell, September 1984) regenerated eight galaxies of 256 systems from a single seed on a BBC Micro; Acornsoft talked them down from 248 galaxies so the mathematics wouldn't show. The demoscene took the trade to its limit with *.kkrieger* (2004), a first-person shooter in 97,280 bytes. Then generation moved from compression to design. *Diablo* (1996–97) made random dungeons and loot a mass-market pattern. SpeedTree (from 2002) grew the forests of games and of *Avatar*'s Pandora, and won a technical Academy Award. *Dwarf Fortress* (first alpha 2006) generates whole histories, wars and religions before play begins; MoMA acquired it in 2012. *Spore* (2008) packed a creature into a few kilobytes of "DNA", and *Minecraft* (2009) generated an effectively infinite world from a 64-bit seed. By 2010 procedural content generation (PCG) was a research field with its own workshop and, by 2016, a free textbook (Shaker, Togelius and Nelson, pcgbook.com).

**The biggest bet** was [*No Man's Sky*](items/no-mans-sky.md) (Hello Games, August 9, 2016): 18 quintillion planets from one seed. Its launch taught the gap between a generator's range and a player's sense of variety, and its eight-year comeback, much of it rebuilding the generator, taught that generated worlds still need tending.

**Machine learning came in quietly, through pixels, bodies and bugs (2016–2022).** Ubisoft's motion matching (Simon Clavet, GDC 2016) searched hours of motion capture every frame for the best next pose; La Forge's "Learned Motion Matching" (SIGGRAPH 2020) replaced the search with networks; EA's HyperMotion (*FIFA 22*, 2021) learned from 8.7 million frames of 22 players. Valve's VACnet (GDC 2018) learned to spot cheaters from community verdicts; Ubisoft's Commit Assistant (2018) flagged risky code; EA SEED and King built bots to play-test games. NVIDIA's DLSS (from February 2019; DLSS 2.0 in March 2020; frame generation in 2022; multi-frame generation in January 2025) became the most widely deployed ML in games and changed what a "rendered frame" means: under DLSS 3, NVIDIA says, seven of every eight pixels shown are reconstructed by a network. Fans got there first, running ESRGAN over old textures in 2018–19.

**Then generative tools arrived, and so did the fight (2022–2026).** Ubisoft's Ghostwriter (March 2023) drafted NPC "barks" for writers to polish. Unity shipped Muse (2023), then Unity AI (2025); Roblox released Cube 3D, a text-to-3D model, in March 2025; Microsoft's Muse (*Nature*, February 2025) learned to generate *Bleeding Edge* gameplay, and Phil Spencer suggested such models could revive old games without their engines, to preservationists' alarm. Epic's AI Darth Vader in *Fortnite* (May 2025) spoke in James Earl Jones's voice with his estate's consent; SAG-AFTRA filed an unfair labor practice charge three days later.

The labor fight is the center of this period. [The SAG-AFTRA video-game strike](items/sag-aftra-video-game-strike.md) began July 26, 2024 against ten companies, lasted 320 days, and ended with a contract (ratified July 9, 2025, 95% in favor) that requires consent and disclosure for AI digital replicas and lets performers suspend that consent during a strike. Meanwhile the industry lost tens of thousands of jobs: 28% of respondents to GDC's 2026 survey had been laid off in the past two years.

**The policies that followed are a map of disagreement.** Valve's Steam began requiring AI disclosure on January 10, 2024; by mid-2025 about 8,000 games disclosed generative AI, about 20% of that year's releases; in January 2026 Valve exempted behind-the-scenes tools such as code assistants. Activision disclosed AI in *Black Ops 6* (early 2025) and drew complaints over *Black Ops 7*'s calling cards (launched November 14, 2025, a year ago today). Embark shipped *Arc Raiders* (October 2025) with licensed text-to-speech voices and re-recorded some lines with actors in March 2026: "A real professional actor is better than AI; that's just how it is." *Clair Obscur: Expedition 33* lost two Indie Game Awards in December 2025 over AI placeholder textures that slipped into the release. Larian said it uses generative AI for ideas and placeholder text, never shipped art. Krafton declared itself "AI first" (October 2025); EA partnered with Stability AI (October 23, 2025); Square Enix aims to automate 70% of QA by the end of 2027; Capcom pledged no AI-generated assets in its games (February 2026). NVIDIA's DLSS 5 (March 2026), a generative "neural rendering" model that relights faces and materials, drew "AI slop" criticism that Jensen Huang called "completely wrong". When Google released Project Genie on January 30, 2026, Unity's stock fell 24% in a day.

**Where it stands this week.** GDC's 2026 survey found 36% of developers use generative AI at work and 52% think it is harming the industry, up from 30% in 2025 and 18% in 2024. Aftermath keeps a list of about a hundred studios that refuse generative AI. And this week (November 9–11, 2026), some IGF jurors said they would not vote for games made with it; House House then disclosed that LLMs fixed bugs in "well under 0.1%" of *Big Walk*'s code, the kind of use Steam no longer asks about. The line between a tool and an author is still being drawn, game by game.

## Key dates

| Date | Event |
| --- | --- |
| 1978 / 1980 | *Beneath Apple Manor*; *Rogue*: generated dungeons |
| Sept 20, 1984 | *Elite*: eight galaxies from a seed |
| 1986 | *The Sentinel*: "supposedly" 10,000 levels in 48–64 KB |
| Jan 3, 1997 | *Diablo* (North America; some stores Dec 31, 1996) |
| Feb 2002 | SpeedTree's first release |
| Apr 2004 | *.kkrieger*, a shooter in 97,280 bytes |
| Aug 8, 2006 | *Dwarf Fortress* first alpha |
| Sept 2008 | *Spore* |
| May 17, 2009 | *Minecraft* public alpha |
| Jun 18, 2010 | First PCG in Games workshop (date from search snippets) |
| Nov 29, 2012 | MoMA acquires 14 games, *Dwarf Fortress* among them |
| Mar 2016 | Clavet's motion-matching talk at GDC; Springer's PCG textbook later that year |
| Aug 9, 2016 | *No Man's Sky* |
| Mar 2018 | Valve's VACnet talk at GDC; Ubisoft's Commit Assistant |
| Feb 13–15, 2019 | DLSS reaches *Battlefield V* and *Metro Exodus* |
| Mar 23, 2020 | DLSS 2.0 |
| Jul 2020 | Ubisoft La Forge's Learned Motion Matching |
| Jul 11, 2021 | EA's HyperMotion (*FIFA 22*) |
| Sept 2022 | Report that studios including Ninja Theory use Altered AI voices (as placeholders, Ninja Theory said) |
| Sept 20, 2022 | DLSS 3 frame generation |
| Mar 21, 2023 | Ubisoft's Ghostwriter |
| Jun 27, 2023 | Unity Muse announced |
| Jan 9–10, 2024 | SAG-AFTRA's Replica Studios deal; Steam's AI disclosure rules |
| Jul 26, 2024 | SAG-AFTRA video-game strike begins |
| Jan 6, 2025 | DLSS 4 multi-frame generation |
| Feb 19, 2025 | Microsoft's Muse (*Nature*) |
| Feb 25, 2025 | Backlash over *Black Ops 6*'s AI disclosure |
| Mar 17, 2025 | Roblox Cube 3D |
| May 16–19, 2025 | *Fortnite*'s AI Darth Vader; SAG-AFTRA's unfair labor practice charge |
| Jun 11, 2025 | Strike suspended after 320 days |
| Jul 9, 2025 | Contract ratified, 95.04% |
| Jul 2025 | About 8,000 Steam games disclose generative AI |
| Oct 23, 2025 | EA and Stability AI |
| Oct 24 – Nov 12, 2025 | Krafton "AI first", then voluntary resignations |
| Oct 30, 2025 | *Arc Raiders* ships with licensed AI voices |
| Nov 6, 2025 | Square Enix's 70% QA automation target |
| Nov 14, 2025 | *Black Ops 7*, and complaints about its AI calling cards |
| Dec 18–22, 2025 | *Clair Obscur* wins, then loses, two Indie Game Awards |
| Jan 2026 | Valve rewrites Steam's AI disclosure; DLSS 4.5 |
| Jan 30, 2026 | Google's Project Genie; Unity stock falls 24% |
| Feb 2026 | Capcom: no AI-generated assets in its games |
| Mar 2026 | GDC 2026 survey (52% negative); *Arc Raiders* re-records lines; NVIDIA announces DLSS 5 (Mar 16) |
| Nov 9–11, 2026 | IGF jurors and *Big Walk*'s code-assistant disclosure |

## Start here

1. **Watch Sean Murray, "Building Worlds in No Man's Sky Using Math(s)"** (GDC 2017): an hour on procedural generation by the person who bet a studio on it.

   ![youtube: Building Worlds in No Man's Sky Using Math(s) (GDC 2017)](https://www.youtube.com/watch?v=C9RyEiEzMiU)

   Source: GDC's channel.

2. **Read a chapter of *Procedural Content Generation in Games*** (Shaker, Togelius, Nelson, 2016), free at http://pcgbook.com/. Chapter 1 is enough.

3. **Read the GDC 2026 survey summary** (https://gdconf.com/article/gdc-2026-state-of-the-game-industry-reveals-impact-of-layoffs-generative-ai-and-more/) beside the [strike timeline](items/sag-aftra-video-game-strike.md): a third of developers use generative AI, half think it is harming the industry, and the performers won consent and disclosure after a year on strike.

## More to watch

![youtube: Practical Procedural Generation for Everyone (Kate Compton, GDC)](https://www.youtube.com/watch?v=WumyfLEa6bU)

Source: GDC's channel.

![youtube: Tarn Adams plays Dwarf Fortress at Gamescom 2023](https://www.youtube.com/watch?v=66lU280cc7A)

Source: Kitfox Games, the game's publisher.

![youtube: SIGGRAPH 2020, Learned Motion Matching (Ubisoft La Forge)](https://www.youtube.com/watch?v=16CHDQK4W5k)

Source: Ubisoft La Forge.

![youtube: Robocalypse Now: Using Deep Learning to Combat Cheating in Counter-Strike: Global Offensive (GDC 2018)](https://www.youtube.com/watch?v=kTiP0zKF9bc)

Source: GDC's channel.

![youtube: NVIDIA DLSS 2.0, A Big Leap In AI Rendering](https://www.youtube.com/watch?v=0X1RtXCvPFQ)

Source: NVIDIA GeForce.

![youtube: NVIDIA DLSS 5 Reveal, Resident Evil Requiem (2026)](https://www.youtube.com/watch?v=MhLWH18vXH4)

Source: NVIDIA GeForce. Compare the faces before and after: this is the clip the "AI slop" argument is about.

![youtube: Ubisoft is Developing an AI Ghostwriter to Save Scriptwriters Time (2023)](https://www.youtube.com/watch?v=XxQoN3PFiKA)

Source: Ubisoft.

![youtube: World and Human Action Models towards gameplay ideation (Microsoft Research, 2025)](https://www.youtube.com/watch?v=pclsvLeTjjw)

Source: Microsoft Research, the *Nature* paper's supplementary video.

## Studio AI policies at a glance

| Company | Position | Date |
| --- | --- | --- |
| Valve (Steam) | Disclose pre-generated and live-generated AI content; from 2026, dev-efficiency tools exempt | Jan 10, 2024; Jan 2026 |
| Nintendo | Furukawa: generative AI "can be used in creative ways" but raises IP issues; Nintendo offers value "that cannot be created by technology alone" (quotes from search; not a promise to avoid it) | Jun 27, 2024 |
| Microsoft Gaming | Muse for "gameplay ideation"; Spencer's game-preservation remark | Feb 19, 2025 |
| Activision | Steam disclosures for *Black Ops 6* and *7* | 2025 |
| Krafton | "AI first" reorganization; voluntary resignations | Oct–Nov 2025 |
| Nexon / Embark | "assume every game company is now using AI"; *Arc Raiders* TTS, partly re-recorded | Nov 2025; Mar 2026 |
| EA | Partnership with Stability AI | Oct 23, 2025 |
| Square Enix | Automate 70% of QA and debugging by end of 2027 | Nov 6, 2025 |
| Larian | Generative AI for ideation and placeholders, not shipped art | Dec 2025 (January 2026 AMA from search) |
| Capcom | No AI-generated assets in games; AI for efficiency | Feb 2026 |
| About 100 studios (Aftermath's list) | Refuse generative AI | 2026 |
| Sony, Remedy | not researched | |

## Not verified, or left out

- FSR 4 and PSSR details, Commit Assistant, the Fortnite Vader technical details, *Black Ops 7*'s calling cards, Larian's January AMA, and Nintendo's quotes rest on search results.
- The often-quoted "about 35,000 game jobs lost, 2023–25" matches tracker figures only in search summaries; the GDC survey percentages above are the sourced numbers.
- The brief's "2023 UK Equity campaigns" were not found. There is no Ninja Theory AI voice story beyond the September 2022 placeholder report.
- Runtime AI-NPC middleware (Inworld, NVIDIA ACE) is in [strand 2](2-ai-inside-games.md).

## For the game and the class

*Proposal (HI), not a plan. Marlon decides.*

- **A "studio" ruleset for *Data Center*.** The players run a game studio, not a city: resources are budget, staff, players' trust, and shipped content. Each round the AI offers a tool (generate textures, voices, levels, QA), and taking it cuts cost now and draws a trust or labor card later (a strike, an award withdrawn, a disclosure scandal). The real 2024–26 events become the deck. The rhetoric field: "automation is a trade, not a free gift".
- **Seeds as the shared world.** *Elite*'s and *Minecraft*'s idea fits the engine directly: a ruleset could take a seed so every table plays the same generated map, and Stafford's students could swap seeds as easily as rulesets.
- **A disclosure rule students vote on (Nov 23).** Give the class Steam's 2024 and 2026 rules and the *Big Walk* case, and make "what must the AI disclose?" a rule they write into their own ruleset. It turns a live dispute from this week into a design decision.
- **For Nov 18:** students building improvisational AI co-stars could hear the SAG-AFTRA terms (consent, disclosure, suspension during a strike) as a design brief: whose voice is your co-star using, and did they agree?
