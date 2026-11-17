---
title: "Strand 2: AI inside games"
description: "Opponents, NPCs, directors, and generated worlds: from the Nimatron and Pac-Man's ghosts to the Left 4 Dead Director, the Nemesis system, AI Dungeon, LLM characters, and Genie 4."
order: 2
kind: strand
year: "1940–2026"
creators: []
sources:
  - https://en.wikipedia.org/wiki/Nimatron
  - https://en.wikipedia.org/wiki/Spacewar!
  - https://en.wikipedia.org/wiki/Space_Invaders
  - https://en.wikipedia.org/wiki/Pong
  - https://en.wikipedia.org/wiki/Sargon_(chess)
  - https://www.gamedeveloper.com/design/the-pac-man-dossier
  - https://en.wikipedia.org/wiki/Pac-Man
  - https://en.wikipedia.org/wiki/Beneath_Apple_Manor
  - https://en.wikipedia.org/wiki/Rogue_(video_game)
  - https://www.nethack.org/
  - https://en.wikipedia.org/wiki/Elite_(video_game)
  - https://en.wikipedia.org/wiki/Civilization_(video_game)
  - https://en.wikipedia.org/wiki/Nuclear_Gandhi
  - https://en.wikipedia.org/wiki/Sid_Meier%27s_Alpha_Centauri
  - https://en.wikipedia.org/wiki/StarCraft_(video_game)
  - https://en.wikipedia.org/wiki/Artificial_intelligence_in_video_games
  - https://en.wikipedia.org/wiki/Thief:_The_Dark_Project
  - https://www.gamedeveloper.com/programming/gdc-2005-proceeding-handling-complexity-in-the-i-halo-2-i-ai
  - https://en.wikipedia.org/wiki/F.E.A.R._(video_game)
  - https://www.cs.uky.edu/~sgware/reading/papers/orkin2005agent.pdf
  - https://en.wikipedia.org/wiki/Creatures_(1996_video_game)
  - https://www.sussex.ac.uk/informatics/cogslib/reports/csrp/csrp434.pdf
  - https://en.wikipedia.org/wiki/Black_%26_White_(video_game)
  - https://en.wikipedia.org/wiki/The_Sims_(video_game)
  - https://en.wikipedia.org/wiki/Fa%C3%A7ade_(video_game)
  - https://www.gamedeveloper.com/design/the-story-of-facade-the-ai-powered-interactive-drama
  - https://all-things-andy-gavin.com/2011/02/07/making-crash-bandicoot-part-6/
  - https://en.wikipedia.org/wiki/Dynamic_game_difficulty_balancing
  - https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf
  - https://www.gamedeveloper.com/design/the-perfect-organism-the-ai-of-alien-isolation
  - https://en.wikipedia.org/wiki/Middle-earth:_Shadow_of_Mordor
  - https://patents.google.com/patent/US10926179B2/en
  - https://www.gamedeveloper.com/design/how-forza-s-drivatar-actually-works
  - https://api.crossref.org/works/10.1038/s41586-021-04357-7
  - https://www.engadget.com/sony-gt-sophy-racing-ai-gran-turismo-7-ps5-130057992.html
  - https://en.wikipedia.org/wiki/AI_Dungeon
  - https://arxiv.org/abs/2304.03442
  - https://inworld.ai/about
  - https://nvidianews.nvidia.com/news/nvidia-ace-for-games-sparks-life-into-virtual-characters-with-generative-ai
  - https://www.nvidia.com/en-eu/geforce/news/pubg-ally-ai-teammate-beta-available-now/
  - https://news.ubisoft.com/en-us/article/5qXdxhshJBXoanFZApdG3L/how-ubisofts-new-generative-ai-prototype-changes-the-narrative-for-npcs
  - https://news.ubisoft.com/en-us/article/3mWlITIuWuu0MoVuR6o8ps/ubisoft-reveals-teammates-an-ai-experiment-to-change-the-game
  - https://store.steampowered.com/app/2240920/Vaudeville/
  - https://arxiv.org/abs/2308.12915
  - https://store.steampowered.com/app/2726370/Suck_Up/
  - https://wdwnt.com/2025/05/epic-games-adds-darth-vader-coversational-ai-feature-to-fortnite
  - https://www.pcgamesn.com/where-winds-meet/reception-ai-chatbots
  - https://kotaku.com/atelier-just-turned-one-of-its-most-popular-rpg-protagonists-into-an-ai-chatbot-2000727898
  - https://arxiv.org/abs/2408.14837
  - https://techcrunch.com/2024/10/31/decarts-ai-simulates-a-real-time-playable-version-of-minecraft/
  - https://arxiv.org/abs/2402.15391
  - https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/
  - https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/
  - https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-genie-4/
  - https://www.microsoft.com/en-us/research/articles/whamm-real-time-world-modelling-of-interactive-environments/
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026, from a research subagent's notes"
---

