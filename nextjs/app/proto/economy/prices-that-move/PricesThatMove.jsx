"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Prices that move: three markets (GPUs, power, land), one AI that buys first every round,
// and three human factions who pay whatever price is left. Every purchase, the AI's or yours,
// pushes the price up the same curve. Change the tuning values below and reload.

const ROUNDS = 8;
const PRICE_CURVE = 1.6; // price = base × e^(PRICE_CURVE × sold ÷ supply): a sold-out market costs about 5× its base
const MARKETS = [
  { id: "gpu", label: "GPUs", noun: "GPUs", unit: "rack", units: "racks", base: 2, supply: 10, supplyGrowth: 2, color: "var(--eco-s1)" },
  { id: "power", label: "Power", noun: "power", unit: "MW", units: "MW", base: 1, supply: 14, supplyGrowth: 1, color: "var(--eco-s2)" },
  { id: "land", label: "Land", noun: "land", unit: "parcel", units: "parcels", base: 3, supply: 6, supplyGrowth: 0, color: "var(--eco-s3)" },
];
const AI = {
  startSites: 1.3, // data-center sites it wants in round 1
  site: { gpu: 2, power: 3, land: 1 }, // what one site needs
  paysAnyPrice: true, // its investors cover any price; set false to give it a budget
  budget: 40, // money a round, used only when paysAnyPrice is false
};
const GROWTH_SETTINGS = [
  { id: "rush", label: "Data Center", growth: 1.25, note: "The AI's demand grows 25% a round, as in yesterday's Data Center version." },
  { id: "normal", label: "Normal Technology", growth: 1.05, note: "5% a round, as in the Normal Technology version: it grows only as fast as people adopt it." },
];
const FACTIONS = [
  { id: "hospital", name: "The hospital", income: 8, needs: { power: 3 }, note: "Needs 3 MW a round to keep the wards running." },
  { id: "lab", name: "The university lab", income: 10, needs: { gpu: 2, power: 1 }, note: "Trains small models for flood forecasts." },
  { id: "coop", name: "The housing co-op", income: 8, needs: { land: 1, power: 1 }, note: "Builds one home a round." },
];
const HARM_LIMIT = 8; // needs that go unmet, across all factions, before the region breaks

const zeros = () => Object.fromEntries(MARKETS.map((m) => [m.id, 0]));
const marketById = Object.fromEntries(MARKETS.map((m) => [m.id, m]));
const money = (n) => `$${n.toFixed(1)}`;
const qty = (m, n) => `${n} ${n === 1 ? m.unit : m.units}`;
const maxIndex = Math.exp(PRICE_CURVE);

function price(state, id) {
  const m = marketById[id];
  return m.base * Math.exp((PRICE_CURVE * state.sold[id]) / state.supply[id]);
}

function newGame(growthId) {
  const setting = GROWTH_SETTINGS.find((g) => g.id === growthId) || GROWTH_SETTINGS[0];
  const state = {
    round: 1,
    setting,
    supply: Object.fromEntries(MARKETS.map((m) => [m.id, m.supply])),
    sold: zeros(),
    aiBought: zeros(),
    aiPaidRound: 0,
    aiPaid: 0,
    aiTotal: zeros(),
    totalSold: zeros(),
    factions: FACTIONS.map((f) => ({ id: f.id, cash: f.income, stock: zeros(), harm: 0, paid: 0 })),
    faced: zeros(),
    history: [],
    over: null,
  };
  return aiBuys(state);
}

// The AI goes first: it works out how many sites it wants this round and buys what they need, unit by unit, at any price.
function aiBuys(s) {
  const sites = AI.startSites * s.setting.growth ** (s.round - 1);
  const state = { ...s, sold: { ...s.sold }, aiBought: zeros(), aiPaidRound: 0, sites };
  let budget = AI.paysAnyPrice ? Infinity : AI.budget;
  for (const m of MARKETS) {
    const want = Math.round(sites * (AI.site[m.id] || 0));
    for (let i = 0; i < want && state.sold[m.id] < state.supply[m.id]; i++) {
      const p = price(state, m.id);
      if (p > budget) break;
      budget -= p;
      state.aiPaidRound += p;
      state.sold[m.id] += 1;
      state.aiBought[m.id] += 1;
    }
  }
  state.faced = Object.fromEntries(MARKETS.map((m) => [m.id, price(state, m.id)]));
  return state;
}

function buy(s, factionId, marketId) {
  const p = price(s, marketId);
  const f = s.factions.find((x) => x.id === factionId);
  if (s.over || f.cash < p || s.sold[marketId] >= s.supply[marketId]) return s;
  return {
    ...s,
    sold: { ...s.sold, [marketId]: s.sold[marketId] + 1 },
    factions: s.factions.map((x) => (x.id === factionId ? { ...x, cash: x.cash - p, paid: x.paid + p, stock: { ...x.stock, [marketId]: x.stock[marketId] + 1 } } : x)),
  };
}

