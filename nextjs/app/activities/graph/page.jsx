import Link from "next/link";
import { ACTIVITY_KIND_HUES, ACTIVITY_KINDS, AUDIENCE_LABELS, GROUP_LABELS, getCards, getGraphData, layoutName, LINK_KIND_HUES, LINK_KINDS, readLayout } from "../cards.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Graph from "../../ideas/graph/Graph.jsx";
import "@xyflow/react/dist/style.css";
import "../../ideas/graph/graph.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activity graph" };

const KINDS = [...ACTIVITY_KINDS, ...LINK_KINDS];
const HUES = { ...ACTIVITY_KIND_HUES, ...LINK_KIND_HUES };
const FOLDERS = { tdm155ai: GROUP_LABELS.tdm155ai, stafford: GROUP_LABELS.stafford, llufs: GROUP_LABELS.llufs, shared: GROUP_LABELS.shared };

// /activities/graph: the /ideas node graph over _content/activities/, clustered by folder, with the links the cards
// carry (mechanics, readings, prototypes, ideas, a session's sequence) drawn from their frontmatter.
// ?name=tdm155ai keeps a separate arrangement in _content/activities/_layouts/graph-tdm155ai.json: a session plan.
export default async function GraphPage({ searchParams }) {
  const raw = (await searchParams).name;
  const name = (Array.isArray(raw) ? raw[0] : raw)?.trim() || "";
  const file = name ? (/^[a-z0-9-]+$/.test(name) ? layoutName(`graph-${name}`) : null) : "graph";

  if (!file) {
    return (
      <div className="graph-page">
        <SiteHeader />
        <main id="main" className="graph-message">
          <p className="eyebrow">Activity graph</p>
          <h1>That graph name won't work</h1>
          <p>Graph names use lowercase letters, digits, and hyphens (up to 35 characters), as in <code>/activities/graph?name=tdm155ai</code>.</p>
          <p><Link href="/activities/graph">Open the main graph</Link></p>
        </main>
      </div>
    );
  }

  const [cards, saved] = await Promise.all([getCards(), readLayout(file)]);
  const { linkNodes, links } = await getGraphData(cards);
  return (
    <div className="graph-page">
      <SiteHeader />
      <main id="main" className="graph-main">
        {cards.length === 0 ? (
          <div className="graph-message">
            <p className="eyebrow">Activity graph</p>
            <h1>No cards yet</h1>
            <p>Cards are the Markdown files in <code>_content/activities/</code> and its folders.</p>
          </div>
        ) : (
          <Graph key={file} ideas={[...cards, ...linkNodes]} saved={saved} file={file} name={name} kinds={KINDS} hues={HUES} groups={FOLDERS} links={links} audiences={Object.entries(AUDIENCE_LABELS)} />
        )}
      </main>
    </div>
  );
}
