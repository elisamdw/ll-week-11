"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Cascade: a small grid where every place carries a load and has a capacity. When a place's load passes its
// capacity it fails, and its load moves to its neighbors. Across a tight link it arrives at once and can knock the
// neighbor down the same round; across a loose link it arrives next round, when you can see it coming (Perrow).
// Each round the AI's data centers draw more, and a heat wave lands somewhere you're told in advance. You harden
// one place and loosen one link each round. Change the tuning values below and reload.

const ROUNDS = 6;
const HARDEN_PER_ROUND = 1; // places you can harden each round
const LOOSEN_PER_ROUND = 1; // tight links you can loosen each round
const HARDEN_BY = 2; // capacity a hardening adds, for the rest of the game
const AI_GROWTH = 1.25; // data centers draw 25% more each round
const DRAW_SHARE = 0.5; // half of each data center's new draw also loads each substation that feeds it
const HEAT_WAVE = 4; // load a heat wave adds, for one round
const CRITICAL_HARM = 3; // harm when a critical place (hospital, water) goes down, on top of its lost load
const HARM_LIMIT = 30;
const STARTS = [
  { id: "tight", label: "Every link tight", note: "A failure's load reaches its neighbors at once and can knock them down the same round. Loosen one link a round, the ones you choose." },
  { id: "loose", label: "Every link loose", note: "A failure's load reaches its neighbors next round, so failures spread one step a round and you can see each one coming." },
];
const PLACES = [
  { id: "plant", name: "Power plant", x: 400, y: 70, capacity: 16, load: 6 },
  { id: "subN", name: "North substation", x: 190, y: 190, capacity: 9, load: 5 },
  { id: "subE", name: "East substation", x: 400, y: 210, capacity: 9, load: 5 },
  { id: "subS", name: "South substation", x: 610, y: 190, capacity: 9, load: 5 },
  { id: "dc1", name: "Data center 1", x: 300, y: 330, capacity: 8, load: 3, ai: true },
  { id: "dc2", name: "Data center 2", x: 510, y: 330, capacity: 8, load: 2.5, ai: true },
  { id: "hospital", name: "Hospital", x: 70, y: 310, capacity: 6, load: 2, critical: true },
  { id: "water", name: "Water plant", x: 400, y: 440, capacity: 6, load: 2, critical: true },
  { id: "homesN", name: "Homes (north)", x: 120, y: 430, capacity: 6, load: 1.5 },
  { id: "homesS", name: "Homes (south)", x: 700, y: 330, capacity: 6, load: 1.5 },
  { id: "school", name: "School", x: 680, y: 440, capacity: 5, load: 1 },
];
const LINKS = [
  ["plant", "subN"], ["plant", "subE"], ["plant", "subS"],
  ["subN", "dc1"], ["subE", "dc1"], ["subE", "dc2"], ["subS", "dc2"],
  ["subN", "hospital"], ["subN", "homesN"], ["hospital", "homesN"],
  ["dc1", "water"], ["dc2", "water"], ["subS", "homesS"], ["homesS", "school"], ["water", "school"],
];
// Where the heat waves land, one per round. Change the order, or shuffle it, to make a different game.
const HEAT_WAVES = ["subN", "subE", "dc2", "subS", "subN", "subE"];

const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p]));
const neighbors = Object.fromEntries(PLACES.map((p) => [p.id, LINKS.filter((l) => l.includes(p.id)).map((l) => (l[0] === p.id ? l[1] : l[0]))]));
const feeds = (id) => neighbors[id].filter((n) => n.startsWith("sub"));
const fmt = (n) => (Math.round(n * 10) / 10).toString();
const times = (n) => (n === 0 ? "no times" : n === 1 ? "once" : n === 2 ? "twice" : `${n} times`);

const linkKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

