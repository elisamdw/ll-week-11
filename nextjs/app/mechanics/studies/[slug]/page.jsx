import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../components/Chrome.jsx";
import Markdown from "../../../components/Markdown.jsx";
import { getStudy, sectionDoc } from "../_lib/studies.mjs";
import { illustrations } from "../_studies/index.js";
import "../studies.css";

// One mechanics study on the studio screen: the definition, the diagram beside the playable version, the two-minute
// table version and the remix prompt, then the rest of the entry. The README in _content/mechanics/studies/NN-<slug>/
// is the source; this page only arranges it.
export const dynamic = "force-dynamic";

// The rest of the entry, below the illustration, in the format's order.
const ENTRY = ["description", "how-to", "why-to", "home-game-version", "related"];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getStudy(slug);
  return found ? { title: `${found.study.number} ${found.study.data.title}`, description: found.study.data.description } : {};
}

export default async function StudyPage({ params }) {
  const { slug } = await params;
  const found = await getStudy(slug);
  if (!found) notFound();
  const { study, prev, next } = found;
  // The folder name (01-the-move-updates-state) is what the catch-all would link to; the page lives at the slug.
  if (slug !== study.slug) redirect(`/mechanics/studies/${study.slug}`);
  const illustration = illustrations[study.slug];
  const section = (key) => sectionDoc(study, key);

  return (
    <>
      <SiteHeader />
      <main id="main" className="ms-shell">
        <p className="eyebrow">
          <Link href="/mechanics">Mechanics</Link> · <Link href="/mechanics/studies">Studies</Link> · {study.number} · <Link href={`/mechanics/studies/${study.slug}/print`}>11x17 sheet</Link>
        </p>
        <h1 className="ms-title"><span>{study.number}</span> {study.data.title}</h1>
        {section("definition") && <div className="ms-definition"><Markdown doc={section("definition")} /></div>}

        {illustration ? <illustration.Component {...(illustration.screen || {})} /> : <p className="empty-state">No illustration yet.</p>}

        <div className="ms-pair">
          {section("try-it-at-a-table") && (
            <section className="ms-card">
              <h2>At a table, two minutes</h2>
              <div className="prose"><Markdown doc={section("try-it-at-a-table")} /></div>
            </section>
          )}
          {section("remix-prompt") && (
            <section className="ms-card">
              <h2>Remix it with Claude Code</h2>
              <div className="prose"><Markdown doc={section("remix-prompt")} /></div>
            </section>
          )}
        </div>

        <div className="ms-entry prose">
          {ENTRY.filter((key) => study.sections[key]).map((key) => (
            <section key={key}>
              <h2>{study.sections[key].heading}</h2>
              <Markdown doc={section(key)} />
            </section>
          ))}
          <p className="updated">{study.data.author}, {String(study.data.date instanceof Date ? study.data.date.toISOString().slice(0, 10) : study.data.date)}. Status: {study.data.status}. Source: <code>_content/mechanics/studies/{study.folder}/README.md</code></p>
        </div>

        <nav className="ms-nav" aria-label="Other studies">
          {prev ? <Link href={`/mechanics/studies/${prev.slug}`}>← {prev.number} {prev.data.title}</Link> : <span />}
          {next ? <Link href={`/mechanics/studies/${next.slug}`}>{next.number} {next.data.title} →</Link> : <span />}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
