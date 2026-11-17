import BoardClient from "./BoardClient.jsx";
import "../scrabble.css";

export const metadata = { title: "Scrabble board" };

export default async function BoardPage({ params }) {
  const { id } = await params;
  return <BoardClient roomId={id} />;
}
