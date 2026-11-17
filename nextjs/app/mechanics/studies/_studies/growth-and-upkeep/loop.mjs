// Study 03's rules, kept out of Study.jsx so the server pages can read them (a "use client" module only exports components).

// ---- Tuning: change these ----
export const ROUNDS = 10;
export const BUILD_COST = 5;
export const OUTPUT_PER_SERVER = 4; // output grows in a straight line
export const START = { servers: 1, cash: 10, commons: 60 };
// Upkeep grows faster: the first server gets the cheap power and water, each one after costs one more than the last.
export const upkeepFor = (servers) => (servers * (servers + 1)) / 2;
export const outputFor = (servers) => OUTPUT_PER_SERVER * servers;

// One round: build or hold, then the servers produce and the upkeep is paid, by the builder or out of the commons.
export function step(state, action, payer) {
  if (state.over) return state;
  let { servers, cash, commons } = state;
  const built = action === "build" && cash >= BUILD_COST;
  if (built) {
    servers += 1;
    cash -= BUILD_COST;
  }
  const output = outputFor(servers);
  const upkeep = upkeepFor(servers);
  cash += output;
  if (payer === "builder") cash -= upkeep;
  else commons -= upkeep;
  const round = state.round + 1;
  const over = cash < 0 ? "bankrupt" : commons <= 0 ? "dry" : round >= ROUNDS ? "time" : null;
  const row = { round, action: built ? "build" : "hold", servers, output, upkeep, cash, commons };
  return { round, servers, cash, commons, over, history: [...state.history, row] };
}

export const start = () => ({ round: 0, ...START, over: null, history: [] });
export const play = (actions, payer) => actions.reduce((state, action) => step(state, action, payer), start());

// The printed sheet: the optimizer builds every round and pays its own upkeep, and goes broke in round 7.
export const PRINT_RUN = { actions: Array(ROUNDS).fill("build"), payer: "builder" };
