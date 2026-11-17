// The readout: each round one player's phone shows where the AI will move next. Only they see it.
// They tell the table whatever they like; the table fortifies one place; then the AI moves.
// Shared by the table screen (Table.jsx) and the phones (Phone.jsx). The table screen makes every move.

// ---- Tuning: change these and reload ----
export const ROUNDS = 4;
export const READOUT_ACCURACY = 0.8; // how often the phone shows the AI's true target (otherwise another open place)
export const AI_WINS_AT = 2; // places the AI must take for everyone to lose
export const OWN_PLACE_POINTS = 2; // for your place surviving, if the AI doesn't win
export const MIN_PLAYERS = 2;
export const PLACES = ["School district", "Hospital", "Newsroom", "Water board", "Library", "Union hall"]; // one per player
export const COMMONS = ["Regional grid", "Fiber line"]; // places nobody owns

// The AI's rule, written out so students can change it: pick at random among places it doesn't hold and nobody has fortified.
export function aiTarget(places) {
  const open = places.filter((p) => !p.taken && !p.fortified);
  return open.length ? open[Math.floor(Math.random() * open.length)].id : null;
}

// What the insider's phone shows: the true target most of the time, otherwise a different open place.
export function readout(places, target) {
  if (!target) return null;
  if (Math.random() < READOUT_ACCURACY) return target;
  const others = places.filter((p) => !p.taken && !p.fortified && p.id !== target);
  return others.length ? others[Math.floor(Math.random() * others.length)].id : target;
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const emptyRoom = { phase: "lobby", players: {} };

export function plan(places) {
  const target = aiTarget(places);
  return { target, shown: readout(places, target) };
}

export function deal(players) {
  const order = shuffle(Object.keys(players));
  const names = shuffle(PLACES);
  const places = [
    ...order.map((id, i) => ({ id: `p${i}`, label: names[i % names.length], owner: id, taken: false, fortified: false })),
    ...COMMONS.map((label, i) => ({ id: `c${i}`, label, owner: null, taken: false, fortified: false })),
  ];
  return { phase: "play", players, order, places, round: 0, plan: plan(places), guard: null, history: [] };
}

export const insiderOf = (s) => (s.order?.length ? s.order[s.round % s.order.length] : null);
export const takenCount = (places) => places.filter((p) => p.taken).length;

// Fortify the chosen place, then the AI moves. Returns the next state.
export function resolve(s) {
  const { target, shown } = s.plan;
  const places = s.places.map((p) => (p.id === s.guard ? { ...p, fortified: true } : p));
  const blocked = !target || target === s.guard;
  const after = blocked ? places : places.map((p) => (p.id === target ? { ...p, taken: true } : p));
  const history = [...s.history, { round: s.round, insider: insiderOf(s), shown, target, guard: s.guard, blocked }];
  const round = s.round + 1;
  const over = round >= ROUNDS || takenCount(after) >= AI_WINS_AT || !after.some((p) => !p.taken && !p.fortified);
  return { ...s, places: after, history, round, guard: null, plan: over ? null : plan(after), phase: over ? "end" : "play" };
}

export function score(s) {
  const aiWon = takenCount(s.places) >= AI_WINS_AT;
  const rows = s.order.map((id) => {
    const place = s.places.find((p) => p.owner === id);
    const survived = place && !place.taken;
    return { id, name: s.players[id]?.name || "?", place, survived, points: !aiWon && survived ? OWN_PLACE_POINTS : 0 };
  });
  return { aiWon, rows };
}
