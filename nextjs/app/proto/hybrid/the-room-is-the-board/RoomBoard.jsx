"use client";

import { useEffect, useRef, useState } from "react";
import { feet, loadPose } from "./tracking.js";

// The room is the board. The camera's view of the room is cut into zones, left to right. Each turn,
// the AI spreads into zones where no one is standing. Bodies are the only pieces: stand in a zone to
// hold it, stand two to a zone to take one back. Without a camera, drag stand-ins instead.

// ---- Tuning: change these ----

const ZONES = ["Power plant", "Reservoir", "Farmland", "Town", "School"]; // left to right, as the camera sees the room
const TURN_SECONDS = 12;
const TURNS = 8;
const AI_TAKES = [1, 1, 2, 2, 2, 3, 3, 4]; // how many zones the AI wants each turn
const RETAKE = 2; // people in an AI zone at the end of a turn who take it back
const LONE_FROM_TURN = 4; // from this turn on, one person alone can't stop the AI
const MAX_PEOPLE = 6; // for the camera
const RESULT_SECONDS = 4; // the pause to read what happened

// ---- The rest ----

const zoneOf = (x) => Math.min(ZONES.length - 1, Math.max(0, Math.floor(x * ZONES.length)));
const countIn = (people) => ZONES.map((_, i) => people.filter((p) => zoneOf(p.x) === i).length);
const shuffle = (list) => list.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(([, v]) => v);

function resolve(turn, held, counts) {
  const next = [...held];
  const retook = [];
  held.forEach((ai, i) => {
    if (ai && counts[i] >= RETAKE) {
      next[i] = false;
      retook.push(i);
    }
  });
  const wants = AI_TAKES[Math.min(turn, AI_TAKES.length) - 1];
  const open = (i) => !next[i] && !retook.includes(i);
  const empty = shuffle(ZONES.map((_, i) => i).filter((i) => open(i) && counts[i] === 0));
  const lone = turn >= LONE_FROM_TURN ? shuffle(ZONES.map((_, i) => i).filter((i) => open(i) && counts[i] === 1)) : [];
  const took = [...empty, ...lone].slice(0, wants);
  took.forEach((i) => (next[i] = true));
  return { held: next, row: { turn, counts, wants, took, retook, aiHolds: next.filter(Boolean).length } };
}

