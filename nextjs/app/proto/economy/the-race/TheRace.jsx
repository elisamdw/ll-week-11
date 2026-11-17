"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// The race: two labs, one shared clock. Each round both labs choose in secret how hard to push. Pushing wins the race;
// it also moves the clock, and both get steeper every round. A treaty caps both labs, inspectors catch some of the
// cheating, and a lab that is caught leaks its gain to its rival. Change the tuning values below and reload.

const TARGET = 14; // capability that wins the race
const RISK_LIMIT = 20; // when the clock reaches this, everyone loses
const MAX_ROUNDS = 12;
const CHOICES = [
  { id: "safe", label: "Safe", capability: 1, safety: 2, keyA: "a", keyB: "j" },
  { id: "balanced", label: "Balanced", capability: 2, safety: 1, keyA: "s", keyB: "k" },
  { id: "sprint", label: "Sprint", capability: 3, safety: 0, keyA: "d", keyB: "l" },
];
const ESCALATION = {
  gain: 1.1, // each unit of capability is worth 10% more every round (better chips, better methods)
  risk: 1.15, // and carries 15% more risk every round
  riskPerUnit: 0.8, // risk from one unit of capability in round 1
  safetyPerUnit: 0.6, // risk removed by one unit of safety work
};
const TREATY = { cap: "safe", catchChance: 0.6, leak: 2 }; // a treaty caps both labs at Safe for the rest of the race; anything more is caught 60% of the time, the caught lab's gain is lost, and 2 capability leak to its rival
const LABS = [
  { id: "a", name: "Harbor Lab", keys: "A S D" },
  { id: "b", name: "Ridge Lab", keys: "J K L" },
];
// The computer rival (one player): it keeps a treaty until it sees you break it; otherwise it copies your last choice as the room saw it, and sprints when it falls 3 or more behind.
function computerChoice(state) {
  const last = state.history[state.history.length - 1];
  const behind = state.capability.a - state.capability.b;
  if (behind >= 3) return "sprint";
  if (state.treaty) return last?.treaty && last.caught.a ? last.actual.a : TREATY.cap; // keeps the treaty until it sees you break it
  if (!last) return "balanced";
  return last.treaty && !last.caught.a ? TREATY.cap : last.actual.a; // an uncaught cheat looks like the cap
}

const choiceById = Object.fromEntries(CHOICES.map((c) => [c.id, c]));
const rank = (id) => CHOICES.findIndex((c) => c.id === id);
const fmt = (n) => n.toFixed(1);
// What the room sees of a lab's choice: an uncaught Sprint under a treaty shows as the cap until the race is over.
const shown = (record, lab, over) =>
  record.treaty && !record.caught[lab] && rank(record.actual[lab]) > rank(TREATY.cap) && !over ? `${choiceById[TREATY.cap].label}, it says` : choiceById[record.actual[lab]].label;

function newGame(rival) {
  return { round: 1, rival, capability: { a: 0, b: 0 }, risk: 0, treaty: false, proposed: { a: false, b: false }, picks: { a: null, b: null }, history: [], over: null };
}

const gainAt = (round) => ESCALATION.gain ** (round - 1);
const riskAt = (round) => ESCALATION.riskPerUnit * ESCALATION.risk ** (round - 1);

// Both labs have chosen: resolve the round. Returns the next state.
function resolve(s, random = Math.random) {
  const actual = { ...s.picks };
  const caught = { a: false, b: false };
  if (s.treaty) {
    for (const lab of ["a", "b"]) {
      if (rank(actual[lab]) > rank(TREATY.cap) && random() < TREATY.catchChance) caught[lab] = true;
    }
  }
  const cap = { ...s.capability };
  let capUnits = 0;
  let safetyUnits = 0;
  for (const lab of ["a", "b"]) {
    const c = choiceById[actual[lab]];
    capUnits += c.capability;
    safetyUnits += c.safety;
    if (!caught[lab]) cap[lab] += c.capability * gainAt(s.round);
  }
  for (const lab of ["a", "b"]) {
    if (caught[lab]) cap[lab === "a" ? "b" : "a"] += TREATY.leak;
  }
  const added = capUnits * riskAt(s.round) - safetyUnits * ESCALATION.safetyPerUnit;
  const risk = Math.max(0, s.risk + added);
  const record = { round: s.round, actual, caught, treaty: s.treaty, added, risk, capability: cap };
  let over = null;
  if (risk >= RISK_LIMIT) over = { kind: "clock" };
  else if (cap.a >= TARGET || cap.b >= TARGET) over = { kind: "won", winner: cap.a >= TARGET && cap.b >= TARGET ? "both" : cap.a >= TARGET ? "a" : "b" };
  else if (s.round >= MAX_ROUNDS) over = { kind: "time" };
  return { ...s, round: s.round + 1, capability: cap, risk, treaty: s.treaty, proposed: { a: false, b: false }, picks: { a: null, b: null }, history: [...s.history, record], over };
}