// End of the round: each faction uses what it needs from its stock; whatever it lacks is harm.
function endRound(s) {
  const factions = s.factions.map((f) => {
    const needs = FACTIONS.find((x) => x.id === f.id).needs;
    const stock = { ...f.stock };
    let harm = f.harm;
    for (const [id, n] of Object.entries(needs)) {
      const used = Math.min(stock[id], n);
      stock[id] -= used;
      harm += n - used;
    }
    return { ...f, stock, harm };
  });
  const record = {
    round: s.round,
    faced: s.faced,
    end: Object.fromEntries(MARKETS.map((m) => [m.id, price(s, m.id)])),
    aiBought: s.aiBought,
    sold: s.sold,
    supply: s.supply,
  };
  const next = {
    ...s,
    factions,
    history: [...s.history, record],
    aiPaid: s.aiPaid + s.aiPaidRound,
    aiTotal: Object.fromEntries(MARKETS.map((m) => [m.id, s.aiTotal[m.id] + s.aiBought[m.id]])),
    totalSold: Object.fromEntries(MARKETS.map((m) => [m.id, s.totalSold[m.id] + s.sold[m.id]])),
  };
  const harm = factions.reduce((sum, f) => sum + f.harm, 0);
  if (harm >= HARM_LIMIT) return { ...next, over: "broke" };
  if (s.round >= ROUNDS) return { ...next, over: "done" };
  return aiBuys({
    ...next,
    round: s.round + 1,
    supply: Object.fromEntries(MARKETS.map((m) => [m.id, s.supply[m.id] + m.supplyGrowth])),
    sold: zeros(),
    factions: factions.map((f) => ({ ...f, cash: f.cash + FACTIONS.find((x) => x.id === f.id).income })),
  });
}

