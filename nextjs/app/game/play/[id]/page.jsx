import Link from "next/link";
import { readRuleset, rulesetName } from "../../../../lib/game.mjs";
import { SiteHeader } from "../../../components/Chrome.jsx";
import Play from "./Play.jsx";
import "../../game.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Play" };

// /game/play/<ruleset> plays a saved version; /game/play/draft plays the editor's unsaved draft (kept in the browser).
export default async function PlayPage({ params }) {
  const id = (await params).id;
  const rules = id === "draft" ? null : rulesetName(id) && (await readRuleset(id));
  if (id !== "draft" && !rules) {
    return (
      <>
        <SiteHeader />
        <main id="main" className="game-shell">
          <p className="eyebrow">The game</p>
          <h1>No version called “{id}”</h1>
          <Link href="/game">See the versions</Link>
        </main>
      </>
    );
  }
  return (
    <>
      <SiteHeader />
      <main id="main" className="play-shell">
        <Play id={id} initialRules={rules} />
      </main>
    </>
  );
}
