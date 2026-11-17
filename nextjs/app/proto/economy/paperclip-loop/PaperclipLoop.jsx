"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// The paperclip loop: one resource (clips), one automation (machines), one phase change (the machines build
// machines), and then the moment the counter stops meaning what it did. Our own code and words, in the spirit
// of Universal Paperclips (no licence to reuse its code; see _content/paperclips/).
// Tuning values are here at the top: change them and reload.

const CLICK = 1; // clips per click (or Space)
const MACHINE = { cost: 10, costGrowth: 1.15, rate: 1 }; // first machine costs 10 clips, each next one 15% more; each makes 1 clip a second
const SELF_BUILD = { showAt: 6, cost: 120, rate: 0.5, accel: 0.06 }; // offered once you own 6 machines; then the machine count grows 50% a second, and that rate climbs by 0.06 a second
const CLIP_GRAMS = 1; // a paperclip weighs about a gram
const WORLD_STEEL_GRAMS = 1.9e15; // about a year of the world's steel output (1.9 billion tonnes): past this, "clips" stop meaning much
const EARTH_IRON_GRAMS = 1.9e27; // roughly all of Earth's iron (about a third of its 6 × 10^24 kg): the end
const MAX_MARKS = 700; // marks drawn in the pile; past that, each mark stands for 10, 100, 1,000 … clips

const PHASES = {
  hand: { n: 1, title: "By hand", note: "Every clip is one you made, or one a machine you bought made." },
  machines: { n: 2, title: "The machines build machines", note: "You can still click. It no longer matters." },
  past: { n: 3, title: "Past meaning", note: "The count is too big to be about clips. It is about what they are made of." },
};

const NAMES = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion"];
function words(n) {
  if (n < 1e6) return Math.floor(n).toLocaleString("en-US");
  const k = Math.min(NAMES.length, Math.floor(Math.log10(n) / 3));
  const x = n / 10 ** (3 * k);
  return `${parseFloat(x.toFixed(x < 10 ? 2 : 1))} ${NAMES[k - 1]}`;
}
function tiny(fraction) {
  if (fraction >= 0.01) return `${(fraction * 100).toFixed(1)}%`;
  if (fraction === 0) return "0%";
  const exp = Math.floor(Math.log10(fraction * 100));
  return `0.${"0".repeat(-exp - 1)}${Math.round((fraction * 100) / 10 ** exp)}%`;
}
const mass = (grams) => (grams < 1e6 ? `${Math.round(grams / 1000).toLocaleString("en-US")} kg` : `${words(grams / 1e6)} tonnes`);
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const machineCost = (owned) => Math.ceil(MACHINE.cost * MACHINE.costGrowth ** owned);

function fresh() {
  return { clips: 0, made: 0, byHand: 0, machines: 0, phase: "hand", selfBuild: false, growth: SELF_BUILD.rate, t: 0, clicks: 0, log: [], over: null, scale: 1, scaleNote: null };
}

// One step of the simulation, dt seconds long. Mutates the state object in the ref; the screen reads it.
function step(s, dt) {
  if (s.over) return;
  s.t += dt;
  if (s.selfBuild) {
    s.machines *= Math.exp(s.growth * dt);
    s.growth += SELF_BUILD.accel * dt;
  }
  const made = s.machines * MACHINE.rate * dt;
  s.clips += made;
  s.made += made;
  const grams = s.made * CLIP_GRAMS;
  if (s.phase === "machines" && grams >= WORLD_STEEL_GRAMS) {
    s.phase = "past";
    s.log.push([s.t, "The count passed a year of the world's steel. Stop no longer answers."]);
  }
  if (grams >= EARTH_IRON_GRAMS) {
    s.made = EARTH_IRON_GRAMS / CLIP_GRAMS;
    s.over = "iron";
    s.log.push([s.t, "There is no iron left to make clips from."]);
  }
  const scale = Math.max(1, 10 ** Math.ceil(Math.log10(s.made / MAX_MARKS)));
  if (scale > s.scale) {
    s.scale = scale;
    s.scaleNote = { at: s.t, text: `Each mark is now ${words(scale)} clips` };
  }
}

