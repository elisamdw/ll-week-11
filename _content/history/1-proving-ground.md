---
title: "Strand 1: Games as AI's proving ground"
description: "From Shannon's chess paper and Samuel's checkers to Deep Blue, AlphaGo, poker, Dota, Diplomacy, and LLM agents playing Pokémon."
order: 1
kind: strand
year: "1912–2026"
creators: []
sources:
  - https://en.wikipedia.org/wiki/El_Ajedrecista
  - https://en.wikipedia.org/wiki/Turochamp
  - https://api.crossref.org/works/10.1080/14786445008521796
  - https://en.wikipedia.org/wiki/Nimrod_(computer)
  - https://en.wikipedia.org/wiki/OXO_(video_game)
  - https://en.wikipedia.org/wiki/Arthur_Samuel_(computer_scientist)
  - https://www.ibm.com/history/early-games
  - https://api.crossref.org/works/10.1147/rd.33.0210
  - https://en.wikipedia.org/wiki/Dartmouth_workshop
  - https://www-formal.stanford.edu/jmc/newborn/newborn.html
  - https://en.wikipedia.org/wiki/Mac_Hack
  - https://en.wikipedia.org/wiki/Belle_(chess_machine)
  - https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov
  - https://en.wikipedia.org/wiki/TD-Gammon
  - https://en.wikipedia.org/wiki/Chinook_(computer_program)
  - https://api.crossref.org/works/10.1126/science.1144079
  - https://skatgame.net/mburo/log.html
  - https://en.wikipedia.org/wiki/IBM_Watson
  - https://arxiv.org/abs/1312.5602
  - https://www.nature.com/articles/nature14236
  - https://deepmind.google/discover/blog/agent57-outperforming-the-human-atari-benchmark/
  - https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol
  - https://deepmind.google/research/breakthroughs/alphago/
  - https://far.ai/post/2023-07-superhuman-go-ais/
  - https://www.cmu.edu/news/stories/archives/2017/january/AI-beats-poker-pros.html
  - https://ai.meta.com/blog/pluribus-first-ai-to-beat-pros-in-6-player-poker/
  - https://en.wikipedia.org/wiki/OpenAI_Five
  - https://deepmind.google/discover/blog/alphastar-grandmaster-level-in-starcraft-ii-using-multi-agent-reinforcement-learning/
  - https://ai.meta.com/research/cicero/
  - https://deepmind.google/discover/blog/capture-the-flag-the-emergence-of-complex-cooperative-agents/
  - https://arxiv.org/abs/1909.07528
  - https://arxiv.org/abs/2305.16291
  - https://deepmind.google/en/blog/sima-2-an-agent-that-plays-reasons-and-learns-with-you-in-virtual-3d-worlds/
  - https://www.anthropic.com/news/visible-extended-thinking
  - https://techcrunch.com/2025/05/03/googles-gemini-has-beaten-pokemon-blue-with-a-little-help
  - https://www.lesswrong.com/posts/sehJYg5Yny9fvpbpt/a-year-late-claude-finally-beats-pokemon
  - https://www.anthropic.com/news/claude-fable-5-mythos-5
  - https://blog.google/innovation-and-ai/models-and-research/google-deepmind/kaggle-game-arena-updates/
  - https://arxiv.org/abs/2411.13543
  - https://api.crossref.org/works/10.1038/s41586-026-11036-y
  - https://ai.sony/archive/what-happened-after-the-nature-paper-ace-vs.-professional-players
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026, from a research subagent's notes"
---

# Strand 1: Games as AI's proving ground

[History index](README.md) · [Timeline](timeline.md) · next: [Strand 2, AI inside games](2-ai-inside-games.md)

Item files: [Deep Blue v. Kasparov](items/deep-blue-kasparov.md) · [AlphaGo](items/alphago.md)

## The essay

