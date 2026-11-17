import Link from "next/link";
import { convoluteOrder, getCardGraph, KIND_HUES, KINDS, layoutName, readLayout, shortText } from "../../../lib/cards.mjs";
import { SiteHeader } from "../../components/Chrome.jsx";
import Board from "./Board.jsx";
import "../../ideas/board/board.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Card board" };

// /cards/board: the cards to drag, group and arrange; saves to _content/cards/_layouts/board.json, ?name=stafford to
// board-stafford.json (a separate arrangement, for a session or a print set).
export default async function BoardPage({ searchParams }) {
  const raw = (await searchParams).name;
  const asked = String((Array.isArray(raw) ? raw[0] : raw) || "").trim().replace(/^board(-|$)/, "");
  const name = asked ? layoutName(`board-${asked}`) : "board";

  if (!name) {
    return (
      <div className="board-page">
        <SiteHeader />
        <main id="main" className="board-bad-name">
          <p className="eyebrow">Card board</p>
          <h1>That board name won't work</h1>
          <p>Board names use lowercase letters, digits, and hyphens (up to 35 characters), for example <code>?name=stafford</code>.</p>
          <Link href="/cards/board">Open the main board</Link>
        </main>
      </div>
    );
  }

  const [{ cards, convolutes }, layout] = await Promise.all([getCardGraph(), readLayout(name)]);
  // In reading order (convolutes.md, then each convolute's chains), with only the plain fields.
  const rank = new Map(convolutes.map((c, i) => [c.slug, i]));
  const order = [...new Set(cards.map((c) => c.convolute))].sort((a, b) => (rank.get(a) ?? Infinity) - (rank.get(b) ?? Infinity) || a.localeCompare(b));
  const plain = order.flatMap((v) => convoluteOrder(cards.filter((c) => c.convolute === v)).map((x) => x.card)).map(({ linksTo, linkedFrom, followedBy, followsCard, grows, ...c }) => ({ ...c, short: shortText(c.body) }));
  return (
    <div className="board-page">
      <SiteHeader />
      <main id="main" className="board-main">
        <Board key={name} ideas={plain} initialLayout={layout || {}} name={name} boardLabel={asked} kinds={KINDS} hues={KIND_HUES} convolutes={convolutes.map((c) => [c.slug, c.title])} />
      </main>
    </div>
  );
}