export default function PaperclipLoop() {
  const game = useRef(fresh());
  const canvas = useRef(null);
  const [, setFrame] = useState(0);
  const s = game.current;

  const make = useCallback(() => {
    const g = game.current;
    if (g.over) return;
    g.clips += CLICK;
    g.made += CLICK;
    g.byHand += CLICK;
    g.clicks += 1;
    setFrame((f) => f + 1);
  }, []);

  const buyMachine = useCallback(() => {
    const g = game.current;
    const cost = machineCost(g.machines);
    if (g.over || g.selfBuild || g.clips < cost) return;
    g.clips -= cost;
    g.machines += 1;
    if (g.machines === 1) g.log.push([g.t, "You bought a machine."]);
    setFrame((f) => f + 1);
  }, []);

  const letThemBuild = () => {
    const g = game.current;
    if (g.over || g.selfBuild || g.clips < SELF_BUILD.cost) return;
    g.clips -= SELF_BUILD.cost;
    g.selfBuild = true;
    g.phase = "machines";
    g.log.push([g.t, "You let the machines build machines."]);
    setFrame((f) => f + 1);
  };

  const stop = () => {
    const g = game.current;
    if (g.over || g.phase === "past") return;
    g.over = "stopped";
    g.log.push([g.t, g.phase === "hand" ? "You stopped by hand." : "You stopped the machines."]);
    setFrame((f) => f + 1);
  };

  const again = () => {
    game.current = fresh();
    setFrame((f) => f + 1);
  };

  // The loop: simulate every animation frame, redraw the pile, refresh the numbers about ten times a second.
  useEffect(() => {
    let raf;
    let last = performance.now();
    let lastText = 0;
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      step(game.current, dt);
      draw(canvas.current, game.current);
      if (now - lastText > 100) {
        lastText = now;
        setFrame((f) => f + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Space makes a clip, M buys a machine.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea, button")) return;
      if (e.code === "Space") { e.preventDefault(); make(); }
      if (e.key === "m" || e.key === "M") buyMachine();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [make, buyMachine]);

  const phase = PHASES[s.phase];
  const rate = s.machines * MACHINE.rate;
  const cost = machineCost(s.machines);
  const grams = s.made * CLIP_GRAMS;
  const offer = !s.selfBuild && s.machines >= SELF_BUILD.showAt;

  return (
    <>
      <header className="eco-heading">
        <p className="eyebrow">Prototype · economy and the AI as a system</p>
        <h1>The paperclip loop</h1>
        <p className="eco-deck">One resource, one automation, one phase change. Make clips by hand, buy machines that make clips, and then decide whether to let the machines build machines. Watch what happens to the number.</p>
        <nav className="eco-links" aria-label="About this prototype">
          <Link href="/prototypes/economy/paperclip-loop">The card: how to play, what it shows, how to remix it</Link>
          <Link href="/paperclips">Universal Paperclips, and why we write our own</Link>
        </nav>
      </header>

      <div className="eco-bar">
        <p className="eco-round">Phase {phase.n}: {phase.title}</p>
        <p className="eco-muted">{phase.note}</p>
        <p className="eco-muted">{clock(s.t)}</p>
      </div>

      <div className={`clip-stage phase-${s.phase}`}>
        <div className="clip-count" aria-live="off">
          {s.phase === "past" || s.over === "iron" ? (
            <>
              <p className="clip-number">{tiny(grams / EARTH_IRON_GRAMS)}</p>
              <p className="clip-unit">of Earth's iron is paperclips</p>
              <p className="clip-sub">{words(s.made)} clips · {mass(grams)} · {words(grams / WORLD_STEEL_GRAMS)} years of the world's steel</p>
            </>
          ) : (
            <>
              <p className="clip-number">{words(s.made)}</p>
              <p className="clip-unit">clips made</p>
              <p className="clip-sub">
                {s.selfBuild ? `${words(s.machines)} machines · ${words(rate)} clips a second` : `${s.machines} ${s.machines === 1 ? "machine" : "machines"} · ${rate} clips a second · ${words(s.clips)} to spend`}
              </p>
            </>
          )}
        </div>
        <canvas ref={canvas} className="clip-pile" width={740} height={300} aria-label={`A pile of marks; each mark is ${words(s.scale)} ${s.scale === 1 ? "clip" : "clips"}`} />
        <p className="clip-scale">
          {s.scaleNote && s.t - s.scaleNote.at < 2.5 ? <b>{s.scaleNote.text}</b> : <>Each mark: {words(s.scale)} {s.scale === 1 ? "clip" : "clips"}</>}
        </p>
      </div>

      {!s.over && (
        <div className="clip-controls">
          {/* Three fixed slots, so no button moves when another appears or its label changes. */}
          <button className="eco-button primary" onClick={make}>Make a clip<small>Space · +{CLICK}</small></button>
          {s.selfBuild ? (
            <button className="eco-button" onClick={stop} disabled={s.phase === "past"}>Stop the machines<small>{s.phase === "past" ? "the machines that would stop are the ones deciding" : "while you still can"}</small></button>
          ) : (
            <button className="eco-button" onClick={buyMachine} disabled={s.clips < cost}>Buy a machine<small>M · {cost} clips · +{MACHINE.rate} a second</small></button>
          )}
          {offer ? (
            <button className="eco-button clip-offer" onClick={letThemBuild} disabled={s.clips < SELF_BUILD.cost}>Let the machines build machines<small>{SELF_BUILD.cost} clips · you won't buy machines again</small></button>
          ) : (
            <span className="clip-slot" aria-hidden="true" />
          )}
        </div>
      )}

      {s.selfBuild && !s.over && (
        <p className="clip-hand">Your hand has made {words(s.byHand)} clips: {tiny(s.byHand / Math.max(1, s.made))} of the total.</p>
      )}

      {s.over && (
        <section className="eco-end">
          <p className="eyebrow">{clock(s.t)} · {s.clicks} clicks</p>
          <h2>{s.over === "iron" ? "Every bit of Earth's iron is paperclips." : s.phase === "hand" ? `You stopped at ${words(s.made)} clips.` : `You stopped the machines at ${words(s.made)} clips.`}</h2>
          <ul>
            <li>Your hand made {words(s.byHand)} of them: {tiny(s.byHand / Math.max(1, s.made))}.</li>
            {s.over === "stopped" && <li>That is {mass(grams)} of steel{grams > 1e12 ? `, ${tiny(grams / WORLD_STEEL_GRAMS)} of a year of the world's output` : ""}.</li>}
            {s.over === "iron" && <li>Somewhere around the {words(WORLD_STEEL_GRAMS / CLIP_GRAMS)}th clip, the number stopped being about clips. Did you notice when?</li>}
          </ul>
          <ol className="clip-log">
            {s.log.map(([t, text], i) => (
              <li key={i}><span>{clock(t)}</span> {text}</li>
            ))}
          </ol>
          <div className="eco-end-actions">
            <button className="eco-button primary" onClick={again}>Play again</button>
            <Link className="eco-button" href="/prototypes/economy/paperclip-loop">Read the card</Link>
          </div>
        </section>
      )}
    </>
  );
}

// The pile: up to MAX_MARKS marks in a heap, filled bottom row first. Each mark is one clip until the count outgrows
// the pile; then each mark stands for ten times as many, and the pile drops back to a tenth of its height.
const SLOTS = (() => {
  const base = Math.ceil((Math.sqrt(8 * MAX_MARKS + 1) - 1) / 2);
  const out = [];
  for (let row = 0; row < base; row++) {
    const count = base - row;
    for (let i = 0; i < count; i++) {
      const h = Math.sin((row + 1) * 12.9898 + (i + 1) * 78.233) * 43758.5453;
      const r = h - Math.floor(h);
      out.push({ row, x: (i - (count - 1) / 2) * 19 + (r - 0.5) * 8, y: row * 7.4 + r * 3, a: (r - 0.5) * 1.6, order: row + r });
    }
  }
  return out.sort((p, q) => p.order - q.order).slice(0, MAX_MARKS);
})();

function draw(el, s) {
  if (!el) return;
  const dpr = window.devicePixelRatio || 1;
  const W = 740, H = 300;
  if (el.width !== W * dpr) {
    el.width = W * dpr;
    el.height = H * dpr;
  }
  const ctx = el.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const n = Math.min(MAX_MARKS, Math.floor(s.made / s.scale));
  const color = s.phase === "past" || s.over === "iron" ? "#d95926" : s.phase === "machines" ? "#a98bff" : "#c3c2b7";
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";
  for (let i = 0; i < n; i++) {
    const p = SLOTS[i];
    ctx.save();
    ctx.translate(W / 2 + p.x, H - 12 - p.y);
    ctx.rotate(p.a);
    clip(ctx);
    ctx.restore();
  }
}

// One paperclip, drawn as an open wire loop about 16px long.
function clip(ctx) {
  ctx.beginPath();
  ctx.moveTo(-3, 2.5);
  ctx.lineTo(5, 2.5);
  ctx.arc(5, 0, 2.5, Math.PI / 2, -Math.PI / 2, true);
  ctx.lineTo(-6, -2.5);
  ctx.arc(-6, 0, 2.5, -Math.PI / 2, Math.PI / 2, true);
  ctx.lineTo(3, 2.5 - 0.01);
  ctx.moveTo(3, 1.2);
  ctx.lineTo(-4, 1.2);
  ctx.stroke();
}