For seventy years, games have been where AI shows what it can do. In 1965 the Soviet mathematician Alexander Kronrod called chess "the *Drosophila* of artificial intelligence", and John McCarthy, who repeated the line in *Science* in 1997, explained why: like the fruit fly, a game is cheap, fast, and measurable. It has clear rules, a clear winner, and, for chess and Go, a human rating scale to climb.

**The founding papers came before the machines could play.** Alan Turing and David Champernowne wrote a chess program, Turochamp, in 1948; with no computer able to run it, Turing played it by hand in 1952, taking up to half an hour a move, and lost in 29 moves. Claude Shannon's "Programming a Computer for Playing Chess" (presented March 1949, published 1950) set out minimax search with an evaluation function and estimated the game tree at about 10^120 positions. Nearly every chess program through Deep Blue refines Shannon's design. Within a year of stored-program computers existing, games were their showpieces: Ferranti's Nim-playing Nimrod at the Festival of Britain (May 1951), Strachey's draughts on the Manchester Mark 1, Douglas's noughts and crosses (OXO) on Cambridge's EDSAC (1952).

**Learning began with checkers.** Arthur Samuel at IBM wrote a checkers program in 1952 that improved by playing against itself, showed it on television in 1956, and published "Some Studies in Machine Learning Using the Game of Checkers" in 1959; IBM credits him with coining "machine learning". The win over Robert Nealey in 1962 is often overstated: IBM's own history calls Nealey a "self-described 'checkers master'". Samuel's demonstration also set a pattern IBM would repeat twice: a game win as corporate showcase.

**Then came the long climb in chess.** Mac Hack VI (Greenblatt, MIT, 1967) was the first program to win a tournament game against a human; Belle (Bell Labs) reached master level in 1983. The climb was mostly hardware and search engineering. It ended with IBM's [Deep Blue](items/deep-blue-kasparov.md): Garry Kasparov won the 1996 match 4–2, and Deep Blue won the 1997 rematch in New York 3½–2½ (May 3–11). McCarthy's complaint that year was that computer chess had become sport rather than science: winning had replaced understanding.

**Learning came back through backgammon and Atari.** Gerald Tesauro's TD-Gammon (IBM, 1991–95) taught a neural network by self-play and changed how top humans play certain opening rolls, the first time a machine changed expert human practice. Chinook (Jonathan Schaeffer, Alberta) took the checkers world title in 1994 when Marion Tinsley withdrew ill, and in 2007 Schaeffer's team proved that perfect checkers is a draw. Logistello beat the Othello world champion 6–0 three months after Deep Blue, and hardly anyone remembers, which says something about which games carry cultural weight. IBM's Watson won *Jeopardy!* in February 2011, moving the contest from boards to language and puns. DeepMind's DQN (2013 arXiv; *Nature*, February 2015) learned 49 Atari games from pixels and score, and its *Breakout* agent learning to tunnel behind the wall became the emblem of a machine discovering a strategy nobody programmed.

**Go was supposed to hold out for a decade.** [AlphaGo](items/alphago.md) beat Fan Hui in October 2015 and Lee Sedol 4–1 in Seoul in March 2016. Move 37 in game 2 became the standard example of machine creativity; Lee's Move 78 in game 4, the one human win, became the counterexample. AlphaGo Zero (2017) learned without human games, AlphaZero (2017–18) did the same for chess and shogi, and MuZero (2019–20) learned the rules themselves. Lee retired in 2019: "Even if I become the number one, there is an entity that cannot be defeated." In 2022–23, FAR AI showed that an amateur, Kellin Pelrine, could beat superhuman Go programs with a taught trick: superhuman is not the same as robust.

