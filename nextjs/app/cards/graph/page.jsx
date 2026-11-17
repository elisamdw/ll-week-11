import Link from "next/link";
import { buildGraph, convoluteGraph, graphStats } from "../../../lib/card-graph.mjs";
import { AUDIENCES, getCardGraph, graphData, KIND_HUES, KINDS, layoutName, LINK_KIND_HUES, LINK_KINDS, readLayout, shortText, STATUSES } from "../../../lib/cards.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Graph from "./Graph.jsx";
import "@xyflow/react/dist/style.css";
import "../../ideas/graph/graph.css";
import "./graph-cards.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Card graph" };

const ALL_KINDS = [...KINDS, ...LINK_KINDS];
const HUES = { ...KIND_HUES, ...LINK_KIND_HUES };

// /cards/graph: the cards as nodes clustered by convolute, follows as arrows, links as edges, shared tags as faint
// suggestions, and lenses for chains, the cards nothing points at, and the convolutes. ?name=stafford keeps a separate arrangement in _content/cards/_layouts/graph-stafford.json.
export default async function GraphPage({ searchParams }) {
  const raw = (await searchParams).name;
  const name = (Array.isArray(raw) ? raw[0] : raw)?.trim() || "";
  const file = name ? (/^[a-z0-9-]+$/.test(name) ? layoutName(`graph-${name}`) : null) : "graph";

  if (!file) {
    return (
      <div className="graph-page">
        <SiteHeader />
        <main id="main" className="graph-message">
          <p className="eyebrow">Card graph</p>
          <h1>That graph name won't work</h1>
          <p>Graph names use lowercase letters, digits, and hyphens (up to 35 characters), as in <code>/cards/graph?name=stafford</code>.</p>
          <p><Link href="/cards/graph">Open the main graph</Link></p>
        </main>
      </div>
    );
  }

  const [{ cards, outside, convolutes }, saved] = await Promise.all([getCardGraph(), readLayout(file)]);
  const { linkNodes, links } = graphData(cards, outside);
  const plain = cards.map(({ linksTo, linkedFrom, followedBy, followsCard, grows, ...c }) => ({ ...c, short: shortText(c.body) }));
  const groups = Object.fromEntries(convolutes.map((c) => [c.slug, c.title]));
  for (const c of cards) if (c.convolute && !(c.convolute in groups)) groups[c.convolute] = c.convolute;
  // The lenses (KG, Nov 16): the chains, the cards nothing points at, and the convolutes as a graph, from the same
  // builder as /cards/graph.json.
  const data = buildGraph({ cards: plain, convolutes, outside });
  const lenses = { chains: data.chains, nothing: graphStats(data).orphans.nothingPointsAt, convolutes: convoluteGraph(data) };
  return (
    <div className="graph-page cards-graph">
      <SiteHeader />
      <main id="main" className="graph-main">
        {cards.length === 0 ? (
          <div className="graph-message">
            <p className="eyebrow">Card graph</p>
            <h1>No cards yet</h1>
            <p>Cards are the Markdown files in <code>_content/cards/</code>.</p>
          </div>
        ) : (
          <Graph key={file} ideas={[...plain, ...linkNodes]} saved={saved} file={file} name={name} kinds={ALL_KINDS} hues={HUES} groups={groups} links={links} audiences={AUDIENCES} statuses={STATUSES} lenses={lenses} />
        )}
      </main>
    </div>
  );
}
