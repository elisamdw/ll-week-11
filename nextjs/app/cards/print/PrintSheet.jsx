import Link from "next/link";
import { AUDIENCES, KINDS, shortText, STATUSES, VOICES } from "../../../lib/cards.mjs";
import CardBody from "../CardBody.jsx";
import Sheets from "./Sheets.jsx";
import "./print.css";

// The printed sheet: cards one after another down two 5.5-inch columns of an 11 x 17 portrait sheet (or, with
// ?paper=letter, two 4.25-inch columns of an 8.5 x 11 sheet), with the bar of filters above it on screen (a plain GET
// form, so the filters stay in the URL). Type sizes and margins are at the top of print.css.
export const PAPERS = { "": { label: "11 x 17", hint: "paper 11 x 17 (Tabloid)" }, letter: { label: "Letter", hint: "paper Letter (8.5 x 11)" } };
export const paperOf = (sp = {}) => ((Array.isArray(sp.paper) ? sp.paper[0] : sp.paper) === "letter" ? "letter" : "");
// ?form=short prints each card's title, description, its blockquotes with their attribution lines, and the foot, so
// the printed card points back to its full text at /cards/<slug>.
// ?form=index is the printed overview: one block per convolute (letter, title, sentence), then each card's title and
// description.
export const FORMS = { "": "Full", short: "Short", index: "Index" };
export const formOf = (sp = {}) => {
  const f = Array.isArray(sp.form) ? sp.form[0] : sp.form;
  return f in FORMS ? f : "";
};
const FormSelect = ({ form }) => (
  <select name="form" defaultValue={form} aria-label="Form">
    {Object.entries(FORMS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
  </select>
);
export default function PrintSheet({ cards, all, convolutes, sp = {}, one = false }) {
  const paper = paperOf(sp);
  const form = formOf(sp);
  const keep = new URLSearchParams(Object.entries({ paper, form }).filter(([, v]) => v)).toString();
  const withPaper = (href) => (keep ? `${href}${href.includes("?") ? "&" : "?"}${keep}` : href);
  const titles = Object.fromEntries(all.map((c) => [c.slug, c.title]));
  // The foot names the convolute by its letter and title, so a cut card can find its way back to its pile.
  const convTitle = Object.fromEntries(convolutes.map((c) => [c.slug, [c.letter, c.title].filter(Boolean).join(" · ")]));
  const tags = [...new Set(all.flatMap((c) => c.tags))].sort();
  const pick = (k) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) || "";
  return (
    <div className={`print-root cards-print${paper ? ` is-${paper}` : ""}${form ? ` is-${form}` : ""}`}>
      <header className="cards-print-bar">
        <Link href="/cards">← Cards</Link>
        {one ? (
          <>
            <Link href={withPaper("/cards/print")}>All cards</Link>
            <form>
              <select name="paper" defaultValue={paper} aria-label="Paper">
                {Object.entries(PAPERS).map(([v, p]) => <option key={v} value={v}>{p.label}</option>)}
              </select>
              <FormSelect form={form} />
              <button type="submit">Show</button>
            </form>
          </>
        ) : (
          <form action="/cards/print">
            <select name="paper" defaultValue={paper} aria-label="Paper">
              {Object.entries(PAPERS).map(([v, p]) => <option key={v} value={v}>{p.label}</option>)}
            </select>
            <FormSelect form={form} />
            <select name="convolute" defaultValue={pick("convolute")} aria-label="Convolute">
              <option value="">All convolutes</option>
              {convolutes.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
            <select name="kind" defaultValue={pick("kind")} aria-label="Kind">
              <option value="">All kinds</option>
              {KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select name="tag" defaultValue={pick("tag")} aria-label="Tag">
              <option value="">All tags</option>
              {tags.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select name="status" defaultValue={pick("status")} aria-label="Status">
              <option value="">Any status</option>
              {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select name="audience" defaultValue={pick("audience")} aria-label="Audience">
              <option value="">All audiences</option>
              {AUDIENCES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select name="voice" defaultValue={pick("voice")} aria-label="Voice">
              <option value="">Any voice</option>
              {VOICES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            {pick("set") ? <input type="hidden" name="set" value={pick("set")} /> : <input name="cards" defaultValue={pick("cards")} placeholder="or slugs: a,b,c" aria-label="A chosen set of cards, by slug, in order" />}
            {pick("set") && <span>set “{pick("set")}” (<Link href={`/cards?set=${pick("set")}`}>edit</Link>)</span>}
            <button type="submit">Show</button>
            <Link href={withPaper("/cards/print")}>Clear</Link>
          </form>
        )}
        <span className="cards-print-count">{cards.length} card{cards.length === 1 ? "" : "s"}</span>
        <span className="cards-print-hint">⌘P · {PAPERS[paper].hint}, portrait · margins Default or None · scale 100%</span>
      </header>
      {cards.length && form === "index" ? (
        <main id="main" className="cards-sheet">
          {pick("set") && (
            // A print set's index names the set, so the cut cards can be found again and the set printed again.
            <header className="cards-index cards-index-set">
              <h2>Print set “{pick("set")}”</h2>
              <p>{cards.length} card{cards.length === 1 ? "" : "s"}, printed {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" })}</p>
              <p className="cards-index-slug">/cards/print?set={pick("set")} · edit at /cards?set={pick("set")}</p>
            </header>
          )}
          {[...new Set(cards.map((c) => c.convolute))].map((slug) => {
            const v = convolutes.find((x) => x.slug === slug);
            const items = cards.filter((c) => c.convolute === slug);
            return (
              <section className="cards-index" key={slug || "none"}>
                <header className="cards-index-head">
                  <h2>{v?.letter && <span className="cards-index-letter">{v.letter}</span>}{v?.title || slug || "No convolute"}</h2>
                  {v?.description && <CardBody body={v.description} className="cards-index-sentence" />}
                  <p className="cards-index-count">{items.length} card{items.length === 1 ? "" : "s"}</p>
                </header>
                {items.map((c) => (
                  <article className="cards-index-card" key={c.slug}>
                    <h3>{c.title}</h3>
                    {c.description && <p>{c.description}</p>}
                    <p className="cards-index-slug">{[c.kind, `/cards/${c.slug}`].filter(Boolean).join(" · ")}</p>
                  </article>
                ))}
              </section>
            );
          })}
        </main>
      ) : cards.length ? (
        <Sheets className={`cards-sheet${one ? " is-one" : ""}`} paperLabel={PAPERS[paper].label}>
          {cards.map((c) => (
            <article className="cards-card" key={c.slug}>
              <h2>{c.title}</h2>
              {c.description && <p className="cards-card-desc">{c.description}</p>}
              {form === "short" ? (
                shortText(c.body) && <CardBody body={shortText(c.body)} titles={titles} className={`cards-card-body${c.abstract ? " cards-card-abstract is-short" : ""}`} />
              ) : (
                <>
                  {c.abstract && <CardBody body={c.abstract} titles={titles} className="cards-card-body cards-card-abstract" />}
                  {c.main && <CardBody body={c.main} titles={titles} className="cards-card-body" />}
                </>
              )}
              <p className="cards-card-foot">
                {c.kind && <span className="is-kind">{c.kind}</span>}
                {c.convolute && <span>{convTitle[c.convolute] || c.convolute}</span>}
                {c.follows && <span>after {titles[c.follows] || c.follows}</span>}
                {c.tags.length > 0 && <span className="is-tags">{c.tags.map((t) => `#${t}`).join(" ")}</span>}
                <span className="is-slug">/cards/{c.slug}</span>
              </p>
            </article>
          ))}
        </Sheets>
      ) : (
        <p className="cards-print-empty">No cards match. Cards are the Markdown files in <code>_content/cards/</code>.</p>
      )}
    </div>
  );
}
