"use client";

// Copied from app/ideas/collection.js (AL's) for /cards, which is one collection: _content/cards/. The board and graph
// read `base` for links, `layouts` for where they save (/cards/api/layout/<name> → _content/cards/_layouts/<name>.json).
const CARDS = { base: "/cards", api: "", layouts: "/cards/api/layout", label: "Cards" };

export function useCollection() {
  return CARDS;
}
