// The geometry of a Monopoly-style board: 40 spaces in a ring, larger squares at the corners.
// Coordinates are the board's own, 0..1 across and down, with GO at the bottom right.

// The 40 spaces of the current US standard edition (Hasbro C1009; see _content/game-state/monopoly.md).
export const SPACES = [
  ["GO", "corner"], ["Mediterranean Avenue", "street"], ["Community Chest", "chest"], ["Baltic Avenue", "street"], ["Income Tax", "tax"],
  ["Reading Railroad", "railroad"], ["Oriental Avenue", "street"], ["Chance", "chance"], ["Vermont Avenue", "street"], ["Connecticut Avenue", "street"],
  ["Jail / Just Visiting", "corner"], ["St. Charles Place", "street"], ["Electric Company", "utility"], ["States Avenue", "street"], ["Virginia Avenue", "street"],
  ["Pennsylvania Railroad", "railroad"], ["St. James Place", "street"], ["Community Chest", "chest"], ["Tennessee Avenue", "street"], ["New York Avenue", "street"],
  ["Free Parking", "corner"], ["Kentucky Avenue", "street"], ["Chance", "chance"], ["Indiana Avenue", "street"], ["Illinois Avenue", "street"],
  ["B&O Railroad", "railroad"], ["Atlantic Avenue", "street"], ["Ventnor Avenue", "street"], ["Water Works", "utility"], ["Marvin Gardens", "street"],
  ["Go To Jail", "corner"], ["Pacific Avenue", "street"], ["North Carolina Avenue", "street"], ["Community Chest", "chest"], ["Pennsylvania Avenue", "street"],
  ["Short Line", "railroad"], ["Chance", "chance"], ["Park Place", "street"], ["Luxury Tax", "tax"], ["Boardwalk", "street"],
].map(([name, kind], position) => ({ position, name, kind }));

export const PROPERTIES = SPACES.filter((s) => ["street", "railroad", "utility"].includes(s.kind));

// One space's rectangle [x0, y0, x1, y1] in board coordinates. cornerRatio: how much bigger a corner is than a side space.
export function spaceRect(i, cornerRatio) {
  const s = 1 / (2 * cornerRatio + 9);
  const c = cornerRatio * s;
  if (i === 0) return [1 - c, 1 - c, 1, 1];
  if (i < 10) return [1 - c - (i - 0) * s, 1 - c, 1 - c - (i - 1) * s, 1];
  if (i === 10) return [0, 1 - c, c, 1];
  if (i < 20) return [0, 1 - c - (i - 10) * s, c, 1 - c - (i - 11) * s];
  if (i === 20) return [0, 0, c, c];
  if (i < 30) return [c + (i - 21) * s, 0, c + (i - 20) * s, c];
  if (i === 30) return [1 - c, 0, 1, c];
  return [1 - c, c + (i - 31) * s, 1, c + (i - 30) * s];
}

// Which space a board point falls on, or null for the middle of the board.
export function spaceAt(u, v, cornerRatio) {
  for (let i = 0; i < 40; i++) {
    const [x0, y0, x1, y1] = spaceRect(i, cornerRatio);
    if (u >= x0 && u <= x1 && v >= y0 && v <= y1) return i;
  }
  return null;
}

// Where GO is in the photo. Each step is a quarter turn.
export const ORIENTATIONS = ["bottom-right", "bottom-left", "top-left", "top-right"];
const turn = ([u, v]) => [v, 1 - u];
const unturn = ([u, v]) => [1 - v, u];

// A point in the photo (0..1) to board coordinates, given the board's two opposite corners in the photo.
export function photoToBoard(x, y, corners, orientation) {
  const [a, b] = corners;
  const x0 = Math.min(a.x, b.x), x1 = Math.max(a.x, b.x), y0 = Math.min(a.y, b.y), y1 = Math.max(a.y, b.y);
  let p = [(x - x0) / (x1 - x0), (y - y0) / (y1 - y0)];
  if (p[0] < 0 || p[0] > 1 || p[1] < 0 || p[1] > 1) return null;
  for (let k = 0; k < ORIENTATIONS.indexOf(orientation); k++) p = turn(p);
  return p;
}

// A space's rectangle back in photo coordinates, for drawing the grid over the photo.
export function spaceInPhoto(i, cornerRatio, corners, orientation) {
  const [a, b] = corners;
  const x0 = Math.min(a.x, b.x), x1 = Math.max(a.x, b.x), y0 = Math.min(a.y, b.y), y1 = Math.max(a.y, b.y);
  const [u0, v0, u1, v1] = spaceRect(i, cornerRatio);
  let p = [u0, v0];
  let q = [u1, v1];
  for (let k = 0; k < ORIENTATIONS.indexOf(orientation); k++) {
    p = unturn(p);
    q = unturn(q);
  }
  const ux = [p[0], q[0]].sort((m, n) => m - n);
  const vy = [p[1], q[1]].sort((m, n) => m - n);
  return { x: x0 + ux[0] * (x1 - x0), y: y0 + vy[0] * (y1 - y0), w: (ux[1] - ux[0]) * (x1 - x0), h: (vy[1] - vy[0]) * (y1 - y0) };
}
