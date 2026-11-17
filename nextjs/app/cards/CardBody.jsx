import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// A card's body as Markdown. [[slug]] and [[slug|words]] (Obsidian links) become links to /cards/<slug>, or to
// /<collection>/<slug> for a card in another collection; titles come from `titles` (slug → title). Relative links to
// files (the-committee.md, ../ideas/x.md) go to the pages the reader serves for them.
export function wikiLinks(body, titles = {}) {
  return body.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (_, target, words) => {
    const t = target.trim().replace(/\.md$/, "").replace(/^cards\//, "");
    const href = t.includes("/") ? `/${t}` : `/cards/${t}`;
    return `[${(words || titles[t] || t).trim()}](${href})`;
  });
}

function resolve(href = "") {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(href)) return href;
  const [file, hash = ""] = href.split("#");
  const parts = ["cards", ...file.split("/")].filter((p) => p && p !== ".");
  const out = [];
  for (const p of parts) p === ".." ? out.pop() : out.push(p);
  return `/${out.join("/").replace(/\.md$/, "").replace(/\/README$/i, "")}${hash ? `#${hash}` : ""}`;
}

const components = {
  a: ({ href, children }) => {
    const to = resolve(href);
    return to.startsWith("/") ? <Link href={to}>{children}</Link> : <a href={to} target="_blank" rel="noreferrer">{children}</a>;
  },
};

export default function CardBody({ body, titles, className }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{wikiLinks(body, titles)}</ReactMarkdown>
    </div>
  );
}
