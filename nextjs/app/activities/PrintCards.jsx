import Link from "next/link";
import "../ideas/ideas.css";

// Cut-out cards on Letter paper for /activities/print and /prototypes/print (from /ideas/print): black ink, a thin
// kind-colored edge, dashed cut lines.
//   ?per=4|6|8                     cards per sheet (default 6)
//   ?group=tdm155ai, ?audience=stafford, ?kind=activity   only those cards
//   ?try=1                         add the card's "Try it" line under the description
const SIZES = { 4: [2, 2], 6: [2, 3], 8: [2, 4] };

function tryLine(body) {
  const line = body.split("\n").find((l) => /^\*\*Try it\b/i.test(l.trim()));
  return line ? line.replace(/^\s*\*\*Try it[^*]*\*\*:?\s*/i, "").replace(/\*\*?|`/g, "").trim() : "";
}

export default function PrintCards({ cards, sp, base, label, hues, groups }) {
  const per = SIZES[sp.per] ? Number(sp.per) : 6;
  const [cols, rows] = SIZES[per];
  const showTry = sp.try === "1";
  const shown = cards.filter((c) => (!sp.group || c.group === sp.group) && (!sp.audience || c.audience.includes(sp.audience)) && (!sp.kind || c.kind === sp.kind));
  const sheets = [];
  for (let i = 0; i < shown.length; i += per) sheets.push(shown.slice(i, i + per));
  const link = (changes) => `${base}/print?${new URLSearchParams({ ...sp, ...changes }).toString()}`;

  return (
    <div className="print-root idea-print">
      <header className="print-bar idea-print-bar">
        <span>Learning Lab week 11 · {label.toLowerCase()} · {shown.length} cards on {sheets.length} sheets · Letter, scale 100%, no margins added</span>
        <span>
          {Object.keys(SIZES).map((n) => <Link key={n} href={link({ per: n })} aria-current={Number(n) === per ? "true" : undefined}>{n} per sheet</Link>)}
          {Object.keys(groups).map((g) => <Link key={g} href={link({ group: sp.group === g ? "" : g })} aria-current={sp.group === g ? "true" : undefined}>{g}</Link>)}
          <Link href={link({ try: showTry ? "0" : "1" })}>{showTry ? "Hide Try it" : "Show Try it"}</Link>
          <span>⌘P to print</span>
        </span>
      </header>
      {sheets.map((sheet, s) => (
        <section className="idea-sheet" key={s} style={{ "--cols": cols, "--rows": rows }}>
          {sheet.map((card) => (
            <article className={`idea-cut per-${per}`} key={card.slug} style={{ "--hue": hues[card.kind] ?? 0 }}>
              <p className="idea-cut-meta">
                <span>{card.kind || "card"}</span>
                <span>{[card.audience.join(" · "), card.duration && `${card.duration} min`, card.size].filter(Boolean).join(" · ") || groups[card.group] || card.group}</span>
              </p>
              <h2>{card.title}</h2>
              {card.description && <p className="idea-cut-desc">{card.description}</p>}
              {showTry && tryLine(card.body) && <blockquote>{tryLine(card.body)}</blockquote>}
              <p className="idea-cut-foot">
                <span>{card.mechanics.length ? card.mechanics.slice(0, 3).join(" · ") : card.tags.map((t) => `#${t}`).join(" ")}</span>
                <span>{card.slug}</span>
              </p>
            </article>
          ))}
        </section>
      ))}
      {shown.length === 0 && <p className="print-hint" style={{ padding: 24 }}>No cards match.</p>}
    </div>
  );
}