export default function RoomBoard() {
  const [source, setSource] = useState("standins"); // standins | camera
  const [camera, setCamera] = useState({ status: "off", note: "" }); // off | loading | on | error
  const [people, setPeople] = useState([]); // where the camera sees people, refreshed ~10 times a second
  const [standins, setStandins] = useState(() => [0.15, 0.5, 0.82].map((x, i) => ({ id: i, x, y: 0.75 })));
  const [game, setGame] = useState({ phase: "setup", turn: 0, held: ZONES.map(() => false), log: [], deadline: 0 });
  const [now, setNow] = useState(0);
  const video = useRef(null);
  const stage = useRef(null);
  const tracked = useRef([]);
  const recent = useRef([]); // the last second of counts, to read the end of a turn without flicker
  const dragging = useRef(null);
  const resolving = useRef(false);

  const bodies = source === "camera" ? people : standins;
  const counts = countIn(bodies);

  // The camera: open it, load the model, and track until the source changes.
  useEffect(() => {
    if (source !== "camera") return;
    let stop = false;
    let stream;
    let landmarker;
    let raf;
    let last = -1;
    let lastPush = 0;
    (async () => {
      try {
        setCamera({ status: "loading", note: "Opening the camera…" });
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
        if (stop) return;
        video.current.srcObject = stream;
        await video.current.play();
        setCamera({ status: "loading", note: "Loading the pose model (needs the network)…" });
        landmarker = await loadPose(MAX_PEOPLE);
        if (stop) return;
        setCamera({ status: "on", note: "" });
        const loop = () => {
          if (stop) return;
          const v = video.current;
          if (v && v.readyState >= 2 && v.currentTime !== last) {
            last = v.currentTime;
            tracked.current = feet(landmarker.detectForVideo(v, performance.now()));
            if (performance.now() - lastPush > 100) {
              lastPush = performance.now();
              setPeople(tracked.current);
            }
          }
          raf = requestAnimationFrame(loop);
        };
        loop();
      } catch (error) {
        setCamera({ status: "error", note: `${error.message}. The camera works on localhost or HTTPS; the model needs the network. Use the stand-ins.` });
      }
    })();
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      landmarker?.close?.();
      setPeople([]);
    };
  }, [source]);

  // The clock.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

  // Keep the last second of counts.
  useEffect(() => {
    const t = Date.now();
    recent.current = [...recent.current.filter((r) => t - r.t < 1000), { t, counts }];
  });

  // End of a turn: count, resolve, show the result, then the next turn.
  useEffect(() => {
    if (game.phase === "turn" && now >= game.deadline && !resolving.current) {
      resolving.current = true;
      const samples = recent.current.length ? recent.current : [{ counts }];
      const settled = ZONES.map((_, i) => Math.round(samples.reduce((n, s) => n + s.counts[i], 0) / samples.length));
      const { held, row } = resolve(game.turn, game.held, settled);
      const over = held.every(Boolean) || game.turn >= TURNS;
      setGame((g) => ({ ...g, held, log: [...g.log, row], phase: over ? "over" : "result", deadline: Date.now() + RESULT_SECONDS * 1000 }));
    } else if (game.phase === "result" && now >= game.deadline) {
      setGame((g) => ({ ...g, phase: "turn", turn: g.turn + 1, deadline: Date.now() + TURN_SECONDS * 1000 }));
      resolving.current = false;
    }
  }, [now, game, counts]);

  function start() {
    resolving.current = false;
    setGame({ phase: "turn", turn: 1, held: ZONES.map(() => false), log: [], deadline: Date.now() + TURN_SECONDS * 1000 });
  }

  // Stand-ins: drag them around the floor.
  function onDown(event, id) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = id;
  }
  function onMove(event) {
    if (dragging.current === null) return;
    const r = stage.current.getBoundingClientRect();
    const x = Math.min(0.99, Math.max(0.01, (event.clientX - r.left) / r.width));
    const y = Math.min(0.97, Math.max(0.05, (event.clientY - r.top) / r.height));
    setStandins((list) => list.map((p) => (p.id === dragging.current ? { ...p, x, y } : p)));
  }
  const onUp = () => (dragging.current = null);
  const addStandin = () => setStandins((list) => (list.length >= 8 ? list : [...list, { id: Math.max(-1, ...list.map((p) => p.id)) + 1, x: 0.1 + Math.random() * 0.8, y: 0.6 + Math.random() * 0.3 }]));
  const removeStandin = () => setStandins((list) => list.slice(0, -1));

  const left = Math.max(0, Math.ceil((game.deadline - now) / 1000));
  const lastRow = game.log[game.log.length - 1];
  const wantsNext = AI_TAKES[Math.min(game.turn, AI_TAKES.length) - 1];
  const aiHolds = game.held.filter(Boolean).length;

  return (
    <div className="hy-room">
      <div className="hy-status">
        <p className={`hy-clock${game.phase === "turn" && left <= 3 ? " over" : ""}`}>{game.phase === "turn" ? left : game.phase === "setup" ? TURN_SECONDS : "—"}</p>
        <p className="hy-room-line">
          {game.phase === "setup" && `Eight turns of ${TURN_SECONDS} seconds. Each turn the AI spreads into empty zones. Stand in a zone to hold it; two in an AI zone take it back.`}
          {game.phase === "turn" && (
            <>
              Turn {game.turn} of {TURNS}: the AI wants <strong>{wantsNext}</strong> zone{wantsNext > 1 ? "s" : ""}.{game.turn >= LONE_FROM_TURN && " One person alone no longer stops it."}
            </>
          )}
          {game.phase === "result" && lastRow && <Result row={lastRow} />}
          {game.phase === "over" && (aiHolds === ZONES.length ? "The AI holds the whole room." : `Time. You held ${ZONES.length - aiHolds} of ${ZONES.length} zones.`)}
        </p>
        <div className="hy-actions">
          {game.phase === "setup" || game.phase === "over" ? (
            <button className="button primary" onClick={start}>
              {game.phase === "over" ? "Play again" : "Start"}
            </button>
          ) : (
            <button className="button" onClick={() => setGame((g) => ({ ...g, phase: "setup" }))}>
              Stop
            </button>
          )}
        </div>
      </div>

      <div className="hy-room-source">
        <div className="hy-tabs">
          <button className={source === "standins" ? "on" : ""} onClick={() => setSource("standins")}>
            Stand-ins (drag)
          </button>
          <button className={source === "camera" ? "on" : ""} onClick={() => setSource("camera")}>
            Camera (bodies)
          </button>
        </div>
        {source === "standins" ? (
          <span className="muted">
            {standins.length} people · <button className="linkish" onClick={addStandin}>add</button> · <button className="linkish" onClick={removeStandin}>remove</button>
          </span>
        ) : (
          <span className="muted">{camera.status === "on" ? `${people.length} ${people.length === 1 ? "person" : "people"} seen` : camera.note}</span>
        )}
      </div>

      <div ref={stage} className={`hy-room-stage ${source}`} onPointerMove={onMove} onPointerUp={onUp}>
        {source === "camera" && <video ref={video} muted playsInline />}
        <div className="hy-room-zones">
          {ZONES.map((name, i) => {
            const took = game.phase === "result" && lastRow?.took.includes(i);
            const retook = game.phase === "result" && lastRow?.retook.includes(i);
            return (
              <div key={name} className={`hy-room-zone${game.held[i] ? " ai" : ""}${took ? " took" : ""}${retook ? " retook" : ""}`}>
                <p>{name}</p>
                <strong>{counts[i]}</strong>
                <span>{game.held[i] ? (counts[i] >= RETAKE ? "taking it back…" : "the AI's") : counts[i] ? "held" : game.phase === "turn" ? "open" : ""}</span>
              </div>
            );
          })}
        </div>
        {bodies.map((p, i) =>
          source === "standins" ? (
            <button key={p.id} className="hy-room-body standin" style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }} onPointerDown={(e) => onDown(e, p.id)} aria-label={`Stand-in ${i + 1}`}>
              {i + 1}
            </button>
          ) : (
            <span key={i} className="hy-room-body" style={{ left: `${p.x * 100}%`, top: `${Math.min(0.97, p.y) * 100}%` }} title={`by the ${p.by}`} />
          ),
        )}
      </div>

      <section className="hy-panel hy-room-log">
        <div className="hy-panel-head">
          <h2>Every turn is a row</h2>
          <p className="muted">The counts the camera settled on at the end of each turn, and what they did.</p>
        </div>
        <table className="hy-board">
          <thead>
            <tr>
              <th>turn</th>
              {ZONES.map((z) => (
                <th key={z}>{z}</th>
              ))}
              <th>AI wanted</th>
              <th>AI took</th>
              <th>taken back</th>
              <th>AI holds</th>
            </tr>
          </thead>
          <tbody>
            {game.log.map((r) => (
              <tr key={r.turn}>
                <td>{r.turn}</td>
                {r.counts.map((c, i) => (
                  <td key={i} className={r.took.includes(i) ? "hy-ai" : r.retook.includes(i) ? "hy-ok" : ""}>
                    {c}
                  </td>
                ))}
                <td>{r.wants}</td>
                <td>{r.took.map((i) => ZONES[i]).join(", ") || "—"}</td>
                <td>{r.retook.map((i) => ZONES[i]).join(", ") || "—"}</td>
                <td>
                  {r.aiHolds} / {ZONES.length}
                </td>
              </tr>
            ))}
            {!game.log.length && (
              <tr>
                <td colSpan={ZONES.length + 5} className="muted">
                  No turns yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Result({ row }) {
  const took = row.took.map((i) => ZONES[i]);
  const retook = row.retook.map((i) => ZONES[i]);
  return (
    <>
      {retook.length > 0 && <>You took back {retook.join(" and ")}. </>}
      {took.length ? <>The AI took {took.join(" and ")}.</> : "The AI found nowhere to go."}
      {row.took.length < row.wants && " It wanted more."}
    </>
  );
}
