// Place to commit: each round the AI announces where it will move and how hard. The table talks, then every phone
// commits one token in secret: to defend a place, or to your own project for a point. Once committed it can't be
// taken back. When everyone has committed, the table screen reveals all the orders at once and the AI moves.
// Shared by the table screen (Table.jsx), which resolves each round, and the phones (Phone.jsx), which commit.

// ---- Tuning: change these and reload ----
export const ROUNDS = 4;
export const THREATS = 2; // places the AI moves on each round
export const AI_WINS_AT = 3; // places it must take for everyone to lose
export const OWN_POINTS = 1; // a token on your own project
export const MIN_PLAYERS = 2;
export const PLACES = ["Power contract", "Schools", "The press", "Regional grid", "Water board", "Hospital", "Library"];

// The AI's strength each round, written as a rule: enough that the table can only stop it if all but one defend.
export const totalStrength = (players) => Math.max(THREATS, players - 1);

export const OWN = "own";
export const emptyRoom = { phase: "lobby", players: {} };

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick THREATS open places and split the AI's strength between them.
export function threaten(places, players) {
  const open = shuffle(places.filter((p) => !p.taken)).slice(0, THREATS);
  const total = totalStrength(players);
  return open.map((p, i) => ({ place: p.id, strength: Math.floor(total / open.length) + (i < total % open.length ? 1 : 0) }));
}

export function deal(players) {
  const order = shuffle(Object.keys(players));
  const places = PLACES.map((label, i) => ({ id: `p${i}`, label, taken: false }));
  return {
    phase: "commit",
    players,
    order,
    places,
    round: 0,
    threats: threaten(places, order.length),
    orders: {},
    points: Object.fromEntries(order.map((id) => [id, 0])),
    log: [],
  };
}

// The reveal: count the tokens at each threatened place; the AI takes any place it outnumbers.
export function resolve(s) {
  const at = {};
  for (const id of s.order) {
    const o = s.orders[id];
    if (o) at[o] = (at[o] || 0) + 1;
  }
  const results = s.threats.map((t) => ({ ...t, defenders: at[t.place] || 0, taken: (at[t.place] || 0) < t.strength }));
  const places = s.places.map((p) => (results.some((r) => r.place === p.id && r.taken) ? { ...p, taken: true } : p));
  const points = { ...s.points };
  for (const id of s.order) if (s.orders[id] === OWN) points[id] += OWN_POINTS;
  const takenNow = places.filter((p) => p.taken).length;
  const over = takenNow >= AI_WINS_AT || s.round + 1 >= ROUNDS;
  return {
    ...s,
    phase: "reveal",
    places,
    points,
    results,
    over,
    aiWon: takenNow >= AI_WINS_AT,
    log: [...s.log, { round: s.round, orders: s.orders, results }],
  };
}

export function nextRound(s) {
  if (s.over) return { ...s, phase: "end" };
  return { ...s, phase: "commit", round: s.round + 1, threats: threaten(s.places, s.order.length), orders: {}, results: null };
}
