import { SPACES, spaceRect } from "./ring.js";

// Drawn stand-ins for overhead photos, so the prototype plays without a camera or a board.
// They are drawings, not photographs: swap in real photos of the LL's Monopoly box or a card table.

const W = 1500;
const H = 1000;
const svg = (body) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Helvetica, Arial, sans-serif">${body}</svg>`)}`;

// ---- Monopoly ----

export const BOARD_BOX = { x0: 40, y0: 40, x1: 960, y1: 960 }; // where the drawn board sits, in pixels
const CORNER_RATIO = 1.65;
const short = (name) => name.replace(" Avenue", " Ave").replace(" Railroad", " RR").replace("Community Chest", "Chest").replace("Jail / Just Visiting", "Jail");

function spaceCenter(i) {
  const [x0, y0, x1, y1] = spaceRect(i, CORNER_RATIO);
  const size = BOARD_BOX.x1 - BOARD_BOX.x0;
  return [BOARD_BOX.x0 + ((x0 + x1) / 2) * size, BOARD_BOX.y0 + ((y0 + y1) / 2) * size];
}

function board() {
  const size = BOARD_BOX.x1 - BOARD_BOX.x0;
  let out = `<rect width="${W}" height="${H}" fill="#6b5a46"/><rect x="${BOARD_BOX.x0}" y="${BOARD_BOX.y0}" width="${size}" height="${size}" fill="#d9ead3"/>`;
  for (const space of SPACES) {
    const [x0, y0, x1, y1] = spaceRect(space.position, CORNER_RATIO);
    const [cx, cy] = spaceCenter(space.position);
    out += `<rect x="${BOARD_BOX.x0 + x0 * size}" y="${BOARD_BOX.y0 + y0 * size}" width="${(x1 - x0) * size}" height="${(y1 - y0) * size}" fill="none" stroke="#333" stroke-width="1.5"/>`;
    out += `<text x="${cx}" y="${cy - 8}" font-size="10" text-anchor="middle" fill="#222">${space.position}</text>`;
    out += `<text x="${cx}" y="${cy + 6}" font-size="9" text-anchor="middle" fill="#444">${short(space.name).replace("&", "&amp;")}</text>`;
  }
  out += `<text x="500" y="500" font-size="58" font-weight="700" text-anchor="middle" fill="#b43" transform="rotate(-38 500 500)">A BOARD GAME</text>`;
  out += `<text x="500" y="560" font-size="16" text-anchor="middle" fill="#555">(a drawing standing in for a photo)</text>`;
  return out;
}

function token(i, letter, color, dx = 0, dy = 0) {
  const [cx, cy] = spaceCenter(i);
  return `<circle cx="${cx + dx}" cy="${cy + dy + 18}" r="15" fill="${color}" stroke="#111" stroke-width="2"/><text x="${cx + dx}" y="${cy + dy + 24}" font-size="16" font-weight="700" text-anchor="middle" fill="#fff">${letter}</text>`;
}
function house(i, dx) {
  const [cx, cy] = spaceCenter(i);
  return `<rect x="${cx + dx - 7}" y="${cy - 38}" width="14" height="14" fill="#2e8b3e" stroke="#111"/>`;
}
function deed(x, y, name, band, faceDown = false) {
  if (faceDown) return `<rect x="${x}" y="${y}" width="110" height="140" rx="4" fill="#efe6d0" stroke="#333"/><text x="${x + 55}" y="${y + 60}" font-size="11" text-anchor="middle">${name}</text><text x="${x + 55}" y="${y + 80}" font-size="12" font-weight="700" text-anchor="middle" fill="#b43">MORTGAGED</text>`;
  return `<rect x="${x}" y="${y}" width="110" height="140" rx="4" fill="#fff" stroke="#333"/><rect x="${x + 6}" y="${y + 6}" width="98" height="30" fill="${band}"/><text x="${x + 55}" y="${y + 56}" font-size="11" font-weight="700" text-anchor="middle">${name}</text><text x="${x + 55}" y="${y + 80}" font-size="10" text-anchor="middle">RENT $20</text>`;
}
function cash(x, y, bills) {
  return bills.map((label, k) => `<rect x="${x + k * 9}" y="${y + k * 5}" width="120" height="58" fill="#f3e9b5" stroke="#776" /><text x="${x + k * 9 + 60}" y="${y + k * 5 + 36}" font-size="18" text-anchor="middle" fill="#665">${label}</text>`).join("");
}
function area(y, name) {
  return `<rect x="1000" y="${y}" width="470" height="440" rx="10" fill="#7d6a54" stroke="#4d3f30"/><text x="1020" y="${y + 30}" font-size="20" font-weight="700" fill="#f4ecd8">${name}'s side of the table</text>`;
}

