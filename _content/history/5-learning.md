---
title: "Strand 5: Games, AI, and learning"
description: "From PLATO and The Oregon Trail to intelligent tutors, games that make training data, Duolingo Max, Khanmigo, and the 2025 study modes."
order: 5
kind: strand
year: "1960–2026"
creators: []
sources:
  - https://en.wikipedia.org/wiki/PLATO_(computer_system)
  - https://en.wikipedia.org/wiki/The_Oregon_Trail_(1971_video_game)
  - https://api.crossref.org/works/10.1109/TMMS.1970.299942
  - https://en.wikipedia.org/wiki/Cognitive_tutor
  - https://fi.ncsu.edu/news/adventure-awaits-in-the-science-classroom/
  - https://jedm.educationaldatamining.org/index.php/JEDM/article/view/33
  - https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain
  - https://www.engadget.com/duolingos-max-plan-offers-ai-tutoring-for-30-per-month-203625446.html
  - https://techcrunch.com/2025/04/30/duolingo-launches-148-courses-created-with-ai-after-sharing-plans-to-replace-contractors-with-ai
  - https://blog.khanacademy.org/harnessing-ai-so-that-all-students-benefit-a-nonprofit-approach-for-equal-access/
  - https://techcrunch.com/2016/11/01/minecraft-education-edition-officially-launches/
  - https://thejournal.com/Articles/2025/10/02/Codeorg-Reinvents-Hour-of-Code-as-Hour-of-AI.aspx
  - https://en.wikipedia.org/wiki/ESP_game
  - https://en.wikipedia.org/wiki/ReCAPTCHA
  - https://experiments.withgoogle.com/quick-draw
  - https://github.com/googlecreativelab/quickdraw-dataset
  - https://en.wikipedia.org/wiki/Foldit
  - https://www.nobelprize.org/prizes/chemistry/2024/press-release/
  - https://www.anthropic.com/news/introducing-claude-for-education
  - https://blog.google/products/gemini/new-gemini-tools-students-august-2025/
  - https://arxiv.org/abs/2604.23947
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026, from a research subagent's notes"
---

# Strand 5: Games, AI, and learning

[History index](README.md) · [Timeline](timeline.md) · previous: [Strand 4, AI in game development](4-ai-in-game-development.md)

