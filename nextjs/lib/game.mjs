import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// The week 11 game's rulesets: one JSON file each in _content/game/_rulesets/ ("_" keeps them off the folder pages).
// Presets (preset: true) are the versions we show; students' remixes are saved beside them from /game/edit.
const rulesetsRoot = path.join(/* turbopackIgnore: true */ process.cwd(), "..", "_content", "game", "_rulesets");

export const rulesetName = (name) => (/^[a-z0-9][a-z0-9-]{0,40}$/.test(name || "") ? name : null);

export async function readRuleset(name) {
  if (!rulesetName(name)) return null;
  try {
    return JSON.parse(await readFile(/* turbopackIgnore: true */ path.join(rulesetsRoot, `${name}.json`), "utf8"));
  } catch {
    return null;
  }
}

export async function listRulesets() {
  let files = [];
  try {
    files = await readdir(/* turbopackIgnore: true */ rulesetsRoot);
  } catch {
    return [];
  }
  const all = await Promise.all(files.filter((f) => f.endsWith(".json")).map((f) => readRuleset(f.replace(/\.json$/, ""))));
  const order = ["data-center", "normal-technology", "committee", "blank"];
  return all
    .filter(Boolean)
    .sort((a, b) => (b.preset ? 1 : 0) - (a.preset ? 1 : 0) || (order.indexOf(a.id) + 1 || 99) - (order.indexOf(b.id) + 1 || 99) || String(b.savedAt || "").localeCompare(String(a.savedAt || "")));
}

// Saving never overwrites a preset; a remix takes a new name.
export async function writeRuleset(name, rules) {
  const existing = await readRuleset(name);
  if (existing?.preset) return { error: `"${name}" is one of the starting versions. Save your remix under a new name.` };
  await mkdir(/* turbopackIgnore: true */ rulesetsRoot, { recursive: true });
  const saved = { ...rules, id: name, preset: false, savedAt: new Date().toISOString() };
  await writeFile(/* turbopackIgnore: true */ path.join(rulesetsRoot, `${name}.json`), `${JSON.stringify(saved, null, 2)}\n`);
  return { ok: true, id: name, savedAt: saved.savedAt };
}
