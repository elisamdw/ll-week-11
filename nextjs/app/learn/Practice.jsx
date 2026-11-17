"use client";

import { useState } from "react";
import Ask from "./Ask.jsx";
import { ROUND_SIZE, drawRound } from "./status.js";

// A practice round drawn from what you have already tried: missed ideas come up most, held ones least
// (weights in status.js). Five questions, one at a time, then a tally.

export default function Practice({ graph, statuses, attempts, onAnswer }) {
  const [round, setRound] = useState(null);
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState([]);
  const tried = graph.propositions.filter((p) => ["held", "shaky", "missed"].includes(statuses[p.id])).length;

  const start = () => {
    setRound(drawRound(graph.propositions, statuses, attempts));
    setStep(0);
    setTally([]);
  };

  if (!tried) return <div className="lg-panel"><p>Practice draws from ideas you have answered at least once. Open a node on the map and answer it first.</p></div>;

  if (!round) {
    return (
      <div className="lg-panel">
        <h2>Practice round</h2>
        <p className="muted">Up to {ROUND_SIZE} questions from the {tried} {tried === 1 ? "idea" : "ideas"} you have tried, the shaky and missed ones most often. The question won't name the idea.</p>
        <button type="button" className="button primary" onClick={start}>Start a round</button>
      </div>
    );
  }

  if (step >= round.length) {
    const right = tally.filter((t) => t.result === "correct").length;
    return (
      <div className="lg-panel">
        <h2>{right} of {round.length}</h2>
        <ul className="lg-tally">
          {tally.map((t, i) => (
            <li key={i} className={t.result}>{t.name}: {t.result}{t.confidence ? `, sure ${t.confidence}/4` : ""}</li>
          ))}
        </ul>
        <button type="button" className="button primary" onClick={start}>Another round</button>
      </div>
    );
  }

  const { proposition, question } = round[step];
  return (
    <div className="lg-panel">
      <p className="muted">Question {step + 1} of {round.length}</p>
      <Ask
        key={`${step}-${proposition.id}`}
        proposition={{ ...proposition, name: "Practice" }}
        question={question}
        onDone={(answer) => {
          onAnswer({ proposition, question, ...answer });
          setTally((t) => [...t, { name: proposition.name, ...answer }]);
          setStep((s) => s + 1);
        }}
      />
    </div>
  );
}
