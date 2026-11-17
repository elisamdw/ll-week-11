import { layoutName, readLayout, writeLayout } from "../../../../../lib/cards.mjs";

export const dynamic = "force-dynamic";

// GET  /cards/api/layout/<name>  the saved arrangement (or {} if none yet)
// PUT  /cards/api/layout/<name>  save the arrangement (JSON body) to _content/cards/_layouts/<name>.json
// The app runs on the laptop, so this writes into the repo.

export async function GET(_request, { params }) {
  const name = layoutName((await params).name);
  if (!name) return Response.json({ error: "bad layout name" }, { status: 400 });
  return Response.json((await readLayout(name)) || {});
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
  return Response.json(await writeLayout(name, body));
}
