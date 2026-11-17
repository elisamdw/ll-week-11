import Link from "next/link";
import { GAME_KIND_HUES as KIND_HUES, GAME_KINDS as KINDS, getIdeas, layoutName, readLayout } from "../../../lib/ideas.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Board from "../../ideas/board/Board.jsx";
import "../../ideas/board/board.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Whiteboard" };

// /game-ideas/board (the /ideas whiteboard over _content/game-ideas/) saves to _content/game-ideas/_layouts/board.json; ?name=nfc to board-nfc.json.
export default async function BoardPage({ searchParams }) {
  const raw = (await searchParams).name;
  const asked = String((Array.isArray(raw) ? raw[0] : raw) || "").trim().replace(/^board(-|$)/, "");
  const name = asked ? layoutName(`board-${asked}`) : "board";

  if (!name) {
    return (
      <div className="board-page">
        <SiteHeader />
        <main id="main" className="board-bad-name">
          <p className="eyebrow">Whiteboard</p>
          <h1>That board name won't work</h1>
          <p>Board names use lowercase letters, digits, and hyphens (up to 35 characters), for example <code>?name=stafford</code>.</p>
          <Link href="/game-ideas/board">Open the main board</Link>
        </main>
      </div>
    );
  }

  const [ideas, layout] = await Promise.all([getIdeas("game-ideas"), readLayout(name, "game-ideas")]);
  return (
    <div className="board-page">
      <SiteHeader />
      <main id="main" className="board-main">
        <Board key={name} ideas={ideas} initialLayout={layout || {}} name={name} boardLabel={asked} kinds={KINDS} hues={KIND_HUES} />
      </main>
    </div>
  );
}
