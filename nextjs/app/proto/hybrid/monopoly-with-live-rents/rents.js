// Monopoly's rents, off the deeds and onto a screen, where they can move.
// Rents are the classic US deeds (check the LL's box: editions differ); see _content/game-state/monopoly.md.

// ---- Tuning: change these ----

export const STEP = 0.15; // each landing on a color raises its rents by this share (live mode)
export const DECAY = 0.3; // at the end of each round, this share of the rise wears off
export const MAX_DEMAND = 3; // rents never go above this many times the printed rent from demand
export const DESIGN_RANGE = [0.5, 2]; // how far a designer can rebalance a color between games

export const MODES = {
  printed: { name: "Printed", line: "The deeds' rents, as in the box. Nothing moves." },
  rebalance: { name: "Rebalanced", line: "A designer set each color's rents before the game. They stay put during play." },
  live: { name: "Live", line: "Every landing on a color raises its rents; they cool off each round. Prices respond to demand." },
};

// ---- The board ----

export const GROUPS = [
  { id: "brown", name: "Brown", color: "#8b5a2b" },
  { id: "light-blue", name: "Light blue", color: "#9fd3f0" },
  { id: "pink", name: "Pink", color: "#d6489a" },
  { id: "orange", name: "Orange", color: "#f08c2a" },
  { id: "red", name: "Red", color: "#dd3b3b" },
  { id: "yellow", name: "Yellow", color: "#f2d43a" },
  { id: "green", name: "Green", color: "#2e9e4f" },
  { id: "dark-blue", name: "Dark blue", color: "#2f5fd0" },
  { id: "railroad", name: "Railroads", color: "#9a9a9a" },
  { id: "utility", name: "Utilities", color: "#c8c8b4" },
];

// rents for streets: [no houses, 1, 2, 3, 4 houses, hotel]
const street = (position, name, group, price, rents) => ({ id: name.toLowerCase().replace(/[^a-z]+/g, "-"), position, name, group, price, kind: "street", rents });
export const PROPERTIES = [
  street(1, "Mediterranean Avenue", "brown", 60, [2, 10, 30, 90, 160, 250]),
  street(3, "Baltic Avenue", "brown", 60, [4, 20, 60, 180, 320, 450]),
  street(6, "Oriental Avenue", "light-blue", 100, [6, 30, 90, 270, 400, 550]),
  street(8, "Vermont Avenue", "light-blue", 100, [6, 30, 90, 270, 400, 550]),
  street(9, "Connecticut Avenue", "light-blue", 120, [8, 40, 100, 300, 450, 600]),
  street(11, "St. Charles Place", "pink", 140, [10, 50, 150, 450, 625, 750]),
  street(13, "States Avenue", "pink", 140, [10, 50, 150, 450, 625, 750]),
  street(14, "Virginia Avenue", "pink", 160, [12, 60, 180, 500, 700, 900]),
  street(16, "St. James Place", "orange", 180, [14, 70, 200, 550, 750, 950]),
  street(18, "Tennessee Avenue", "orange", 180, [14, 70, 200, 550, 750, 950]),
  street(19, "New York Avenue", "orange", 200, [16, 80, 220, 600, 800, 1000]),
  street(21, "Kentucky Avenue", "red", 220, [18, 90, 250, 700, 875, 1050]),
  street(23, "Indiana Avenue", "red", 220, [18, 90, 250, 700, 875, 1050]),
  street(24, "Illinois Avenue", "red", 240, [20, 100, 300, 750, 925, 1100]),
  street(26, "Atlantic Avenue", "yellow", 260, [22, 110, 330, 800, 975, 1150]),
  street(27, "Ventnor Avenue", "yellow", 260, [22, 110, 330, 800, 975, 1150]),
  street(29, "Marvin Gardens", "yellow", 280, [24, 120, 360, 850, 1025, 1200]),
  street(31, "Pacific Avenue", "green", 300, [26, 130, 390, 900, 1100, 1275]),
  street(32, "North Carolina Avenue", "green", 300, [26, 130, 390, 900, 1100, 1275]),
  street(34, "Pennsylvania Avenue", "green", 320, [28, 150, 450, 1000, 1200, 1400]),
  street(37, "Park Place", "dark-blue", 350, [35, 175, 500, 1100, 1300, 1500]),
  street(39, "Boardwalk", "dark-blue", 400, [50, 200, 600, 1400, 1700, 2000]),
  ...[
    [5, "Reading Railroad"],
    [15, "Pennsylvania Railroad"],
    [25, "B&O Railroad"],
    [35, "Short Line"],
  ].map(([position, name]) => ({ id: name.toLowerCase().replace(/[^a-z]+/g, "-"), position, name, group: "railroad", price: 200, kind: "railroad", rents: [25, 50, 100, 200] })),
  ...[
    [12, "Electric Company"],
    [28, "Water Works"],
  ].map(([position, name]) => ({ id: name.toLowerCase().replace(/[^a-z]+/g, "-"), position, name, group: "utility", price: 150, kind: "utility", rents: [4, 10] })),
];
export const PROPERTY = Object.fromEntries(PROPERTIES.map((p) => [p.id, p]));