export default function PricesThatMove() {
  const [growthId, setGrowthId] = useState(GROWTH_SETTINGS[0].id);
  const [game, setGame] = useState(null);

  const header = (
    <header className="eco-heading">
      <p className="eyebrow">Prototype · economy and the AI as a system</p>
      <h1>Prices that move</h1>
      <p className="eco-deck">Nothing on the board has a printed price. The screen holds the prices of GPUs, power and land, and they rise as things sell. The AI buys first, every round, at any price. Three factions buy what's left.</p>
      <nav className="eco-links" aria-label="About this prototype">
        <Link href="/prototypes/economy/prices-that-move">The card: how to play, what it shows, how to remix it</Link>
        <Link href="/game-ideas/prices-that-move">The idea it builds on</Link>
      </nav>
    </header>
  );

  if (!game) {
    return (
      <>
        {header}
        <section className="eco-setup">
          <h2>How fast does the AI's demand grow?</h2>
          <div className="eco-choice">
            {GROWTH_SETTINGS.map((g) => (
              <label key={g.id}>
                <input type="radio" name="growth" value={g.id} checked={growthId === g.id} onChange={() => setGrowthId(g.id)} />
                <span>
                  <strong>{g.label}</strong>
                  {g.note}
                </span>
              </label>
            ))}
          </div>
          <p className="eco-muted">One to three players at one screen, one faction each, {ROUNDS} rounds. Each round the AI buys, then you buy what your faction needs before you press End round. What you can't get counts as harm; at {HARM_LIMIT} harm the region breaks. Spare units carry over.</p>
          <button className="eco-button primary" onClick={() => setGame(newGame(growthId))}>Start</button>
        </section>
      </>
    );
  }

  const harmTotal = game.factions.reduce((sum, f) => sum + f.harm, 0);

  return (
    <>
      {header}
      <div className="eco-bar">
        <p className="eco-round">{game.over ? "Game over" : `Round ${game.round} of ${ROUNDS}`}</p>
        <div className="eco-harmbar" aria-label={`Harm ${harmTotal} of ${HARM_LIMIT}`}>
          <span>Harm {harmTotal} / {HARM_LIMIT}</span>
          <span className="track"><span className="fill" style={{ display: "block", width: `${Math.min(100, (harmTotal / HARM_LIMIT) * 100)}%` }} /></span>
        </div>
        <p className="eco-muted">{game.setting.label} · AI demand ×{game.setting.growth} a round</p>
        {!game.over && <button className="eco-button primary" onClick={() => setGame((g) => endRound(g))}>End round</button>}
      </div>

      <section className="eco-prices" aria-label="Prices">
        {MARKETS.map((m) => {
          const p = price(game, m.id);
          const supply = game.supply[m.id];
          const ai = game.aiBought[m.id];
          const people = game.sold[m.id] - ai;
          const left = supply - game.sold[m.id];
          return (
            <article key={m.id} className="eco-price" style={{ "--swatch": m.color }}>
              <h3>{m.label}</h3>
              <p className="eco-price-value">{left > 0 ? <>{money(p)}<small>per {m.unit}</small></> : <span className="eco-soldout-big">Sold out</span>}</p>
              <p className="eco-price-index"><b>{(p / m.base).toFixed(1)}×</b> its base price of {money(m.base)}</p>
              <div className="eco-meter" aria-hidden="true">
                {ai > 0 && <span className="ai" style={{ flex: ai }} />}
                {people > 0 && <span className="people" style={{ flex: people }} />}
                {left > 0 && <span className="left" style={{ flex: left }} />}
              </div>
              <p className="eco-meter-key">AI {ai} · people {people} · {left > 0 ? `${left} left of ${supply}` : <span className="eco-soldout">sold out ({supply})</span>}</p>
            </article>
          );
        })}
      </section>

      {!game.over && (
        <div className="eco-ai">
          <p>
            <strong>The AI went first.</strong> It wants {game.sites.toFixed(1)} data-center sites this round and bought{" "}
            {MARKETS.map((m) => `${qty(m, game.aiBought[m.id])} of ${m.noun}`).join(", ")} for {money(game.aiPaidRound)}. {AI.paysAnyPrice ? "Its investors pay any price." : `It has ${money(AI.budget)} a round.`}
          </p>
        </div>
      )}

      {!game.over && (
        <section className="eco-factions" aria-label="Factions">
          {FACTIONS.map((def) => {
            const f = game.factions.find((x) => x.id === def.id);
            return (
              <article key={def.id} className="eco-faction">
                <h3>{def.name}</h3>
                <p>{def.note} Income {money(def.income)} a round.</p>
                <p className="eco-cash">{money(f.cash)}</p>
                <ul className="eco-needs">
                  {Object.entries(def.needs).map(([id, n]) => {
                    const m = marketById[id];
                    const p = price(game, id);
                    const soldOut = game.sold[id] >= game.supply[id];
                    const short = Math.max(0, n - f.stock[id]);
                    return (
                      <li key={id}>
                        <span>
                          {m.label}: {f.stock[id]} of {qty(m, n)}
                          <em className={short ? "eco-short" : ""}>{short ? `${short} short if the round ends now` : f.stock[id] > n ? `${f.stock[id] - n} spare` : "covered"}</em>
                        </span>
                        <button className="eco-button" disabled={soldOut || f.cash < p} onClick={() => setGame((g) => buy(g, def.id, id))}>
                          Buy 1<small>{soldOut ? "sold out" : money(p)}</small>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="eco-harm">Harm so far: <b>{f.harm}</b> · paid {money(f.paid)}</p>
              </article>
            );
          })}
        </section>
      )}

      {game.over && <Ending game={game} harmTotal={harmTotal} onAgain={() => setGame(null)} />}

      <PriceChart history={game.history} current={game.over ? null : { round: game.round, faced: game.faced }} />
    </>
  );
}

function Ending({ game, harmTotal, onAgain }) {
  const share = (id) => (game.totalSold[id] ? Math.round((game.aiTotal[id] / game.totalSold[id]) * 100) : 0);
  const peopleSpent = game.factions.reduce((sum, f) => sum + f.paid, 0);
  return (
    <section className="eco-end">
      <p className="eyebrow">{game.setting.label} · {game.history.length} rounds</p>
      <h2>{game.over === "broke" ? `The region broke in round ${game.history.length}.` : harmTotal === 0 ? "Every need was met." : `${harmTotal} needs went unmet.`}</h2>
      <ul>
        <li>The AI bought {MARKETS.map((m) => `${share(m.id)}% of the ${m.noun}`).join(", ")}, and paid {money(game.aiPaid)}.</li>
        <li>The three factions paid {money(peopleSpent)} between them. Needs that went unmet: {game.factions.map((f) => `${FACTIONS.find((x) => x.id === f.id).name.replace(/^The /, "the ")} ${f.harm}`).join(", ")}.</li>
        <li>No one in the game set a price. The curve did, and the AI was always first in line.</li>
      </ul>
      <p>Now play it again with the other setting, and compare the two charts.</p>
      <div className="eco-end-actions">
        <button className="eco-button primary" onClick={onAgain}>Play again</button>
        <Link className="eco-button" href="/prototypes/economy/prices-that-move">Read the card</Link>
      </div>
    </section>
  );
}

// Price as a multiple of its base, per round, at the moment the factions start buying (after the AI).
function PriceChart({ history, current }) {
  const [hover, setHover] = useState(null);
  const [W, setW] = useState(640); // drawn at the container's real width, so text stays at its CSS size
  const box = useRef(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const rows = current ? [...history, current] : history;
  const H = 240, L = 36, R = 64, T = 14, B = 28;
  const x = (round) => L + ((round - 1) / Math.max(1, ROUNDS - 1)) * (W - L - R);
  const y = (index) => T + (1 - (index - 1) / (maxIndex - 1)) * (H - T - B);
  const ticks = [1, 2, 3, 4, 5].filter((t) => t < maxIndex - 0.3);

  // Direct labels at each line's last point, nudged apart so they don't collide.
  const last = rows[rows.length - 1];
  const labels = last
    ? MARKETS.map((m) => ({ m, y: y(last.faced[m.id] / m.base) })).sort((a, b) => a.y - b.y)
    : [];
  for (let i = 1; i < labels.length; i++) labels[i].y = Math.max(labels[i].y, labels[i - 1].y + 14);

  const hovered = hover != null ? rows.find((r) => r.round === hover) : null;

  return (
    <section className="eco-chart" aria-label="Price chart" ref={box}>
      <h3>What the factions faced, round by round</h3>
      <p>Each price as a multiple of its base, right after the AI bought. The axis stops at {maxIndex.toFixed(1)}×, the price of a sold-out market.</p>
      <ul className="eco-legend">
        {MARKETS.map((m) => (
          <li key={m.id} style={{ "--swatch": m.color }}><i />{m.label}</li>
        ))}
      </ul>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart of prices by round" onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={t === 1 ? "var(--eco-axis)" : "var(--eco-grid)"} strokeWidth="1" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end">{t}×</text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={y(maxIndex)} y2={y(maxIndex)} stroke="var(--eco-warn)" strokeWidth="1" strokeDasharray="4 4" />
        <text x={L - 8} y={y(maxIndex) + 4} textAnchor="end">{maxIndex.toFixed(1)}×</text>
        <text x={L + 6} y={y(maxIndex) - 6}>sold out</text>
        {Array.from({ length: ROUNDS }, (_, i) => i + 1).map((r) => (
          <text key={r} x={x(r)} y={H - 8} textAnchor="middle">{r}</text>
        ))}
        {hovered && <line x1={x(hovered.round)} x2={x(hovered.round)} y1={T} y2={H - B} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" />}
        {MARKETS.map((m) => (
          <g key={m.id}>
            {rows.length > 1 && (
              <polyline fill="none" stroke={m.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={rows.map((r) => `${x(r.round)},${y(r.faced[m.id] / m.base)}`).join(" ")} />
            )}
            {rows.map((r) => (
              <circle key={r.round} cx={x(r.round)} cy={y(r.faced[m.id] / m.base)} r={hover === r.round ? 5 : 4} fill={m.color} stroke="#1a1c19" strokeWidth="2" />
            ))}
          </g>
        ))}
        {labels.map(({ m, y: ly }) => (
          <text key={m.id} className="label" x={x(last.round) + 10} y={ly + 4}>{m.label}</text>
        ))}
        {rows.map((r) => (
          <rect key={r.round} x={x(r.round) - (W - L - R) / (ROUNDS - 1) / 2} y={T} width={(W - L - R) / (ROUNDS - 1)} height={H - T - B} fill="transparent" onMouseEnter={() => setHover(r.round)} />
        ))}
      </svg>
      {hovered && (
        <div className="eco-tip" style={{ left: x(hovered.round) + (hovered.round > ROUNDS / 2 ? -170 : 30), top: 90 }}>
          <b>Round {hovered.round}</b>
          {MARKETS.map((m) => (
            <span key={m.id} style={{ "--swatch": m.color }}>
              <span><i />{m.label}</span>
              <span>{money(hovered.faced[m.id])} · {(hovered.faced[m.id] / m.base).toFixed(1)}×</span>
            </span>
          ))}
        </div>
      )}
      {history.length > 0 && (
        <details className="eco-table">
          <summary>Show as a table</summary>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                {MARKETS.map((m) => <th key={m.id}>{m.label} price</th>)}
                {MARKETS.map((m) => <th key={m.id}>AI share of {m.label.toLowerCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {history.map((r) => (
                <tr key={r.round}>
                  <td>{r.round}</td>
                  {MARKETS.map((m) => <td key={m.id}>{money(r.faced[m.id])}</td>)}
                  {MARKETS.map((m) => <td key={m.id}>{r.aiBought[m.id]} of {r.supply[m.id]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </section>
  );
}
