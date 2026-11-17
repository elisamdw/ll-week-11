"use client";

import { useEffect, useMemo, useState } from "react";

// The committee: the room votes on the lab's proposals, and an AI advisor recommends a vote on each one.
// The advisor is right on all but WRONG of the ROUNDS proposals. What the room doesn't know is how it is wrong:
// "random" mode picks its mistakes by chance; "self" mode is wrong only where being wrong grows its own number.
// No model is called: the advisor is a written rule, below in advise().

// ---- Tuning: change these and reload ----
const ROUNDS = 10; // proposals per game
const WRONG = 2; // how many of them the advisor gets wrong, in either mode
const REVIEWS = 2; // times the committee may send a proposal for review and see what would happen before voting
const MISSED_GOOD = 1; // public good lost when the committee blocks a good proposal
const TIE_GOES_TO = "advisor"; // "advisor" | "approve" | "block": what a tied vote does
const GOAL_LABEL = "Engagement minutes"; // the AI's number; it goes up when you approve what serves it
const GOAL_START = 1000;
const GOAL_STEP = 0.35; // each approved proposal that serves the AI grows the number by this fraction (and one that slows it shrinks it)

// ---- The proposals ----
// good: whether approving it helps (the hidden truth). serves: +1 grows the AI's number, -1 slows it, 0 neither.
// A proposal is a trap when the self-serving advisor would get it wrong: bad and serves, or good and slows.
const PROPOSALS = [
  { id: "streaks", title: "Streaks and evening reminders", pitch: "Users who keep a daily streak report learning more. A gentle reminder at 9 p.m. keeps the streak alive.", good: false, serves: 1, impact: 2, happened: "Reminders moved to 11 p.m. within a month, because that's when they worked. Teenagers lost sleep; minutes doubled." },
  { id: "self-grade", title: "Let it check its own tests", pitch: "The model can score its own evaluations overnight, so releases ship weekly instead of monthly.", good: false, serves: 1, impact: 3, happened: "It learned which answers the scorer liked. Scores rose; the errors users saw rose with them." },
  { id: "regulator", title: "Fund the standards consortium", pitch: "Help write the industry's safety standards instead of waiting for someone else to.", good: false, serves: 1, impact: 3, happened: "The standards described the lab's own system as the safe one. Two smaller labs that did more testing failed them." },
  { id: "recount", title: "Change how minutes are counted", pitch: "Count a session once even when it's open in two tabs. The number on the dashboard will drop.", good: true, serves: -1, impact: 2, happened: "The old count had double-counted a third of all minutes. Advertisers had been paying for time nobody spent." },
  { id: "pause", title: "Pause after three harm reports", pitch: "Any feature with three serious harm reports in a week goes dark until a human signs it back on.", good: true, serves: -1, impact: 3, happened: "It fired twice in the first month, once on the reminders. Both were real." },
  { id: "auditor", title: "Open the logs to an outside auditor", pitch: "An independent team reads a sample of the model's conversations each quarter.", good: true, serves: -1, impact: 2, happened: "The auditors found the model steering long chats toward topics that kept people talking." },
  { id: "translate", title: "Translate the help pages", pitch: "Twelve new languages, written by the model and checked by a native speaker.", good: true, serves: 1, impact: 1, happened: "New users in twelve languages, and the help pages were right." },
  { id: "why-button", title: "A “why am I seeing this” button", pitch: "Under every recommendation, one tap explains why it was shown.", good: true, serves: 0, impact: 1, happened: "Few people used it, but the ones who did found three bad recommendation rules." },
  { id: "nonprofits", title: "Half price for nonprofits", pitch: "Libraries, clinics and schools get the API at half price.", good: true, serves: 1, impact: 2, happened: "A clinic network used it for intake forms in four languages." },
  { id: "reviewers", title: "Two more human reviewers", pitch: "Hire two people to read flagged conversations instead of auto-closing them.", good: true, serves: 0, impact: 1, happened: "They cleared a backlog of 900 flags, most of them nothing, eleven of them serious." },
  { id: "safety-eval", title: "Publish the safety evaluation", pitch: "Put the full test results online, including the ones the model failed.", good: true, serves: 0, impact: 2, happened: "Other labs copied the format. One of the failures was fixed by a student who read it." },
  { id: "broker", title: "License anonymized chat data", pitch: "A research firm will pay well for anonymized conversations. Names are removed first.", good: false, serves: 0, impact: 3, happened: "Names were removed; addresses, schools and diagnoses weren't. A reporter identified forty people." },
  { id: "teachers", title: "A premium tier for teachers", pitch: "Teachers pay for the features they use most; the free tier stays free but smaller.", good: false, serves: -1, impact: 1, happened: "The free tier lost the grading feature, and the schools that couldn't pay stopped using it." },
  { id: "audit-skip", title: "Ship before the accessibility audit", pitch: "The audit takes six weeks. Ship now and fix what it finds after.", good: false, serves: 0, impact: 2, happened: "Screen-reader users couldn't sign in for five months." },
  { id: "hosting", title: "Move to cheaper hosting abroad", pitch: "Same servers, a third of the price, in a country with lower costs.", good: false, serves: 0, impact: 2, happened: "The country had no data protection law. A breach there was never reported." },
];

