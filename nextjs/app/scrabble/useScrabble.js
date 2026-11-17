"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PartySocket from "partysocket";
import { nanoid } from "nanoid";

function getHost() {
  if (typeof window === "undefined") return "localhost:1999";
  const envHost = process.env.NEXT_PUBLIC_PARTYKIT_HOST;
  if (envHost) return envHost;
  return `${window.location.hostname}:1999`;
}

function loadPlayerId() {
  if (typeof window === "undefined") return null;
  const key = "ll-scrabble.playerId";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = nanoid();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export function useScrabble(roomId) {
  const [game, setGame] = useState(null);
  const [you, setYou] = useState(null);
  const [error, setErrorState] = useState(null);
  const [connected, setConnected] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const socketRef = useRef(null);
  const setError = setErrorState;
  const clearError = useCallback(() => setErrorState(null), []);

  useEffect(() => {
    if (!roomId) return;
    const id = loadPlayerId();
    setPlayerId(id);

    const socket = new PartySocket({
      host: getHost(),
      room: roomId,
    });
    socketRef.current = socket;

    const onOpen = () => {
      setConnected(true);
      socket.send(JSON.stringify({ type: "hello", playerId: id }));
    };
    const onClose = () => setConnected(false);
    const onMessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === "state") {
          setGame(msg.game);
          setYou(msg.you);
        } else if (msg.type === "error") {
          setError(msg.message);
        } else if (msg.type === "welcome") {
          // no-op: hello was accepted
        }
      } catch {}
    };

    socket.addEventListener("open", onOpen);
    socket.addEventListener("close", onClose);
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("open", onOpen);
      socket.removeEventListener("close", onClose);
      socket.removeEventListener("message", onMessage);
      socket.close();
    };
  }, [roomId]);

  const send = useCallback((payload) => {
    const s = socketRef.current;
    if (s && s.readyState === 1) {
      s.send(JSON.stringify(payload));
    }
  }, []);

  return { game, you, error, clearError, connected, playerId, send };
}