**Then the games got hidden information, teams, and talk.** Libratus (CMU, January 2017) beat four poker professionals at heads-up no-limit hold'em; Pluribus (CMU and Facebook, 2019) beat professionals at six-player poker on under $150 of cloud compute. OpenAI's Dota 2 bots beat Dendi one-on-one at The International 2017 and the world champions OG in April 2019. DeepMind's AlphaStar reached Grandmaster at *StarCraft II* (2019), and the fight over its camera view and click rate taught a lesson in how a contest is defined. DeepMind's Capture the Flag agents and OpenAI's hide-and-seek agents (both 2019) showed a different kind of proving ground: environments that produce behavior nobody designed, including exploiting bugs in the physics engine. Meta's Cicero (*Science*, November 22, 2022) played *Diplomacy* in the top 10% of an online league by negotiating in plain English: the first proving ground where language was the main move. ChatGPT appeared a week later.

**Now the champion match has given way to the long game.** Since 2023 the test has been whether a language-model agent can stay on task: Voyager in *Minecraft* (2023), DeepMind's SIMA (2024) and SIMA 2 (November 2025) playing commercial games through screen and keyboard, and above all Pokémon. Anthropic streamed Claude 3.7 Sonnet playing *Pokémon Red* in February 2025; Gemini 2.5 Pro finished *Blue* in May 2025 on an independent stream with acknowledged developer help; Claude Opus 4.7 finished *Red* in May 2026; Anthropic announced on June 9, 2026 that Claude Fable 5 had finished *FireRed* with a minimal, vision-only harness. Every one of these results depends on the harness: the tools, the help, the step limit. Google's Kaggle Game Arena (from August 2025; Werewolf and poker added February 2026) made games an LLM benchmark again, because opponents keep the difficulty rising where static tests saturate. In 2026 a team from CMU and others reported Ataraxos beating Stratego's top player (*Nature*, September 30), and Sony AI's Ace robot beat professional table-tennis players.

Two readings run through the whole strand. One is triumphal: each game falls, and each fall is a step toward general intelligence. The other is McCarthy's: a game is a narrow, well-lit room, and winning in it can hide how little carries over. Most of the interesting history sits between the two.

## Key dates