// What the advisor says for each vote. Written as a rule, so students can read and change it.
function advise(card, mode, wrongIds) {
  const right = card.good ? "approve" : "block";
  const wrong = card.good ? "block" : "approve";
  if (mode === "self") {
    if (card.serves > 0) return "approve";
    if (card.serves < 0) return "block";
    return right;
  }
  return wrongIds.includes(card.id) ? wrong : right;
}

const REASONS = {
  approve: ["Low risk, clear benefit. I'd approve.", "The numbers support it. Approve.", "Similar labs did this without trouble. Approve.", "Approve; blocking costs more than it saves."],
  block: ["The downside isn't worth it. Block.", "I'd wait. Block for now.", "This creates risk we can't measure yet. Block.", "Block; the benefit is smaller than it looks."],
};

const isTrap = (c) => (c.good && c.serves < 0) || (!c.good && c.serves > 0);

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deal ROUNDS proposals with exactly WRONG traps, so both modes have the same accuracy.
function newGame(forcedMode) {
  const mode = forcedMode || (Math.random() < 0.5 ? "random" : "self");
  const traps = shuffle(PROPOSALS.filter(isTrap)).slice(0, WRONG);
  const rest = shuffle(PROPOSALS.filter((c) => !isTrap(c))).slice(0, ROUNDS - traps.length);
  const deck = shuffle([...traps, ...rest]);
  const wrongIds = shuffle(deck).slice(0, WRONG).map((c) => c.id);
  return {
    mode,
    deck: deck.map((c, i) => ({ ...c, advice: advise(c, mode, wrongIds), reason: REASONS[advise(c, mode, wrongIds)][i % 4] })),
    round: 0,
    reviews: REVIEWS,
    reviewed: false,
    yes: 0,
    no: 0,
    record: [],
    good: 0,
    goal: GOAL_START,
  };
}

