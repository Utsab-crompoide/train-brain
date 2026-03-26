"use client";

import React from "react";
import {
  useCommonThread,
  MAX_ATTEMPTS,
} from "@/hooks/useCommonThread";

// ─── Sub-components (purely presentational) ────────────────────────────────────

/** One row in the word list. Hides the word text until revealed. */
function WordRow({
  word,
  revealed,
  isNew,
}: {
  word: string;
  revealed: boolean;
  isNew: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-all duration-500 ${
        revealed
          ? "border-gray-700 bg-gray-800/60"
          : "border-gray-800 bg-gray-900/40"
      } ${isNew ? "animate-slide-in" : ""}`}
    >
      <span
        className={`text-lg font-semibold tracking-wide ${
          revealed ? "text-white" : "text-gray-800 select-none"
        }`}
      >
        {/* Hide the actual word until revealed */}
        {revealed ? word : "•".repeat(word.length)}
      </span>

      <span className="flex items-center justify-center w-7 h-7 rounded-full">
        {revealed ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15" />
            <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
            <path
              d="M7.5 12l3 3 6-6"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 11V7a4 4 0 018 0v4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </div>
  );
}

/** Dots bar showing remaining attempts */
function AttemptsBar({
  remaining,
  max,
}: {
  remaining: number;
  max: number;
}) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-8 rounded-full transition-all duration-300 ${
            i < remaining ? "bg-indigo-500" : "bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Hint display — shows boxes for each letter of the answer.
 * Revealed letters are shown; others show a blank placeholder box.
 */
function HintBoxes({
  answer,
  hintsRevealed,
}: {
  answer: string;
  hintsRevealed: number;
}) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {answer.split("").map((char, i) => {
        const isRevealed = i < hintsRevealed;
        return (
          <div
            key={i}
            className={`flex items-center justify-center rounded-xl border-2 text-xl font-black transition-all duration-300 ${
              isRevealed
                ? "border-indigo-500 bg-indigo-950 text-indigo-300"
                : "border-gray-700 bg-gray-900 text-transparent"
            }`}
            style={{ width: 44, height: 52 }}
          >
            {isRevealed ? char.toUpperCase() : "?"}
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommonThreadPage() {
  const game = useCommonThread();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-950 font-sans">
      <main className="flex w-full max-w-lg flex-col px-5 py-12 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Common Thread
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            What links these words?
          </p>
        </div>

        {/* Attempts bar */}
        <div className="mb-6">
          <p className="mb-2 text-xs text-gray-500 text-center tracking-widest uppercase">
            Attempts remaining
          </p>
          <AttemptsBar remaining={game.attemptsLeft} max={MAX_ATTEMPTS} />
        </div>

        {/* Word list */}
        <div
          className={`flex flex-col gap-2 mb-6 ${
            game.shake ? "animate-shake" : ""
          }`}
        >
          {game.puzzle.words.map((word, i) => (
            <WordRow
              key={word}
              word={word}
              revealed={i < game.revealedCount}
              isNew={i === game.newlyRevealedIndex}
            />
          ))}
        </div>

        {/* Hint letter boxes — shown once at least one hint letter is revealed */}
        {game.hintsRevealed > 0 && (
          <div className="mb-6 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Hint — letter{game.hintsRevealed > 1 ? "s" : ""} revealed
            </p>
            <HintBoxes
              answer={game.puzzle.answer}
              hintsRevealed={game.hintsRevealed}
            />
          </div>
        )}

        {/* Feedback */}
        {game.feedback && (
          <div
            className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
              game.feedback.type === "success"
                ? "bg-green-900/40 text-green-300 border border-green-800"
                : game.feedback.type === "error"
                ? "bg-red-900/40 text-red-300 border border-red-800"
                : "bg-indigo-900/40 text-indigo-300 border border-indigo-800"
            }`}
          >
            {game.feedback.text}
          </div>
        )}

        {/* Guess input + action buttons */}
        {game.status === "playing" && (
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              value={game.guess}
              onChange={(e) => game.setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && game.submitGuess()}
              placeholder="Enter your guess…"
              className="w-full rounded-xl bg-gray-900 border border-gray-700 px-5 py-4 text-white placeholder-gray-600 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />

            <div className="flex gap-3">
              {/* Submit */}
              <button
                onClick={game.submitGuess}
                disabled={!game.guess.trim()}
                className="flex-1 rounded-2xl bg-indigo-500 hover:bg-indigo-400 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 text-sm tracking-wide transition-all duration-200 active:scale-95"
              >
                Submit
              </button>

              {/* Reveal next word */}
              <button
                onClick={game.revealNextWord}
                disabled={!game.canRevealWord}
                title="Reveal next word (costs 1 attempt)"
                className="flex items-center gap-1.5 rounded-2xl bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-700 disabled:cursor-not-allowed text-gray-300 font-semibold px-4 py-4 text-xs tracking-wide transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Word
              </button>

              {/* Reveal next hint letter */}
              <button
                onClick={game.revealNextHint}
                disabled={!game.canRevealHint}
                title="Reveal next hint letter (costs 1 attempt)"
                className="flex items-center gap-1.5 rounded-2xl bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-700 disabled:cursor-not-allowed text-gray-300 font-semibold px-4 py-4 text-xs tracking-wide transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Hint
              </button>
            </div>
          </div>
        )}

        {/* End-state CTA */}
        {game.status !== "playing" && (
          <button
            onClick={game.nextPuzzle}
            className="w-full mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 text-sm tracking-wide transition-all duration-200 active:scale-95"
          >
            Next Puzzle →
          </button>
        )}

        {/* Puzzle counter */}
        <p className="mt-8 text-center text-xs text-gray-700">
          Puzzle {game.puzzleIndex + 1} / {game.totalPuzzles}
        </p>
      </main>

      {/* Keyframe animations */}
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        .animate-slide-in { animation: slide-in 0.35s ease both; }
        .animate-shake     { animation: shake 0.45s ease; }
      `}</style>
    </div>
  );
}