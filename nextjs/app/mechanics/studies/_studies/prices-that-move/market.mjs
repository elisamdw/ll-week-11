// Study 04's rules, kept out of Study.jsx so the server pages can read them (a "use client" module only exports components).

// ---- Tuning: change these ----
export const SUPPLY = 12; // GPUs on the market
export const BUDGET = 30; // each buyer's money
export const START_SETTINGS = { base: 2, slope: 1 }; // price of the next GPU = base + slope × GPUs sold so far
export const BUYERS = [
  { id: "lab", name: "The lab" },
  { id: "startup", name: "The start-up" },
];

export const priceAt = (settings, sold) => settings.base + settings.slope * sold;

// The log is all that is kept (as in study 01). A buyer's row is "buy" or "pass" and takes that buyer's turn; the
// designer's row ("set") changes a number and takes no turn: that is rebalancing on the fly.
export function replay(rows) {
  const settings = { ...START_SETTINGS };
  const budget = Object.fromEntries(BUYERS.map((b) => [b.id, BUDGET]));
  const owned = Object.fromEntries(BUYERS.map((b) => [b.id, 0]));
  const sales = []; // { n, who, price, settings } for the chart
  const changes = []; // { atSold, key, from, to }
  let turn = 0;
  let passes = 0;
  for (const row of rows) {
    if (row.kind === "set") {
      changes.push({ atSold: sales.length, key: row.key, from: settings[row.key], to: row.value });
      settings[row.key] = row.value;
      continue;
    }
    const buyer = BUYERS[turn % BUYERS.length];
    if (row.kind === "buy") {
      const price = priceAt(settings, sales.length);
      if (sales.length < SUPPLY && budget[buyer.id] >= price) {
        budget[buyer.id] -= price;
        owned[buyer.id] += 1;
        sales.push({ n: sales.length + 1, who: buyer.id, price, settings: { ...settings } });
        passes = 0;
      }
    } else passes += 1;
    turn += 1;
  }
  const next = BUYERS[turn % BUYERS.length];
  const price = priceAt(settings, sales.length);
  const nobodyCan = BUYERS.every((b) => budget[b.id] < price);
  const over = sales.length >= SUPPLY ? "sold out" : passes >= BUYERS.length ? "both passed" : nobodyCan ? "nobody can pay" : null;
  return { settings, budget, owned, sales, changes, next, price, over };
}

// The printed sheet: four sales at slope 1, then the designer halves the slope, then four more.
export const PRINT_ROWS = [
  { kind: "buy" }, { kind: "buy" }, { kind: "buy" }, { kind: "buy" },
  { kind: "set", key: "slope", value: 0.5 },
  { kind: "buy" }, { kind: "buy" }, { kind: "buy" }, { kind: "buy" },
];
