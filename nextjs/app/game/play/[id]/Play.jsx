"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { act, aiNodes, canAfford, currentFaction, describe, describeCost, endTurn, format, legalTargets, newGame, runAi, validate, value, vote } from "../../../../lib/game-engine.mjs";

// The game screen: the map on the left, the round on the right, the rules and what they claim below.
// The state saves in this browser under w11-game:<ruleset>, and starts over if the rules have changed.

const store = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  },
};

function fingerprint(rules) {
  const text = JSON.stringify(rules || {});
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  return `${text.length}:${h}`;
}

export default function Play({ id, initialRules }) {
  const [rules, setRules] = useState(initialRules);
  const [state, setState] = useState(null);
  const [pending, setPending] = useState(null); // an action waiting for a place to be picked
  const [showGoal, setShowGoal] = useState(false);
  const key = `w11-game:${id}`;

  useEffect(() => {
    let r = initialRules;
    if (id === "draft") {
      r = store.get("w11-game:draft-rules");
      setRules(r);
    }
    if (!r || validate(r).length) return;
    const saved = store.get(key);
    setState(saved?.rules === fingerprint(r) && saved.state ? saved.state : newGame(r));
  }, [id, initialRules, key]);

  useEffect(() => {
    if (rules && state) store.set(key, { rules: fingerprint(rules), state });
  }, [key, rules, state]);

  useEffect(() => {
    setShowGoal(false);
    setPending(null);
  }, [state?.factionIndex, state?.round]);

  if (!rules) {
    return (
      <div className="play-empty">
        <h1>No draft to play</h1>
        <p>Open a version's rules in the editor and press “Play this draft”.</p>
        <Link className="button" href="/game">See the versions</Link>
      </div>
    );
  }
  const errors = validate(rules);
  if (errors.length) {
    return (
      <div className="play-empty">
        <h1>These rules don't check out yet</h1>
        <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        <Link className="button" href={`/game/edit/${id === "draft" ? "draft" : id}`}>Back to the editor</Link>
      </div>
    );
  }
  if (!state) return <p className="play-loading">Setting up…</p>;

  const faction = currentFaction(rules, state);
  const card = (rules.ai?.deck || []).find((c) => c.id === state.card);
  const targets = pending ? legalTargets(rules, state, pending.target) : [];

  const restart = () => {
    if (state.round > 1 && !state.over && !window.confirm("Start a new game? This one will be lost.")) return;
    setPending(null);
    setState(newGame(rules));
  };
  const choose = (action) => {
    if (action.target) setPending(pending?.id === action.id ? null : action);
    else setState(act(rules, state, action.id));
  };
  const pick = (nodeId) => {
    if (!pending || !targets.includes(nodeId)) return;
    setState(act(rules, state, pending.id, nodeId));
    setPending(null);
  };

  return (
    <div className="play">
      <header className="play-top">
        <div>
          <p className="eyebrow">
            <Link href="/game">The game</Link> · {id === "draft" ? "draft" : rules.preset ? "starting version" : "remix"}
          </p>
          <h1>{rules.title}</h1>
          {rules.tagline ? <p className="play-tagline">{rules.tagline}</p> : null}
        </div>
        <div className="play-top-actions">
          <span className="play-round">
            Round {state.round} of {rules.rounds ?? 10}
          </span>
          <button type="button" className="button" onClick={restart}>New game</button>
          <Link className="button" href={`/game/edit/${id}`}>Edit the rules</Link>
        </div>
      </header>

      <div className="play-grid">
        <section className="play-map" aria-label="The map">
          <GameMap rules={rules} state={state} targets={targets} onPick={pick} />
          {pending ? (
            <p className="play-hint">
              Pick a place for <strong>{pending.label}</strong> ({targets.length ? `${targets.length} highlighted` : "none possible"}).{" "}
              <button type="button" className="linkish" onClick={() => setPending(null)}>Cancel</button>
            </p>
          ) : (
            <p className="play-hint muted">{rules.premise}</p>
          )}
        </section>

        <aside className="play-side">
          <div className="goal-box">
            <p className="eyebrow">{rules.ai?.name || "The AI"}'s goal</p>
            <p className="goal-number">{format(state.compute)}</p>
            <p className="goal-label">
              {rules.goal?.label || "goal"}
              {rules.goal?.unit ? ` (${rules.goal.unit})` : ""} · growth ×{state.growth.toFixed(2)} · holds {aiNodes(state)} of {(rules.nodes || []).length} places
              {state.turned ? " · it has turned" : ""}
            </p>
          </div>

          <div className="meters">
            {[...(rules.resources || []), ...(rules.tracks || [])].map((r) => {
              const v = value(state, r.id);
              const danger = (r.lose != null && v >= r.lose - 2) || (r.loseBelow != null && v <= r.loseBelow + 1);
              return (
                <div key={r.id} className={`meter${danger ? " danger" : ""}`} title={r.rhetoric || ""}>
                  <span>{r.label}</span>
                  <strong>{v}</strong>
                  {r.lose != null ? <small>lose at {r.lose}</small> : r.loseBelow != null ? <small>lose below {r.loseBelow}</small> : null}
                </div>
              );
            })}
          </div>

          <div className={`phase phase-${state.phase}`}>
            {state.phase === "ai" ? (
              <>
                <p className="eyebrow">The AI's turn</p>
                <p>{state.deck.length} cards left in its deck.</p>
                <button type="button" className="button primary" onClick={() => setState(runAi(rules, state))}>Draw the AI's card</button>
              </>
            ) : null}

            {state.phase === "proposal" && card ? (
              <>
                <p className="eyebrow">The AI asks · {card.value}</p>
                <h2>{card.label}</h2>
                <p>{card.text}</p>
                <div className="vote">
                  <button type="button" className="button primary" onClick={() => setState(vote(rules, state, true))}>
                    Approve
                    <small>{cap(describe(rules, card.effects)) || "Nothing"}</small>
                  </button>
                  <button type="button" className="button" onClick={() => setState(vote(rules, state, false))}>
                    Block
                    <small>{cap(describe(rules, card.block)) || "Nothing"}</small>
                  </button>
                </div>
              </>
            ) : null}

            {state.phase === "humans" && faction ? (
              <>
                {card ? (
                  <p className="last-card">
                    AI: <strong>{card.label}</strong> {card.proposal && !state.turned ? "" : `· ${describe(rules, card.effects)}`}
                  </p>
                ) : null}
                <p className="eyebrow">
                  {faction.label} · {state.actionsLeft} {state.actionsLeft === 1 ? "action" : "actions"} left
                </p>
                <button type="button" className="linkish goal-toggle" onClick={() => setShowGoal(!showGoal)}>
                  {showGoal ? faction.goal || "No private goal." : "Show my private goal"}
                </button>
                <div className="actions">
                  {(faction.actions || []).map((aid) => {
                    const action = (rules.actions || []).find((a) => a.id === aid);
                    if (!action) return null;
                    const possible = state.actionsLeft > 0 && canAfford(state, action.cost) && (!action.target || legalTargets(rules, state, action.target).length > 0);
                    return (
                      <button key={aid} type="button" className={`action${pending?.id === aid ? " active" : ""}`} disabled={!possible} onClick={() => choose(action)} title={action.rhetoric || ""}>
                        <strong>{action.label}</strong>
                        <small>
                          {action.cost && Object.keys(action.cost).length ? `Costs ${describeCost(rules, action.cost)}. ` : ""}
                          {action.target ? `Pick ${action.target === "ai" ? "a place the AI holds" : action.target === "free" ? "a free place" : action.target === "down" ? "a place that's down" : "a place"}: ` : ""}
                          {action.target ? describe(rules, action.effects) : cap(describe(rules, action.effects))}
                        </small>
                      </button>
                    );
                  })}
                </div>
                <button type="button" className="button primary" onClick={() => setState(endTurn(rules, state))}>
                  {state.factionIndex < (rules.factions || []).length - 1 ? `Done: pass to ${(rules.factions || [])[state.factionIndex + 1]?.label}` : "Done: end the round"}
                </button>
              </>
            ) : null}

            {state.phase === "over" && state.over ? (
              <>
                <p className="eyebrow">{state.over.winner === "ai" ? "The AI wins" : state.over.winner === "humans" ? "The humans held on" : "Everyone lost"}</p>
                <h2>{state.over.text}</h2>
                <ul className="scores">
                  {(rules.factions || []).map((f) => (
                    <li key={f.id}>
                      <strong>{f.label}</strong> {f.goal}
                      {f.score ? ` (${[...(rules.resources || []), ...(rules.tracks || [])].find((r) => r.id === f.score)?.label || f.score}: ${value(state, f.score)})` : ""}
                    </li>
                  ))}
                </ul>
                {(rules.debrief || []).length ? (
                  <>
                    <p className="eyebrow">Talk about it</p>
                    <ul>{rules.debrief.map((q) => <li key={q}>{q}</li>)}</ul>
                  </>
                ) : null}
                <div className="ruleset-actions">
                  <button type="button" className="button primary" onClick={() => setState(newGame(rules))}>Play again</button>
                  <Link className="button" href={`/game/edit/${id}`}>Change the rules</Link>
                </div>
              </>
            ) : null}
          </div>

          <ol className="log" aria-label="What happened">
            {state.log.slice(0, 30).map((entry, i) => (
              <li key={`${state.log.length - i}`} className={`log-${entry.kind}`}>
                <span>{entry.round}</span>
                {entry.text}
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <RulesList rules={rules} />
    </div>
  );
}

const cap = (text) => (text ? text[0].toUpperCase() + text.slice(1) : text);

const KIND_ICON = { data: "▣", energy: "ϟ", water: "≈", people: "●", money: "$", land: "▤" };

function GameMap({ rules, state, targets, onPick }) {
  const byId = useMemo(() => Object.fromEntries((rules.nodes || []).map((n) => [n.id, n])), [rules]);
  const edges = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const node of rules.nodes || []) {
      for (const link of node.links || []) {
        const k = [node.id, link].sort().join("|");
        if (seen.has(k) || !byId[link]) continue;
        seen.add(k);
        out.push([node, byId[link]]);
      }
    }
    return out;
  }, [rules, byId]);
  return (
    <svg className="map" viewBox="0 0 100 72" role="img" aria-label="Places and the links between them">
      {edges.map(([a, b]) => {
        const hot = state.nodes[a.id].owner === "ai" || state.nodes[b.id].owner === "ai";
        return <line key={`${a.id}-${b.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={hot ? "edge hot" : "edge"} />;
      })}
      {(rules.nodes || []).map((node) => {
        const s = state.nodes[node.id];
        const target = targets.includes(node.id);
        const cls = ["node", s.owner === "ai" ? "ai" : s.owner === "human" ? "human" : "free", s.status === "down" ? "down" : "", s.protected ? "protected" : "", target ? "target" : ""].join(" ");
        const yields = Object.entries(node.yield || {})
          .map(([k, n]) => `${n > 0 ? "+" : ""}${n} ${k}`)
          .join(", ");
        return (
          <g key={node.id} className={cls} transform={`translate(${node.x} ${node.y})`} onClick={() => onPick(node.id)} role={target ? "button" : undefined} tabIndex={target ? 0 : undefined} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick(node.id)}>
            <title>{`${node.label}${yields ? ` (${yields})` : ""}${node.rhetoric ? `: ${node.rhetoric}` : ""}`}</title>
            {s.protected ? <circle r="5.6" className="ring" /> : null}
            <circle r="4.2" className="dot" />
            <text className="icon" y="1.2">{s.status === "down" ? "×" : KIND_ICON[node.kind] || "·"}</text>
            <text className="label" y="7.6">{node.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function RulesList({ rules }) {
  return (
    <section className="rules-list">
      <h2>The rules, and what they claim</h2>
      <p className="muted">Hover a place, resource, or action in the game to see its claim. Every rule below can be changed in the editor.</p>
      <div className="rules-columns">
        <div>
          <h3>The AI's cards</h3>
          <ul>
            {(rules.ai?.deck || []).map((c) => (
              <li key={c.id}>
                <strong>{c.hidden ? `${c.label} (hidden)` : c.label}</strong> {c.value ? <em>· {c.value}</em> : null}
                {c.proposal ? " · asks first" : ""}. {describe(rules, c.effects)}
                {c.rhetoric ? <span className="claim">{c.rhetoric}</span> : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>What the humans can do</h3>
          <ul>
            {(rules.factions || []).map((f) => (
              <li key={f.id}>
                <strong>{f.label}</strong>: {(f.actions || []).map((aid) => (rules.actions || []).find((a) => a.id === aid)?.label).filter(Boolean).join(", ")}
              </li>
            ))}
            {(rules.actions || []).filter((a) => a.rhetoric).map((a) => (
              <li key={a.id}>
                <strong>{a.label}</strong>
                <span className="claim">{a.rhetoric}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Not modeled</h3>
          <ul>{(rules.notModeled || []).map((n) => <li key={n}>{n}</li>)}</ul>
          {rules.credits ? <p className="muted credits">{rules.credits}</p> : null}
        </div>
      </div>
    </section>
  );
}
