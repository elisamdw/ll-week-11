import Link from "next/link";
import { getRoot, site } from "../lib/content.mjs";
import { SiteFooter, SiteHeader } from "./components/Chrome.jsx";
import Markdown from "./components/Markdown.jsx";

export const dynamic = "force-dynamic";

function ContextMap({ folders }) {
  return (
    <ul className="context-map">
      {folders.map((folder) => (
        <li key={folder.slug}>
          <Link href={folder.href} className="context-row">
            <code>{folder.source}</code>
            <strong>{folder.title}</strong>
            <span className="context-count">{folder.count} doc{folder.count === 1 ? "" : "s"}</span>
            {folder.description && <span className="context-note">{folder.description}</span>}
          </Link>
          {folder.folders.length > 0 && <ContextMap folders={folder.folders} />}
        </li>
      ))}
    </ul>
  );
}

export default async function Home() {
  const root = await getRoot();
  // Folders whose README has `step:` in its frontmatter become numbered steps; everything else is in the map.
  const steps = root.folders.filter((folder) => folder.step).sort((a, b) => a.step - b.step);
  const docs = root.docs;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero hero-compact" aria-labelledby="site-title">
          <p className="eyebrow">{site.label} · {site.term}</p>
          <h1 id="site-title">{root.title === "Home" ? site.title : root.title}</h1>
          {root.description && <p className="hero-deck">{root.description}</p>}
          {root.content.trim() && <article className="prose hero-intro"><Markdown doc={root} /></article>}
        </section>

        <section className="steps" aria-label="Ideas">
          {[
            ["/ideas", "Ideas", "Marlon's ideas as atomic cards: browse and filter."],
            ["/ideas/print", "Print the cards", "Cut-out cards on Letter paper, for the whiteboard."],
            ["/ideas/board", "Whiteboard", "Drag the cards around a board, group them, and save the arrangement."],
            ["/ideas/graph", "Graph", "Connect the ideas as a node graph and organize them."],
          ].map(([href, title, copy], i) => (
            <article className="step" key={href}>
              <Link href={href} className="step-main">
                <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="step-title">{title} <span aria-hidden="true">→</span></span>
                <span className="step-copy">{copy}</span>
              </Link>
            </article>
          ))}
        </section>

        {steps.length > 0 && (
          <section className="steps" aria-label="Steps">
            {steps.map((step) => (
              <article className="step" key={step.slug}>
                <Link href={step.href} className="step-main">
                  <span className="step-number">{String(step.step).padStart(2, "0")}</span>
                  <span className="step-title">{step.title} <span aria-hidden="true">→</span></span>
                  {step.subtitle && <span className="step-subtitle">{step.subtitle}</span>}
                  <span className="step-copy">{step.description}</span>
                </Link>
                {step.tool && (
                  <Link href={step.tool} className="step-tool">
                    <span className="eyebrow">Open the tool</span>
                    <strong>{step.toolTitle} →</strong>
                  </Link>
                )}
              </article>
            ))}
          </section>
        )}

        <section className="home-section" id="docs" aria-labelledby="docs-title">
          <header className="section-heading">
            <p className="eyebrow">The map</p>
            <h2 id="docs-title">What's here</h2>
            <p>Everything here is Markdown: <code>_content/</code> is this site, from the home page down (the plan, then the timeline and the report), and <Link href="/context"><code>_context/</code></Link> is the context. Every folder and document has a page; new files show up on refresh, and images beside a document show in it.</p>
          </header>
          <div className="ai-body">
            {root.folders.length > 0 && <ContextMap folders={root.folders} />}
            {docs.length > 0 && (
              <ul className="context-map context-docs">
                {docs.map((doc) => (
                  <li key={doc.slug}>
                    <Link href={doc.href} className="context-row">
                      <code>{doc.source}</code>
                      <strong>{doc.title}</strong>
                      <span className="context-count">{doc.eyebrow}</span>
                      {doc.description && <span className="context-note">{doc.description}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {root.count === 0 && <p className="empty-state">Nothing here yet. Add a Markdown file to <code>_content/</code> or <code>_context/</code>.</p>}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
