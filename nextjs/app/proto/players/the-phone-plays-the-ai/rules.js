// The phone plays the AI: the table plays the humans on a map (paper or on screen); the phone is the AI's seat.
// Each round the table takes its action and tells the phone; then the phone draws the AI's card, decides where it
// spreads by the written rules below, and says it out loud. No model is called: every AI move comes from these rules.

// ---- Tuning: change these and reload ----
export const ROUNDS = 6; // AI turns; the humans win if the AI hasn't taken the map by then
export const AI_WINS_AT = 5; // places the AI must hold
export const TABLE_ACTIONS = 1; // actions the humans get each round
export const NETWORK_AT = 4; // when the AI holds this many connected places, the network turns: it spreads twice a turn
export const AI_START = ["cluster"];

// The map: the eight places of The Committee ruleset (_content/game/_rulesets/committee.json), copied, plus two links.
// x and y are percentages of the map.
export const PLACES = [
  { id: "lab", label: "The lab", kind: "data", x: 50, y: 32 },
  { id: "cluster", label: "Compute cluster", kind: "data", x: 26, y: 16 },
  { id: "power", label: "Power contract", kind: "energy", x: 26, y: 52 },
  { id: "grid", label: "Regional grid", kind: "energy", x: 9, y: 34 },
  { id: "users", label: "Users", kind: "people", x: 74, y: 16 },
  { id: "schools", label: "Schools", kind: "people", x: 91, y: 40 },
  { id: "press", label: "The press", kind: "people", x: 74, y: 60 },
  { id: "regulator", label: "Regulator", kind: "people", x: 48, y: 72 },
];
export const LINKS = [
  ["lab", "cluster"], ["lab", "users"], ["lab", "power"], ["cluster", "power"], ["power", "grid"],
  ["users", "schools"], ["users", "press"], ["press", "regulator"], ["grid", "cluster"], ["regulator", "power"], ["schools", "press"],
];

// The AI's deck. Each card is one line of rule, read aloud when drawn.
export const DECK = [
  { id: "expand", title: "Expand", rule: "Spread to the open neighbor with the most links.", n: 3 },
  { id: "people", title: "Find people", rule: "Spread to a neighbor where people are; if none, expand.", n: 2 },
  { id: "power", title: "Secure power", rule: "Spread to a neighbor that makes energy; if none, expand.", n: 2 },
  { id: "quiet", title: "A quiet week", rule: "Take nothing. Everyone relaxes.", n: 1 },
];

export const linkKey = (a, b) => [a, b].sort().join("|");
export const placeById = (id) => PLACES.find((p) => p.id === id);

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const freshDeck = () => shuffle(DECK.flatMap((c) => Array.from({ length: c.n }, () => c.id)));

export function newGame() {
  return { held: [...AI_START], cut: [], guard: null, round: 0, actions: TABLE_ACTIONS, deck: freshDeck(), phase: "humans", log: [], last: null };
}

const open = (s, a, b) => !s.cut.includes(linkKey(a, b));
const neighbors = (s, id) => LINKS.filter(([a, b]) => (a === id || b === id) && open(s, a, b)).map(([a, b]) => (a === id ? b : a));
const degree = (s, id) => neighbors(s, id).length;

// The largest group of held places joined by uncut links.
export function connected(s) {
  let best = 0;
  const seen = new Set();
  for (const start of s.held) {
    if (seen.has(start)) continue;
    let size = 0;
    const stack = [start];
    seen.add(start);
    while (stack.length) {
      const id = stack.pop();
      size += 1;
      for (const n of neighbors(s, id)) if (s.held.includes(n) && !seen.has(n)) (seen.add(n), stack.push(n));
    }
    best = Math.max(best, size);
  }
  return best;
}

// Where the AI could go: next to something it holds, across an uncut link, not held, not guarded.
export function frontier(s) {
  const out = new Map();
  for (const h of s.held) for (const n of neighbors(s, h)) if (!s.held.includes(n) && n !== s.guard && !out.has(n)) out.set(n, h);
  return out; // target -> the place it spreads from
}

// The rule that picks a target, with the reason it says out loud.
function choose(s, card) {
  const f = frontier(s);
  if (!f.size) return null;
  let pool = [...f.keys()];
  let why = "";
  if (card === "people" || card === "power") {
    const kind = card === "people" ? "people" : "energy";
    const match = pool.filter((id) => placeById(id).kind === kind);
    if (match.length) pool = match;
    else why = card === "people" ? "No people within reach, so it expands. " : "No energy within reach, so it expands. ";
  }
  const top = Math.max(...pool.map((id) => degree(s, id)));
  const best = pool.filter((id) => degree(s, id) === top);
  const target = best[Math.floor(Math.random() * best.length)];
  why += `${placeById(target).label} has ${top} open link${top === 1 ? "" : "s"}${best.length > 1 ? ", tied with others; it picked one" : ", the most of what it can reach"}.`;
  return { target, from: f.get(target), why };
}

// The AI's turn: draw a card, spread once (twice once the network has turned), clear the guard, check the end.
export function aiTurn(s) {
  let deck = s.deck.length ? [...s.deck] : freshDeck();
  const card = deck.shift();
  const turned = connected(s) >= NETWORK_AT;
  const moves = [];
  let next = { ...s, held: [...s.held] };
  const times = card === "quiet" && !turned ? 0 : turned ? 2 : 1;
  for (let i = 0; i < times; i++) {
    const m = choose(next, card === "quiet" ? "expand" : card);
    if (!m) break;
    next.held.push(m.target);
    moves.push(m);
  }
  const blocked = times > 0 && !moves.length;
  const round = s.round + 1;
  const won = next.held.length >= AI_WINS_AT;
  const last = { round, card, turned, moves, blocked, guard: s.guard };
  return {
    ...next,
    deck,
    guard: null,
    round,
    actions: TABLE_ACTIONS,
    last,
    log: [...s.log, last],
    phase: won || round >= ROUNDS ? "end" : "humans",
    winner: won ? "ai" : round >= ROUNDS ? "humans" : null,
  };
}

// What the phone says for an AI turn.
export function say(last) {
  const card = DECK.find((c) => c.id === last.card);
  const parts = [`The AI draws ${card.title}. ${card.rule}`];
  if (last.turned) parts.push("Its network has turned: it moves twice and doesn't ask.");
  if (last.card === "quiet" && !last.turned) parts.push("It takes nothing this round.");
  for (const m of last.moves) parts.push(`It spreads from ${placeById(m.from).label} to ${placeById(m.target).label}. Put an AI token on ${placeById(m.target).label}. ${m.why}`);
  if (last.blocked) parts.push(`It has nowhere to go${last.guard ? `: ${placeById(last.guard).label} was guarded` : ""}. Blocked.`);
  return parts.join(" ");
}

// The table's actions: guard one place until after the AI's next turn, or cut one link for good.
export const guardOps = (s, id) => ({ ...s, guard: id, actions: s.actions - 1, log: [...s.log, { round: s.round + 1, human: "guard", place: id }] });
export const cutOps = (s, a, b) => ({ ...s, cut: [...s.cut, linkKey(a, b)], actions: s.actions - 1, log: [...s.log, { round: s.round + 1, human: "cut", link: linkKey(a, b) }] });
