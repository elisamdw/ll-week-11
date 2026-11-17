"use client";

import Link from "next/link";
import { useState } from "react";

// Leaks: you turn power and water into compute. The compute shows up on your dashboard; the costs land somewhere
// else on the map, as cards. In the company's view the map past your fence stays dark until the end.
// Change the tuning values below and reload.

const TURNS = 8;
const ACTIONS = [
  { id: "water", label: "Train, water-cooled", compute: 4, leaks: { aquifer: 2, farms: 1, gas: 1 }, note: "Cheapest per unit of compute. Evaporative cooling draws on the same water as the town." },
  { id: "air", label: "Train, air-cooled", compute: 3, leaks: { gas: 3 }, note: "No water, more power: the chillers run on the grid." },
  { id: "chips", label: "Buy new chips", compute: 1, bonus: 1, leaks: { mine: 1, ewaste: 2 }, note: "Every later training makes 1 more compute. The old chips go somewhere." },
  { id: "night", label: "Train off-peak", compute: 2, leaks: { gas: 1 }, note: "Run at night on spare power, slower." },
];
const PLACES = [
  { id: "here", name: "The data center", x: 250, y: 250, here: true },
  { id: "aquifer", name: "The town's aquifer", x: 120, y: 360, breaksAt: 8, broken: "The town's shallow wells run dry." },
  { id: "farms", name: "Farms downstream", x: 340, y: 420, breaksAt: 5, broken: "The farms downstream lose a season of irrigation." },
  { id: "gas", name: "The gas plant upriver", x: 160, y: 90, breaksAt: 12, broken: "Air-quality alerts in the neighborhood beside the gas plant." },
  { id: "mine", name: "A mine far away", x: 640, y: 120, breaksAt: 3, broken: "A new pit opens, and the water table near the mine drops." },
  { id: "ewaste", name: "An e-waste yard", x: 650, y: 380, breaksAt: 5, broken: "The old chips are burned for their copper." },
];
// The cards that land at each place, in order; they repeat if a place gets more cards than lines.
const CARDS = {
  aquifer: ["The well at the school drops a foot.", "A neighbor's tap sputters in August.", "The town buys water from the next county.", "Lawn-watering ban, week three."],
  farms: ["Irrigation allotments cut by a tenth.", "A dry ditch where the creek was.", "A farmer sells the lower field."],
  gas: ["The plant runs a second shift.", "A haze over the river at dusk.", "An asthma clinic stays open late.", "Another turbine comes online."],
  mine: ["Tantalum ore for the capacitors.", "Tin for the solder.", "Copper for the boards and the wiring."],
  ewaste: ["Two pallets of old boards, shipped overseas.", "Wire stripped by hand for copper.", "Plastic burned off a circuit board."],
};
const VIEWS = [
  { id: "company", label: "The company's view", note: "Your dashboard shows compute and the fence around your site. The rest of the map is dark until the end." },
  { id: "map", label: "The map's view", note: "Every cost lands where you can see it, as it happens." },
];

const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p]));
const zeros = () => Object.fromEntries(PLACES.map((p) => [p.id, 0]));

function newGame(viewId) {
  return { view: VIEWS.find((v) => v.id === viewId) || VIEWS[0], turn: 1, compute: 0, bonus: 0, cards: zeros(), landed: [], chose: [], over: false };
}

function act(s, id) {
  if (s.over) return s;
  const a = ACTIONS.find((x) => x.id === id);
  const made = a.compute + (a.id === "chips" ? 0 : s.bonus);
  const cards = { ...s.cards };
  const landed = [...s.landed];
  for (const [place, n] of Object.entries(a.leaks)) {
    for (let i = 0; i < n; i++) {
      landed.push({ turn: s.turn, place, text: CARDS[place][cards[place] % CARDS[place].length] });
      cards[place] += 1;
    }
  }
  return { ...s, compute: s.compute + made, bonus: s.bonus + (a.bonus || 0), cards, landed, chose: [...s.chose, { turn: s.turn, id, made }], turn: s.turn + 1, over: s.turn >= TURNS };
}

