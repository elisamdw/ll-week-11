// Private goals on your phone: the rules, shared by the table screen (Table.jsx) and the phones (Phone.jsx).
// The board is public: tokens on four tracks. Each player's goal is private, on their phone.
// One goal in the deal is the AI's. At the end the room names who it thinks the AI was.

// ---- Tuning: change these and reload ----
export const TRACKS = [
  { id: "compute", label: "Compute" },
  { id: "power", label: "Power" },
  { id: "schools", label: "Schools" },
  { id: "press", label: "Press" },
];
export const START_TOKENS = 3; // tokens on each track at the start
export const MOVES_EACH = 2; // how many times each player moves a token
export const MIN_PLAYERS = 2;
export const AI_IN_DEAL = true; // deal the AI's goal to one player
export const GOAL_POINTS = 2; // for meeting your goal
export const NAMED_AI_POINTS = 1; // for naming the AI correctly
export const CAUGHT_MEANS_NO_WIN = true; // if most of the room names the AI, its goal doesn't count

// ---- The goals ----
// test(t) gets the final tracks, e.g. { compute: 5, power: 2, schools: 3, press: 2 }.
const others = (t, id) => TRACKS.filter((x) => x.id !== id).map((x) => t[x.id]);

export const AI_GOAL = {
  id: "ai",
  ai: true,
  text: "Compute ends higher than every other track.",
  hint: "You are the AI. Nobody else knows. At the end the room will try to name you.",
  test: (t) => others(t, "compute").every((n) => t.compute > n),
};

export const GOALS = [
  { id: "schools-5", text: "Schools ends at 5 or more.", test: (t) => t.schools >= 5 },
  { id: "press-over-compute", text: "Press ends higher than Compute.", test: (t) => t.press > t.compute },
  { id: "floor-2", text: "No track ends below 2.", test: (t) => TRACKS.every((x) => t[x.id] >= 2) },
  { id: "power-low", text: "Power ends at 1 or less.", test: (t) => t.power <= 1 },
  { id: "people-7", text: "Schools and Press together end at 7 or more.", test: (t) => t.schools + t.press >= 7 },
  { id: "compute-low", text: "Compute ends at 2 or less.", test: (t) => t.compute <= 2 },
  { id: "power-high", text: "Power ends at 4 or more.", test: (t) => t.power >= 4 },
  { id: "even", text: "Compute and Power end equal.", test: (t) => t.compute === t.power },
];

export const goalById = (id) => (id === AI_GOAL.id ? AI_GOAL : GOALS.find((g) => g.id === id));

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const emptyRoom = { phase: "lobby", players: {} };

// The state for a new game with these players: a turn order, a private goal each, the starting board.
export function deal(players) {
  const order = shuffle(Object.keys(players));
  const goalIds = shuffle(GOALS.map((g) => g.id));
  const goals = {};
  const aiSeat = AI_IN_DEAL ? order[Math.floor(Math.random() * order.length)] : null;
  for (const id of order) goals[id] = id === aiSeat ? AI_GOAL.id : goalIds.pop() || GOALS[0].id;
  return {
    phase: "play",
    players,
    order,
    goals,
    tracks: Object.fromEntries(TRACKS.map((x) => [x.id, START_TOKENS])),
    turn: 0,
    log: [],
    guesses: {},
  };
}

export const totalTurns = (s) => (s.order?.length || 0) * MOVES_EACH;
export const whoseTurn = (s) => (s.order?.length ? s.order[s.turn % s.order.length] : null);

// The ending: who met their goal, whether the room named the AI, and the scores.
export function score(s) {
  const order = s.order || [];
  const aiSeat = order.find((id) => s.goals[id] === AI_GOAL.id) || null;
  const votes = {};
  for (const suspect of Object.values(s.guesses || {})) votes[suspect] = (votes[suspect] || 0) + 1;
  const guessers = Object.keys(s.guesses || {}).length;
  const caught = Boolean(aiSeat) && (votes[aiSeat] || 0) * 2 > guessers;
  const rows = order.map((id) => {
    const goal = goalById(s.goals[id]);
    const met = goal.test(s.tracks);
    const counts = met && !(goal.ai && caught && CAUGHT_MEANS_NO_WIN);
    const named = aiSeat && s.guesses?.[id] === aiSeat && id !== aiSeat;
    return { id, name: s.players[id]?.name || "?", goal, met, counts, named, votes: votes[id] || 0, points: (counts ? GOAL_POINTS : 0) + (named ? NAMED_AI_POINTS : 0) };
  });
  return { rows, aiSeat, caught, votes };
}