// What the person who landed tells the phone, by kind of property. `index` picks the printed rent.
export const SITUATIONS = {
  street: [
    { id: "none", label: "No houses", index: 0 },
    { id: "set", label: "No houses, owner has the whole color", index: 0, times: 2 },
    { id: "h1", label: "1 house", index: 1 },
    { id: "h2", label: "2 houses", index: 2 },
    { id: "h3", label: "3 houses", index: 3 },
    { id: "h4", label: "4 houses", index: 4 },
    { id: "hotel", label: "Hotel", index: 5 },
  ],
  railroad: [1, 2, 3, 4].map((n) => ({ id: `r${n}`, label: `Owner has ${n} railroad${n > 1 ? "s" : ""}`, index: n - 1 })),
  utility: [
    { id: "u1", label: "Owner has 1 utility: 4 × the dice", index: 0, dice: true },
    { id: "u2", label: "Owner has both: 10 × the dice", index: 1, dice: true },
  ],
};

export const emptyRoom = { mode: "live", round: 1, design: {}, demand: {}, landings: [], history: [] };

// How much a color's rents are multiplied by right now.
export function multiplier(room, group) {
  const design = room.mode === "printed" ? 1 : room.design?.[group] ?? 1;
  const demand = room.mode === "live" ? room.demand?.[group] ?? 1 : 1;
  return design * demand;
}

export function rentFor(room, property, situation, dice = 7) {
  const p = PROPERTY[property];
  const s = SITUATIONS[p.kind].find((x) => x.id === situation) || SITUATIONS[p.kind][0];
  const printed = p.rents[s.index] * (s.times || 1) * (s.dice ? dice : 1);
  return { printed, now: Math.max(1, Math.round(printed * multiplier(room, p.group))) };
}

// One landing: the rent it cost, and the demand it adds (live mode).
export function landingOps(room, { property, situation, dice, owned, player }) {
  const p = PROPERTY[property];
  const rent = owned ? rentFor(room, property, situation, dice) : { printed: 0, now: 0 };
  const ops = [{ op: "push", path: "landings", value: { at: Date.now(), round: room.round, player, property, situation: owned ? situation : "unowned", dice: dice ?? null, printed: rent.printed, rent: rent.now, mult: Number(multiplier(room, p.group).toFixed(2)) }, max: 300 }];
  if (room.mode === "live") ops.push({ op: "set", path: `demand.${p.group}`, value: Number(Math.min(MAX_DEMAND, (room.demand?.[p.group] ?? 1) + STEP).toFixed(3)) });
  return ops;
}

// The end of a round: demand cools off, and each color's multiplier goes into the history.
export function endRoundOps(room) {
  const demand = Object.fromEntries(GROUPS.map((g) => [g.id, Number((1 + ((room.demand?.[g.id] ?? 1) - 1) * (1 - DECAY)).toFixed(3))]));
  const snapshot = { round: room.round, mult: Object.fromEntries(GROUPS.map((g) => [g.id, Number(multiplier(room, g.id).toFixed(2))])) };
  return [
    { op: "push", path: "history", value: snapshot, max: 100 },
    { op: "set", path: "demand", value: demand },
    { op: "set", path: "round", value: room.round + 1 },
  ];
}

export const money = (n) => `$${Number(n).toLocaleString("en-US")}`;
