import Link from "next/link";
import { getIdeas, KIND_HUES, KINDS, layoutName, readLayout } from "../../../lib/ideas.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Board from "./Board.jsx";
import "./board.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Whiteboard" };

// /ideas/board saves to _layouts/board.json; /ideas/board?name=stafford saves to _layouts/board-stafford.json.
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
          <Link href="/ideas/board">Open the main board</Link>
        </main>
      </div>
    );
  }

  const [ideas, layout] = await Promise.all([getIdeas(), readLayout(name)]);
  return (
    <div className="board-page">
      <SiteHeader />
      <main id="main" className="board-main">
        <Board key={name} ideas={ideas} initialLayout={layout || {}} name={name} boardLabel={asked} kinds={KINDS} hues={KIND_HUES} />
      </main>
    </div>
  );
}