function newGame(startId) {
  const start = STARTS.find((c) => c.id === startId) || STARTS[0];
  return {
    start,
    loose: Object.fromEntries(LINKS.map(([a, b]) => [linkKey(a, b), start.id === "loose"])),
    loosened: 0,
    incoming: Object.fromEntries(PLACES.map((p) => [p.id, 0])), // load in transit over loose links, arriving this round
    round: 1,
    base: Object.fromEntries(PLACES.map((p) => [p.id, p.load])),
    capacity: Object.fromEntries(PLACES.map((p) => [p.id, p.capacity])),
    hardened: Object.fromEntries(PLACES.map((p) => [p.id, 0])),
    toHarden: HARDEN_PER_ROUND,
    toLoosen: LOOSEN_PER_ROUND,
    steps: null, // the cascade being shown, one step at a time
    shown: 0,
    harm: 0,
    history: [],
    over: null,
  };
}

// The AI's draw grows; the heat wave lands; then failures spread until nothing else is over capacity.
// Returns the steps to show: each step lists the loads, what is down, and which links carried load.
function runRound(s) {
  const base = { ...s.base };
  for (const p of PLACES.filter((p) => p.ai)) {
    const extra = base[p.id] * (AI_GROWTH - 1);
    base[p.id] += extra;
    for (const sub of feeds(p.id)) base[sub] += extra * DRAW_SHARE;
  }
  const wave = HEAT_WAVES[(s.round - 1) % HEAT_WAVES.length];
  const load = Object.fromEntries(PLACES.map((p) => [p.id, base[p.id] + s.incoming[p.id]]));
  load[wave] += HEAT_WAVE;
  const arriving = PLACES.filter((p) => s.incoming[p.id] > 0).map((p) => `${fmt(s.incoming[p.id])} at ${placeById[p.id].name}`);
  const incoming = Object.fromEntries(PLACES.map((p) => [p.id, 0]));
  const down = new Set();
  let lost = 0;
  const steps = [{ load: { ...load }, down: [], flows: [], note: `The data centers draw ${Math.round((AI_GROWTH - 1) * 100)}% more. A heat wave adds ${HEAT_WAVE} at ${placeById[wave].name}.${arriving.length ? ` Load arrives over loose links: ${arriving.join(", ")}.` : ""}` }];
  for (let guard = 0; guard < 20; guard++) {
    const failing = PLACES.filter((p) => !down.has(p.id) && load[p.id] > s.capacity[p.id] + 1e-9).map((p) => p.id);
    if (!failing.length) break;
    const flows = [];
    for (const id of failing) down.add(id);
    for (const id of failing) {
      const open = neighbors[id].filter((n) => !down.has(n));
      if (!open.length) lost += load[id];
      for (const n of open) {
        const share = load[id] / open.length;
        if (s.loose[linkKey(id, n)]) {
          incoming[n] += share; // crosses next round
          flows.push([id, n, "later"]);
        } else {
          load[n] += share; // crosses now
          flows.push([id, n, "now"]);
        }
      }
      load[id] = 0;
    }
    steps.push({ load: { ...load }, down: [...down], flows, note: `${failing.map((id) => placeById[id].name).join(", ")} ${failing.length === 1 ? "fails" : "fail"}.` });
  }
  const criticalDown = [...down].filter((id) => placeById[id].critical);
  const harm = lost + criticalDown.length * CRITICAL_HARM;
  const last = steps[steps.length - 1];
  const later = PLACES.filter((p) => incoming[p.id] > 0);
  last.note += !down.size ? " Everything held." : harm === 0 ? " Its load moved to its neighbors and they held, so it cost nothing this round." : ` Lost load ${fmt(lost)}${criticalDown.length ? `, and ${criticalDown.map((id) => placeById[id].name.toLowerCase()).join(" and ")} down` : ""}: harm +${fmt(harm)}.`;
  if (later.length) last.note += ` In transit over loose links, arriving next round: ${later.map((p) => `${fmt(incoming[p.id])} at ${p.name}`).join(", ")}.`;
  return { base, incoming, steps, result: { round: s.round, wave, down: [...down], lost, harm } };
}

