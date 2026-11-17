import { layoutName, readLayout, writeLayout } from "../../../../../lib/ideas.mjs";

export const dynamic = "force-dynamic";

// GET  /api/ideas/layout/<name>  the saved arrangement (or {} if none yet)
// PUT  /api/ideas/layout/<name>  save the arrangement (JSON body) to _content/ideas/_layouts/<name>.json
// ?c=game-ideas reads and writes _content/game-ideas/_layouts/ instead.
// The app runs on the laptop, so this writes into the repo; commit the file to keep an arrangement.

export async function GET(request, { params }) {
  const name = layoutName((await params).name);
  if (!name) return Response.json({ error: "bad layout name" }, { status: 400 });
  return Response.json((await readLayout(name, new URL(request.url).searchParams.get("c"))) || {});
}

export async function PUT(request, { params }) {
  const name = layoutName((await params).name);
  if (!name) return Response.json({ error: "bad layout name" }, { status: 400 });
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "body must be JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "body must be an object" }, { status: 400 });
  return Response.json(await writeLayout(name, body, new URL(request.url).searchParams.get("c")));
}
