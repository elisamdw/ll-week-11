import { appendAttempts, graphSlug } from "../../graphs.mjs";

export const dynamic = "force-dynamic";

// POST /learn/<graph>/attempts  append practice answers (a JSON array) to graph/attempts.json.
// Only "mine", the student's own folder set by LEARN_GRAPH_DIR, is written; the app runs on their laptop.

export async function POST(request, { params }) {
  const slug = graphSlug((await params).graph);
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "body must be JSON" }, { status: 400 });
  }
  if (!Array.isArray(body)) return Response.json({ error: "body must be an array of attempts" }, { status: 400 });
  const result = await appendAttempts(slug, body);
  return Response.json(result, { status: result.error ? 403 : 200 });
}