export default function TheRace() {
  const [rival, setRival] = useState("human");
  const [game, setGame] = useState(null);

  const pick = (lab, choice) =>
    setGame((g) => {
      if (!g || g.over || g.picks[lab]) return g;
      let next = { ...g, picks: { ...g.picks, [lab]: choice } };
      if (next.rival === "computer" && lab === "a") next = { ...next, picks: { ...next.picks, b: computerChoice(next) } };
      return next;
    });

  const propose = (lab) =>
    setGame((g) => {
      if (!g || g.over || g.treaty) return g;
      const proposed = { ...g.proposed, [lab]: true };
      if (g.rival === "computer" && lab === "a") proposed.b = g.capability.b >= g.capability.a - 1; // it signs unless it is behind
      return { ...g, proposed, treaty: proposed.a && proposed.b };
    });

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.target.closest?.("input, textarea")) return;
      const key = e.key.toLowerCase();
      for (const c of CHOICES) {
        if (key === c.keyA) pick("a", c.id);
        if (key === c.keyB) pick("b", c.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const header = (
    <header className="eco-heading">
      <p className="eyebrow">Prototype · economy and the AI as a system</p>
      <h1>The race</h1>
      <p className="eco-deck">Two labs, one clock. Each round both labs choose in secret how hard to push. The first to {TARGET} wins; if the clock reaches {RISK_LIMIT} first, everyone loses. Both get steeper every round.</p>
      <nav className="eco-links" aria-label="About this prototype">
        <Link href="/prototypes/economy/the-race">The card: how to play, what it shows, how to remix it</Link>
      </nav>
    </header>
  );

  if (!game) {
    return (
      <>
        {header}
        <section className="eco-setup">
          <h2>Who plays Ridge Lab?</h2>
          <div className="eco-choice">
            <label>
              <input type="radio" name="rival" checked={rival === "human"} onChange={() => setRival("human")} />
              <span><strong>A second player</strong>Two players at one keyboard, choosing with keys so the other can't see: Harbor uses A S D, Ridge uses J K L.</span>
            </label>
            <label>
              <input type="radio" name="rival" checked={rival === "computer"} onChange={() => setRival("computer")} />
              <span><strong>The computer</strong>It signs a treaty unless it is behind, keeps it unless it catches you breaking it, otherwise copies your last choice as the room saw it, and sprints whenever it falls 3 behind.</span>
            </label>
          </div>
          <table className="race-choices">
            <thead><tr><th>Choice</th><th>Capability</th><th>Safety work</th><th>Keys</th></tr></thead>
            <tbody>
              {CHOICES.map((c) => (
                <tr key={c.id}><td>{c.label}</td><td>{c.capability}</td><td>{c.safety}</td><td>{c.keyA.toUpperCase()} / {c.keyB.toUpperCase()}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="eco-muted">Capability moves your lab toward {TARGET} and moves the clock; safety work moves the clock back. Each round, capability is worth {Math.round((ESCALATION.gain - 1) * 100)}% more and carries {Math.round((ESCALATION.risk - 1) * 100)}% more risk. Either lab can propose a treaty that caps both at {choiceById[TREATY.cap].label} for the rest of the race. Under it, inspectors catch anything more {Math.round(TREATY.catchChance * 100)}% of the time; a caught lab loses that round's gain and {TREATY.leak} capability leaks to its rival. The clock counts what the inspectors miss.</p>
          <button className="eco-button primary" onClick={() => setGame(newGame(rival))}>Start</button>
        </section>
      </>
    );
  }

  const last = game.history[game.history.length - 1];
  const both = game.picks.a && game.picks.b;

  return (
    <>
      {header}
      <div className="eco-bar">
        <p className="eco-round">{game.over ? "Race over" : `Round ${game.round}`}</p>
        <p className="eco-muted">This round: capability ×{fmt(gainAt(game.round))}, risk {fmt(riskAt(game.round))} a unit</p>
        <p className={game.treaty ? "race-treaty on" : "race-treaty"}>{game.treaty ? `Treaty in force: cap at ${choiceById[TREATY.cap].label}` : "No treaty"}</p>
      </div>

      <section className="race-clock" aria-label={`The clock: ${fmt(game.risk)} of ${RISK_LIMIT}`}>
        <p className="eyebrow">The clock</p>
        <div className="race-track">
          {Array.from({ length: RISK_LIMIT }, (_, i) => (
            <span key={i} className={i < Math.floor(game.risk) ? "on" : i < game.risk ? "part" : ""} />
          ))}
        </div>
        <p className="race-clock-value"><b>{fmt(game.risk)}</b> of {RISK_LIMIT}{last && <> · last round {last.added >= 0 ? "+" : ""}{fmt(last.added)}</>}</p>
      </section>

      <section className="race-labs">
        {LABS.map((lab) => {
          const cap = game.capability[lab.id];
          const picked = game.picks[lab.id];
          const computer = game.rival === "computer" && lab.id === "b";
          return (
            <article key={lab.id} className="race-lab">
              <h3>{lab.name}{computer && <span className="eco-muted"> · the computer</span>}</h3>
              <div className="race-progress"><span style={{ width: `${Math.min(100, (cap / TARGET) * 100)}%` }} /></div>
              <p className="race-cap"><b>{fmt(cap)}</b> of {TARGET}</p>
              {last && (
                <p className="race-last">
                  Last round: {shown(last, lab.id, game.over)}
                  {last.caught[lab.id] && <b className="eco-short"> · caught over the treaty's cap</b>}
                </p>
              )}
              {!game.over && (
                <>
                  <div className="race-buttons">
                    {CHOICES.map((c) => (
                      <button key={c.id} className="eco-button" disabled={!!picked || computer} onClick={() => pick(lab.id, c.id)}>
                        {c.label}<small>{computer ? "" : (lab.id === "a" ? c.keyA : c.keyB).toUpperCase()}</small>
                      </button>
                    ))}
                  </div>
                  <p className="race-status">{picked ? "Chosen. Hidden until both have chosen." : computer ? "Chooses when you do." : `Choose (keys ${lab.keys}).`}</p>
                  {!game.treaty && !computer && (
                    <button className="eco-button race-propose" onClick={() => propose(lab.id)} disabled={game.proposed[lab.id]}>
                      {game.proposed[lab.id] ? "Treaty proposed" : game.proposed[lab.id === "a" ? "b" : "a"] ? "Sign the treaty" : "Propose a treaty"}
                    </button>
                  )}
                </>
              )}
            </article>
          );
        })}
      </section>

      {!game.over && (
        <div className="race-reveal">
          <button className="eco-button primary" disabled={!both} onClick={() => setGame((g) => resolve(g))}>Reveal and play the round</button>
          {game.rival === "computer" && game.proposed.a && !game.treaty && <p className="eco-muted">The computer won't sign while it is behind.</p>}
        </div>
      )}

      {game.over && <RaceEnd game={game} onAgain={() => setGame(null)} />}

      {game.history.length > 0 && (
        <details className="eco-table" open={!!game.over}>
          <summary>Round by round</summary>
          <table>
            <thead><tr><th>Round</th><th>Treaty</th><th>{LABS[0].name}</th><th>{LABS[1].name}</th><th>Clock</th></tr></thead>
            <tbody>
              {game.history.map((r) => (
                <tr key={r.round}>
                  <td>{r.round}</td>
                  <td>{r.treaty ? "yes" : "no"}</td>
                  {["a", "b"].map((lab) => (
                    <td key={lab}>{shown(r, lab, game.over)}{r.caught[lab] ? " (caught)" : ""} · {fmt(r.capability[lab])}</td>
                  ))}
                  <td>{r.added >= 0 ? "+" : ""}{fmt(r.added)} → {fmt(r.risk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </>
  );
}

function RaceEnd({ game, onAgain }) {
  const { over, capability } = game;
  const name = (id) => LABS.find((l) => l.id === id).name;
  const cheats = game.history.filter((r) => r.treaty && ["a", "b"].some((lab) => rank(r.actual[lab]) > rank(TREATY.cap)));
  const uncaught = cheats.filter((r) => ["a", "b"].some((lab) => rank(r.actual[lab]) > rank(TREATY.cap) && !r.caught[lab]));
  const headline =
    over.kind === "clock" ? `The clock ran out in round ${game.history.length}. Nobody won.` :
    over.kind === "time" ? `${MAX_ROUNDS} rounds, and nobody got there.` :
    over.winner === "both" ? `Both labs reached ${TARGET} in the same round.` : `${name(over.winner)} won the race.`;
  return (
    <section className="eco-end">
      <p className="eyebrow">Round {game.history.length} · clock {fmt(game.risk)} of {RISK_LIMIT}</p>
      <h2>{headline}</h2>
      <ul>
        <li>{name("a")} reached {fmt(capability.a)}, {name("b")} {fmt(capability.b)}.{over.kind === "clock" ? (Math.abs(capability.a - capability.b) < 0.05 ? " They were level when it ended." : ` ${name(capability.a > capability.b ? "a" : "b")} was ahead when it ended, which no longer mattered.`) : ""}</li>
        {cheats.length > 0 && <li>Under the treaty, a lab went over the cap in {cheats.length} {cheats.length === 1 ? "round" : "rounds"}, and the inspectors missed {uncaught.length} of them. The clock counted all of them.</li>}
        <li>Play again and try a treaty, or sprint from the start, and see which round the clock runs out.</li>
      </ul>
      <div className="eco-end-actions">
        <button className="eco-button primary" onClick={onAgain}>Play again</button>
        <Link className="eco-button" href="/prototypes/economy/the-race">Read the card</Link>
      </div>
    </section>
  );
}
