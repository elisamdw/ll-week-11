import Link from "next/link";
import { OPS, TARGETS } from "../../../../lib/game-engine.mjs";
import { readRuleset, rulesetName } from "../../../../lib/game.mjs";
import { SiteHeader } from "../../../components/Chrome.jsx";
import Editor from "./Editor.jsx";
import "../../game.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit the rules" };

// /game/edit/<ruleset> opens a version's rules; /game/edit/draft reopens the unsaved draft kept in the browser.
export default async function EditPage({ params }) {
  const id = (await params).id;
  const rules = id === "draft" ? null : rulesetName(id) && (await readRuleset(id));
  if (id !== "draft" && !rules) {
    return (
      <>
        <SiteHeader />
        <main id="main" className="game-shell">
          <h1>No version called “{id}”</h1>
          <Link href="/game">See the versions</Link>
        </main>
      </>
    );
  }
  return (
    <>
      <SiteHeader />
      <main id="main" className="edit-shell">
        <Editor id={id} initialRules={rules} ops={OPS} targets={TARGETS} />
      </main>
    </>
  );
}