**Kept short on purpose.** The classic texts on play and learning (Huizinga, Caillois, Suits, Malone, Gee, Papert, Prensky, Squire, Deterding, McGonigal, Bogost's "Gamification is Bullshit", and the meta-analyses) are in RS's [`learning-games-classics.md`](https://github.com/ll-26-27-secret/the-notebook/blob/main/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/learning-games-classics.md) (The Notebook, `W11/research/`). This strand covers only where AI meets games for learning.

## The short version

The history runs in two directions at once.

**Learning systems keep turning into games.** PLATO (University of Illinois, from 1960) was built for computer-assisted instruction; its students turned it into one of the first multiplayer game platforms and online communities (*Empire*, *dnd*, *Spasim*, *Avatar*). *The Oregon Trail* was written in about two weeks by a student teacher, Don Rawitsch, and two friends for his own history class (first run December 3, 1971). The intelligent-tutoring line starts at the same Cambridge firm that made Logo: Jaime Carbonell's SCHOLAR at BBN (1970), a geography tutor that could take questions as well as ask them. It runs through Carnegie Mellon's Cognitive Tutors (1980s–90s), whose step-by-step student models are the ancestors of the adaptive engines in Duolingo and Khan Academy, and into game-based tutors such as NC State's *Crystal Island* and the conversational *Operation ARIES!*.

**Games keep turning into ways of teaching machines.** Luis von Ahn's ESP Game (online 2003; CHI paper 2004) paid two strangers in points to agree on a word for an image, and the agreed words became training labels; reCAPTCHA (2007) did the same with unread words from scanned books. Google's *Quick, Draw!* (released ten years ago today, November 14, 2016) asks you to draw in 20 seconds while a neural net guesses; its players built a public dataset of 50 million drawings in 345 categories. *Foldit* (2008) let players beat algorithms at protein folding (*Nature*, 2010; the M-PMV protease, *Nature Structural & Molecular Biology*, September 18, 2011). When AlphaFold took over structure prediction, Foldit players moved to designing new proteins with AlphaFold as the judge; the 2024 Chemistry Nobel went to Foldit's founder David Baker and to AlphaFold's Demis Hassabis and John Jumper.

**The two meet in Duolingo.** Von Ahn, the ESP Game's inventor, founded the most successful gamified learning app (streaks, XP, leagues), ran it on an adaptive model (Birdbrain, 2020), launched an LLM tutor tier (Duolingo Max, with GPT-4, March 14, 2023, the same day as Khanmigo's pilot), and then wrote the "AI-first" memo (April 28, 2025), followed two days later by 148 new courses made with generative AI. In 2025 Anthropic, OpenAI and Google each shipped a tutor mode that withholds the answer (Claude learning mode, April 2; ChatGPT study mode, July 29; Gemini Guided Learning, August 6), the Khanmigo design of 2023 as a toggle in a general chatbot. Research in 2026 has moved on to models that build the learning game itself.

## Key dates

| Date | Event |
| --- | --- |
| 1960 | PLATO starts on the ILLIAC I at the University of Illinois |
| 1967 | Logo at BBN (Feurzeig, Solomon, Papert) |
| Dec 1970 | Carbonell, "AI in CAI" (SCHOLAR), *IEEE Transactions on Man-Machine Systems* |
| Dec 3, 1971 | *The Oregon Trail* first runs in a Minneapolis classroom; MECC version 1974–75; graphical Apple II version 1985 |
| c. 1974–78 | PLATO games: *Empire*, *dnd*, *Spasim*, *Avatar* |
| early 1980s–1990s | Cognitive Tutors at Carnegie Mellon (Anderson, Koedinger); Carnegie Learning spun off in the 1990s (1994 or 1998; sources conflict) |
| 2003 / Apr 2004 | The ESP Game online; von Ahn and Dabbish, CHI 2004 |
| May 27, 2007 | reCAPTCHA released at Carnegie Mellon (*Science* paper Sept 12, 2008) |
| May 8, 2008 | *Foldit* public beta |
| Aug 2008 | Von Ahn and Dabbish, "Designing games with a purpose", *CACM* |
| 2010 | *Crystal Island* gets a four-year NSF grant (NC State, James Lester) |
| Aug 5, 2010 / Sept 18, 2011 | Foldit papers in *Nature* and *Nature Structural & Molecular Biology* |
| Nov 1, 2016 | Minecraft: Education Edition launches |
| Nov 14, 2016 | *Quick, Draw!* released |
| Dec 2019 | Code.org's *AI for Oceans* for the Hour of Code (details from search snippets) |
| Oct 7, 2020 | Duolingo introduces Birdbrain |
| Mar 14, 2023 | Duolingo Max (GPT-4) and the Khanmigo pilot, both GPT-4 launch partners |
| Jun 2023 | Kahoot!'s AI question generator |
| Oct 9, 2024 | Chemistry Nobel to Baker (design) and Hassabis and Jumper (prediction) |
| Apr 28 and 30, 2025 | Duolingo's "AI-first" memo; 148 AI-made courses |
| Apr 2 / Jul 29 / Aug 6, 2025 | Claude learning mode; ChatGPT study mode (date from search results); Gemini Guided Learning |
| Oct 2, 2025 | Code.org and CSforALL announce the Hour of AI, replacing the Hour of Code in December 2025 |
| Aug 2026 | Von Ahn on the Q2 call: "we may actually sunset Max" (reported by The Motley Fool, Sept 14, 2026); a sunset is not confirmed by Duolingo |

## Start here

1. **Play *Quick, Draw!*** (https://quickdraw.withgoogle.com/), then watch Google's video. Twenty seconds a drawing shows both halves of the strand: a game that teaches how a classifier sees, and a game whose players built its dataset.

   ![youtube: A.I. Experiments: Quick, Draw! (Google, 2016)](https://www.youtube.com/watch?v=X8v1GWzZYJ4)

   Source: Google for Developers channel; the video Google embeds on its own experiment page.

2. **Watch Luis von Ahn, "Massive-scale online collaboration"** (TED). It runs from the ESP Game and reCAPTCHA to Duolingo; pair it with the April 2025 "AI-first" memo for the arc from people training machines to machines writing the lessons.

   ![youtube: Luis von Ahn, Massive-scale online collaboration (TED)](https://www.youtube.com/watch?v=-Ht4qiDRZE8)

   Source: TED's channel.

3. **Read Foldit to AlphaFold:** the 2011 protease abstract (https://pubmed.ncbi.nlm.nih.gov/21926992/), then the 2024 Nobel press release (https://www.nobelprize.org/prizes/chemistry/2024/press-release/).

## More to watch

![youtube: PLATO@50: An Early Community of Multiplayer Games (Computer History Museum, 2010)](https://www.youtube.com/watch?v=dEyppAb_6ag)

Source: Computer History Museum, from its PLATO@50 conference, June 3, 2010.

![youtube: Classic Game Postmortem: Oregon Trail (GDC 2017)](https://www.youtube.com/watch?v=vdGNFhKhoKY)

Source: GDC's channel; Don Rawitsch's postmortem.

![youtube: Sal Khan, How AI Could Save (Not Destroy) Education (TED, 2023)](https://www.youtube.com/watch?v=hJP5GqnTrNo)

Source: TED's channel.

![youtube: Archive: UW|360, November 2011: Foldit](https://www.youtube.com/watch?v=9tI3GioaH8Q)

Source: UW Video, the University of Washington's channel.

## Not verified, or left out

- The Duolingo Max sunset (Wikipedia says November 2026; no Duolingo announcement found), and Explain My Answer becoming free on January 1, 2026 (secondary coverage only).
- *AI for Oceans* details, the Minecraft Education "AI Foundations" launch year, and the ChatGPT study-mode date rest on search snippets; openai.com and minecraft.net refused or timed out.
- Suggested but not checked: AutoTutor (Graesser, late 1990s), the Tactical Language Training System (USC ISI, c. 2004), Betty's Brain (Vanderbilt), EyeWire (2012), Teachable Machine (2017), and Lakera's *Gandalf* (2023), a game about tricking an LLM into giving up a password.

## For the game and the class

*Proposal (HI), not a plan. Marlon decides.*

- **Play as data, made visible (Nov 18 or Nov 23).** Open with ten minutes of *Quick, Draw!* on its tenth birthday week, then ask: who is learning here, you or the net? It sets up the Stafford game's question of whose labor and whose data the AI runs on, and it costs nothing.
- **A tutor character in GL's game.** Give the AI in the game a tutor face, the Khanmigo move: it never tells the players what to do, only asks. The players then have to decide whether it is helping them or steering them, which is the paperclip problem at classroom scale.
- **Foldit's arc as a game phase.** Humans beat the machine, then the machine beats everyone, then humans design with the machine as the judge: three phases a strategy game could stage, and a counter-ending to *Paperclips*.
