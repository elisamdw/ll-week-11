import Link from "next/link";
import { notFound } from "next/navigation";
import { GAME_KIND_HUES as KIND_HUES, getIdea } from "../../../lib/ideas.mjs";
import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import Markdown from "../../components/Markdown.jsx";
import "../../ideas/ideas.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const idea = await getIdea((await params).slug, "game-ideas");
  return { title: idea ? idea.title : "Idea" };
}

export default async function IdeaPage({ params }) {
  const idea = await getIdea((await params).slug, "game-ideas");
  if (!idea) notFound();
  return (
    <>
      <SiteHeader />
      <main id="main" className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/game-ideas">Game ideas</Link>
          <span aria-hidden="true">/</span>
          <span>{idea.title}</span>
        </nav>
        <article className="idea-page" style={{ "--hue": KIND_HUES[idea.kind] ?? 0 }}>
          <p className="idea-meta">
            <span className="idea-kind">{idea.kind || "idea"}</span>
            {idea.week && <span>{/^\d+$/.test(idea.week) ? `Week ${idea.week}` : idea.week}</span>}
            {idea.date && <span>{idea.date}</span>}
            {idea.tags.map((t) => <span key={t}>#{t}</span>)}
          </p>
          <h1>{idea.title}</h1>
          {idea.description && <p className="idea-lede">{idea.description}</p>}
          <div className="prose"><Markdown doc={{ ...idea, content: idea.body, slug: `game-ideas/${idea.slug}`, dir: "game-ideas" }} /></div>
          {idea.sources.length > 0 && (
            <footer className="idea-sources">
              <p className="eyebrow">Sources</p>
              <ul>{idea.sources.map((s) => <li key={s}><code>{s}</code></li>)}</ul>
              <p className="idea-note">Paths are from the <code>ll-week-11</code> repo unless they say otherwise.</p>
            </footer>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
