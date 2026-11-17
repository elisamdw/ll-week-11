import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// The prototype cards in _content/prototypes/<family>/<slug>.md, read at request time, and whether each one's
// page exists at nextjs/app/proto/<family>/<slug>/.

export const FAMILIES = [
  { id: "economy", title: "Economy and the AI as a system", blurb: "Prices that move, growth loops, resources, escalation, the AI's demand." },
  { id: "players", title: "Information and players", blurb: "Hidden information, private goals on a phone, voting and committees, negotiation, the turn only the phone knows." },
  { id: "hybrid", title: "The body, the room and hybrid play", blurb: "NFC taps, photos and cameras to game state, cards and markers, AR with a phone, the audience layer." },
];

const appRoot = process.cwd();
const cardsRoot = path.join(appRoot, "..", "_content", "prototypes");

const exists = (file) => access(file).then(() => true, () => false);
const list = (value) => (Array.isArray(value) ? value : value ? [value] : []);

export async function getPrototypes() {
  const out = [];
  for (const family of FAMILIES) {
    let files = [];
    try {
      files = (await readdir(path.join(cardsRoot, family.id))).filter((f) => f.endsWith(".md") && !/^(_|\.|README)/.test(f));
    } catch {}
    for (const file of files.sort()) {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(await readFile(path.join(cardsRoot, family.id, file), "utf8"));
      const route = data.route || `/proto/${family.id}/${slug}`;
      out.push({
        family: family.id,
        slug,
        title: data.title || slug,
        description: data.description || "",
        status: data.status || "prototype",
        route,
        card: `/prototypes/${family.id}/${slug}`,
        playable: await exists(path.join(appRoot, "app", route.replace(/^\//, ""), "page.jsx")),
        mechanics: list(data.mechanics),
        ideas: list(data.ideas),
        needs: data.needs || "",
      });
    }
  }
  return out;
}
