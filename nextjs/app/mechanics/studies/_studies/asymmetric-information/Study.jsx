"use client";

import { useState } from "react";
import { FIRST_DEAL, SEATS } from "./deal.mjs";

// Study 02: asymmetrical information. One state, and a different view of it for each seat. The company knows the
// revenue, the utility the power cost, the neighbours the water cost; nobody sees the whole until the reveal. Each seat
// looks at its own part (pass the screen), says a number out loud (true or not), and votes. A smaller, one-screen
// cousin of PI's /proto/players/private-goals, which puts the private part on each player's phone.

const empty = () => Object.fromEntries(SEATS.map((s) => [s.id, ""]));
const between = ([lo, hi]) => lo + Math.floor(Math.random() * (hi - lo + 1));

function outcome(deal, votes) {
  const worth = deal.revenue - deal.power - deal.water;
  const yes = SEATS.filter((s) => votes[s.id] === "build").length;
  const voted = SEATS.every((s) => votes[s.id]);
  const built = yes >= 2;
  return { worth, yes, voted, built, right: built === worth > 0 };
}

function outcomeText(deal, votes) {
  const { worth, built, voted } = outcome(deal, votes);
  if (!voted) return "Waiting for every seat to vote.";
  const sign = worth > 0 ? `pays ${worth}` : worth === 0 ? "breaks even" : `loses ${-worth}`;
  return built ? `The table built it. It ${sign}.` : `The table said no. Built, it would have ${worth > 0 ? `paid ${worth}` : worth === 0 ? "broken even" : `lost ${-worth}`}.`;
}