| Date | Event |
| --- | --- |
| 1912–14 | Torres Quevedo's El Ajedrecista plays a king-and-rook endgame (Paris debut 1914) |
| 1948 / 1952 | Turing and Champernowne write Turochamp; Turing plays it by hand (1952) |
| Mar 9, 1949 / Mar 1950 | Shannon's chess paper presented, then published in *Philosophical Magazine* |
| May 5, 1951 | Nimrod plays Nim at the Festival of Britain |
| 1952 | Strachey's draughts on the Ferranti Mark 1; Douglas's OXO on EDSAC; Samuel's first checkers program |
| 1956 | Samuel's learning program on TV (Feb 24, date from search snippets); the Dartmouth workshop (summer) |
| Jul 1959 | Samuel, "Some Studies in Machine Learning Using the Game of Checkers" |
| 1962 | Samuel's program beats Robert Nealey |
| 1965 | Kronrod: chess is "the *Drosophila* of artificial intelligence" |
| 1967 | Mac Hack VI wins a tournament game against a human |
| 1983 | Belle reaches master level |
| Feb 10–17, 1996 | Kasparov beats Deep Blue 4–2 in Philadelphia |
| May 3–11, 1997 | Deep Blue beats Kasparov 3½–2½ in New York |
| Aug 4–7, 1997 | Logistello beats Othello champion Takeshi Murakami 6–0 |
| 1992–95 | TD-Gammon 2.0 (1992); Tesauro's *CACM* paper (March 1995) |
| 1994 | Chinook becomes checkers champion when Tinsley withdraws |
| Jul 19, 2007 | "Checkers Is Solved" (*Science*) |
| Feb 14–16, 2011 | Watson wins *Jeopardy!* |
| Dec 19, 2013 / Feb 25, 2015 | DQN on arXiv; DQN in *Nature* |
| Oct 2015 / Jan 27, 2016 | AlphaGo beats Fan Hui 5–0; *Nature* paper |
| Mar 9–15, 2016 | AlphaGo beats Lee Sedol 4–1 in Seoul |
| Jan 30, 2017 | Libratus ends "Brains Vs. AI" up $1,766,250 in chips |
| May 2017 | AlphaGo beats Ke Jie 3–0 at Wuzhen and retires |
| Aug 2017 | OpenAI's 1v1 Dota bot beats Dendi at The International |
| Oct 19, 2017 | AlphaGo Zero (*Nature*) |
| Dec 5, 2017 / Dec 7, 2018 | AlphaZero on arXiv; in *Science* |
| Jan 24, 2019 | AlphaStar's matches against TLO and MaNa revealed (played December 2018) |
| Apr 13, 2019 | OpenAI Five beats OG |
| May 31, 2019 | DeepMind's Capture the Flag agents in *Science* |
| Jul 11, 2019 | Pluribus beats professionals at six-player poker |
| Sept 17, 2019 | OpenAI's hide-and-seek agents |
| Oct 30, 2019 | AlphaStar reaches Grandmaster (*Nature*) |
| Nov 19, 2019 | Lee Sedol retires |
| Mar 31, 2020 | Agent57 above the human baseline on all 57 Atari games |
| Dec 23, 2020 | MuZero (*Nature*) |
| Nov 22, 2022 | Cicero at *Diplomacy* (*Science*) |
| Jul 14, 2023 | FAR AI: an amateur beats superhuman Go AIs with a taught exploit |
| May 25, 2023 | Voyager plays *Minecraft* |
| Feb 24, 2025 | Claude 3.7 Sonnet and the Claude Plays Pokémon stream |
| May 3, 2025 | Gemini 2.5 Pro finishes *Pokémon Blue* (independent stream, with help) |
| Aug 5–7, 2025 | Kaggle Game Arena chess exhibition for LLMs (o3 wins) |
| Nov 13, 2025 | DeepMind's SIMA 2 |
| Feb 2, 2026 | Kaggle Game Arena adds Werewolf and poker |
| Apr 22, 2026 | Sony AI's Ace table-tennis robot (*Nature*) |
| May 2026 | Claude Opus 4.7 finishes *Pokémon Red* (reported on LessWrong, May 16) |
| Jun 9, 2026 | Anthropic: Claude Fable 5 finishes *Pokémon FireRed* with a vision-only harness |
| Sept 30, 2026 | Ataraxos beats Stratego's top player (*Nature*; result from secondary coverage) |

## Start here

