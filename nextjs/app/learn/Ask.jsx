"use client";

import { useState } from "react";

// One question, start to finish: answer it (pick a choice, or write), see the answer, mark yourself if it was written,
// then say how sure you are. Calls onDone with the pieces of an attempt. Used by the map and the practice round.

// ---- Tuning ----
const ASK_THINKING = true; // offer a "thinking out loud" box under written answers
const CONFIDENCE = [
  { value: 1, label: "Guess" },
  { value: 2, label: "Unsure" },
  { value: 3, label: "Fairly sure" },
  { value: 4, label: "Obviously true" },
];
// ----

export default function Ask({ proposition, question, onDone, onSkip }) {
  const [response, setResponse] = useState("");
  const [thinking, setThinking] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState(null);
  const choice = question.kind === "choice" && Array.isArray(question.choices);

  const pick = (option) => {
    setResponse(option);
    setResult(option === question.answer ? "correct" : "incorrect");
    setRevealed(true);
  };

  return (
    <div className="lg-ask">
      <p className="eyebrow">{proposition.name}</p>
      <h2 className="lg-prompt">{question.prompt}</h2>

      {choice ? (
        <div className="lg-choices">
          {question.choices.map((option) => (
            <button
              key={option}
              type="button"
              className={`lg-choice${revealed && option === question.answer ? " right" : ""}${revealed && option === response && option !== question.answer ? " wrong" : ""}`}
              disabled={revealed}
              onClick={() => pick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <>
          <textarea className="lg-text" rows={3} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Your answer" disabled={revealed} />
          {ASK_THINKING && !revealed && <textarea className="lg-text lg-thinking" rows={2} value={thinking} onChange={(e) => setThinking(e.target.value)} placeholder="Thinking out loud (optional): what you weighed, what you nearly said" />}
          {!revealed && (
            <div className="lg-row">
              <button type="button" className="button primary" disabled={!response.trim()} onClick={() => setRevealed(true)}>Check</button>
              {onSkip && <button type="button" className="linkish" onClick={onSkip}>Not now</button>}
            </div>
          )}
        </>
      )}

      {revealed && (
        <div className="lg-reveal">
          <p className="lg-answer"><span className="eyebrow">Answer</span>{question.answer}</p>
          {!choice && (
            <div className="lg-row" role="group" aria-label="Mark your answer">
              <span className="muted">Did you have it?</span>
              {[["correct", "Yes"], ["partial", "Partly"], ["incorrect", "No"]].map(([value, label]) => (
                <button key={value} type="button" className={`button${result === value ? " primary" : ""}`} onClick={() => setResult(value)}>{label}</button>
              ))}
            </div>
          )}
          {choice && <p className={result === "correct" ? "lg-ok" : "lg-bad"}>{result === "correct" ? "Right." : "Not this time."}</p>}
          {result && (
            <div className="lg-row" role="group" aria-label="How sure are you now">
              <span className="muted">How sure are you now?</span>
              {CONFIDENCE.map((c) => (
                <button key={c.value} type="button" className="button" onClick={() => onDone({ response, thinking: thinking.trim() || null, result, confidence: c.value })}>
                  {c.value}<small>{c.label}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
