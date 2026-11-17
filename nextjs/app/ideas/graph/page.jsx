import Link from "next/link";
import { getIdeas, KIND_HUES, KINDS, layoutName, readLayout } from "../../../lib/ideas.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Graph from "./Graph.jsx";
import "@xyflow/react/dist/style.css";
import "./graph.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Idea graph" };

// /ideas/graph: the cards as a node graph. ?name=stafford keeps a separate arrangement in _layouts/graph-stafford.json.
export default async function GraphPage({ searchParams }) {
  const raw = (await searchParams).name;
  const name = (Array.isArray(raw) ? raw[0] : raw)?.trim() || "";
  const file = name ? (/^[a-z0-9-]+$/.test(name) ? layoutName(`graph-${name}`) : null) : "graph";

  if (!file) {
    return (
      <div className="graph-page">
        <SiteHeader />
        <main id="main" className="graph-message">
          <p className="eyebrow">Idea graph</p>
          <h1>That graph name won't work</h1>
          <p>Graph names use lowercase letters, digits, and hyphens (up to 35 characters), as in <code>/ideas/graph?name=stafford</code>.</p>
          <p><Link href="/ideas/graph">Open the main graph</Link></p>
        </main>
      </div>
    );
  }

  const [ideas, saved] = await Promise.all([getIdeas(), readLayout(file)]);
  return (
    <div className="graph-page">
      <SiteHeader />
      <main id="main" className="graph-main">
        {ideas.length === 0 ? (
          <div className="graph-message">
            <p className="eyebrow">Idea graph</p>
            <h1>No cards yet</h1>
            <p>Cards are the Markdown files in <code>_content/ideas/</code>.</p>
          </div>
        ) : (
          <Graph key={file} ideas={ideas} saved={saved} file={file} name={name} kinds={KINDS} hues={KIND_HUES} />
        )}
      </main>
    </div>
  );
}