# Strand 2: AI inside games

[History index](README.md) · [Timeline](timeline.md) · previous: [Strand 1, Games as AI's proving ground](1-proving-ground.md) · next: [Strand 3, Games about AI](3-games-about-ai.md)

Item files: [*Façade*](items/facade.md) · [The *Left 4 Dead* AI Director](items/left-4-dead-ai-director.md) · [The Nemesis system](items/nemesis-system.md) · [*AI Dungeon*](items/ai-dungeon.md)

## The essay

In strand 1, games are where AI proves it can win. Inside games, AI has a different job: to make play worth having. A game's "AI" is rarely trying to beat the player; it is trying to seem alive, to pace the evening, to lose well. Designers have always known it is theatre.

**The theatre starts early.** Westinghouse's Nimatron, a relay machine that played Nim at the 1939–40 New York World's Fair, paused before each move so that it seemed to be thinking; Edward Condon said it served "no other useful purpose than to entertain." *Spacewar!* (1962) had no computer opponent because the PDP-1 had nothing left over to fly the other ship, and arcade *Pong* (1972), against the usual story, had no computer paddle either. *Space Invaders* (1978) sped up as aliens died because fewer sprites drew faster, and Tomohiro Nishikado kept the accident: difficulty that rises with success came from a hardware limit, not a model of intelligence.

**Then came the ghosts.** In *Pac-Man* (Namco, location test May 1980) each ghost has one targeting rule. Blinky aims at Pac-Man's tile, Pinky at four tiles ahead, Inky at a point computed from Pac-Man and Blinky together, and Clyde chases until he is close, then retreats to his corner. Their Japanese names are verbs of character: *oikake* (pursue), *machibuse* (ambush), *kimagure* (fickle), *otoboke* (playing dumb). Players read the four rules as four personalities, and the timed waves of scatter and chase show a designer shaping the pace. It is the founding case of game AI as authored character, not optimal play.

**Generated worlds made the game itself the opponent.** *Beneath Apple Manor* (1978) and *Rogue* (1980) built a new dungeon every run, so players learned rules rather than maps; *Rogue*'s designers, short of memory, gave deep monsters more health instead of more brains. *Elite* (1984) compressed eight galaxies into a seed. (The roguelike line is still alive: NetHack 5.0.0 came out on May 2, 2026.) Production-side generation is in [strand 4](4-ai-in-game-development.md).

**Strategy games gave players rivals, and the rivals cheated.** *Civilization* (Sid Meier and Bruce Shelley, 1991) set two to seven computer nations against the player, each with a character. Meier's rule: "If you've got a feature that makes the AI look stupid, take it out." He cut multiplayer alliances because the computer used them so well that players thought it was cheating; at higher difficulties the AI does get bonuses, and *StarCraft II* names its hardest levels "Cheater". The most famous Civ AI story is false: "Nuclear Gandhi", a supposed overflow bug, was added to TV Tropes in 2012 and debunked by Meier's memoir in 2020; then *Civilization V* gave Gandhi the highest nuke values in the game as a joke. Players tell stories about AI, and designers write the folklore back in. *Alpha Centauri* (1999) gave its seven faction leaders ideologies and what Brian Reynolds thought was his best diplomatic AI.

**Shooters and stealth games built the craft.** Finite-state machines ran the 1990s. *Thief* (1998) built a genre on the player modeling what a guard can see and hear. Damian Isla's GDC 2005 paper on *Halo 2* introduced the behavior tree, the industry's default way of authoring NPC decisions for the next twenty years. Jeff Orkin's planner for *F.E.A.R.* (2005), Goal-Oriented Action Planning, adapted the STRIPS planner from 1970s academic AI: three states, 70 goals, 120 actions, and soldiers who flank and flush you out; GameSpot called them "the smartest, most aggressive, most tactically oriented AI opponents that we've ever encountered."

**Some games made the AI the thing you care for.** *Creatures* (Steve Grand, 1996) gave each Norn a neural network of about 1,000 neurons and an artificial biochemistry; you taught it words by stroking and slapping. *Black & White* (Lionhead, 2001; creature AI by Richard Evans) shipped an academic architecture (beliefs, desires and intentions, perceptrons, decision trees) as a giant pet. *The Sims* (Maxis, February 2000) put the intelligence in the objects: a Sim chooses among things that offer to satisfy its needs. (That "smart object" model is widely described but was not confirmed on a primary source.)

**Then the AI started managing the player.** Naughty Dog's *Crash Bandicoot* (1996) quietly adjusted difficulty ("help weaker players without changing the game for the better players"); *Resident Evil 4* (2005) graded the player from 1 to 10 in secret. [*Left 4 Dead*'s AI Director](items/left-4-dead-ai-director.md) (Valve, November 2008) went furthest: it estimates each survivor's "emotional intensity" and cycles the horde through build-up, peak, fade and relax, so the AI's opponent is the player's experience. *Alien: Isolation* (2014) split its monster into two brains: a director that always knows where you are and an alien that has to find you. [*Shadow of Mordor*'s Nemesis system](items/nemesis-system.md) (2014) made enemies remember you, promoting the orc who killed you; Warner Bros. patented it (granted 2021, expected to run to 2036), and no game outside the series has used it. Racing games learned from players: *Forza*'s Drivatars (from 2005, in the cloud from 2013) and Sony AI's GT Sophy, a superhuman racer (*Nature*, February 2022) tuned to race fair rather than win and shipped in *Gran Turismo 7* (2023).

