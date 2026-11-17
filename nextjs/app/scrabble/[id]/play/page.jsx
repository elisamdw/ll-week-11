import PlayerClient from "./PlayerClient.jsx";
import "../../scrabble.css";

export const metadata = { title: "Scrabble player" };

export default async function PlayerPage({ params }) {
  const { id } = await params;
  return <PlayerClient roomId={id} />;
}
