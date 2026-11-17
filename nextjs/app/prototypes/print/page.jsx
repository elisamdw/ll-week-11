import { getCards, GROUP_LABELS, PROTO_HUES } from "../../activities/cards.mjs";
import PrintCards from "../../activities/PrintCards.jsx";

export const dynamic = "force-dynamic";
export const metadata = { title: "Print the prototype cards" };

// /prototypes/print: the prototype cards to cut out (options in activities/PrintCards.jsx), e.g. ?group=economy.
export default async function PrintPrototypes({ searchParams }) {
  const groups = { economy: GROUP_LABELS.economy, players: GROUP_LABELS.players, hybrid: GROUP_LABELS.hybrid };
  return <PrintCards cards={await getCards("prototypes")} sp={await searchParams} base="/prototypes" label="Prototypes" hues={PROTO_HUES} groups={groups} />;
}
