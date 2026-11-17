import Link from "next/link";
import { GAME_KIND_HUES as KIND_HUES, GAME_KINDS as KINDS, getIdeas, layoutName, readLayout } from "../../../lib/ideas.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Graph from "../../ideas/graph/Graph.jsx";
import "@xyflow/react/dist/style.css";
import "../../ideas/graph/graph.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Game idea graph" };

// /game-ideas/graph: the /ideas node graph over _content/game-ideas/; ?name=nfc keeps a separate arrangement in _content/game-ideas/_layouts/graph-nfc.json.
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
          <p>Graph names use lowercase letters, digits, and hyphens (up to 35 characters), as in <code>/game-ideas/graph?name=nfc</code>.</p>
          <p><Link href="/game-ideas/graph">Open the main graph</Link></p>
        </main>
      </div>
    );
  }

  const [ideas, saved] = await Promise.all([getIdeas("game-ideas"), readLayout(file, "game-ideas")]);
  return (
    <div className="graph-page">
      <SiteHeader />
      <main id="main" className="graph-main">
        {ideas.length === 0 ? (
          <div className="graph-message">
            <p className="eyebrow">Idea graph</p>
            <h1>No cards yet</h1>
            <p>Cards are the Markdown files in <code>_content/game-ideas/</code>.</p>
          </div>
        ) : (
          <Graph key={file} ideas={ideas} saved={saved} file={file} name={name} kinds={KINDS} hues={KIND_HUES} />
        )}
      </main>
    </div>
  );
}
