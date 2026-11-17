import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import { listGraphs } from "./graphs.mjs";
import "./learn.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Learn" };

// /learn: every learner's graph the game can find. Draft for TDM 155AI, not yet agreed with Marlon.
export default async function LearnPage() {
  const graphs = await listGraphs();
  return (
    <>
      <SiteHeader />
      <main id="main" className="lg-shell">
        <header className="lg-top">
          <p className="eyebrow">Learning harness · draft</p>
          <h1>Learn</h1>
          <p className="lg-deck">What you learn with Claude in a folder becomes a map you unlock by answering. Each idea rests on others; hold the ones underneath and the next ones open. Then practice what you have tried, and watch the map fill in.</p>
        </header>
        <ul className="lg-graphs">
          {graphs.map((g) => (
            <li key={g.slug} className="lg-graph-card">
              <p className="eyebrow">{g.origin}</p>
              <h2><Link href={`/learn/${g.slug}`}>{g.learner?.topic || g.slug}</Link></h2>
              {g.learner?.goalStatement && <p>{g.learner.goalStatement}</p>}
              <p className="muted"><code>{g.folder}</code></p>
            </li>
          ))}
        </ul>
        <section className="lg-howto">
          <h2>Play your own graph</h2>
          <p>Run the app with your harness folder named, and it shows as <strong>mine</strong>; your practice answers are added to its <code>graph/attempts.json</code>:</p>
          <pre>LEARN_GRAPH_DIR=/path/to/your-harness pnpm dev</pre>
          <p>How it's built and what to remix: <Link href="/learning/web">the web game notes</Link>. Setting up a class: <Link href="/learning/class">class setup</Link>.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
