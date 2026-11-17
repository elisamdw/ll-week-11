import { notFound } from "next/navigation";
import { getCards, getConvolutes } from "../../../../lib/cards.mjs";
import PrintSheet from "../PrintSheet.jsx";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const card = (await getCards()).find((c) => c.slug === slug);
  return { title: card ? `Print: ${card.title}` : "Print a card" };
}

// /cards/print/<slug>: one card, in its column at the left of the sheet (?paper=letter for 8.5 x 11).
export default async function PrintOneCard({ params, searchParams }) {
  const slug = (await params).slug;
  const sp = await searchParams;
  const [all, convolutes] = await Promise.all([getCards(), getConvolutes()]);
  const card = all.find((c) => c.slug === slug);
  if (!card) notFound();
  return <PrintSheet cards={[card]} all={all} convolutes={convolutes} sp={{ paper: sp.paper, form: sp.form }} one />;
}
