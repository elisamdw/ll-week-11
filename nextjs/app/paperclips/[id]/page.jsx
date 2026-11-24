import GameClient from "./GameClient.jsx";
import "../paperclips.css";

export const metadata = { title: "Paperclips room" };

export default async function PaperclipsRoom({ params }) {
  const { id } = await params;
  return <GameClient roomId={id} />;
}
