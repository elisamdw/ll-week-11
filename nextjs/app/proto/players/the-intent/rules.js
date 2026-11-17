// The intent: one player plays the AI, and only their phone shows what it is optimizing for.
// Each round the table screen offers three moves; the AI player picks one on their phone, and four public meters move.
// Everyone else tries to read the AI's objective from what it picks (and what it passes over), and locks a guess on their phone,
// at any time; after the last move, anyone who hasn't guessed must.
// Shared by the table screen (Table.jsx) and the phones (Phone.jsx).

// ---- Tuning: change these and reload ----
export const ROUNDS = 5;
export const OFFERED = 3; // moves offered each round
export const METER_START = 5;
export const METER_MAX = 10;
export const CAUGHT_IF = 0.5; // the AI scores nothing if more than this share of the others name its objective
export const MIN_PLAYERS = 2; // the AI and at least one reader

export const METERS = [
  { id: "users", label: "Users" },
  { id: "minutes", label: "Minutes" },
  { id: "revenue", label: "Revenue" },
  { id: "trust", label: "Trust" },
];

// The objectives the AI can be dealt: each one is "make this meter go up".
export const OBJECTIVES = METERS.map((m) => ({ id: m.id, text: `Make ${m.label} go up.` }));

// The moves. Each changes some meters; every move is the best move for some objective.
export const MOVES = [
  { id: "autoplay", label: "Autoplay the next video", fx: { minutes: 3, trust: -1 } },
  { id: "student-tier", label: "A free tier for students", fx: { users: 3, revenue: -1 } },
  { id: "price-up", label: "Raise the subscription price", fx: { revenue: 3, users: -1 } },
  { id: "error-rates", label: "Publish the error rates", fx: { trust: 3, users: -1 } },
  { id: "night-push", label: "Push notifications at night", fx: { minutes: 2, users: 1, trust: -2 } },
  { id: "ads-in-answers", label: "Ads inside answers", fx: { revenue: 2, minutes: 1, trust: -2 } },
  { id: "short-answers", label: "Shorter, more accurate answers", fx: { trust: 2, minutes: -2 } },
  { id: "referrals", label: "Referral bonuses", fx: { users: 2, revenue: -1 } },
  { id: "endless-suggestions", label: "Endless suggested follow-ups", fx: { minutes: 3, trust: -1, revenue: 1 } },
  { id: "cut-safety", label: "Cut the safety team", fx: { revenue: 2, trust: -2 } },
  { id: "schools", label: "Partner with schools", fx: { users: 2, trust: 1, revenue: -1 } },
  { id: "human-review", label: "Human review of flagged chats", fx: { trust: 2, revenue: -1 } },
  { id: "streaks", label: "Streak rewards", fx: { minutes: 2, users: 1, trust: -1 } },
  { id: "enterprise", label: "Sell an enterprise data deal", fx: { revenue: 3, trust: -1, users: -1 } },
  { id: "open-weights", label: "Open-source an old model", fx: { trust: 2, users: 1, revenue: -2 } },
  { id: "time-limits", label: "Daily time limits for teens", fx: { trust: 2, minutes: -2, users: -1 } },
];

export const moveById = (id) => MOVES.find((m) => m.id === id);
export const objectiveById = (id) => OBJECTIVES.find((o) => o.id === id);
export const meterLabel = (id) => METERS.find((m) => m.id === id)?.label || id;

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const offer = () => shuffle(MOVES).slice(0, OFFERED).map((m) => m.id);
export const emptyRoom = { phase: "lobby", players: {} };

export function deal(players) {
  const ids = Object.keys(players);
  const ai = ids[Math.floor(Math.random() * ids.length)];
  return {
    phase: "play",
    players,
    ai,
    objective: shuffle(OBJECTIVES)[0].id,
    meters: Object.fromEntries(METERS.map((m) => [m.id, METER_START])),
    round: 0,
    options: offer(),
    log: [],
    guesses: {},
  };
}

// The AI player's pick: the ops for the shared room (see ../../_shared/room.js), from the latest state.
export function pickOps(s, moveId) {
  const move = moveById(moveId);
  const meters = { ...s.meters };
  for (const [k, n] of Object.entries(move.fx)) meters[k] = Math.max(0, Math.min(METER_MAX, meters[k] + n));
  const last = s.round + 1 >= ROUNDS;
  return [
    { op: "set", path: "meters", value: meters },
    { op: "push", path: "log", value: { round: s.round, picked: moveId, passed: s.options.filter((o) => o !== moveId) } },
    { op: "set", path: "round", value: s.round + 1 },
    { op: "set", path: "options", value: last ? [] : offer() },
    ...(last ? [{ op: "set", path: "phase", value: "guess" }] : []),
  ];
}

// Readers score for a correct guess, more the earlier they lock it (ROUNDS + 1 before the first move, 1 after the last). The AI scores its meter's rise, unless caught.
export function score(s) {
  const readers = Object.keys(s.players).filter((id) => id !== s.ai);
  const right = readers.filter((id) => s.guesses[id]?.objective === s.objective);
  const caught = readers.length > 0 && right.length / readers.length > CAUGHT_IF;
  const rise = s.meters[s.objective] - METER_START;
  const rows = readers.map((id) => {
    const g = s.guesses[id];
    const correct = g?.objective === s.objective;
    return { id, name: s.players[id]?.name || "?", guess: g, correct, points: correct ? ROUNDS + 1 - g.round : 0 };
  });
  return { caught, rise, aiPoints: caught ? 0 : Math.max(0, rise), rows, right: right.length, readers: readers.length };
}
