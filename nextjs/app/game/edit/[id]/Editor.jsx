"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { describe, validate } from "../../../../lib/game-engine.mjs";

// The rules editor: the whole ruleset as JSON, checked as you type, with a plain-language reading beside it.
// "Play this draft" keeps the draft in this browser (w11-game:draft-rules); "Save as" writes a new file into
// _content/game/_rulesets/ on the laptop; download and open move a ruleset anywhere else.

const DRAFT = "w11-game:draft-rules";

// Ways into changing a game, from TH's game-studies notes (_content/theory/). Each one ends in "Save as".
const TASKS = [
  { name: "Reskin", text: "Rename every place, card, and faction after your own world (your index cards, your campus). Keep every number. Does the game say something different?", from: "Flanagan, Critical Play" },
  { name: "Unplay", text: "Add one move the game forbids, or forbid one it allows.", from: "Flanagan" },
  { name: "Rewrite", text: "Change how it ends: who wins, and when.", from: "Flanagan" },
  { name: "Subtract", text: "Remove one rule, resource, or card. Is the game better?", from: "Bogost, Juul" },
  { name: "Write a faction", text: "One faction for another group to play: a private goal, two actions, and one thing it must never do.", from: "Nguyen, Games: Agency as Art" },
  { name: "State the claim", text: "Fill in the rhetoric line on the rule you changed: what does it say about the world?", from: "Bogost, Persuasive Games" },
];

