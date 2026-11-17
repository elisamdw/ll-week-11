import Link from "next/link";
import { ACTIVITY_KIND_HUES, ACTIVITY_KINDS, AUDIENCE_LABELS, GROUP_LABELS, getCards } from "./cards.mjs";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import IdeasBrowser from "../ideas/IdeasBrowser.jsx";
import "../ideas/ideas.css";

// /activities: research, idea, activity and session cards for week 11's three audiences (_content/activities/, Nov 15),
// in the same views as /ideas, one section per folder (tdm155ai/, stafford/, llufs/, shared/).

export const dynamic = "force-dynamic";
export const metadata = { title: "Activities" };

const FOLDERS = { tdm155ai: GROUP_LABELS.tdm155ai, stafford: GROUP_LABELS.stafford, llufs: GROUP_LABELS.llufs, shared: GROUP_LABELS.shared };

export default async function ActivitiesPage() {
  const cards = await getCards("activities");
  return (
    <>
      <SiteHeader />
      <main id="main" className="ideas-shell">
        <header className="ideas-heading">
          <p className="eyebrow">Week 11 · activities · {cards.length} cards</p>
          <h1>Activities</h1>
          <p className="ideas-deck">Research, ideas, activities and session plans for three audiences this week: TDM 155AI (Wednesday Nov 18), William Stafford's SOC-STD 98to workshop (Monday Nov 23), and the LLUFs in the studio. Claude's proposals unless a card says Marlon agreed. <Link href="/activities/map">The cross-audience map</Link>. The files are in <code>_content/activities/</code>.</p>
          <nav className="ideas-views" aria-label="Views">
            <Link href="/activities/print">Print the cards</Link>
            <Link href="/activities/board">Whiteboard</Link>
            <Link href="/activities/graph">Graph</Link>
          </nav>
        </header>
        <IdeasBrowser ideas={cards} startHere={[]} kinds={ACTIVITY_KINDS} hues={ACTIVITY_KIND_HUES} groups={FOLDERS} audiences={Object.entries(AUDIENCE_LABELS)} />
      </main>
      <SiteFooter />
    </>
  );
}
