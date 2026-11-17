import Link from "next/link";
import { getIdeas, getStartHere, KIND_HUES, KINDS } from "../../lib/ideas.mjs";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import IdeasBrowser from "./IdeasBrowser.jsx";
import "./ideas.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ideas" };

export default async function IdeasPage() {
  const [ideas, startHere] = await Promise.all([getIdeas(), getStartHere()]);
  return (
    <>
      <SiteHeader />
      <main id="main" className="ideas-shell">
        <header className="ideas-heading">
          <p className="eyebrow">Week 11 brainstorm · {ideas.length} cards</p>
          <h1>Ideas</h1>
          <p className="ideas-deck">Marlon's ideas, one per card, each with his words and where they came from. The files are in <code>_content/ideas/</code>.</p>
          <nav className="ideas-views" aria-label="Views">
            <Link href="/ideas/print">Print the cards</Link>
            <Link href="/ideas/board">Whiteboard</Link>
            <Link href="/ideas/graph">Graph</Link>
          </nav>
        </header>
        <IdeasBrowser ideas={ideas} startHere={startHere} kinds={KINDS} hues={KIND_HUES} />
      </main>
      <SiteFooter />
    </>
  );
}
