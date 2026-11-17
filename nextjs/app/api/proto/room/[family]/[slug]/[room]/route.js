import { apply, read, remove, replace, roomKey } from "../../../../_store.mjs";

export const dynamic = "force-dynamic";

// Shared room state for the prototypes. Use it from a page through useRoom() in app/proto/_shared/room.js.
// GET    /api/proto/room/<family>/<slug>/<room>?v=<version>  { state, version, updatedAt }, or { version, unchanged: true }
// PUT    body { state }                                       replace the whole state
// PATCH  body { ops: [{ op, path, value }], init? }           set, merge, push, inc, unset (see _store.mjs)
// DELETE                                                      reset the room

async function keyFrom(params) {
  const { family, slug, room } = await params;
  return roomKey(family, slug, room);
}

const bad = (error) => Response.json({ error }, { status: 400 });

export async function GET(request, { params }) {
  const key = await keyFrom(params);
  if (!key) return bad("bad family, slug or room");
  const doc = await read(key);
  const v = new URL(request.url).searchParams.get("v");
  if (v != null && Number(v) === doc.version) return Response.json({ version: doc.version, unchanged: true });
  return Response.json(doc);
}

export async function PUT(request, { params }) {
  const key = await keyFrom(params);
  if (!key) return bad("bad family, slug or room");
  const body = await request.json().catch(() => null);
  if (!body || !("state" in body)) return bad("body must be { state }");
  return Response.json(await replace(key, body.state));
}

export async function PATCH(request, { params }) {
  const key = await keyFrom(params);
  if (!key) return bad("bad family, slug or room");
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.ops)) return bad("body must be { ops: [...] }");
  try {
    return Response.json(await apply(key, body.ops, body.init));
  } catch (error) {
    return bad(error.message);
  }
}

export async function DELETE(request, { params }) {
  const key = await keyFrom(params);
  if (!key) return bad("bad family, slug or room");
  return Response.json(await remove(key));
}