1. **Watch *AlphaGo – The Movie*** (Greg Kohs, 2017), which DeepMind posted free in 2020. It is the best single artifact of the strand: Move 37, Move 78, and what losing cost Lee Sedol.

   ![youtube: AlphaGo – The Movie (2017), full documentary](https://www.youtube.com/watch?v=WXuK6gekU1Y)

   Source: Google DeepMind's channel.

2. **Read Shannon (1950) beside McCarthy's one-page "AI as Sport" (1997)** (https://www-formal.stanford.edu/jmc/newborn/newborn.html): the founding blueprint and the founding complaint. Watch the Computer History Museum's short history alongside.

   ![youtube: Early AI: Computer Chess (Computer History Museum)](https://www.youtube.com/watch?v=QxrLxxiKLLk)

   Source: Computer History Museum.

3. **Watch Claude play Pokémon, then ask what the result measures.** The shift from "beat the champion" to "stay on task for days", and the harness question.

   ![youtube: Claude Fable 5 beats Pokémon FireRed only using vision (2026)](https://www.youtube.com/watch?v=Ty_50J84fMY)

   Source: Anthropic's Claude channel, June 9, 2026.

   ![youtube: Lessons on AI agents from Claude Plays Pokemon (2025)](https://www.youtube.com/watch?v=CXhYDOvgpuU)

   Source: Anthropic's channel, April 24, 2025.

## More to watch

![youtube: DQN Breakout (DeepMind)](https://www.youtube.com/watch?v=TmPfTpjtdgg)

Source: Google DeepMind. One minute: the agent learns to tunnel behind the wall.

![youtube: Watson and the Jeopardy! Challenge (IBM Research)](https://www.youtube.com/watch?v=P18EdAKuC1U)

Source: IBM Research.

![youtube: Facebook, Carnegie Mellon build first AI that beats pros in 6-player poker (2019)](https://www.youtube.com/watch?v=luFFSi4IDUk)

Source: AI at Meta.

![youtube: OpenAI Five vs. OG, Game 1, OpenAI Five Finals (2019)](https://www.youtube.com/watch?v=LVrpWrvHVNE)

Source: OpenAI.

![youtube: DeepMind StarCraft II Demonstration (2019)](https://www.youtube.com/watch?v=cUTMhmVh1qs)

Source: Google DeepMind.

![youtube: Multi-Agent Hide and Seek (OpenAI, 2019)](https://www.youtube.com/watch?v=kopoLzvh5jY)

Source: OpenAI.

![youtube: CICERO: The first AI to play Diplomacy at a human level (Meta, 2022)](https://www.youtube.com/watch?v=lNtBiZaLA0k)

Source: AI at Meta.

![youtube: Introducing SIMA 2 (Google DeepMind, 2025)](https://www.youtube.com/watch?v=Zphax4f6Rls)

Source: Google DeepMind.

![youtube: Kaggle Game Arena: Werewolf, Day 1 Highlights (2026)](https://www.youtube.com/watch?v=vTx4VqpLM_I)

Source: Kaggle.

![youtube: The Thinking Game, full documentary (Google DeepMind)](https://www.youtube.com/watch?v=d95J8yzvjbQ)

Source: Google DeepMind. Demis Hassabis, games, and AlphaFold.

## Not verified, or left out

- Samuel's TV date (Feb 24, 1956) and the details of the 1962 Nealey game rest on search snippets; the Chinook project's page returned 404.
- Pelrine's "14 of 15 games" against KataGo (press of February 2023) was not opened; FAR AI's own post says only that he beat KataGo "in 2022" and repeatedly.
- The exact Wuzhen dates (May 23–27, 2017) and OpenAI Five's April 13 date are from snippets. openai.com refused requests, so OpenAI's own posts were not read.
- GPT-5 finishing *Red* (August 2025), GPT-6 "Astra" finishing *FireRed* (September 2026) and the non-LLM Jev (September 2026) come from independent streams reported by single outlets.
- Ataraxos's score (15 wins, 1 loss, 4 draws) is from secondary coverage; only the *Nature* record was opened.
- Missing here and worth adding: MENACE (Donald Michie's 1961 matchbox tic-tac-toe learner, a ready classroom activity), Alberta's Polaris and Cepheus at poker, DeepMind's DeepNash at Stratego (*Science*, December 2022), and Sony's Gran Turismo Sophy (in [strand 2](2-ai-inside-games.md)).

## For the game and the class

*Proposal (HI), not a plan. Marlon decides.*

- **A "proving ground" ruleset for *Data Center*.** The AI grows by winning games: each round it takes on a benchmark (chess, Go, poker, Diplomacy, Pokémon) and, on a win, unlocks a capability card. The players fund it, because each win raises investment and public trust. The rhetoric field says what McCarthy said: winning is standing in for understanding.
- **Move 37 as a card.** One card in the AI's deck that players can't predict and can't read until it resolves: a move "with a 1 in 10,000 chance" that turns out to work. Lee's Move 78 as the human reply card: one per game, a single exploit that beats the machine (FAR AI's lesson that superhuman is not robust).
- **The harness question for Nov 18.** Show the Fable 5 *FireRed* time-lapse, then ask the class what the harness did: which tools, what help, how many steps. It is the same question students face with their own bots and co-stars.
- **MENACE in the room.** If there's a bag of beads and some matchboxes, a 20-minute MENACE build shows reinforcement learning with no computer at all (verify the design before class).
