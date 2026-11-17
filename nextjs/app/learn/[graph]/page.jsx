import Link from "next/link";
import { SiteHeader } from "../../components/Chrome.jsx";
import Game from "../Game.jsx";
import { readGraph } from "../graphs.mjs";
import "../learn.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Learn" };

// /learn/<graph>: one learner's graph as a game. "mine" is the folder in LEARN_GRAPH_DIR; others are examples.
export default async function LearnGraphPage({ params }) {
  const graph = await readGraph((await params).graph);
  if (!graph) {
    return (
      <>
        <SiteHeader />
        <main id="main" className="lg-shell">
          <p className="eyebrow">Learn</p>
          <h1>No graph by that name</h1>
          <Link href="/learn">See the graphs</Link>
        </main>
      </>
    );
  }
  return (
    <>
      <SiteHeader />
      <main id="main" className="lg-shell">
        <header className="lg-top">
          <p className="eyebrow"><Link href="/learn">Learn</Link> · {graph.origin}</p>
          <h1>{graph.learner.topic || graph.slug}</h1>
          {graph.learner.goalStatement && <p className="lg-deck">Goal: {graph.learner.goalStatement}</p>}
        </header>
        {graph.problems.length > 0 && (
          <div className="lg-problems">
            <p><strong>The graph has {graph.problems.length === 1 ? "a problem" : `${graph.problems.length} problems`}.</strong> Paste this into Claude in your harness folder and ask it to fix the files:</p>
            <ul>{graph.problems.map((p) => <li key={p}><code>{p}</code></li>)}</ul>
          </div>
        )}
        {graph.propositions.length === 0 ? (
          <p className="muted">No propositions yet. Learn something in the harness first: its ideas land in <code>graph/propositions.json</code>.</p>
        ) : (
          <Game graph={graph} />
        )}
        <p className="lg-foot muted">From <code>{graph.folder}</code>: {graph.propositions.length} ideas, {graph.chains.length} reasoning steps, {graph.sessions.length} sessions, {graph.attempts.length} answers in the folder. Format: <Link href="/learning/format">the learner&apos;s graph</Link>. Code: <code>nextjs/app/learn/</code>.</p>
      </main>
    </>
  );
}
