"use client";

import { useEffect, useRef, useState } from "react";
import { AI_WINS_AT, DECK, LINKS, NETWORK_AT, PLACES, ROUNDS, aiTurn, connected, cutOps, frontier, guardOps, linkKey, newGame, placeById, say } from "./rules.js";

// The AI's seat: one device (a phone beside a paper map, or the laptop on the projector).
// The table does its action and taps it in; then the device takes the AI's turn and says what to put on the map.

export default function PhoneAi() {
  const [s, setS] = useState(null);
  const [mode, setMode] = useState("guard"); // what a tap on the map does: "guard" a place, or "cut" a link
  const [voice, setVoice] = useState(false);
  const spoken = useRef(null);
  useEffect(() => setS(newGame()), []);

  // Read the AI's turn aloud, if the voice is on. The browser's own speech, no paid API.
  useEffect(() => {
    if (!voice || !s?.last || spoken.current === s.last) return;
    spoken.current = s.last;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(say(s.last)));
    } catch {}
  }, [voice, s?.last]);

  if (!s) return <p className="muted">Setting up the map…</p>;

  const humansTurn = s.phase === "humans";
  const canAct = humansTurn && s.actions > 0;
  const f = frontier(s);
  const net = connected(s);

  function tapPlace(id) {
    if (!canAct || mode !== "guard" || s.held.includes(id) || s.guard) return;
    setS(guardOps(s, id));
  }
  function tapLink(a, b) {
    if (!canAct || mode !== "cut" || s.cut.includes(linkKey(a, b))) return;
    setS(cutOps(s, a, b));
  }

  return (
    <div className="pi-ppa">
      <div className="pi-scoreboard">
        <div><span className="pi-label">Round</span><strong>{s.phase === "end" ? s.round : s.round + 1} / {ROUNDS}</strong></div>
        <div><span className="pi-label">The AI holds</span><strong className="pi-accent">{s.held.length} / {AI_WINS_AT}</strong></div>
        <div><span className="pi-label">Its network</span><strong className={net >= NETWORK_AT ? "pi-bad" : ""}>{net} / {NETWORK_AT}</strong></div>
      </div>

      <div className="pi-grid">
        <section className="pi-panel pi-mapbox">
          <svg className="pi-map" viewBox="-6 0 112 82" role="img" aria-label="The map">
            {LINKS.map(([a, b]) => {
              const A = placeById(a), B = placeById(b);
              const key = linkKey(a, b);
              const cut = s.cut.includes(key);
              const hot = s.held.includes(a) && s.held.includes(b);
              return (
                <g key={key} className={`pi-link${cut ? " cut" : ""}${hot ? " hot" : ""}${canAct && mode === "cut" && !cut ? " live" : ""}`} onClick={() => tapLink(a, b)}>
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="hit" />
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="line" />
                </g>
              );
            })}
            {PLACES.map((p) => {
              const held = s.held.includes(p.id);
              const live = canAct && mode === "guard" && !held && !s.guard;
              return (
                <g key={p.id} className={`pi-node${held ? " ai" : ""}${s.guard === p.id ? " guarded" : ""}${f.has(p.id) ? " near" : ""}${live ? " live" : ""}`} onClick={() => tapPlace(p.id)}>
                  <circle cx={p.x} cy={p.y} r="5" />
                  <text x={p.x} y={p.y + 9.5}>{p.label}</text>
                </g>
              );
            })}
          </svg>
          <p className="pi-small muted">Purple: the AI holds it. Dashed ring: the AI can reach it next. Yellow: guarded this round. A dashed line is a cut link.</p>
        </section>

        <section className="pi-panel">
          {humansTurn && (
            <>
              <p className="eyebrow">The table's turn</p>
              <h2 className="pi-turn">{s.actions > 0 ? `${s.actions} action left` : "Done. Now the AI."}</h2>
              {s.actions > 0 && (
                <>
                  <p className="muted">Agree on one action, do it on the paper map if you have one, then tap it here.</p>
                  <div className="pi-row">
                    <button className={`button${mode === "guard" ? " primary" : ""}`} onClick={() => setMode("guard")}>Guard a place <small>until after the AI's turn</small></button>
                    <button className={`button${mode === "cut" ? " primary" : ""}`} onClick={() => setMode("cut")}>Cut a link <small>for good</small></button>
                  </div>
                  <p className="pi-small muted">{mode === "guard" ? "Tap a place on the map." : "Tap a line on the map."}</p>
                </>
              )}
              <button className="button primary pi-decide pi-gap" onClick={() => setS(aiTurn(s))}>
                The AI's turn <small>{s.actions > 0 ? "skip your action" : "draw its card"}</small>
              </button>
            </>
          )}
          {s.last && <AiSays last={s.last} />}
          {s.phase === "end" && (
            <div className="pi-reveal">
              <p className="eyebrow">The end</p>
              <h2 className="pi-turn">{s.winner === "ai" ? `The AI holds ${s.held.length}. It has the map.` : `${ROUNDS} rounds, and the AI holds ${s.held.length}. The table held on.`}</h2>
              <p className="pi-small">Talk it over: once you knew its rule (most links first), could you have played it differently? What did the AI do that nobody at the table chose?</p>
              <button className="button primary" onClick={() => { spoken.current = null; setS(newGame()); }}>Play again</button>
            </div>
          )}
          <label className="pi-small pi-voice"><input type="checkbox" checked={voice} onChange={(e) => setVoice(e.target.checked)} /> Read the AI's turns aloud</label>
          <details className="pi-small pi-rules">
            <summary>The AI's rules</summary>
            <ul>
              {DECK.map((c) => <li key={c.id}><strong>{c.title}</strong> ({c.n} in the deck): {c.rule}</li>)}
              <li>It never enters a guarded place or crosses a cut link.</li>
              <li>When it holds {NETWORK_AT} places joined by links, the network turns: it spreads twice every turn, even on a quiet week.</li>
            </ul>
          </details>
        </section>
      </div>

      <section className="pi-panel pi-gap">
        <p className="eyebrow">What happened</p>
        <ol className="pi-log">
          {s.log.map((e, i) => (
            <li key={i}>
              {e.human === "guard" && <>The table guarded <strong>{placeById(e.place).label}</strong>.</>}
              {e.human === "cut" && <>The table cut the link {e.link.split("|").map((id) => placeById(id).label).join(" to ")}.</>}
              {e.card && <>The AI drew <strong>{DECK.find((c) => c.id === e.card).title}</strong>{e.turned ? " (network turned)" : ""}: {e.moves.length ? e.moves.map((m) => placeById(m.target).label).join(" and ") : e.blocked ? "blocked" : "took nothing"}.</>}
            </li>
          ))}
          {!s.log.length && <li className="muted">The AI starts in the compute cluster.</li>}
        </ol>
      </section>
    </div>
  );
}

function AiSays({ last }) {
  const card = DECK.find((c) => c.id === last.card);
  return (
    <div className="pi-aisays pi-gap">
      <p className="eyebrow">The AI, round {last.round}</p>
      <h2 className="pi-turn">{card.title}</h2>
      <p>{say(last)}</p>
    </div>
  );
}