export const MONOPOLY_A = svg(`${board()}${token(0, "C", "#c0392b", -16)}${token(0, "D", "#2c3e8f", 16)}<rect x="400" y="620" width="200" height="80" fill="#cfc" stroke="#333"/><text x="500" y="650" font-size="14" text-anchor="middle">bank: houses</text>${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${420 + k * 26}" y="${665}" width="14" height="14" fill="#2e8b3e" stroke="#111"/>`).join("")}${area(40, "Car")}${cash(1030, 100, ["$500", "$500", "$100", "$100", "$100", "$100"])}${area(520, "Dog")}${cash(1030, 580, ["$500", "$500", "$100", "$100", "$100", "$100"])}`);

export const MONOPOLY_B = svg(`${board()}${token(24, "C", "#c0392b")}${token(10, "D", "#2c3e8f", 10, -10)}${house(24, -9)}${house(24, 9)}<rect x="400" y="620" width="200" height="80" fill="#cfc" stroke="#333"/><text x="500" y="650" font-size="14" text-anchor="middle">bank: houses</text>${[0, 1, 2, 3].map((k) => `<rect x="${420 + k * 26}" y="${665}" width="14" height="14" fill="#2e8b3e" stroke="#111"/>`).join("")}${area(40, "Car")}${cash(1030, 100, ["$500", "$500", "$100", "$100"])}${deed(1300, 90, "ILLINOIS AVE", "#d33")}${area(520, "Dog")}${cash(1030, 580, ["$500", "$500", "$100", "$100", "$100", "$100", "$50"])}${deed(1300, 570, "READING RR", "#222", true)}`);

// Where the sample board's corners are, as fractions of the image.
export const MONOPOLY_CORNERS = [
  { x: BOARD_BOX.x0 / W, y: BOARD_BOX.y0 / H },
  { x: BOARD_BOX.x1 / W, y: BOARD_BOX.y1 / H },
];

// ---- A card table ----

const back = (x, y, r = 0) => `<g transform="rotate(${r} ${x + 35} ${y + 50})"><rect x="${x}" y="${y}" width="70" height="100" rx="6" fill="#2c4f9e" stroke="#fff" stroke-width="3"/><rect x="${x + 8}" y="${y + 8}" width="54" height="84" rx="3" fill="none" stroke="#9cb3e8" stroke-dasharray="4 3"/></g>`;
const face = (x, y, rank, suit, r = 0) => {
  const red = suit === "♥" || suit === "♦";
  return `<g transform="rotate(${r} ${x + 35} ${y + 50})"><rect x="${x}" y="${y}" width="70" height="100" rx="6" fill="#fff" stroke="#333" stroke-width="2"/><text x="${x + 35}" y="${y + 62}" font-size="34" font-weight="700" text-anchor="middle" fill="${red ? "#c0392b" : "#111"}">${rank}${suit}</text></g>`;
};
const chips = (x, y, n, color) => Array.from({ length: n }, (_, k) => `<ellipse cx="${x}" cy="${y - k * 6}" rx="22" ry="10" fill="${color}" stroke="#111" stroke-width="1.5"/>`).join("");
const seat = (x, y, name) => `<rect x="${x - 60}" y="${y - 20}" width="120" height="40" rx="20" fill="#3b2a1a" stroke="#d8c39a"/><text x="${x}" y="${y + 7}" font-size="20" text-anchor="middle" fill="#f4ecd8">${name}</text>`;
const table = () => `<rect width="${W}" height="${H}" fill="#3a3027"/><ellipse cx="750" cy="500" rx="640" ry="420" fill="#1f6b3a" stroke="#5a3b1e" stroke-width="26"/><text x="750" y="975" font-size="16" text-anchor="middle" fill="#c9b893">(a drawing standing in for a photo)</text>`;
const seats = () => `${seat(750, 900, "Ana")}${seat(140, 500, "Ben")}${seat(750, 100, "Cy")}${seat(1360, 500, "Di")}`;

export const CARDS_A = svg(`${table()}${seats()}${back(680, 400)}${back(684, 396)}${back(688, 392)}${back(690, 730, -6)}${back(760, 730, 6)}${back(260, 440, 84)}${back(260, 520, 96)}${back(690, 170, -6)}${back(760, 170, 6)}${back(1170, 440, -84)}${back(1170, 520, -96)}${chips(600, 820, 6, "#c0392b")}${chips(250, 640, 6, "#c0392b")}${chips(900, 200, 6, "#c0392b")}${chips(1250, 380, 6, "#c0392b")}`);

