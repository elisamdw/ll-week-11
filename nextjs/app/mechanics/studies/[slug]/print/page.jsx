import { notFound } from "next/navigation";
import Markdown from "../../../../components/Markdown.jsx";
import { getStudy, sectionDoc } from "../../_lib/studies.mjs";
import { illustrations } from "../../_studies/index.js";
import "../../studies.css";

// One study on one 11x17 sheet (portrait): the definition, the diagram and the example game, the table version and
// the remix prompt. Light, like the rest of /print. The @page rule is in the page itself so it applies only here.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getStudy(slug);
  return found ? { title: `${found.study.number} ${found.study.data.title} (11x17)` } : {};
}

export default async function StudyPrint({ params }) {
  const { slug } = await params;
  const found = await getStudy(slug);
  if (!found) notFound();
  const { study } = found;
  const illustration = illustrations[study.slug];
  const section = (key) => sectionDoc(study, key);

  return (
    <div className="print-root">
      <style>{"@page { size: 11in 17in; margin: 0.5in; } @media print { html, body { background: #fff !important; } }"}</style>
      <main id="main" className="ms-sheet">
        <div className="print-bar">
          <span>Mechanics studies · {study.number}</span>
          <span>Learning Lab week 11 · TDM 155AI · localhost:3111/mechanics/studies/{study.slug}</span>
        </div>
        <h1 className="ms-title"><span>{study.number}</span> {study.data.title}</h1>
        {section("definition") && <div className="ms-definition"><Markdown doc={section("definition")} print /></div>}
        {illustration && <illustration.Component {...(illustration.print || {})} print />}
        <div className="ms-pair">
          {section("try-it-at-a-table") && (
            <section className="ms-card">
              <h2>At a table, two minutes</h2>
              <div className="prose"><Markdown doc={section("try-it-at-a-table")} print /></div>
            </section>
          )}
          {section("remix-prompt") && (
            <section className="ms-card">
              <h2>Remix it with Claude Code</h2>
              <div className="prose"><Markdown doc={section("remix-prompt")} print /></div>
            </section>
          )}
        </div>
        <div className="ms-pair">
          {section("why-to") && (
            <section className="ms-card">
              <h2>Why to</h2>
              <div className="prose"><Markdown doc={section("why-to")} print /></div>
            </section>
          )}
          {section("home-game-version") && (
            <section className="ms-card">
              <h2>Home game version</h2>
              <div className="prose"><Markdown doc={section("home-game-version")} print /></div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
