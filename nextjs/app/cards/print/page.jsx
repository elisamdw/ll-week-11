import { filterCards, getCards, getConvolutes, layoutName, readLayout } from "../../../lib/cards.mjs";
import PrintSheet from "./PrintSheet.jsx";

export const dynamic = "force-dynamic";
export const metadata = { title: "Print the cards" };

// /cards/print: every card, in convolute order (convolutes.md's order, each in its follows chain), on 11 x 17.
//   ?convolute=room-as-board  ?kind=aphorism  ?tag=phones  ?status=ready  ?audience=tdm155ai  ?voice=marlon
//                             filters, combinable
//   ?cards=slug-a,slug-b      a chosen set, in that order (the other filters are ignored)
//   ?set=name                 a print set marked in the list (_content/cards/_layouts/print-<name>.json), in its order
//   ?form=short               title, description, the blockquotes with their attribution lines, and the foot
//   ?form=index               the overview: per convolute, its letter, title and sentence, then each card's title and description
//   ?paper=letter             8.5 x 11 with two 4.25-inch columns instead of 11 x 17 with two 5.5-inch ones
// One card: /cards/print/<slug>.
export default async function PrintCards({ searchParams }) {
  const sp = { ...(await searchParams) };
  const setName = Array.isArray(sp.set) ? sp.set[0] : sp.set;
  if (setName && layoutName(`print-${setName}`)) {
    const saved = await readLayout(`print-${setName}`);
    sp.cards = (Array.isArray(saved?.cards) ? saved.cards : []).join(",") || "-";
  }
  const [all, convolutes] = await Promise.all([getCards(), getConvolutes()]);
  return <PrintSheet cards={filterCards(all, sp, convolutes)} all={all} convolutes={convolutes} sp={sp} />;
}
