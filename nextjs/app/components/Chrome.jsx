import Link from "next/link";
import { site } from "../../lib/content.mjs";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        {site.title} <span>{site.label}</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/game">Game</Link>
        <Link href="/proto">Playground</Link>
        <Link href="/prototypes">Prototypes</Link>
        <Link href="/activities">Activities</Link>
        <Link href="/learn">Learn</Link>
        <Link href="/ideas">Ideas</Link>
        <Link href="/game-ideas">Game ideas</Link>
        <Link href="/cards">Cards</Link>
        <Link href="/context">Context</Link>
        <Link href="/print">Print</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/">{site.title}</Link>
      <Link href="/print">Printables</Link>
      <span>{site.term}</span>
    </footer>
  );
}
