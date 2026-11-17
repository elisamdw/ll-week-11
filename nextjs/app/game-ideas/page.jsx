import Link from "next/link";
import { GAME_KIND_HUES, GAME_KINDS, getIdeas, getStartHere } from "../../lib/ideas.mjs";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import IdeasBrowser from "../ideas/IdeasBrowser.jsx";
import "../ideas/ideas.css";

// /game-ideas: game idea cards in _content/game-ideas/, in the same views as /ideas (lib/ideas.mjs, "game-ideas").

export const dynamic = "force-dynamic";
export const metadata = { title: "Game ideas" };

export default async function GameIdeasPage() {
  const [ideas, startHere] = await Promise.all([getIdeas("game-ideas"), getStartHere("game-ideas")]);
  return (
    <>
      <SiteHeader />
      <main id="main" className="ideas-shell">
        <header className="ideas-heading">
          <p className="eyebrow">Week 11 · game ideas · {ideas.length} cards</p>
          <h1>Game ideas</h1>
          <p className="ideas-deck">Ideas for games and game mechanics to think with, one per card: NFC, the tabletop and the phone, and AR/XR through a phone. Claude's proposals from Marlon's prompts, not his words; his own ideas are in <Link href="/ideas">Ideas</Link>. The files are in <code>_content/game-ideas/</code>.</p>
          <nav className="ideas-views" aria-label="Views">
            <Link href="/game-ideas/print">Print the cards</Link>
            <Link href="/game-ideas/board">Whiteboard</Link>
            <Link href="/game-ideas/graph">Graph</Link>
          </nav>
        </header>
        <IdeasBrowser ideas={ideas} startHere={startHere} kinds={GAME_KINDS} hues={GAME_KIND_HUES} />
      </main>
      <SiteFooter />
    </>
  );
}
