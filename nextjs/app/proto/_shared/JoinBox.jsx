"use client";

import { useJoinUrl } from "./room";

// Shows the room code and the address phones open to join it. Put it on the laptop's (host) screen.
//   <JoinBox path="/proto/players/private-goals/phone" room={code} />
export default function JoinBox({ path, room, label = "Join on your phone" }) {
  const url = useJoinUrl(room ? `${path}?room=${room}` : null);
  return (
    <div className="proto-join">
      <div className="proto-join-label">{label}</div>
      <div className="proto-join-code">{room ? room.toUpperCase() : "…"}</div>
      <div className="proto-join-url">{url || "…"}</div>
    </div>
  );
}
