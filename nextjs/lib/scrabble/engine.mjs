// Pure Scrabble move validation + scoring. Dictionary-free: caller passes a
// hasWord predicate so the same engine runs server-side (authoritative) and
// client-side (optimistic preview with a smaller word list, if ever added).

import { BOARD_SIZE, BONUS_GRID, LETTER_SCORES, BINGO_BONUS, RACK_SIZE, isCenter } from "./constants.mjs";

export function emptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
}

function inBounds(r, c) {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

function sortPlacements(ps) {
  return [...ps].sort((a, b) => (a.row - b.row) || (a.col - b.col));
}

/**
 * Figure out axis ("row" or "col") of the play, and verify colinearity.
 * Single-tile plays default to "row" (any cross-word still gets scored).
 */
function detectAxis(placements) {
  if (placements.length === 0) return { ok: false, reason: "No tiles placed." };
  if (placements.length === 1) return { ok: true, axis: "row" };
  const rows = new Set(placements.map((p) => p.row));
  const cols = new Set(placements.map((p) => p.col));
  if (rows.size === 1) return { ok: true, axis: "row" };
  if (cols.size === 1) return { ok: true, axis: "col" };
  return { ok: false, reason: "Tiles must be in a single row or column." };
}

/**
 * Walk the axis from the first placement; collect the full word including
 * any adjacent committed tiles. Fails if there are gaps the play does not fill.
 */
function walkMainWord(board, placementMap, placements, axis) {
  const sorted = sortPlacements(placements);
  let r = sorted[0].row;
  let c = sorted[0].col;

  // Walk backward to the start of the contiguous run.
  while (true) {
    const nr = axis === "row" ? r : r - 1;
    const nc = axis === "row" ? c - 1 : c;
    if (!inBounds(nr, nc)) break;
    const tile = board[nr][nc] || placementMap.get(`${nr},${nc}`);
    if (!tile) break;
    r = nr; c = nc;
  }

  // Walk forward collecting every tile in the run.
  const tiles = [];
  let coveredPlacements = 0;
  while (inBounds(r, c)) {
    const placed = placementMap.get(`${r},${c}`);
    const committed = board[r][c];
    const tile = placed || committed;
    if (!tile) break;
    tiles.push({ row: r, col: c, tile, fromPlacement: Boolean(placed) });
    if (placed) coveredPlacements += 1;
    if (axis === "row") c += 1; else r += 1;
  }

  if (coveredPlacements !== placements.length) {
    return { ok: false, reason: "Tiles must form one unbroken word along the line." };
  }

  return { ok: true, tiles };
}

/**
 * Walk the cross-axis through a single placement. Returns the perpendicular
 * word (length >= 2) or null if the tile has no neighbor on that axis.
 */
function walkCrossWord(board, placementMap, row, col, axis) {
  const cross = axis === "row" ? "col" : "row";
  let r = row;
  let c = col;
  while (true) {
    const nr = cross === "row" ? r - 1 : r;
    const nc = cross === "row" ? c : c - 1;
    if (!inBounds(nr, nc)) break;
    const tile = board[nr][nc] || placementMap.get(`${nr},${nc}`);
    if (!tile) break;
    r = nr; c = nc;
  }
  const tiles = [];
  while (inBounds(r, c)) {
    const placed = placementMap.get(`${r},${c}`);
    const committed = board[r][c];
    const tile = placed || committed;
    if (!tile) break;
    tiles.push({ row: r, col: c, tile, fromPlacement: Boolean(placed) });
    if (cross === "row") r += 1; else c += 1;
  }
  return tiles.length >= 2 ? tiles : null;
}

function wordString(tiles) {
  return tiles.map((t) => t.tile.letter).join("").toUpperCase();
}

function scoreWord(tiles) {
  let total = 0;
  let wordMult = 1;
  for (const { row, col, tile, fromPlacement } of tiles) {
    const bonus = fromPlacement ? BONUS_GRID[row][col] : "";
    let letterScore = tile.blank
      ? 0
      : (typeof tile.score === "number" ? tile.score : (LETTER_SCORES[tile.letter] ?? 0));
    if (bonus === "DL") letterScore *= 2;
    if (bonus === "TL") letterScore *= 3;
    if (bonus === "DW") wordMult *= 2;
    if (bonus === "TW") wordMult *= 3;
    total += letterScore;
  }
  return total * wordMult;
}

/**
 * Validate and score a move. `placements` is an array of { row, col, tile }
 * where tile = { letter, score, blank }. `board` is the committed grid.
 * `hasWord(word)` returns true if word is in the dictionary.
 *
 * Returns { ok: true, score, words: [{ word, score, tiles }] } or
 *         { ok: false, reason }.
 */
export function evaluateMove(board, placements, hasWord, { isFirstMove }) {
  if (placements.length === 0) {
    return { ok: false, reason: "Place at least one tile." };
  }
  if (placements.length > RACK_SIZE) {
    return { ok: false, reason: "Too many tiles for one move." };
  }

  // No overlap with committed tiles or with each other.
  const seen = new Set();
  const placementMap = new Map();
  for (const p of placements) {
    const key = `${p.row},${p.col}`;
    if (!inBounds(p.row, p.col)) return { ok: false, reason: "Tile off the board." };
    if (board[p.row][p.col]) return { ok: false, reason: "A tile already sits there." };
    if (seen.has(key)) return { ok: false, reason: "Two tiles on the same square." };
    if (p.tile.blank && !p.tile.letter) return { ok: false, reason: "Choose a letter for your blank before playing." };
    seen.add(key);
    placementMap.set(key, p.tile);
  }

  const axis = detectAxis(placements);
  if (!axis.ok) return axis;

  const main = walkMainWord(board, placementMap, placements, axis.axis);
  if (!main.ok) return main;

  // First move: must cross the center. Subsequent moves: must touch an
  // existing tile via the main word or a cross-word.
  if (isFirstMove) {
    const crossesCenter = placements.some((p) => isCenter(p.row, p.col));
    if (!crossesCenter) {
      return { ok: false, reason: "The first move must cover the center square." };
    }
  } else {
    const touches = main.tiles.some((t) => !t.fromPlacement)
      || placements.some((p) => {
        const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return neighbors.some(([dr, dc]) => {
          const nr = p.row + dr, nc = p.col + dc;
          return inBounds(nr, nc) && board[nr][nc];
        });
      });
    if (!touches) return { ok: false, reason: "New tiles must connect to the existing board." };
  }

  const words = [];
  if (main.tiles.length >= 2) {
    words.push(main.tiles);
  } else if (placements.length === 1) {
    // Single tile that stands alone on its axis still needs a cross-word.
  } else {
    return { ok: false, reason: "A play must form a word of at least two letters." };
  }

  for (const p of placements) {
    const cross = walkCrossWord(board, placementMap, p.row, p.col, axis.axis);
    if (cross) words.push(cross);
  }

  if (words.length === 0) {
    return { ok: false, reason: "A play must form a word of at least two letters." };
  }

  const scored = [];
  for (const tiles of words) {
    const word = wordString(tiles);
    if (!hasWord(word)) {
      return { ok: false, reason: `"${word}" is not in the dictionary.` };
    }
    scored.push({ word, score: scoreWord(tiles), tiles });
  }

  let total = scored.reduce((sum, w) => sum + w.score, 0);
  if (placements.length === RACK_SIZE) total += BINGO_BONUS;

  return { ok: true, score: total, words: scored, bingo: placements.length === RACK_SIZE };
}

export function applyMove(board, placements) {
  const next = board.map((row) => row.slice());
  for (const p of placements) {
    next[p.row][p.col] = p.tile;
  }
  return next;
}
