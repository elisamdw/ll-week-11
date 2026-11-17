import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// The mechanics studies: one folder per study in _content/mechanics/studies/NN-<slug>/, its README.md in the entry
// format (## Definition, ## Description, ...). Read at request time, like the rest of _content/.
const studiesRoot = path.join(/* turbopackIgnore: true */ process.cwd(), "..", "_content", "mechanics", "studies");

// "## Try it at a table (two minutes)" -> "try-it-at-a-table"; the page picks sections by these keys.
function sectionKey(heading) {
  return heading.toLowerCase().replace(/\(.*?\)/g, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function splitSections(body) {
  const sections = {};
  const order = [];
  let key = null;
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      key = sectionKey(heading[1]);
      sections[key] = { heading: heading[1], content: "" };
      order.push(key);
    } else if (key) sections[key].content += `${line}\n`;
  }
  for (const k of order) sections[k].content = sections[k].content.trim();
  return { sections, order };
}

export async function listStudies() {
  let names = [];
  try {
    names = await readdir(studiesRoot, { withFileTypes: true });
  } catch {
    return [];
  }
  const studies = [];
  for (const dirent of names) {
    const match = dirent.isDirectory() && dirent.name.match(/^(\d{2})-(.+)$/);
    if (!match) continue;
    try {
      const raw = await readFile(path.join(studiesRoot, dirent.name, "README.md"), "utf8");
      const { data, content } = matter(raw);
      studies.push({ number: match[1], slug: data.id || data.slug || match[2], folder: dirent.name, data, content, ...splitSections(content) });
    } catch {}
  }
  return studies.sort((a, b) => a.folder.localeCompare(b.folder));
}

// By slug (the-move-updates-state) or by folder name (01-the-move-updates-state).
export async function getStudy(slug) {
  const studies = await listStudies();
  const index = studies.findIndex((s) => s.slug === slug || s.folder === slug);
  if (index < 0) return null;
  return { study: studies[index], prev: studies[index - 1] || null, next: studies[index + 1] || null };
}

// A section as a doc the shared Markdown component can render (links resolve from the study's folder).
export function sectionDoc(study, key) {
  const section = study.sections[key];
  return section ? { content: section.content, dir: `mechanics/studies/${study.folder}` } : null;
}
