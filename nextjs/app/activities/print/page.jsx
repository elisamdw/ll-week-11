import { ACTIVITY_KIND_HUES, GROUP_LABELS, getCards } from "../cards.mjs";
import PrintCards from "../PrintCards.jsx";

export const dynamic = "force-dynamic";
export const metadata = { title: "Print the activity cards" };

// /activities/print: the activity cards to cut out (options in PrintCards.jsx), e.g. ?group=tdm155ai&try=1.
export default async function PrintActivities({ searchParams }) {
  const cards = await getCards();
  const groups = Object.fromEntries(["tdm155ai", "stafford", "llufs", "shared"].map((g) => [g, GROUP_LABELS[g]]));
  return <PrintCards cards={cards} sp={await searchParams} base="/activities" label="Activities" hues={ACTIVITY_KIND_HUES} groups={groups} />;
}