export default function Editor({ id, initialRules, ops, targets }) {
  const router = useRouter();
  const original = useMemo(() => (initialRules ? JSON.stringify(initialRules, null, 2) : ""), [initialRules]);
  const [text, setText] = useState(original);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (id !== "draft") return;
    try {
      const draft = localStorage.getItem(DRAFT);
      if (draft) setText(JSON.stringify(JSON.parse(draft), null, 2));
    } catch {}
  }, [id]);

  useEffect(() => {
    if (!name && initialRules) setName(initialRules.preset ? `${initialRules.id}-remix` : initialRules.id);
  }, [initialRules, name]);

  let rules = null;
  let parseError = null;
  try {
    rules = JSON.parse(text);
  } catch (error) {
    parseError = error.message;
  }
  const errors = parseError ? [`Not valid JSON yet: ${parseError}`] : validate(rules);

  const playDraft = () => {
    try {
      localStorage.setItem(DRAFT, JSON.stringify(rules));
      localStorage.removeItem("w11-game:draft");
    } catch {
      setStatus({ error: "This browser won't keep a draft. Save it under a name instead." });
      return;
    }
    router.push("/game/play/draft");
  };

  const save = async () => {
    setStatus({ busy: true });
    const response = await fetch(`/api/game/rules/${encodeURIComponent(name)}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...rules, remixOf: rules.remixOf || (initialRules?.preset ? initialRules.id : rules.remixOf) }) });
    const result = await response.json().catch(() => ({ error: "The server didn't answer." }));
    setStatus(response.ok ? { saved: result.id } : { error: result.error, errors: result.errors });
  };

  const download = () => {
    const blob = new Blob([text], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name || "game"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const open = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setText(await file.text());
    setStatus({ opened: file.name });
    event.target.value = "";
  };

  return (
    <div className="editor">
      <header className="play-top">
        <div>
          <p className="eyebrow">
            <Link href="/game">The game</Link> · edit the rules
          </p>
          <h1>{rules?.title || "Untitled game"}</h1>
          <p className="play-tagline">
            {id === "draft" ? "Your unsaved draft." : initialRules?.preset ? `A starting version. Change anything; save it under a new name.` : `A saved remix (${id}).`} Every game is one file like this one.
          </p>
        </div>
        <div className="play-top-actions">
          <button type="button" className="button primary" disabled={errors.length > 0} onClick={playDraft}>Play this draft</button>
          {original ? <button type="button" className="button" onClick={() => setText(original)}>Undo all changes</button> : null}
        </div>
      </header>

      <div className="edit-grid">
        <section>
          <textarea className="rules-text" value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} aria-label="The rules, as JSON" />
          <div className="edit-bar">
            <label>
              Save as <input value={name} onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} placeholder="our-game" />
            </label>
            <button type="button" className="button" disabled={errors.length > 0 || !name || name === "draft" || status?.busy} onClick={save}>Save</button>
            <button type="button" className="button" onClick={download}>Download</button>
            <button type="button" className="button" onClick={() => fileInput.current?.click()}>Open a file</button>
            <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={open} />
          </div>
          {status?.saved ? (
            <p className="edit-status ok">
              Saved to <code>_content/game/_rulesets/{status.saved}.json</code>. <Link href={`/game/play/${status.saved}`}>Play it</Link> · <Link href="/game">All versions</Link>
            </p>
          ) : null}
          {status?.error ? <p className="edit-status bad">{status.error}{status.errors ? ` ${status.errors.join(" ")}` : ""}</p> : null}
          {status?.opened ? <p className="edit-status ok">Opened {status.opened}.</p> : null}
        </section>

        <aside className="edit-side">
          {errors.length ? (
            <div className="check bad">
              <p className="eyebrow">Not playable yet</p>
              <ul>{errors.slice(0, 12).map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          ) : (
            <div className="check ok">
              <p className="eyebrow">Checks out</p>
              <p>
                {rules.nodes.length} places, {rules.ai.deck.length} AI {rules.ai.deck.length === 1 ? "card" : "cards"}, {rules.factions.length} {rules.factions.length === 1 ? "faction" : "factions"}, {rules.rounds ?? 10} rounds.
              </p>
            </div>
          )}

          <details className="reference" open>
            <summary>Try this</summary>
            <ul className="tasks">
              {TASKS.map((task) => (
                <li key={task.name}>
                  <strong>{task.name}.</strong> {task.text} <em>({task.from})</em>
                </li>
              ))}
            </ul>
          </details>

          {rules && !parseError ? <Reading rules={rules} /> : null}

          <details className="reference">
            <summary>What you can write</summary>
            <p>
              <strong>Effects</strong> (in a card's <code>effects</code> and <code>block</code>, an action's <code>effects</code>, a place's <code>onDown</code>, and <code>shortage</code>):
            </p>
            <ul>
              {Object.entries(ops).map(([op, text]) => (
                <li key={op}>
                  <code>{op}</code>: {text}
                </li>
              ))}
            </ul>
            <p>
              <strong>Targets</strong> (an action's <code>target</code>; leave it out for actions without a place):
            </p>
            <ul>
              {Object.entries(targets).map(([t, text]) => (
                <li key={t}>
                  <code>{t}</code>: {text}
                </li>
              ))}
            </ul>
            <p>
              <strong>Also:</strong> a card with <code>"proposal": true</code> asks first and uses <code>block</code> if blocked; <code>"hidden": true</code> goes in the back half of the deck. Places have <code>x</code> (0–100), <code>y</code> (0–72), <code>links</code>, <code>yield</code> per round, and <code>onDown</code>. Tracks end the game at <code>lose</code> or below <code>loseBelow</code>; the AI wins at <code>end.aiShare</code> of the places. Any rule can carry a <code>rhetoric</code> line: the claim it makes.
            </p>
          </details>
        </aside>
      </div>
    </div>
  );
}

// The ruleset read back in words, so a change in the JSON shows up as a change in the game.
function Reading({ rules }) {
  return (
    <div className="reading">
      <p className="eyebrow">What this game says</p>
      {rules.premise ? <p>{rules.premise}</p> : null}
      <p>
        <strong>The AI's goal:</strong> {rules.goal?.label || "(none)"}
        {rules.goal?.rhetoric ? <span className="claim">{rules.goal.rhetoric}</span> : null}
      </p>
      <p>
        <strong>Cards:</strong>{" "}
        {(rules.ai?.deck || []).map((c, i) => (
          <span key={c.id || i}>
            {i ? "; " : ""}
            {c.label}
            {c.proposal ? " (asks)" : ""}
            {c.hidden ? " (hidden)" : ""}: {describe(rules, c.effects)}
          </span>
        ))}
      </p>
      <p>
        <strong>Factions:</strong>{" "}
        {(rules.factions || []).map((f, i) => (
          <span key={f.id || i}>
            {i ? "; " : ""}
            {f.label} ({f.goal || "no private goal"})
          </span>
        ))}
      </p>
      {(rules.notModeled || []).length ? (
        <p>
          <strong>Leaves out:</strong> {rules.notModeled.join("; ")}
        </p>
      ) : null}
    </div>
  );
}
