import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import { FAMILIES, getPrototypes } from "./_shared/prototypes.mjs";
import "./_shared/proto.css";

// /proto: the playground. Every prototype by family, with its card's description and a link to play it.
// Cards are in _content/prototypes/<family>/<slug>.md; pages in app/proto/<family>/<slug>/.

export const dynamic = "force-dynamic";
export const metadata = { title: "Prototypes" };

export default async function ProtoIndex() {
  const protos = await getPrototypes();
  return (
    <>
      <SiteHeader />
      <main id="main" className="proto-index">
        <header className="proto-index-heading">
          <p className="eyebrow">Week 11 · playground · {protos.length} prototype{protos.length === 1 ? "" : "s"}</p>
          <h1>Prototypes of game mechanics</h1>
          <p className="proto-index-deck">
            Small playable examples of things we might put in a game, each showing one mechanic or two that interact, playable in a couple of minutes. Marlon, Nov 15: "I don't think I want one single game for right now. Instead I want some playable examples of things we MIGHT want to include in the game." Built by Claude panes as proposals. Phones join a room at the laptop's network address. The cards are in <code>_content/prototypes/</code>.
          </p>
        </header>
        {FAMILIES.map((family) => {
          const items = protos.filter((p) => p.family === family.id);
          return (
            <section key={family.id} className="proto-family" aria-labelledby={`fam-${family.id}`}>
              <div className="proto-family-head">
                <h2 id={`fam-${family.id}`}>{family.title}</h2>
                <p>{family.blurb}</p>
              </div>
              {items.length === 0 ? (
                <p className="empty-state">Coming soon.</p>
              ) : (
                <ul className="proto-list">
                  {items.map((p) => (
                    <li key={p.slug} className="proto-item">
                      <div className="proto-item-copy">
                        <strong>{p.title}</strong>
                        <span>{p.description}</span>
                        {p.mechanics.length > 0 && <span className="proto-tags">{p.mechanics.join(" · ")}</span>}
                      </div>
                      <div className="proto-item-links">
                        {p.playable ? <Link className="proto-play" href={p.route}>Play →</Link> : <span className="proto-soon">not playable yet</span>}
                        <Link href={p.card}>Card</Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