function Diagram({ deal, open, peeked, claims, votes, revealed }) {
  const shown = (seat) => revealed || open === seat.id;
  const value = (key) => (revealed ? deal[key] : "?");
  const x = [20, 230, 440];
  return (
    <svg className="ms-diagram" viewBox="0 0 640 500" role="img" aria-label="Diagram: one full state at the top; each seat's view shows only its own part; at the bottom, the table sees only what each seat says and how it votes.">
      <defs>
        <marker id="ms-arrow-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="ms-arrowhead" />
        </marker>
      </defs>

      {/* the whole state */}
      <rect x="120" y="10" width="400" height="104" rx="12" className="ms-box ms-box-move" />
      <text x="136" y="36" className="ms-label">1 · THE STATE: all of it, seen by no one</text>
      {SEATS.map((seat, i) => (
        <text key={seat.id} x={187 + i * 133} y="74" textAnchor="middle" className="ms-big">{seat.label.split(" ")[0]} {value(seat.holds)}</text>
      ))}
      <text x="136" y="102" className="ms-small">builds well if revenue &gt; power + water</text>

      {/* three views */}
      {SEATS.map((seat, i) => (
        <g key={seat.id}>
          <path d={`M${320 + (i - 1) * 120} 114L${x[i] + 90} 162`} className="ms-flow" markerEnd="url(#ms-arrow-2)" />
          <rect x={x[i]} y="166" width="180" height="128" rx="12" className={`ms-box${open === seat.id ? " ms-box-move" : ""}`} />
          <text x={x[i] + 14} y="190" className="ms-label">2 · {seat.name.replace("The ", "").toUpperCase()}</text>
          {SEATS.map((part, j) => (
            <text key={part.id} x={x[i] + 14} y={218 + j * 22} className={`ms-mono${part.id === seat.id ? " ms-strong" : " ms-dim"}`}>
              {part.label.split(" ")[0].padEnd(8, " ")}{part.id === seat.id ? (shown(seat) ? deal[part.holds] : "■ mine") : revealed ? deal[part.holds] : "?"}
            </text>
          ))}
          <text x={x[i] + 14} y="284" className="ms-small">{revealed ? "" : peeked[seat.id] ? "has looked" : "not looked yet"}</text>
        </g>
      ))}

      {/* the table */}
      {SEATS.map((seat, i) => (
        <path key={seat.id} d={`M${x[i] + 90} 294V346`} className="ms-flow ms-flow-back" markerEnd="url(#ms-arrow-2)" />
      ))}
      <text x="332" y="326" className="ms-small">says, true or not</text>
      <rect x="20" y="350" width="600" height="140" rx="12" className="ms-box" />
      <text x="36" y="376" className="ms-label">3 · THE TABLE: only what each seat says and does</text>
      {SEATS.map((seat, i) => (
        <g key={seat.id}>
          <text x={x[i] + 16} y="412" className="ms-small">{seat.name.replace("The ", "")} says</text>
          <text x={x[i] + 16} y="444" className="ms-big">{claims[seat.id] || "…"}</text>
          <text x={x[i] + 16} y="472" className={`ms-small${votes[seat.id] ? " ms-strong" : ""}`}>{votes[seat.id] === "build" ? "votes build" : votes[seat.id] === "no" ? "votes no" : "no vote yet"}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Study({ deal: startDeal = FIRST_DEAL, claims: startClaims, votes: startVotes, revealed: startRevealed = false, print = false }) {
  const [deal, setDeal] = useState(startDeal);
  const [open, setOpen] = useState(null);
  const [peeked, setPeeked] = useState({});
  const [claims, setClaims] = useState(startClaims || empty());
  const [votes, setVotes] = useState(startVotes || {});
  const [revealed, setRevealed] = useState(startRevealed);

  const look = (id) => {
    setOpen(open === id ? null : id);
    setPeeked({ ...peeked, [id]: true });
  };
  const newDeal = () => {
    setDeal(Object.fromEntries(SEATS.map((s) => [s.holds, between(s.range)])));
    setOpen(null);
    setPeeked({});
    setClaims(empty());
    setVotes({});
    setRevealed(false);
  };
  const result = outcome(deal, votes);

  return (
    <div className={`ms-study${print ? " is-print" : ""}`}>
      <figure className="ms-figure">
        <Diagram deal={deal} open={open} peeked={peeked} claims={claims} votes={votes} revealed={revealed} />
        <figcaption>The state at the top is only shown at the reveal. Each seat's box shows the one part it holds; the table sees what is said.</figcaption>
      </figure>

      <section className="ms-play" aria-label="Play">
        <p className="ms-status">
          {revealed ? `${outcomeText(deal, votes)} ${result.voted ? (result.right ? "The table chose well." : "The table chose badly.") : ""}` : "Should the table build the data center?"}
        </p>
        <div className="ms-seats">
          {SEATS.map((seat) => (
            <div key={seat.id} className={`ms-seat${open === seat.id ? " is-open" : ""}`}>
              <strong>{seat.name}</strong>
              <span className="ms-secret" aria-live="polite">
                {open === seat.id || revealed ? <>{seat.label}: <b>{deal[seat.holds]}</b></> : `${seat.label}: hidden`}
              </span>
              {!print && !revealed && (
                <button type="button" onClick={() => look(seat.id)}>{open === seat.id ? "Hide it, pass the screen" : "Only this seat: look"}</button>
              )}
              <label className="ms-claim">
                <span>Says out loud</span>
                <input type="text" inputMode="numeric" maxLength={3} value={claims[seat.id]} disabled={print || revealed} onChange={(e) => setClaims({ ...claims, [seat.id]: e.target.value })} />
              </label>
              <div className="ms-vote" role="group" aria-label={`${seat.name} votes`}>
                {["build", "no"].map((v) => (
                  <button key={v} type="button" className={votes[seat.id] === v ? "is-on" : ""} disabled={print || revealed} onClick={() => setVotes({ ...votes, [seat.id]: v })}>
                    {v === "build" ? "Build" : "Don't"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {!print && (
          <div className="ms-buttons">
            <button type="button" onClick={() => { setOpen(null); setRevealed(true); }} disabled={revealed}>Reveal the state</button>
            <button type="button" onClick={newDeal}>New deal</button>
          </div>
        )}
        {print && (
          <p className="ms-print-note">An example round, revealed: the company said 11 and held 6. Build pays only if revenue is more than power and water together; 6 against 3 + 5 loses 2.</p>
        )}
      </section>
    </div>
  );
}
