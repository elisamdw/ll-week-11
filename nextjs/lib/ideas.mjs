import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// Marlon's ideas as atomic cards (/ideas): one Markdown file per idea in _content/ideas/<slug>.md, with frontmatter
// title, description, kind, week, tags, date, sources, status; the body is his words. Layout from the HILT ideas set
// (hilt-encore-20261112-public, nextjs/lib/ideas.ts). The board and graph save their arrangements beside the cards in
// _content/ideas/_layouts/<view>.json ("_" keeps them out of the folder pages).
//
// A second collection uses the same views: game idea cards (/game-ideas, _content/game-ideas/, Nov 14), grouped by
// the technology they play with rather than by kind of work. Every function takes the collection's key.
const contentRoot = path.join(/* turbopackIgnore: true */ process.cwd(), "..", "_content");
const rootOf = (c) => path.join(contentRoot, c === "game-ideas" ? "game-ideas" : "ideas");
const layoutsOf = (c) => path.join(rootOf(c), "_layouts");
export const collectionKey = (c) => (c === "game-ideas" ? "game-ideas" : "ideas");

export const KINDS = [
  ["build", "Build"],
  ["activity", "Activity"],
  ["research", "Research"],
  ["tool", "Tool"],
  ["story", "Story"],
  ["concept", "Concept"],
  ["space", "Space"],
  ["event", "Event"],
];

// One hue per kind, shared by the list, the cards, the board, and the graph.
export const KIND_HUES = { build: 265, activity: 150, research: 200, tool: 35, story: 330, concept: 55, space: 100, event: 0 };

export const GAME_KINDS = [
  ["nfc", "NFC"],
  ["tabletop-phone", "Tabletop and phone"],
  ["ar-xr", "AR/XR with a phone"],
];
export const GAME_KIND_HUES = { nfc: 35, "tabletop-phone": 150, "ar-xr": 265 };

export const kindsOf = (c) => (collectionKey(c) === "game-ideas" ? [GAME_KINDS, GAME_KIND_HUES] : [KINDS, KIND_HUES]);

const str = (v) => (typeof v === "string" ? v.trim() : v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === "number" ? String(v) : "");
const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : str(v) ? [str(v)] : []);

export async function getIdeas(c = "ideas") {
  const ideasRoot = rootOf(c);
  let names = [];
  try {
    names = (await readdir(/* turbopackIgnore: true */ ideasRoot)).filter((n) => /^[a-z0-9][a-z0-9-]*\.md$/.test(n) && !/^(readme|index)\.md$/i.test(n));
  } catch {
    return [];
  }
  const ideas = await Promise.all(
    names.map(async (name) => {
      const { data, content } = matter(await readFile(path.join(/* turbopackIgnore: true */ ideasRoot, name), "utf8"));
      const slug = name.slice(0, -3);
      return {
        slug,
        title: str(data.title) || slug,
        description: str(data.description),
        kind: str(data.kind),
        week: str(data.week),
        tags: list(data.tags),
        date: str(data.date),
        sources: list(data.sources),
        status: str(data.status),
        body: content.trim(),
      };
    }),
  );
  return ideas.sort((a, b) => a.week.localeCompare(b.week, undefined, { numeric: true }) || a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title));
}

export async function getIdea(slug, c = "ideas") {
  return (await getIdeas(c)).find((idea) => idea.slug === slug) || null;
}

// The README's "Start here" list, in its order: the slugs it links to.
export async function getStartHere(c = "ideas") {
  const ideasRoot = rootOf(c);
  try {
    const readme = await readFile(/* turbopackIgnore: true */ path.join(ideasRoot, "README.md"), "utf8");
    const section = readme.split(/^##\s+Start here\s*$/m)[1]?.split(/^##\s+/m)[0] ?? "";
    return [...section.matchAll(/\]\((?:\.\/)?([a-z0-9-]+)\.md\)/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

// Saved arrangements: one JSON file per view (board, graph, or a named variant such as board-stafford).
export const layoutName = (name) => (/^[a-z0-9][a-z0-9-]{0,40}$/.test(name || "") ? name : null);

export async function readLayout(name, c = "ideas") {
  const layoutsRoot = layoutsOf(c);
  try {
    return JSON.parse(await readFile(/* turbopackIgnore: true */ path.join(layoutsRoot, `${name}.json`), "utf8"));
  } catch {
    return null;
  }
}

export async function writeLayout(name, layout, c = "ideas") {
  const layoutsRoot = layoutsOf(c);
  await mkdir(/* turbopackIgnore: true */ layoutsRoot, { recursive: true });
  const saved = { ...layout, savedAt: new Date().toISOString() };
  await writeFile(/* turbopackIgnore: true */ path.join(layoutsRoot, `${name}.json`), `${JSON.stringify(saved, null, 2)}\n`);
  return saved;
}
