"use client";

import { useEffect, useState } from "react";
import { FACTIONS, PHASES, ROUNDS, play, waiting } from "./loops.mjs";

// Study 06: nested turn loops and the vote. A game is rounds, a round is phases, the factions' phase is turns. Step
// one at a time and the loops are plain; run them fast and the steps blur into something that looks always on.
// The vote is where the loop waits for people, until the turn card: after it, the AI's proposals pass unasked.

const PHASE_LABEL = { draw: "the AI draws", vote: "the table votes", upkeep: "upkeep", factions: "factions' turns" };

function Diagram({ state }) {
  const roundDone = (r) => r < state.round || state.over;
  const cellX = (i) => 40 + i * 96;
  const phaseIndex = PHASES.indexOf(state.phase);
  const px = [36, 160, 284, 408];
  const steps = state.steps;
  const gap = steps.length ? Math.min(18, 580 / steps.length) : 18;
  return (
    <svg className="ms-diagram" viewBox="0 0 640 470" role="img" aria-label="Diagram: the game box holds six rounds; the round box holds four phases; the factions' phase holds one turn per faction; below, every step as a tick on one line.">
      <rect x="10" y="10" width="620" height="330" rx="14" className="ms-box" />
      <text x="26" y="36" className="ms-label">THE GAME: {ROUNDS} ROUNDS</text>
      <text x="614" y="36" textAnchor="end" className="ms-small ms-strong">the AI's goal: {state.goal}</text>
      {Array.from({ length: ROUNDS }, (_, i) => (
        <g key={i}>
          <rect x={cellX(i)} y="50" width="84" height="34" rx="8" className={state.round === i + 1 && !state.over ? "ms-cell-new" : roundDone(i + 1) ? "ms-cell-down" : "ms-cell-up"} />
          <text x={cellX(i) + 42} y="72" textAnchor="middle" className={`ms-small${state.round === i + 1 && !state.over ? " ms-on-accent" : ""}`}>round {i + 1}</text>
        </g>
      ))}

      <rect x="26" y="100" width="588" height="226" rx="12" className="ms-box ms-box-move" />
      <text x="42" y="126" className="ms-label">ROUND {state.round}: {PHASES.length} PHASES</text>
      <text x="598" y="126" textAnchor="end" className="ms-small">{state.card ? `card: ${state.card.label}` : ""}</text>
      {PHASES.map((phase, i) => {
        const current = phase === state.phase && !state.over;
        const skipped = phase === "vote" && state.turned;
        const w = phase === "factions" ? 194 : 112;
        return (
          <g key={phase}>
            <rect x={px[i]} y="140" width={w} height={phase === "factions" ? 172 : 64} rx="10" className={current ? "ms-cell-new" : i < phaseIndex ? "ms-cell-down" : "ms-cell-up"} />
            <text x={px[i] + 10} y="164" className={`ms-small ms-strong${current ? " ms-on-accent" : ""}`}>{i + 1} · {phase}</text>
            <text x={px[i] + 10} y="188" className={`ms-small${current ? " ms-on-accent" : ""}${skipped ? " ms-struck" : ""}`}>{skipped ? "not asked" : PHASE_LABEL[phase]}</text>
          </g>
        );
      })}
      {FACTIONS.map((f, i) => {
        const current = state.phase === "factions" && state.faction === i && !state.over;
        return (
          <g key={f}>
            <rect x="420" y={204 + i * 52} width="170" height="42" rx="8" className={`ms-turn${current ? " is-current" : ""}`} />
            <text x="432" y={230 + i * 52} className="ms-small ms-strong">TURN · {f}</text>
          </g>
        );
      })}
      {state.phase === "vote" && !state.over && <text x="160" y="232" className="ms-small ms-hot">waiting for people</text>}
      {state.turned && <text x="36" y="240" className="ms-small ms-hot">The turn was drawn: no vote from round 4.</text>}

      <text x="20" y="370" className="ms-label">EVERY STEP, IN ORDER ({steps.length})</text>
      <path d="M20 420H620" className="ms-grid" />
      {steps.map((st, i) => (
        <path key={i} d={`M${24 + i * gap} ${st.level === "turn" ? 408 : st.level === "vote" ? 392 : 398}V${st.level === "game" ? 444 : 432}`} className={`ms-steptick is-${st.level}`} />
      ))}
      <text x="20" y="462" className="ms-small">tall: votes · medium: phases · short: faction turns</text>
    </svg>
  );
}

export default function Study({ inputs: startInputs = [], print = false }) {
  const [inputs, setInputs] = useState(startInputs);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(2); // steps a second
  const state = play(inputs);
  const isWaiting = waiting(state);

  // Run: one step at a time at the chosen speed; it stops at a vote until someone answers, and at the end.
  useEffect(() => {
    if (!running || state.over || isWaiting) {
      if (state.over) setRunning(false);
      return;
    }
    const timer = setTimeout(() => setInputs((list) => [...list, "step"]), 1000 / speed);
    return () => clearTimeout(timer);
  }, [running, speed, state.over, isWaiting, inputs.length]);

  const send = (input) => setInputs([...inputs, input]);
  const last = state.steps.slice(-6);

  return (
    <div className={`ms-study${print ? " is-print" : ""}`}>
      <figure className="ms-figure">
        <Diagram state={state} />
        <figcaption>The highlighted box is where the game is now: a round of the game, a phase of the round, a turn of the factions' phase.</figcaption>
      </figure>

      <section className="ms-play" aria-label="Play">
        <p className="ms-status">
          {state.over ? `Over. The AI's goal reached ${state.goal}.` : isWaiting ? `Round ${state.round}: the AI proposes "${state.card.label}". Approve or block?` : `Round ${state.round}, ${PHASE_LABEL[state.phase]}${state.phase === "factions" ? `: ${FACTIONS[state.faction]}` : ""}.`}
        </p>
        {!print && (
          <div className="ms-controls">
            <div className="ms-buttons">
              {isWaiting ? (
                <>
                  <button type="button" className="ms-primary" onClick={() => send("approve")}>Approve</button>
                  <button type="button" className="ms-primary" onClick={() => send("block")}>Block</button>
                </>
              ) : (
                <>
                  <button type="button" className="ms-primary" disabled={state.over || running} onClick={() => send("step")}>Step</button>
                  <button type="button" className="ms-primary" disabled={state.over} onClick={() => setRunning(!running)}>{running ? "Pause" : "Run"}</button>
                </>
              )}
              <button type="button" onClick={() => { setRunning(false); setInputs([]); }}>Start again</button>
            </div>
            <label className="ms-slider">
              <span>Speed: <strong>{speed}</strong> step{speed === 1 ? "" : "s"} a second{speed >= 12 ? " (it starts to look like one continuous agent)" : ""}</span>
              <input type="range" min="1" max="20" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </label>
          </div>
        )}
        <ol className="ms-steps" start={Math.max(1, state.steps.length - last.length + 1)}>
          {last.map((st, i) => <li key={state.steps.length - last.length + i} className={`is-${st.level}`}>{st.text}</li>)}
        </ol>
        {print && <p className="ms-print-note">An example game: the table approves, blocks and approves in rounds 1 to 3; the AI draws the turn in round 4 and nothing is asked after it. Twenty-seven steps of the innermost loop; at twenty a second they pass in under a second and a half.</p>}
      </section>
    </div>
  );
}