export const CARDS_B = svg(`${table()}${seats()}${back(500, 420)}${back(504, 416)}${face(620, 420, "7", "♥")}${face(700, 420, "K", "♣")}${face(780, 420, "2", "♦")}${chips(950, 500, 9, "#c0392b")}${face(690, 730, "K", "♠", -6)}${face(760, 730, "9", "♠", 6)}${back(260, 440, 84)}${back(260, 520, 96)}${back(690, 170, -6)}${back(760, 170, 6)}${back(1080, 620, 30)}${back(1100, 640, 40)}${chips(600, 820, 3, "#c0392b")}${chips(250, 640, 4, "#c0392b")}${chips(900, 200, 2, "#c0392b")}${chips(1250, 380, 6, "#c0392b")}`);

// ---- Example pins for the drawings: what a careful person (or a vision model) would mark ----
// The same id in A and B is the same piece, which is how the diff knows what moved.

const at = (px, py) => ({ x: px / W, y: py / H });
const pin = (id, type, [px, py], fields = {}) => ({ id, type, ...at(px, py), fields });
const onSpace = (i, dx = 0, dy = 0) => {
  const [cx, cy] = spaceCenter(i);
  return [cx + dx, cy + dy];
};

export const EXAMPLE_PINS = {
  monopoly: {
    A: [
      pin("car", "token", onSpace(0, -16, 18), { player: "car" }),
      pin("dog", "token", onSpace(0, 16, 18), { player: "dog" }),
      pin("cash-car", "cash", [1090, 130], { owner: "car", amount: "1500?" }),
      pin("cash-dog", "cash", [1090, 610], { owner: "dog", amount: "1500?" }),
    ],
    B: [
      pin("car", "token", onSpace(24, 0, 18), { player: "car" }),
      pin("dog", "token", onSpace(10, 10, 8), { player: "dog" }),
      pin("h1", "house", onSpace(24, -9, -31)),
      pin("h2", "house", onSpace(24, 9, -31)),
      pin("deed-illinois", "deed", [1355, 160], { property: "24", owner: "car", mortgaged: false }),
      pin("deed-reading", "deed", [1355, 640], { property: "5", owner: "dog", mortgaged: true }),
      pin("cash-car", "cash", [1090, 130], { owner: "car", amount: "1200?" }),
      pin("cash-dog", "cash", [1090, 610], { owner: "dog", amount: "1500?" }),
    ],
  },
  cards: {
    A: [
      pin("s-ana", "seat", [750, 900], { player: "Ana" }),
      pin("s-ben", "seat", [140, 500], { player: "Ben" }),
      pin("s-cy", "seat", [750, 100], { player: "Cy" }),
      pin("s-di", "seat", [1360, 500], { player: "Di" }),
      pin("deck", "down", [715, 450]),
      pin("ana-1", "down", [725, 780]),
      pin("ana-2", "down", [795, 780]),
      pin("ben-1", "down", [295, 490]),
      pin("ben-2", "down", [295, 570]),
      pin("cy-1", "down", [725, 220]),
      pin("cy-2", "down", [795, 220]),
      pin("di-1", "down", [1205, 490]),
      pin("di-2", "down", [1205, 570]),
      pin("chips-ana", "chips", [600, 800], { count: "6" }),
      pin("chips-ben", "chips", [250, 620], { count: "6" }),
      pin("chips-cy", "chips", [900, 180], { count: "6" }),
      pin("chips-di", "chips", [1250, 360], { count: "6" }),
    ],
    B: [
      pin("s-ana", "seat", [750, 900], { player: "Ana" }),
      pin("s-ben", "seat", [140, 500], { player: "Ben" }),
      pin("s-cy", "seat", [750, 100], { player: "Cy" }),
      pin("s-di", "seat", [1360, 500], { player: "Di" }),
      pin("deck", "down", [535, 470]),
      pin("flop-1", "up", [655, 470], { card: "7♥" }),
      pin("flop-2", "up", [735, 470], { card: "K♣" }),
      pin("flop-3", "up", [815, 470], { card: "2♦" }),
      pin("ana-1", "up", [725, 780], { card: "K♠" }),
      pin("ana-2", "up", [795, 780], { card: "9♠" }),
      pin("ben-1", "down", [295, 490]),
      pin("ben-2", "down", [295, 570]),
      pin("cy-1", "down", [725, 220]),
      pin("cy-2", "down", [795, 220]),
      pin("di-1", "down", [1115, 670]),
      pin("di-2", "down", [1135, 690]),
      pin("pot", "chips", [950, 470], { count: "9" }),
      pin("chips-ana", "chips", [600, 800], { count: "3" }),
      pin("chips-ben", "chips", [250, 620], { count: "4" }),
      pin("chips-cy", "chips", [900, 180], { count: "2" }),
      pin("chips-di", "chips", [1250, 360], { count: "6" }),
    ],
  },
};