export default function Cascade() {
  const [startId, setStartId] = useState(STARTS[0].id);
  const [game, setGame] = useState(null);

  // Play the cascade one step every 700 ms.
  useEffect(() => {
    if (!game?.steps || game.shown >= game.steps.length - 1) return;
    const t = setTimeout(() => setGame((g) => ({ ...g, shown: g.shown + 1 })), 700);
    return () => clearTimeout(t);
  }, [game?.steps, game?.shown]);

  const harden = (id) =>
    setGame((g) => {
      if (!g || g.over || g.steps || g.toHarden < 1) return g;
      return { ...g, toHarden: g.toHarden - 1, capacity: { ...g.capacity, [id]: g.capacity[id] + HARDEN_BY }, hardened: { ...g.hardened, [id]: g.hardened[id] + 1 } };
    });

  const loosen = (key) =>
    setGame((g) => {
      if (!g || g.over || g.steps || g.toLoosen < 1 || g.loose[key]) return g;
      return { ...g, toLoosen: g.toLoosen - 1, loose: { ...g.loose, [key]: true }, loosened: g.loosened + 1 };
    });

  const run = () =>
    setGame((g) => {
      if (!g || g.over || g.steps) return g;
      const { base, incoming, steps, result } = runRound(g);
      return { ...g, base, steps, shown: 0, pending: result, nextIncoming: incoming };
    });

  const next = () =>
    setGame((g) => {
      if (!g?.steps || g.shown < g.steps.length - 1) return g;
      const harm = g.harm + g.pending.harm;
      const history = [...g.history, g.pending];
      const over = harm >= HARM_LIMIT ? "broke" : g.round >= ROUNDS ? "done" : null;
      return { ...g, harm, history, over, incoming: g.nextIncoming, steps: over ? g.steps : null, shown: over ? g.shown : 0, pending: null, round: over ? g.round : g.round + 1, toHarden: HARDEN_PER_ROUND, toLoosen: LOOSEN_PER_ROUND };
    });

  const header = (
    <header className="eco-heading">
      <p className="eyebrow">Prototype · economy and the AI as a system</p>
      <h1>Cascade</h1>
      <p className="eco-deck">Every place on the grid carries a load. Past its capacity it fails, and its load moves to its neighbors: at once across a tight link, next round across a loose one. The AI's data centers draw more every round, and a heat wave lands somewhere each round. Each round, harden a place and loosen a link before it hits.</p>
      <nav className="eco-links" aria-label="About this prototype">
        <Link href="/prototypes/economy/cascade">The card: how to play, what it shows, how to remix it</Link>
      </nav>
    </header>
  );

  if (!game) {
    return (
      <>
        {header}
        <section className="eco-setup">
          <h2>How does the grid start?</h2>
          <div className="eco-choice">
            {STARTS.map((c) => (
              <label key={c.id}>
                <input type="radio" name="coupling" checked={startId === c.id} onChange={() => setStartId(c.id)} />
                <span><strong>{c.label}</strong>{c.note}</span>
              </label>
            ))}
          </div>
          <p className="eco-muted">{ROUNDS} rounds, alone or with the room deciding. Each round, click {HARDEN_PER_ROUND === 1 ? "a place" : `${HARDEN_PER_ROUND} places`} to harden (+{HARDEN_BY} capacity for good) and {LOOSEN_PER_ROUND === 1 ? "a tight link" : `${LOOSEN_PER_ROUND} tight links`} to loosen (for good). Then run the round. Lost load is harm, and the hospital or water plant going down adds {CRITICAL_HARM} more. At {HARM_LIMIT} harm the region breaks.</p>
          <button className="eco-button primary" onClick={() => setGame(newGame(startId))}>Start</button>
        </section>
      </>
    );
  }

  const step = game.steps ? game.steps[game.shown] : null;
  const load = step ? step.load : game.base;
  const down = new Set(step ? step.down : []);
  const flows = step ? step.flows : [];
  const settled = game.steps && game.shown >= game.steps.length - 1;
  const wave = HEAT_WAVES[(game.round - 1) % HEAT_WAVES.length];
  const state = (id) => (down.has(id) ? "down" : load[id] / game.capacity[id] > 0.8 ? "strained" : "ok");

  return (
    <>
      {header}
      <div className="eco-bar">
        <p className="eco-round">{game.over ? "Game over" : `Round ${game.round} of ${ROUNDS}`}</p>
        <div className="eco-harmbar" aria-label={`Harm ${fmt(game.harm)} of ${HARM_LIMIT}`}>
          <span>Harm {fmt(game.harm + (settled && game.pending ? game.pending.harm : 0))} / {HARM_LIMIT}</span>
          <span className="track"><span className="fill" style={{ display: "block", width: `${Math.min(100, ((game.harm + (settled && game.pending ? game.pending.harm : 0)) / HARM_LIMIT) * 100)}%` }} /></span>
        </div>
        <p className="eco-muted">{LINKS.filter(([a, b]) => game.loose[linkKey(a, b)]).length} of {LINKS.length} links loose</p>
      </div>

      <section className="cas-stage">
        <p className="cas-note">
          {step ? step.note : <>Next: the data centers draw {Math.round((AI_GROWTH - 1) * 100)}% more, and a heat wave adds {HEAT_WAVE} at <b>{placeById[wave].name}</b>{PLACES.some((p) => game.incoming[p.id] > 0) ? <>; arriving over loose links: <b>{PLACES.filter((p) => game.incoming[p.id] > 0).map((p) => `${fmt(game.incoming[p.id])} at ${p.name}`).join(", ")}</b></> : null}. {game.toHarden + game.toLoosen === 0 ? "Ready: run the round." : <>Left to place: {game.toHarden} {game.toHarden === 1 ? "hardening" : "hardenings"} (click a place), {game.toLoosen} {game.toLoosen === 1 ? "loosening" : "loosenings"} (click a tight link). Then run the round.</>}</>}
        </p>
        <div className="cas-scroll">
        <svg viewBox="0 0 800 500" className="cas-map" role="img" aria-label="The grid">
          {LINKS.map(([a, b]) => {
            const key = linkKey(a, b);
            const flow = flows.find(([f, t]) => linkKey(f, t) === key);
            const dead = down.has(a) || down.has(b);
            const canLoosen = !game.steps && !game.over && game.toLoosen > 0 && !game.loose[key];
            const cls = [game.loose[key] ? "loose" : "", flow ? (flow[2] === "later" ? "later" : "hot") : dead ? "dead" : ""].join(" ");
            return (
              <g key={key} className={`cas-link ${canLoosen ? "clickable" : ""}`} onClick={() => canLoosen && loosen(key)}>
                <line x1={placeById[a].x} y1={placeById[a].y} x2={placeById[b].x} y2={placeById[b].y} className={cls} />
                <line x1={placeById[a].x} y1={placeById[a].y} x2={placeById[b].x} y2={placeById[b].y} className="hit"><title>{game.loose[key] ? "Loose link: load crosses next round" : canLoosen ? "Click to loosen this link" : "Tight link: load crosses at once"}</title></line>
              </g>
            );
          })}
          {PLACES.map((p) => {
            const st = state(p.id);
            const frac = Math.min(1, load[p.id] / game.capacity[p.id]);
            const canHarden = !game.steps && !game.over && game.toHarden > 0;
            return (
              <g key={p.id} transform={`translate(${p.x},${p.y})`} className={`cas-place ${st} ${p.ai ? "ai" : ""} ${canHarden ? "clickable" : ""}`} onClick={() => canHarden && harden(p.id)}>
                <rect x="-62" y="-30" width="124" height="60" rx="10" />
                <text y="-10" textAnchor="middle" className="name">{p.critical ? "✚ " : ""}{p.name}</text>
                <rect x="-48" y="2" width="96" height="8" rx="4" className="bar-bg" />
                <rect x="-48" y="2" width={96 * (st === "down" ? 0 : frac)} height="8" rx="4" className="bar" />
                <text y="24" textAnchor="middle" className="nums">{st === "down" ? "down" : `${fmt(load[p.id])} / ${fmt(game.capacity[p.id])}`}{game.hardened[p.id] ? ` · ${"▲".repeat(game.hardened[p.id])}` : ""}</text>
                {!game.steps && !game.over && (p.id === wave || game.incoming[p.id] > 0) && <text y="-38" textAnchor="middle" className="wave">{[p.id === wave ? `heat wave +${HEAT_WAVE}` : "", game.incoming[p.id] > 0 ? `arriving +${fmt(game.incoming[p.id])}` : ""].filter(Boolean).join(" · ")}</text>}
              </g>
            );
          })}
        </svg>
        </div>
        <ul className="cas-key">
          <li><i className="ok" />holding</li>
          <li><i className="strained" />over 80%</li>
          <li><i className="down" />down</li>
          <li><i className="ai" />the AI's data centers</li>
          <li>▲ hardened (+{HARDEN_BY})</li>
          <li><i className="link tight" />tight link (click to loosen)</li>
          <li><i className="link loose" />loose link</li>
        </ul>
      </section>

      {!game.over && (
        <div className="race-reveal">
          {!game.steps && <button className="eco-button primary" onClick={run}>Run the round</button>}
          {settled && <button className="eco-button primary" onClick={next}>{game.round >= ROUNDS ? "See how it ended" : "Repair and go to the next round"}</button>}
          {game.steps && !settled && <p className="eco-muted">The cascade is running…</p>}
        </div>
      )}

      {game.over && (
        <section className="eco-end">
          <p className="eyebrow">Started with {game.start.label.toLowerCase()} · {game.history.length} rounds</p>
          <h2>{game.over === "broke" ? `The region broke in round ${game.history.length}.` : `The grid made it through ${ROUNDS} rounds with ${fmt(game.harm)} harm.`}</h2>
          <ul>
            <li>Places that went down: {game.history.reduce((n, r) => n + r.down.length, 0)}, over {game.history.filter((r) => r.down.length).length} rounds.</li>
            <li>The hospital went down {times(game.history.filter((r) => r.down.includes("hospital")).length)}; the water plant {times(game.history.filter((r) => r.down.includes("water")).length)}.</li>
            <li>You hardened: {PLACES.filter((p) => game.hardened[p.id]).map((p) => `${p.name}${game.hardened[p.id] > 1 ? ` ×${game.hardened[p.id]}` : ""}`).join(", ") || "nothing"}.</li>
            <li>You loosened {game.loosened} {game.loosened === 1 ? "link" : "links"}{game.loosened ? `: ${LINKS.filter(([a, b]) => game.loose[linkKey(a, b)] && game.start.id === "tight").map(([a, b]) => `${placeById[a].name} to ${placeById[b].name}`).join(", ")}` : ""}.</li>
            {PLACES.some((p) => p.ai && game.hardened[p.id]) && <li>{PLACES.filter((p) => p.ai).reduce((n, p) => n + game.hardened[p.id], 0)} of your hardenings went to the AI's data centers, to keep the town's lights on.</li>}
          </ul>
          <p>{game.start.id === "tight" ? "Play again with every link loose, or loosen different links, and compare." : "Play again with every link tight, and choose which to loosen."}</p>
          <div className="eco-end-actions">
            <button className="eco-button primary" onClick={() => setGame(null)}>Play again</button>
            <Link className="eco-button" href="/prototypes/economy/cascade">Read the card</Link>
          </div>
        </section>
      )}

      {game.history.length > 0 && (
        <details className="eco-table" open={!!game.over}>
          <summary>Round by round</summary>
          <table>
            <thead><tr><th>Round</th><th>Heat wave</th><th>Went down</th><th>Lost load</th><th>Harm</th></tr></thead>
            <tbody>
              {game.history.map((r) => (
                <tr key={r.round}><td>{r.round}</td><td>{placeById[r.wave].name}</td><td>{r.down.map((id) => placeById[id].name).join(", ") || "nothing"}</td><td>{fmt(r.lost)}</td><td>{fmt(r.harm)}</td></tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </>
  );
}
