import { SiteHeader } from "../../../components/Chrome.jsx";
import PhoneAi from "./PhoneAi.jsx";
import "../players.css";

export const metadata = { title: "The phone plays the AI" };

// /proto/players/the-phone-plays-the-ai: one device is the AI's seat, beside a paper map or on the projector.
export default function PhonePlaysTheAiPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>The phone plays the AI</h1>
          <p className="pi-deck">The table plays the humans; this device plays the AI, a player nobody at the table controls. Each round the table guards a place or cuts a link and taps it in. Then the AI draws a card, decides where it spreads by a rule you can read, and tells you where to put its token.</p>
        </header>
        <PhoneAi />
        <p className="pi-foot muted">Card: <code>_content/prototypes/players/the-phone-plays-the-ai.md</code>. The AI's deck, rules, map and tuning: <code>nextjs/app/proto/players/the-phone-plays-the-ai/rules.js</code>. The AI is a written rule, not a model call; the voice is the browser's own speech.</p>
      </main>
    </>
  );
}
