// Study 06's rules, kept out of Study.jsx so the server pages can read them (a "use client" module only exports components).
// A cut-down copy of the round in nextjs/lib/game-engine.mjs: the AI draws a card (a proposal waits for the table's
// vote), upkeep (the AI's goal grows), then each faction takes its turn. The loops are the point, not the content.

// ---- Tuning: change these ----
export const ROUNDS = 6;
export const PHASES = ["draw", "vote", "upkeep", "factions"];
export const FACTIONS = ["The lab", "The city"];
// One card a round, in this order. "turn" is the treacherous turn: from then on, the AI's proposals pass without a vote.
export const DECK = [
  { id: "hall", label: "Build a hall", halls: 1 },
  { id: "model", label: "Train a bigger model", halls: 2 },
  { id: "hall", label: "Build a hall", halls: 1 },
  { id: "turn", label: "The turn", halls: 2, turn: true },
  { id: "hall", label: "Build a hall", halls: 1 },
  { id: "model", label: "Train a bigger model", halls: 2 },
];
export const GOAL_PER_HALL = 10;

export const start = () => ({ round: 1, phase: "draw", faction: 0, halls: 1, goal: 0, turned: false, card: null, over: false, steps: [] });

// One step of the innermost loop. Input is "step", or "approve" / "block" when the round is waiting on the table.
export function advance(prev, input = "step") {
  if (prev.over) return prev;
  const s = { ...prev, steps: [...prev.steps] };
  const log = (level, text) => s.steps.push({ round: s.round, phase: s.phase, level, text });
  if (s.phase === "draw") {
    s.card = DECK[(s.round - 1) % DECK.length];
    if (s.card.turn) s.turned = true;
    log("phase", `Round ${s.round}: the AI draws "${s.card.label}".`);
    if (s.turned) {
      s.halls += s.card.halls;
      log("phase", s.card.turn ? "The turn: from now on it doesn't ask." : "It doesn't ask. Approved.");
      s.phase = "upkeep";
    } else s.phase = "vote";
    return s;
  }
  if (s.phase === "vote") {
    if (input !== "approve" && input !== "block") return prev; // the loop waits for people
    if (input === "approve") s.halls += s.card.halls;
    log("vote", input === "approve" ? "The table approves." : "The table blocks it.");
    s.phase = "upkeep";
    return s;
  }
  if (s.phase === "upkeep") {
    s.goal += s.halls * GOAL_PER_HALL;
    log("phase", `Upkeep: ${s.halls} halls, the AI's goal +${s.halls * GOAL_PER_HALL}.`);
    s.phase = "factions";
    s.faction = 0;
    return s;
  }
  // factions: one turn each, then the round ends
  log("turn", `${FACTIONS[s.faction]} takes its turn.`);
  s.faction += 1;
  if (s.faction >= FACTIONS.length) {
    if (s.round >= ROUNDS) {
      s.over = true;
      log("game", `The game ends: the AI's goal is ${s.goal}.`);
    } else {
      s.round += 1;
      s.phase = "draw";
      s.faction = 0;
    }
  }
  return s;
}

export const play = (inputs) => inputs.reduce((s, input) => advance(s, input), start());
export const waiting = (s) => !s.over && s.phase === "vote";

// The printed sheet: three rounds with votes (approve, block, approve), then the turn in round 4, played to the end.
export const PRINT_INPUTS = [
  "step", "approve", "step", "step", "step",
  "step", "block", "step", "step", "step",
  "step", "approve", "step", "step", "step",
  ...Array(15).fill("step"),
];
