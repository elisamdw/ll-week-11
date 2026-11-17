import { graphStats } from "../../../lib/card-graph.mjs";
import { getGraphData } from "../../../lib/cards.mjs";

export const dynamic = "force-dynamic";

// GET /cards/graph.json  the card graph as data (lib/card-graph.mjs; the shape is in _content/cards/graph.md, option 1),
// built from the cards' frontmatter on every request, so it is never stale and nothing is saved.
// ?counts=1 adds the counts graph.md reports. `node scripts/graph-stats.mjs --graph` prints the same without the app.
export async function GET(request) {
  const graph = await getGraphData();
  const counts = new URL(request.url).searchParams.get("counts");
  return Response.json(counts ? { ...graph, counts: graphStats(graph) } : graph);
}