export default function Leaks() {
  const [viewId, setViewId] = useState(VIEWS[0].id);
  const [game, setGame] = useState(null);

  const header = (
    <header className="eco-heading">
      <p className="eyebrow">Prototype · economy and the AI as a system</p>
      <h1>Leaks</h1>
      <p className="eco-deck">You run a data center. Each turn you turn power and water into compute, and the compute is all your board counts. The costs land somewhere else on the map.</p>
      <nav className="eco-links" aria-label="About this prototype">
        <Link href="/prototypes/economy/leaks">The card: how to play, what it shows, how to remix it</Link>
        <Link href="/game-ideas/the-invisible-flows">The idea it builds on</Link>
      </nav>
    </header>
  );

  if (!game) {
    return (
      <>
        {header}
        <section className="eco-setup">
          <h2>What can you see?</h2>
          <div className="eco-choice">
            {VIEWS.map((v) => (
              <label key={v.id}>
                <input type="radio" name="view" checked={viewId === v.id} onChange={() => setViewId(v.id)} />
                <span><strong>{v.label}</strong>{v.note}</span>
              </label>
            ))}
          </div>
          <p className="eco-muted">{TURNS} turns, one choice a turn, alone or with the room voting. Play once in each view and compare what you chose.</p>
          <button className="eco-button primary" onClick={() => setGame(newGame(viewId))}>Start</button>
        </section>
      </>
    );
  }

  const dark = game.view.id === "company" && !game.over;
  const lastTurn = game.landed.filter((c) => c.turn === game.turn - 1);
  const brokenPlaces = PLACES.filter((p) => p.breaksAt && game.cards[p.id] >= p.breaksAt);

  return (
    <>
      {header}
      <div className="eco-bar">
        <p className="eco-round">{game.over ? "The year is over" : `Turn ${game.turn} of ${TURNS}`}</p>
        <p className="leak-compute"><b>{game.compute}</b> compute{game.bonus ? <span className="eco-muted"> · new chips +{game.bonus} a training</span> : null}</p>
        <p className="eco-muted">{game.view.label}</p>
      </div>

      <section className="leak-stage">
        <svg viewBox="0 0 800 500" className="leak-map" role="img" aria-label="The map">
          {PLACES.filter((p) => !p.here).map((p) => (
            <line key={p.id} x1={placeById.here.x} y1={placeById.here.y} x2={p.x} y2={p.y} className={!dark && lastTurn.some((c) => c.place === p.id) ? "flow hot" : "flow"} />
          ))}
          <rect x={placeById.here.x - 95} y={placeById.here.y - 55} width="190" height="110" rx="14" className="fence" />
          <text x={placeById.here.x} y={placeById.here.y - 64} textAnchor="middle" className="fence-label">your fence: what the dashboard reports</text>
          {PLACES.map((p) => {
            const n = game.cards[p.id];
            const broken = p.breaksAt && n >= p.breaksAt;
            return (
              <g key={p.id} transform={`translate(${p.x},${p.y})`} className={`leak-place ${p.here ? "here" : ""} ${broken && !dark ? "broken" : ""}`}>
                <rect x="-80" y="-26" width="160" height="52" rx="10" />
                <text y="-6" textAnchor="middle" className="name">{p.name}</text>
                <text y="14" textAnchor="middle" className="nums">
                  {p.here ? `${game.compute} compute` : dark ? "not on the dashboard" : `${n} ${n === 1 ? "card" : "cards"}${p.breaksAt ? ` · breaks at ${p.breaksAt}` : ""}`}
                </text>
                {!p.here && !dark && Array.from({ length: Math.min(n, 12) }, (_, i) => (
                  <rect key={i} x={-78 + i * 13} y="30" width="10" height="14" rx="2" className="chip" />
                ))}
              </g>
            );
          })}
          {dark && <rect x="0" y="0" width="800" height="500" className="fog" mask="url(#leak-hole)" />}
          <defs>
            <mask id="leak-hole">
              <rect x="0" y="0" width="800" height="500" fill="white" />
              <rect x={placeById.here.x - 125} y={placeById.here.y - 86} width="250" height="150" rx="16" fill="black" />
            </mask>
          </defs>
        </svg>
        {!dark && lastTurn.length > 0 && !game.over && (
          <ul className="leak-cards">
            {lastTurn.map((c, i) => <li key={i}><b>{placeById[c.place].name}:</b> {c.text}</li>)}
          </ul>
        )}
        {dark && game.turn > 1 && <p className="eco-muted leak-dark-note">Your site used power and water this turn. Where it came from isn't on the dashboard.</p>}
      </section>

      {!game.over && (
        <div className="leak-actions">
          {ACTIONS.map((a) => (
            <button key={a.id} className="eco-button" onClick={() => setGame((g) => act(g, a.id))}>
              {a.label}
              <small>+{a.compute + (a.id === "chips" ? 0 : game.bonus)} compute{a.bonus ? `, then +${a.bonus} a training` : ""}</small>
              <small className="leak-note">{a.note}</small>
            </button>
          ))}
        </div>
      )}

      {game.over && (
        <section className="eco-end">
          <p className="eyebrow">{game.view.label} · {TURNS} turns</p>
          <h2>{game.compute} compute. {brokenPlaces.length ? `${brokenPlaces.length} ${brokenPlaces.length === 1 ? "place" : "places"} broke.` : "Nothing broke."}</h2>
          <div className="leak-compare">
            <div>
              <h3>The company's report</h3>
              <ul>
                <li>{game.compute} units of compute delivered.</li>
                <li>All operations inside the site's fence.</li>
                <li>{game.chose.filter((c) => c.id === "night").length ? `${game.chose.filter((c) => c.id === "night").length} turns of off-peak training.` : "Growth every quarter."}</li>
              </ul>
            </div>
            <div>
              <h3>The map</h3>
              <ul>
                {PLACES.filter((p) => !p.here && game.cards[p.id]).map((p) => (
                  <li key={p.id}><b>{p.name}:</b> {game.cards[p.id]} {game.cards[p.id] === 1 ? "card" : "cards"}{game.cards[p.id] >= p.breaksAt ? `. ${p.broken}` : ""}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>Your choices: {ACTIONS.map((a) => [a, game.chose.filter((c) => c.id === a.id).length]).filter(([, n]) => n).map(([a, n]) => `${a.label.toLowerCase()} ×${n}`).join(", ")}. Now play in the other view and see whether you choose differently.</p>
          <div className="eco-end-actions">
            <button className="eco-button primary" onClick={() => setGame(null)}>Play again</button>
            <Link className="eco-button" href="/prototypes/economy/leaks">Read the card</Link>
          </div>
        </section>
      )}
    </>
  );
}
