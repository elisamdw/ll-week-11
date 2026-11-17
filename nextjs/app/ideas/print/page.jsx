import Link from "next/link";
import { getIdeas, KIND_HUES } from "../../../lib/ideas.mjs";
import "../ideas.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Print the idea cards" };

// /ideas/print: cut-out cards on Letter paper, black ink with a thin kind-colored edge, dashed cut lines.
//   ?per=4|6|8   cards per sheet (default 6)
//   ?week=11     only one week's cards; ?tag=games, ?kind=build likewise
//   ?quote=1     add Marlon's words under the description
const SIZES = { 4: [2, 2], 6: [2, 3], 8: [2, 4] };

function stripQuote(body) {
  // The card body is a blockquote and an attribution line; keep the quoted words only.
  return body
    .split("\n")
    .filter((line) => line.startsWith(">"))
    .map((line) => line.replace(/^>\s?/, ""))
    .join(" ")
    .trim();
}

export default async function PrintIdeas({ searchParams }) {
  const sp = await searchParams;
  const per = SIZES[sp.per] ? Number(sp.per) : 6;
  const [cols, rows] = SIZES[per];
  const quote = sp.quote === "1";
  const ideas = (await getIdeas()).filter((i) => (!sp.week || i.week === sp.week) && (!sp.tag || i.tags.includes(sp.tag)) && (!sp.kind || i.kind === sp.kind));
  const sheets = [];
  for (let i = 0; i < ideas.length; i += per) sheets.push(ideas.slice(i, i + per));
  const link = (changes) => `/ideas/print?${new URLSearchParams({ ...sp, ...changes }).toString()}`;

  return (
    <div className="print-root idea-print">
      <header className="print-bar idea-print-bar">
        <span>Learning Lab week 11 · ideas · {ideas.length} cards on {sheets.length} sheets · Letter, scale 100%, no margins added</span>
        <span>
          {Object.keys(SIZES).map((n) => <Link key={n} href={link({ per: n })} aria-current={Number(n) === per ? "true" : undefined}>{n} per sheet</Link>)}
          <Link href={link({ quote: quote ? "0" : "1" })}>{quote ? "Hide his words" : "Show his words"}</Link>
          <span>⌘P to print</span>
        </span>
      </header>
      {sheets.map((sheet, s) => (
        <section className="idea-sheet" key={s} style={{ "--cols": cols, "--rows": rows }}>
          {sheet.map((idea) => (
            <article className={`idea-cut per-${per}`} key={idea.slug} style={{ "--hue": KIND_HUES[idea.kind] ?? 0 }}>
              <p className="idea-cut-meta">
                <span>{idea.kind || "idea"}</span>
                <span>{/^\d+$/.test(idea.week) ? `Week ${idea.week}` : idea.week}</span>
              </p>
              <h2>{idea.title}</h2>
              {idea.description && <p className="idea-cut-desc">{idea.description}</p>}
              {quote && stripQuote(idea.body) && <blockquote>{stripQuote(idea.body)}</blockquote>}
              <p className="idea-cut-foot">
                <span>{idea.tags.map((t) => `#${t}`).join(" ")}</span>
                <span>{idea.date}</span>
              </p>
            </article>
          ))}
        </section>
      ))}
      {ideas.length === 0 && <p className="print-hint" style={{ padding: 24 }}>No idea cards yet. Add Markdown files to <code>_content/ideas/</code>.</p>}
    </div>
  );
}