**[*Façade*](items/facade.md) (Mateas and Stern, July 2005) is the bridge.** You type anything to Trip and Grace, a couple whose marriage comes apart over one evening; hundreds of hand-written rules map your words to about 30 discourse acts, and a drama manager picks the next story beat. Every LLM character since has re-run *Façade*'s experiment with a different language engine.

**Language models arrived through a hackathon.** [*AI Dungeon*](items/ai-dungeon.md) (Nick Walton, May 2019 on GPT-2; *AI Dungeon 2*, December 2019) was the first mass-market game whose content was generated live by a large language model, and the first to hit the moderation and privacy problems that followed. Stanford and Google's "Generative Agents" (April 2023) put 25 LLM characters in a *Sims*-like town called Smallville, where one agent's plan for a Valentine's Day party spread into invitations and dates. NVIDIA's ACE (the Kairos ramen-shop demo, May 2023; *Covert Protocol* with Inworld, 2024; PUBG Ally, a 2-billion-parameter teammate running on the player's own GPU, in beta June 2026), Ubisoft's NEO NPC (2024) and Teammates (2025), and indie games (*Vaudeville*, *1001 Nights*, *Retail Mage*, *Suck Up!*) followed. Epic's AI Darth Vader in *Fortnite* (May 2025) put a licensed character's voice into an LLM for millions of players and drew SAG-AFTRA's charge within three days. Koei Tecmo's *RyzaChat: AI* (August 2026) billed itself as "an ethical AI adventure": its voice comes only from the original actor's recorded clips. Inworld, once the NPC company, now sells voice and inference infrastructure.

**Now the model generates the game.** Google's GameNGen (August 2024) ran *DOOM* inside a diffusion model at 20 frames a second; Decart's Oasis (October 2024) did the same for a *Minecraft*-like world. DeepMind's Genie line went from 2D (February 2024) to a minute of 3D (Genie 2, December 2024), to real-time 720p worlds that hold together for minutes (Genie 3, August 2025), to Project Genie for subscribers (January 2026), to Genie 4 (October 27, 2026), which generates sound and dialogue along with the world. Microsoft's playable *Quake II* demo (April 2025) forgot anything out of view for more than about a second. The arc runs from a relay machine pretending to think to a model hallucinating the playfield itself, and with Genie 4 the generated world and the generated character have started to merge.

## Key dates

| Date | Event |
| --- | --- |
| 1940 | Westinghouse's Nimatron plays Nim at the New York World's Fair |
| Apr 1962 | *Spacewar!*: two players, no computer opponent |
| Jun–Jul 1978 | *Space Invaders*: the speed-up kept from a hardware accident |
| 1978 | *Beneath Apple Manor*; Sargon wins the first microcomputer chess tournament |
| May 22, 1980 | *Pac-Man* location test (Japan release July, US October) |
| 1980 | *Rogue* ships with 4BSD |
| Sept 20, 1984 | *Elite* |
| Jul 28, 1987 | NetHack (5.0.0 on May 2, 2026) |
| Sept 1991 | *Civilization* |
| Nov 1996 | *Creatures* (Europe) |
| 1996 | *Crash Bandicoot*'s dynamic difficulty |
| Mar 31, 1998 | *StarCraft* |
| Dec 1, 1998 | *Thief: The Dark Project* |
| Feb 9, 1999 | *Alpha Centauri* |
| Feb 4, 2000 | *The Sims* |
| Mar 27, 2001 | *Black & White* |
| Jan 11, 2005 | *Resident Evil 4*'s hidden difficulty scale |
| Mar 2005 | Isla's *Halo 2* behavior-tree paper (GDC 2005) |
| Jul 2005 | *Façade* (Slamdance Grand Jury Prize, 2006) |
| Oct 18, 2005 | *F.E.A.R.* and GOAP; Orkin's "Three States and a Plan" at GDC 2006 |
| 2005 / Nov 22, 2013 | *Forza*'s Drivatars; in the cloud with *Forza Motorsport 5* |
| Nov 18, 2008 | *Left 4 Dead* and the AI Director (Booth's AIIDE talk, 2009) |
| Jul 17, 2012 | "Nuclear Gandhi" appears on TV Tropes (debunked Sept 8, 2020) |
| Sept 30, 2014 | *Shadow of Mordor* and the Nemesis system (patent granted Feb 23, 2021) |
| Oct 7, 2014 | *Alien: Isolation* |
| May / Dec 2019 | *AI Dungeon* on GPT-2; *AI Dungeon 2* |
| Feb 9, 2022 | GT Sophy (*Nature*); permanent in *Gran Turismo 7* Nov 2, 2023 |
| Apr 7, 2023 | Generative Agents ("Smallville") |
| May 28, 2023 | NVIDIA ACE's Kairos demo |
| Jun 30, 2023 | *Vaudeville* early access |
| Feb 23, 2024 | DeepMind's Genie |
| Mar 19, 2024 | Ubisoft NEO NPC; NVIDIA and Inworld's *Covert Protocol* |
| Aug 27, 2024 | GameNGen runs *DOOM* in a diffusion model |
| Oct 31, 2024 | Decart's Oasis |
| Nov 12, 2024 | *Retail Mage* |
| Dec 4, 2024 | Genie 2 |
| Mar 28, 2025 | *inZOI* early access (Smart Zoi on NVIDIA ACE) |
| Apr 4, 2025 | Microsoft's playable *Quake II* world model |
| May 16, 2025 | *Fortnite*'s AI Darth Vader |
| Aug 5, 2025 | Genie 3 |
| Oct 1, 2025 | *Suck Up!* on Steam |
| Nov 14, 2025 | *Where Winds Meet* global launch, with chatbot NPCs |
| Nov 21, 2025 | Ubisoft's Teammates |
| Jan 29, 2026 | Project Genie |
| Jun 17–30, 2026 | PUBG Ally beta, on-device |
| Aug 2026 | *RyzaChat: AI* (Japan) |
| Oct 27, 2026 | Genie 4, with generated audio and dialogue |

## Start here

1. **Play or watch *Façade*,** then read Tommy Thompson's "The Story of Façade" (https://www.gamedeveloper.com/design/the-story-of-facade-the-ai-powered-interactive-drama). It is the 2005 version of what every LLM-character company is attempting, with a drama manager on top.

   ![youtube: Façade trailer (2005)](https://www.youtube.com/watch?v=GmuLV9eMTkg)

   Source: Procedural Arts, the creators' own channel.

2. **Read Michael Booth's "The AI Systems of Left 4 Dead" slides** (https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf), with the ghosts chapter of Jamey Pittman's *Pac-Man Dossier* (https://www.gamedeveloper.com/design/the-pac-man-dossier) as a warm-up. Together: game AI is about authored experience and pacing, not intelligence.

3. **Watch Genie 4, then the Generative Agents talk:** the two frontiers of 2023–26, generated worlds and generated people.

   ![youtube: Genie 4: A new generation of world simulation (Google DeepMind, 2026)](https://www.youtube.com/watch?v=sFfPkUJd_Jk)

   Source: Google DeepMind, October 27, 2026.

   ![youtube: Generative Agents: Interactive Simulacra of Human Behavior (2023)](https://www.youtube.com/watch?v=ZdoU9vI2yCg)

   Source: ACM SIGCHI.

## More to watch

![youtube: Classic Game Postmortem: Ms. Pac-Man (GDC)](https://www.youtube.com/watch?v=rhM8NAMW_VQ)

Source: GDC's channel. *Ms. Pac-Man* (1982) added randomness to the ghosts.

![youtube: Rogue panel: Glenn Wichman, Michael Toy and Ken Arnold](https://www.youtube.com/watch?v=4IkrZkUV01I)

Source: Roguelike Celebration, the conference's own channel.

![youtube: Classic Game Postmortem: Sid Meier's Civilization (GDC)](https://www.youtube.com/watch?v=AJ-auWfJTts)

Source: GDC's channel.

![youtube: Peter Molyneux Explains the Design of Black and White (GDC)](https://www.youtube.com/watch?v=69HTviSeQeE)

Source: GDC's channel.

![youtube: Goal-Oriented Action Planning: Ten Years of AI Programming (GDC 2015)](https://www.youtube.com/watch?v=gm7K68663rA)

Source: GDC's channel; a panel of Monolith developers (Orkin is not on it).

![youtube: Building a Better Battle (Damian Isla)](https://www.youtube.com/watch?v=vMvbiqkAxO4)

Source: Damian Isla's own channel; year and venue not confirmed.

![youtube: The Making of Gran Turismo Sophy](https://www.youtube.com/watch?v=l948hMaTPuo)

Source: Sony AI.

![youtube: NVIDIA ACE for Games Sparks Life Into Virtual Characters With Generative AI (Kairos demo, 2023)](https://www.youtube.com/watch?v=5R8xZb6J3r0)

Source: NVIDIA GeForce.

![youtube: NVIDIA ACE, Introducing PUBG Ally, First Co-Playable Character](https://www.youtube.com/watch?v=wEKUSMqrbzQ)

Source: NVIDIA GeForce.

![youtube: The AI Behind Teammates, Ubisoft's Experimental Interactive Characters](https://www.youtube.com/watch?v=y6uBzRpqT3w)

Source: NVIDIA Game Developer.

![youtube: Genie 3: Creating dynamic worlds that you can navigate in real-time (2025)](https://www.youtube.com/watch?v=PDKhUknuQDg)

Source: Google DeepMind.

![youtube: Introducing Muse (Microsoft, 2025)](https://www.youtube.com/watch?v=5DhNBXrgl5o)

Source: Microsoft.

## Not verified, or corrections

- ***Pong* had no computer paddle**; Bushnell called it "multiplayer-only". *Pac-Man*'s May 22, 1980 is the location test, not the release.
- **Don't link Chad Birch's "Understanding Pac-Man Ghost Behavior"**: its site now serves gambling spam. Pittman's *Dossier* is the source used here.
- Not confirmed on an opened page: *Elite*'s "22 KB"; Civilization's specific AI bonuses by difficulty; the *Half-Life* marines' squad tactics; Doom's state machine; *The Sims*' smart-object model; GT Sophy 3.0 (December 2025); whether SAG-AFTRA dropped the Vader charge; the developer of *Where Winds Meet*; *Whispers from the Star* (August 2025).
- Not researched: *Total War*, *Stellaris*, and the diplomacy AI of *Civilization* IV–VI. Missed and worth adding: *Galaxian* (1979), Rog-O-Matic (1983, an expert system that plays *Rogue*), *Oblivion*'s Radiant AI and *S.T.A.L.K.E.R.*'s A-Life, *RimWorld*'s AI storytellers (descendants of the L4D Director), *Versu* and *Prom Week*, and companion AI (*BioShock Infinite*'s Elizabeth, *The Last of Us*).

## For the game and the class

*Proposal (HI), not a plan. Marlon decides.*

- **Pac-Man's lesson for *Data Center*'s AI deck.** GL's AI is "a deck and a rule table everyone can read". Give it personalities the way Namco did: three or four one-line expansion rules (go for the cheapest power, go for the most water, follow the last player who sold to it, retreat when watched), each with a name and a color. Players will read character into readable rules, which is the point, and students can write new ones in the editor.
- **A Director as an optional rule.** A *Left 4 Dead*-style pacing rule that watches the table's pressure (trust falling, nodes failing) and eases or escalates the AI's next draw. It makes a good debate: is the AI managing the city, or managing the players' experience? Label it plainly in the `rhetoric` field.
- **Nemesis memory.** The AI remembers who opposed it: the player who regulated it last round becomes its target next round. A small rule with a large story effect.
- **Talk to the AI (Nov 18).** For students building "improvisational AI co-stars that challenge and speak back", *Façade* is the ancestor and the PUBG Ally, *Suck Up!* and Fortnite Vader cases are the present, with their failures (swearing within hours, the labor charge). A ten-minute pairing of the *Façade* trailer with the Vader story frames the design brief: what keeps a co-star on script, and who owns its voice?
- **Generated worlds as a provocation.** Show Genie 4 for two minutes and ask whether *Data Center*'s map should ever be generated rather than built from the students' index-card database. (A proposal for discussion; the game stays a readable rule system.)
