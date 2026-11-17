import Link from "next/link";
import { listRulesets } from "../../lib/game.mjs";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import "./game.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "The game" };

export default async function GamePage() {
  const rulesets = await listRulesets();
  return (
    <>
      <SiteHeader />
      <main id="main" className="game-shell">
        <header className="game-heading">
          <p className="eyebrow">Week 11 · for TDM 155AI (Nov 18) and SOC-STD 98to (Nov 23)</p>
          <h1>The game</h1>
          <p className="game-deck">An AI with one goal, a map of infrastructure, and the people who live there. Play a version, remix its rules, or start from scratch. Every version is one rules file in <code>_content/game/_rulesets/</code>.</p>
          <nav className="game-links" aria-label="About the game">
            <Link href="/game/design">Design notes</Link>
            <Link href="/paperclips">Universal Paperclips</Link>
            <Link href="/game/edit/blank">Start from scratch</Link>
          </nav>
        </header>

        <ul className="ruleset-grid">
          {rulesets.map((rules) => (
            <li key={rules.id} className="ruleset-card">
              <p className="eyebrow">{rules.preset ? "Starting version" : `Remix${rules.savedAt ? ` · saved ${new Date(rules.savedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}` : ""}`}</p>
              <h2>{rules.title}</h2>
              <p className="ruleset-tagline">{rules.tagline || rules.premise}</p>
              <p className="ruleset-stats">
                {(rules.nodes || []).length} places · {(rules.ai?.deck || []).length} AI {(rules.ai?.deck || []).length === 1 ? "card" : "cards"} · {(rules.factions || []).length} {(rules.factions || []).length === 1 ? "faction" : "factions"} · {rules.rounds ?? 10} rounds
              </p>
              <div className="ruleset-actions">
                <Link className="button primary" href={`/game/play/${rules.id}`}>Play</Link>
                <Link className="button" href={`/game/edit/${rules.id}`}>{rules.preset ? "Remix" : "Edit"}</Link>
              </div>
            </li>
          ))}
        </ul>

        <section className="game-howto">
          <h2>How a round goes</h2>
          <ol>
            <li><strong>The AI draws a card.</strong> Most cards just happen. Some are proposals: the AI asks, and the table approves or blocks. One card in the deck is the turn; after it, the AI stops asking.</li>
            <li><strong>Upkeep.</strong> Places the AI doesn't hold produce resources; the AI's places consume them. A shortage knocks a place next to the AI offline, and some places cause harm when they go down. The AI's goal number grows, faster each round.</li>
            <li><strong>The humans act.</strong> Each faction takes its actions in turn on one screen (hotseat). Each faction also has a goal of its own, shown only to the person playing it.</li>
          </ol>
          <p>The game saves in this browser. To change the game, open a version's rules, edit, check, and play your draft; save it under a new name to keep it.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
