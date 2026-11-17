import { promises as fs } from "node:fs";
import path from "node:path";

// Shared state for multi-device prototypes: one JSON document per prototype and room code.
// Kept in memory (fast, survives hot reloads through globalThis) and written through to the gitignored
// <repo>/_raw/proto-rooms/ so a room survives a dev-server restart. The app runs on the laptop; phones in the
// room reach it at http://<laptop address>:3111.

const DIR = path.resolve(process.cwd(), "..", "_raw", "proto-rooms");
const rooms = (globalThis.__protoRooms ||= new Map());

const NAME = /^[a-z0-9][a-z0-9-]{0,47}$/;

export function roomKey(family, slug, room) {
  const parts = [family, slug, String(room || "").toLowerCase()];
  return parts.every((p) => NAME.test(p)) ? parts.join("__") : null;
}

async function load(key) {
  if (rooms.has(key)) return rooms.get(key);
  let doc = { state: null, version: 0, updatedAt: null };
  try {
    doc = JSON.parse(await fs.readFile(path.join(DIR, `${key}.json`), "utf8"));
  } catch {}
  rooms.set(key, doc);
  return doc;
}

async function save(key, doc) {
  doc.version += 1;
  doc.updatedAt = new Date().toISOString();
  rooms.set(key, doc);
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, `${key}.json`), JSON.stringify(doc, null, 2));
  return doc;
}

export async function read(key) {
  return load(key);
}

export async function replace(key, state) {
  const doc = await load(key);
  return save(key, { ...doc, state });
}

// Reset empties the state but keeps counting versions, so every device sees the reset.
export async function remove(key) {
  const doc = await load(key);
  return save(key, { ...doc, state: null });
}

// ops: [{ op, path, value }], path dotted ("players.ana.score"), "" for the whole state.
//   set     put value at path
//   merge   shallow-merge an object into the object at path
//   push    append value to the array at path (max: keep only the last n)
//   inc     add value (default 1) to the number at path
//   unset   delete the key at path
// init: the state to start from when the room is still empty.
export async function apply(key, ops, init = {}) {
  const doc = await load(key);
  let state = structuredClone(doc.state ?? init ?? {});
  for (const { op, path: p = "", value, max } of ops) {
    const keys = p ? String(p).split(".") : [];
    if (!keys.length) {
      if (op === "set") state = value;
      else if (op === "merge") state = { ...state, ...value };
      else throw new Error(`${op} needs a path`);
      continue;
    }
    const last = keys.pop();
    let parent = state;
    for (const k of keys) {
      if (parent[k] == null || typeof parent[k] !== "object") parent[k] = {};
      parent = parent[k];
    }
    if (op === "set") parent[last] = value;
    else if (op === "merge") parent[last] = { ...(parent[last] || {}), ...value };
    else if (op === "push") {
      const list = Array.isArray(parent[last]) ? parent[last] : [];
      list.push(value);
      parent[last] = max ? list.slice(-max) : list;
    } else if (op === "inc") parent[last] = (Number(parent[last]) || 0) + (value ?? 1);
    else if (op === "unset") delete parent[last];
    else throw new Error(`unknown op ${op}`);
  }
  return save(key, { ...doc, state });
}
