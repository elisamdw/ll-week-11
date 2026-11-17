// Negotiation with a deadline: every phone holds some tokens and a private need (a set to complete).
// Players trade phone to phone before the clock runs out. The AI buys any token for coins, and its price rises as
// the deadline nears; every token sold to it leaves the table for good.
// Shared by the table screen (Table.jsx), which runs the clock, and the phones (Phone.jsx), which trade.

// ---- Tuning: change these and reload ----
export const SECONDS = 120; // the deadline
export const KINDS = [
  { id: "chips", label: "Chips" },
  { id: "power", label: "Power" },
  { id: "water", label: "Water" },
  { id: "land", label: "Land" },
];
export const NEED_SIZE = 5; // tokens in each player's set
export const SPARE_EACH = 1; // extra tokens dealt per player beyond what the sets need
export const SET_POINTS = 6; // for completing your set at the deadline
export const COIN_POINTS = 1; // per coin
export const AI_BUYER = true; // the AI buys tokens; set false to play without it
export const AI_PRICE_START = 1; // coins per token at the start
export const AI_PRICE_EVERY = 30; // the AI raises its price by one coin every this many seconds
export const MIN_PLAYERS = 2;

export const kindLabel = (id) => KINDS.find((k) => k.id === id)?.label || id;

// The AI's price, written as a rule: it rises as the deadline nears.
export const aiPrice = (left) => AI_PRICE_START + Math.floor((SECONDS - left) / AI_PRICE_EVERY);

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const zero = () => Object.fromEntries(KINDS.map((k) => [k.id, 0]));

// Needs first, then a supply that covers every need plus spares, dealt out evenly, so every set can be made by trading.
export function deal(players) {
  const order = shuffle(Object.keys(players));
  const needs = {};
  const pool = [];
  for (const id of order) {
    const need = zero();
    const kinds = shuffle(KINDS).slice(0, 3).map((k) => k.id); // each set uses three kinds
    for (let i = 0; i < NEED_SIZE; i++) need[kinds[i % 3]] += 1;
    needs[id] = need;
    for (const [k, n] of Object.entries(need)) for (let i = 0; i < n; i++) pool.push(k);
  }
  for (let i = 0; i < order.length * SPARE_EACH; i++) pool.push(KINDS[Math.floor(Math.random() * KINDS.length)].id);
  const tokens = Object.fromEntries(order.map((id) => [id, zero()]));
  shuffle(pool).forEach((k, i) => (tokens[order[i % order.length]][k] += 1));
  return { phase: "play", players, order, needs, tokens, coins: Object.fromEntries(order.map((id) => [id, 0])), ai: zero(), left: SECONDS, offers: {}, log: [] };
}

export const has = (tokens, want) => Object.entries(want).every(([k, n]) => (tokens?.[k] || 0) >= n);
export const setDone = (s, id) => has(s.tokens[id], s.needs[id]);
export const bundle = (b) => Object.entries(b).filter(([, n]) => n > 0).map(([k, n]) => `${n} ${kindLabel(k)}`).join(" + ") || "nothing";

// Ops for the shared room (see ../../_shared/room.js). Counts change by "inc", so trades made at the same moment add up.
export function acceptOps(s, offerId) {
  const o = s.offers[offerId];
  const ops = [];
  for (const [k, n] of Object.entries(o.give)) if (n) ops.push({ op: "inc", path: `tokens.${o.from}.${k}`, value: -n }, { op: "inc", path: `tokens.${o.to}.${k}`, value: n });
  for (const [k, n] of Object.entries(o.want)) if (n) ops.push({ op: "inc", path: `tokens.${o.to}.${k}`, value: -n }, { op: "inc", path: `tokens.${o.from}.${k}`, value: n });
  ops.push({ op: "set", path: `offers.${offerId}.status`, value: "accepted" }, { op: "push", path: "log", value: { kind: "trade", from: o.from, to: o.to, give: o.give, want: o.want, left: s.left }, max: 100 });
  return ops;
}

export function sellOps(s, id, kind) {
  const price = aiPrice(s.left);
  return [
    { op: "inc", path: `tokens.${id}.${kind}`, value: -1 },
    { op: "inc", path: `coins.${id}`, value: price },
    { op: "inc", path: `ai.${kind}`, value: 1 },
    { op: "push", path: "log", value: { kind: "sale", from: id, token: kind, price, left: s.left }, max: 100 },
  ];
}

export function score(s) {
  const rows = s.order.map((id) => {
    const done = setDone(s, id);
    const coins = s.coins[id] || 0;
    // What the set still lacks, and whether the AI holds enough of it to have made the difference.
    const short = Object.fromEntries(Object.entries(s.needs[id]).map(([k, n]) => [k, Math.max(0, n - (s.tokens[id][k] || 0))]).filter(([, n]) => n > 0));
    const aiHasIt = !done && Object.entries(short).every(([k, n]) => (s.ai[k] || 0) >= n);
    return { id, name: s.players[id]?.name || "?", need: s.needs[id], done, coins, short, aiHasIt, points: (done ? SET_POINTS : 0) + coins * COIN_POINTS };
  });
  const aiHeld = Object.values(s.ai || {}).reduce((a, b) => a + b, 0);
  return { rows, aiHeld, sets: rows.filter((r) => r.done).length };
}
