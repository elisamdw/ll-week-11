"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Shared state across devices for a prototype, kept by the laptop's dev server (app/api/proto/).
//
//   const code = useRoomCode();                       // ?room=abcd in the URL, or a new code
//   const { state, update, replace, reset } = useRoom("players/private-goals", code, { players: {} });
//   update([{ op: "set", path: "players.ana", value: { goal: 3 } }]);
//   update([{ op: "push", path: "log", value: { at: Date.now(), tap: "A" }, max: 200 }]);
//   update([{ op: "inc", path: "price.gpu", value: 5 }]);
//
// Every device polls about twice a second, so a change shows on the others within a second.

const POLL_MS = 500;

export function useRoom(proto, room, initial = {}) {
  const [doc, setDoc] = useState({ state: null, version: -1 });
  const [online, setOnline] = useState(true);
  const version = useRef(-1);
  const url = room ? `/api/proto/room/${proto}/${room}` : null;

  const take = useCallback((next) => {
    if (next && typeof next.version === "number" && !next.unchanged && next.version >= version.current) {
      version.current = next.version;
      setDoc(next);
    }
  }, []);

  useEffect(() => {
    if (!url) return;
    version.current = -1;
    let stop = false;
    let timer;
    const tick = async () => {
      try {
        const res = await fetch(`${url}?v=${version.current}`, { cache: "no-store" });
        take(await res.json());
        setOnline(true);
      } catch {
        setOnline(false);
      }
      if (!stop) timer = setTimeout(tick, POLL_MS);
    };
    tick();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [url, take]);

  const send = useCallback(
    async (method, body) => {
      if (!url) return;
      const res = await fetch(url, { method, headers: { "content-type": "application/json" }, body: body && JSON.stringify(body) });
      const next = await res.json();
      take(next);
      return next;
    },
    [url, take],
  );

  const init = useRef(initial);
  const update = useCallback((ops) => send("PATCH", { ops, init: init.current }), [send]);
  const replace = useCallback((state) => send("PUT", { state }), [send]);
  const reset = useCallback(() => send("DELETE"), [send]);

  return {
    state: doc.state ?? initial,
    version: doc.version,
    loaded: doc.version >= 0,
    online,
    update,
    replace,
    reset,
  };
}

const LETTERS = "abcdefghjkmnpqrstuvwxyz";

export function newRoomCode(length = 4) {
  return Array.from({ length }, () => LETTERS[Math.floor(Math.random() * LETTERS.length)]).join("");
}

// The room code from ?room= in the URL; if there is none, make one and put it in the URL so it can be shared.
export function useRoomCode() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    let room = (url.searchParams.get("room") || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!room) {
      room = newRoomCode();
      url.searchParams.set("room", room);
      window.history.replaceState(null, "", url);
    }
    setCode(room);
  }, []);
  return code;
}

// A stable id and name for this device, kept in the browser.
export function usePlayer() {
  const [player, setPlayer] = useState({ id: null, name: "" });
  useEffect(() => {
    let id, name;
    try {
      id = localStorage.getItem("proto-player-id");
      name = localStorage.getItem("proto-player-name") || "";
      if (!id) localStorage.setItem("proto-player-id", (id = Math.random().toString(36).slice(2, 10)));
    } catch {
      id = Math.random().toString(36).slice(2, 10);
    }
    setPlayer({ id, name });
  }, []);
  const setName = useCallback((name) => {
    try {
      localStorage.setItem("proto-player-name", name);
    } catch {}
    setPlayer((p) => ({ ...p, name }));
  }, []);
  return { ...player, setName };
}

// The address phones open to join: the laptop's network address instead of localhost.
export function useJoinUrl(pathWithQuery) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!pathWithQuery) return;
    const here = new URL(window.location.href);
    const local = ["localhost", "127.0.0.1", "::1"].includes(here.hostname);
    if (!local) return setUrl(`${here.origin}${pathWithQuery}`);
    fetch("/api/proto/host")
      .then((r) => r.json())
      .then(({ addresses }) => setUrl(`${here.protocol}//${addresses[0] || here.hostname}:${here.port}${pathWithQuery}`))
      .catch(() => setUrl(`${here.origin}${pathWithQuery}`));
  }, [pathWithQuery]);
  return url;
}
