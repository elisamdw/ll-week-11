import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import matter from "gray-matter";
import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import Markdown from "../../components/Markdown.jsx";

// /activities/map: _content/activities/README.md, the cross-audience map (the folder's README, which /activities replaces).

export const dynamic = "force-dynamic";
export const metadata = { title: "Activities: the cross-audience map" };

export default async function MapPage() {
  let doc = null;
  try {
    const { data, content } = matter(await readFile(/* turbopackIgnore: true */ path.join(process.cwd(), "..", "_content", "activities", "README.md"), "utf8"));
    doc = { ...data, title: data.title || "Activities", content, slug: "activities", dir: "activities" };
  } catch {}
  return (
    <>
      <SiteHeader />
      <main id="main" className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/activities">Activities</Link>
          <span aria-hidden="true">/</span>
          <span>The cross-audience map</span>
        </nav>
        <article className="prose">{doc ? <Markdown doc={doc} /> : <p>No map yet: <code>_content/activities/README.md</code>.</p>}</article>
      </main>
      <SiteFooter />
    </>
  );
}
