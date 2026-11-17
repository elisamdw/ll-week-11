"use client";

import { usePathname } from "next/navigation";

// Four card collections share these views: /ideas (Marlon's ideas, _content/ideas/), /game-ideas (game idea cards,
// _content/game-ideas/), /activities (activity cards in subfolders, _content/activities/, Nov 15) and /prototypes
// (PL's prototype cards, _content/prototypes/; cards and print only). The views read which one they're in from the
// URL, so links and saving stay inside it. `layouts` is where the board and graph save their arrangements.
const COLLECTIONS = {
  ideas: { base: "/ideas", api: "", layouts: "/api/ideas/layout", label: "Ideas" },
  "game-ideas": { base: "/game-ideas", api: "?c=game-ideas", layouts: "/api/ideas/layout", label: "Game ideas" },
  activities: { base: "/activities", api: "", layouts: "/activities/api/layout", label: "Activities" },
  prototypes: { base: "/prototypes", api: "", layouts: null, label: "Prototypes" },
};

export function useCollection() {
  const first = (usePathname() || "/ideas").split("/")[1];
  return COLLECTIONS[first] || COLLECTIONS.ideas;
}
