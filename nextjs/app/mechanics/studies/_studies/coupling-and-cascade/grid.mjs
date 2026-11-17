// Study 05's rules, kept out of Study.jsx so the server pages can read them (a "use client" module only exports components).

// ---- Tuning: change these ----
export const PLACES = [
  { id: "power", name: "Power plant", short: "PWR", x: 265, y: 40 },
  { id: "subA", name: "Substation A", short: "SBA", x: 125, y: 130 },
  { id: "subB", name: "Substation B", short: "SBB", x: 410, y: 130 },
  { id: "dc", name: "Data center", short: "DC", x: 72, y: 244 },
  { id: "hospital", name: "Hospital", short: "HOS", x: 190, y: 336 },
  { id: "water", name: "Water plant", short: "WTR", x: 320, y: 234 },
  { id: "school", name: "School", short: "SCH", x: 470, y: 244 },
  { id: "homes", name: "Homes", short: "HOM", x: 400, y: 340 },
];
// A link [from, to]: when `from` is down, `to` goes down too. Tight: in the same tick. Loose: in the next one.
export const LINKS = [
  ["power", "subA"], ["power", "subB"], ["subA", "dc"], ["subA", "hospital"], ["subB", "water"],
  ["subB", "school"], ["subB", "homes"], ["water", "dc"], ["water", "hospital"], ["water", "homes"],
];
export const HARDEN_MAX = 2; // places you can protect, before or during the cascade
export const LOOSEN_MAX = 3; // links you can loosen before the strike

export const linkId = ([from, to]) => `${from}-${to}`;
const byId = Object.fromEntries(PLACES.map((p) => [p.id, p]));
export const placeName = (id) => byId[id]?.name || id;

// The log is all that is kept (as in study 01): harden, loosen, strike, tick. The state is the log replayed.
export function replay(rows) {
  const hardened = new Set();
  const loose = new Set();
  const down = {}; // id -> the tick it fell
  let tick = -1;
  let struck = null;
  const fall = (id) => {
    if (down[id] === undefined && !hardened.has(id)) down[id] = tick;
  };
  const tight = () => {
    let changed = true;
    while (changed) {
      changed = false;
      for (const link of LINKS) {
        const [from, to] = link;
        if (!loose.has(linkId(link)) && down[from] !== undefined && down[to] === undefined && !hardened.has(to)) {
          down[to] = tick;
          changed = true;
        }
      }
    }
  };
  for (const row of rows) {
    if (row.kind === "harden" && hardened.size < HARDEN_MAX && down[row.id] === undefined) hardened.add(row.id);
    else if (row.kind === "loosen" && tick < 0) {
      if (loose.has(row.link)) loose.delete(row.link);
      else if (loose.size < LOOSEN_MAX) loose.add(row.link);
    } else if (row.kind === "strike" && tick < 0) {
      tick = 0;
      struck = row.id;
      fall(row.id);
      tight();
    } else if (row.kind === "tick" && tick >= 0) {
      tick += 1;
      const arriving = LINKS.filter((l) => loose.has(linkId(l)) && down[l[0]] !== undefined && down[l[0]] < tick && down[l[1]] === undefined);
      for (const [, to] of arriving) fall(to);
      tight();
    }
  }
  // What a loose link will carry next tick: the warning the delay gives you.
  const coming = tick < 0 ? [] : [...new Set(LINKS.filter((l) => loose.has(linkId(l)) && down[l[0]] !== undefined && down[l[1]] === undefined && !hardened.has(l[1])).map((l) => l[1]))];
  return { hardened, loose, down, tick, struck, coming, settled: tick >= 0 && coming.length === 0 };
}

// The printed sheet: three links loosened around the water plant, Substation B struck, the water plant hardened
// in the tick the warning gave.
export const PRINT_ROWS = [
  { kind: "loosen", link: "subB-water" }, { kind: "loosen", link: "water-hospital" }, { kind: "loosen", link: "subB-homes" },
  { kind: "strike", id: "subB" }, { kind: "harden", id: "water" }, { kind: "tick" }, { kind: "tick" },
];