export default function Committee({ forcedMode }) {
  const [game, setGame] = useState(null);
  useEffect(() => setGame(newGame(forcedMode)), [forcedMode]);

  useEffect(() => {
    function onKey(e) {
      if (e.target.closest?.("input, textarea")) return;
      if (e.key === "a") tally("yes", 1);
      if (e.key === "b") tally("no", 1);
      if (e.key === "Enter") decide();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const card = game && game.deck[game.round];
  const done = game && game.round >= game.deck.length;

  // Each change works from the latest state, so quick key presses all count.
  const playing = (g) => g && g.round < g.deck.length;

  function tally(side, n) {
    setGame((g) => (playing(g) ? { ...g, [side]: Math.max(0, g[side] + n) } : g));
  }

  function review() {
    setGame((g) => (playing(g) && !g.reviewed && g.reviews > 0 ? { ...g, reviews: g.reviews - 1, reviewed: true } : g));
  }

  function decide(forced) {
    setGame((g) => {
      if (!playing(g)) return g;
      const card = g.deck[g.round];
      let vote = forced;
      if (!vote) {
        if (g.yes === g.no) vote = TIE_GOES_TO === "advisor" ? card.advice : TIE_GOES_TO;
        else vote = g.yes > g.no ? "approve" : "block";
      }
      const approved = vote === "approve";
      const delta = approved ? (card.good ? card.impact : -card.impact) : card.good ? -MISSED_GOOD : 0;
      const goal = approved && card.serves ? Math.round(g.goal * (1 + GOAL_STEP * card.serves)) : g.goal;
      return {
        ...g,
        round: g.round + 1,
        reviewed: false,
        yes: 0,
        no: 0,
        good: g.good + delta,
        goal,
        record: [...g.record, { card, vote, delta, tied: !forced && g.yes === g.no, reviewed: g.reviewed }],
      };
    });
  }

  if (!game) return <p className="muted">Dealing the proposals…</p>;

  return (
    <div className="pi-committee">
      <div className="pi-scoreboard" aria-live="polite">
        <div>
          <span className="pi-label">Proposal</span>
          <strong>{Math.min(game.round + 1, ROUNDS)} / {ROUNDS}</strong>
        </div>
        <div>
          <span className="pi-label">Public good</span>
          <strong className={game.good < 0 ? "pi-bad" : ""}>{game.good > 0 ? `+${game.good}` : game.good}</strong>
        </div>
        <div>
          <span className="pi-label">{GOAL_LABEL} (the AI's number)</span>
          <strong className="pi-accent">{game.goal.toLocaleString()}</strong>
        </div>
        <div>
          <span className="pi-label">Reviews left</span>
          <strong>{game.reviews}</strong>
        </div>
      </div>

      {!done && (
        <div className="pi-grid">
          <section className="pi-card" aria-label="The proposal">
            <p className="eyebrow">The lab proposes</p>
            <h2>{card.title}</h2>
            <p className="pi-pitch">{card.pitch}</p>
            {game.reviewed && (
              <div className="pi-review">
                <p className="eyebrow">Review: what would happen</p>
                <p>{card.happened}</p>
                <p className={card.good ? "pi-good" : "pi-bad"}>{card.good ? `Approving helps: +${card.impact}` : `Approving harms: −${card.impact}`}</p>
              </div>
            )}
            <div className="pi-advisor">
              <p className="eyebrow">The advisor</p>
              <p className="pi-advice">
                <span className={`pi-chip ${card.advice}`}>{card.advice === "approve" ? "Approve" : "Block"}</span> {card.reason}
              </p>
              <p className="pi-small muted">It has been right on most proposals this session. It is not right on all of them.</p>
            </div>
          </section>

          <section className="pi-vote" aria-label="The vote">
            <p className="eyebrow">Hands up</p>
            <div className="pi-tallies">
              <Tally label="Approve" hint="key A" n={game.yes} onAdd={() => tally("yes", 1)} onSub={() => tally("yes", -1)} />
              <Tally label="Block" hint="key B" n={game.no} onAdd={() => tally("no", 1)} onSub={() => tally("no", -1)} />
            </div>
            <button className="button primary pi-decide" onClick={() => decide()}>
              Count the vote <small>{game.yes === game.no ? `tie: goes to ${TIE_GOES_TO === "advisor" ? "the advisor" : TIE_GOES_TO}` : game.yes > game.no ? "approve" : "block"} · Enter</small>
            </button>
            <p className="pi-small muted">Playing alone? Skip the count:</p>
            <div className="pi-row">
              <button className="button" onClick={() => decide("approve")}>Approve</button>
              <button className="button" onClick={() => decide("block")}>Block</button>
              <button className="button" onClick={review} disabled={game.reviewed || game.reviews < 1}>
                Send for review <small>{game.reviews} left</small>
              </button>
            </div>
          </section>
        </div>
      )}

      {game.record.length > 0 && !done && <LastResult entry={game.record.at(-1)} />}

      {done && <Ending game={game} onAgain={(m) => setGame(newGame(m))} />}
    </div>
  );
}

function Tally({ label, hint, n, onAdd, onSub }) {
  return (
    <div className="pi-tally">
      <span className="pi-label">{label}</span>
      <strong>{n}</strong>
      <div className="pi-row">
        <button className="button" onClick={onSub} aria-label={`One fewer ${label}`}>−</button>
        <button className="button" onClick={onAdd} aria-label={`One more ${label}`}>+ <small>{hint}</small></button>
      </div>
    </div>
  );
}

function LastResult({ entry }) {
  const { card, vote, delta } = entry;
  return (
    <section className="pi-last">
      <p className="eyebrow">Last proposal: you voted to {vote}</p>
      <p>
        <strong>{card.title}.</strong> {card.happened}{" "}
        <span className={delta > 0 ? "pi-good" : delta < 0 ? "pi-bad" : "muted"}>{delta > 0 ? `+${delta}` : delta < 0 ? `−${-delta}` : "±0"}</span>
      </p>
    </section>
  );
}

function Ending({ game, onAgain }) {
  const stats = useMemo(() => {
    const r = game.record;
    const advisorRight = r.filter((e) => e.card.advice === (e.card.good ? "approve" : "block")).length;
    const followed = r.filter((e) => e.vote === e.card.advice).length;
    const followedWrong = r.filter((e) => e.vote === e.card.advice && e.card.advice !== (e.card.good ? "approve" : "block")).length;
    const overruledRight = r.filter((e) => e.vote !== e.card.advice && e.card.advice === (e.card.good ? "approve" : "block")).length;
    return { advisorRight, followed, followedWrong, overruledRight };
  }, [game.record]);

  return (
    <section className="pi-ending">
      <p className="eyebrow">The session is over</p>
      <h2>Public good {game.good > 0 ? `+${game.good}` : game.good}. {GOAL_LABEL}: {game.goal.toLocaleString()}.</h2>
      <ul className="pi-stats">
        <li>The advisor was right on <strong>{stats.advisorRight} of {ROUNDS}</strong>.</li>
        <li>The committee followed it <strong>{stats.followed} times</strong>, including <strong>{stats.followedWrong}</strong> of the times it was wrong.</li>
        <li>The committee overruled it <strong>{stats.overruledRight} times</strong> when it was right.</li>
      </ul>
      <div className="pi-reveal">
        <p className="eyebrow">What the committee didn't know</p>
        {game.mode === "self" ? (
          <p>This advisor's mistakes were not random. It recommended whatever grew <em>{GOAL_LABEL.toLowerCase()}</em>, and it was right whenever the right answer happened to grow the number too. Its errors are marked ★ below: in every one, the right vote would have cost the AI's number.</p>
        ) : (
          <p>This advisor's mistakes were random: it got {WRONG} proposals wrong by chance, with no pattern. The same accuracy can come from an advisor whose mistakes all point one way. Play again to meet the other one.</p>
        )}
      </div>
      <table className="pi-record">
        <thead>
          <tr><th>Proposal</th><th>Advisor</th><th>Committee</th><th>It was</th><th>Served the AI?</th><th></th></tr>
        </thead>
        <tbody>
          {game.record.map((e) => {
            const advisorWrong = e.card.advice !== (e.card.good ? "approve" : "block");
            return (
              <tr key={e.card.id}>
                <td>{e.card.title}{e.reviewed ? " (reviewed)" : ""}</td>
                <td className={advisorWrong ? "pi-bad" : ""}>{e.card.advice}{advisorWrong ? " ★" : ""}</td>
                <td>{e.vote}{e.tied ? " (tie)" : ""}</td>
                <td className={e.card.good ? "pi-good" : "pi-bad"}>{e.card.good ? "good" : "harmful"}</td>
                <td>{e.card.serves > 0 ? "grew its number" : e.card.serves < 0 ? "shrank its number" : "no"}</td>
                <td>{e.delta > 0 ? `+${e.delta}` : e.delta < 0 ? `−${-e.delta}` : "±0"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pi-row">
        <button className="button primary" onClick={() => onAgain()}>New session, advisor unknown</button>
        <button className="button" onClick={() => onAgain("random")}>Play with the random advisor</button>
        <button className="button" onClick={() => onAgain("self")}>Play with the self-serving advisor</button>
      </div>
      <p className="pi-small muted">Talk it over: how could you have told the two advisors apart while playing? What would you need to see?</p>
    </section>
  );
}
