// The audience layer: the players on stage see the board; the audience's phones see where the AI goes next,
// and can spend nudges to hint to the players or to feed the AI. The laptop (the stage) runs the game.

// ---- Tuning: change these ----

export const COLS = 4;
export const ROWS = 3;
export const ROUNDS = 8;
export const ROUND_SECONDS = 20;
export const RESULT_SECONDS = 4;
export const START_CELL = 5; // B2: in the middle, four ways to go (in a corner, two shields would stop it forever)
export const SHIELDS = 2; // cells the players can shield each round
export const AI_TARGETS = [1, 1, 1, 2, 2, 2, 3, 3]; // cells the AI goes for each round
export const NUDGES = 3; // each audience member's nudges for the whole game
export const HINTS_FOR_ROW = 1; // hints this round that light up the target's row on stage
export const HINTS_FOR_CELL = 3; // hints this round that light up the exact cells
export const FEEDS_PER_EXTRA = 2; // feeds this round that give the AI one extra cell

// ---- The rest ----

export const CELLS = COLS * ROWS;
export const cellName = (i) => `${"ABCDEFGH"[i % COLS]}${Math.floor(i / COLS) + 1}`;
export const rowOf = (i) => Math.floor(i / COLS);

function neighbors(i) {
  const c = i % COLS;
  const r = rowOf(i);
  return [
    [c - 1, r],
    [c + 1, r],
    [c, r - 1],
    [c, r + 1],
  ]
    .filter(([x, y]) => x >= 0 && x < COLS && y >= 0 && y < ROWS)
    .map(([x, y]) => y * COLS + x);
}
const shuffle = (list) => list.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(([, v]) => v);

// Cells next to the AI that it doesn't hold yet.
export function frontier(ai) {
  return [...new Set(ai.flatMap(neighbors))].filter((i) => !ai.includes(i));
}

export function pickTargets(ai, round) {
  return shuffle(frontier(ai)).slice(0, AI_TARGETS[Math.min(round, AI_TARGETS.length) - 1]);
}

export const emptyRoom = { phase: "setup", round: 0, ai: [START_CELL], shields: [], targets: [], deadline: 0, hints: 0, feeds: 0, audience: {}, log: [] };

// A new game: the AI back at its start, everyone's nudges back.
export function startOps(audience = {}) {
  const ai = [START_CELL];
  const fresh = Object.fromEntries(Object.entries(audience).map(([id, a]) => [id, { ...a, left: NUDGES }]));
  return [{ op: "merge", path: "", value: { phase: "round", round: 1, ai, shields: [], targets: pickTargets(ai, 1), deadline: Date.now() + ROUND_SECONDS * 1000, hints: 0, feeds: 0, log: [], audience: fresh } }];
}

// The end of a round: shields block targets; unshielded targets fall; feeds add extra cells.
export function resolve(s) {
  const ai = [...s.ai];
  const blocked = s.targets.filter((t) => s.shields.includes(t));
  const took = s.targets.filter((t) => !s.shields.includes(t));
  ai.push(...took);
  const extra = Math.floor((s.feeds || 0) / FEEDS_PER_EXTRA);
  const fed = shuffle(frontier(ai).filter((i) => !s.shields.includes(i))).slice(0, extra);
  ai.push(...fed);
  const row = { round: s.round, targets: s.targets, shields: s.shields, blocked, took, fed, hints: s.hints || 0, feeds: s.feeds || 0, ai: ai.length };
  const over = s.round >= ROUNDS || ai.length >= CELLS || frontier(ai).length === 0;
  return { ai, row, over };
}

export const hintLevel = (hints) => (hints >= HINTS_FOR_CELL ? "cell" : hints >= HINTS_FOR_ROW ? "row" : "none");
