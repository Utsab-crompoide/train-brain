"use client";

import React from "react";
import { useCommonThread } from "@/hooks/useCommonThread";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import SunIcon from "@/public/assets/sun-icon.svg";
import MoonIcon from "@/public/assets/moon-icon.svg";
import LockIcon from "@/public/assets/lock-icon.svg";
import CheckIcon from "@/public/assets/check-icon.svg";
import HintIcon from "@/public/assets/hint-icon.svg";

function WordRow({ word, revealed, isNew, isDark }: { word: string; revealed: boolean; isNew: boolean; isDark: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-all duration-500 ${
        revealed ? (isDark ? "border-gray-700 bg-gray-800/60" : "border-gray-300 bg-gray-100") : isDark ? "border-gray-800 bg-gray-900/40" : "border-gray-200 bg-gray-50/60"
      } ${isNew ? "animate-slide-in" : ""}`}
    >
      <span className={`text-lg font-semibold tracking-wide transition-colors duration-300 ${revealed ? (isDark ? "text-white" : "text-gray-900") : isDark ? "text-gray-300 select-none" : "text-black select-none"}`}>{revealed ? word : "•".repeat(word.length)}</span>

      <span className="flex items-center justify-center w-7 h-7">
        {revealed ? (
          <Image src={CheckIcon} alt="Revealed" width={20} height={20} className={`w-5 h-5`} />
        ) : (
          <Image
            src={LockIcon}
            alt="Locked"
            width={20}
            height={20}
            className={`w-5 h-5`}
            style={{
              filter: isDark ? "invert(1)" : "invert(0.4)",
            }}
          />
        )}
      </span>
    </div>
  );
}

function ProgressDots({ total, revealed, isDark }: { total: number; revealed: number; isDark: boolean }) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-2 w-8 rounded-full transition-all duration-300 ${i < revealed ? "bg-indigo-500" : isDark ? "bg-gray-700" : "bg-gray-200"}`} />
      ))}
    </div>
  );
}

function HintBoxes({ answer, hintsRevealed, gameStatus, isDark }: { answer: string; hintsRevealed: number; gameStatus: "playing" | "won" | "lost"; isDark: boolean }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {answer.split("").map((char, i) => {
        const isHintRevealed = i < hintsRevealed;
        const isGuessRevealed = gameStatus !== "playing";
        const shouldShowChar = isHintRevealed || isGuessRevealed;

        return (
          <div
            key={i}
            className={`flex items-center justify-center rounded-xl border-2 text-xl font-black transition-all duration-300 ${
              isHintRevealed
                ? "border-indigo-500 bg-indigo-950 text-indigo-300"
                : isGuessRevealed
                  ? isDark
                    ? "border-gray-600 bg-gray-800 text-gray-400"
                    : "border-gray-300 bg-gray-200 text-gray-500"
                  : isDark
                    ? "border-gray-700 bg-gray-900 text-gray-700"
                    : "border-gray-200 bg-gray-100 text-gray-300"
            }`}
            style={{ width: 44, height: 52 }}
          >
            {shouldShowChar ? char.toUpperCase() : "?"}
          </div>
        );
      })}
    </div>
  );
}

export default function CommonThreadPage() {
  const game = useCommonThread();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const canHint = !game.allHintsRevealed && game.status === "playing";

  return (
    <div className={`flex min-h-screen flex-col items-center font-sans transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700 text-yellow-300" : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"}`}
      >
        {isDark ? <Image src={MoonIcon} alt="Toggle theme" width={20} height={20} /> : <Image src={SunIcon} alt="Toggle theme" width={20} height={20} />}
      </button>

      <main className="flex w-full max-w-lg flex-col px-5 py-12 sm:px-8">
        <div className="mb-8">
          <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-gray-900"}`}>Common Thread</h1>
          <p className={`mt-2 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>What links these words?</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                game.puzzle.difficulty === "easy"
                  ? isDark
                    ? "bg-green-900/30 text-green-400 border border-green-700"
                    : "bg-green-50 text-green-700 border border-green-200"
                  : game.puzzle.difficulty === "medium"
                    ? isDark
                      ? "bg-yellow-900/30 text-yellow-400 border border-yellow-700"
                      : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : isDark
                      ? "bg-red-900/30 text-red-400 border border-red-700"
                      : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {game.puzzle.difficulty === "easy" ? "🟢 Easy" : game.puzzle.difficulty === "medium" ? "🟡 Medium" : "🔴 Hard"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className={`mb-2 text-xs text-center tracking-widest uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {game.revealedCount} of {game.puzzle.words.length} words revealed
          </p>
          <ProgressDots total={game.puzzle.words.length} revealed={game.revealedCount} isDark={isDark} />
        </div>

        <div className={`flex flex-col gap-2 mb-6 ${game.shake ? "animate-shake" : ""}`}>
          {game.puzzle.words.map((word, i) => (
            <WordRow key={word} word={word} revealed={i < game.revealedCount} isNew={i === game.newlyRevealedIndex} isDark={isDark} />
          ))}
        </div>

        {(game.hintsRevealed > 0 || game.status !== "playing") && (
          <div className="mb-6 flex flex-col items-center gap-3">
            <p className={`text-xs uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>Answer hint</p>
            <HintBoxes answer={game.puzzle.answer} hintsRevealed={game.hintsRevealed} gameStatus={game.status} isDark={isDark} />
          </div>
        )}

        {game.feedback && (
          <div
            className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium border ${
              game.feedback.type === "success"
                ? isDark
                  ? "bg-green-900/40 text-green-300 border-green-800"
                  : "bg-green-50 text-green-700 border-green-200"
                : game.feedback.type === "error"
                  ? isDark
                    ? "bg-red-900/40 text-red-300 border-red-800"
                    : "bg-red-50 text-red-600 border-red-200"
                  : isDark
                    ? "bg-indigo-900/40 text-indigo-300 border-indigo-800"
                    : "bg-indigo-50 text-indigo-600 border-indigo-200"
            }`}
          >
            {game.feedback.text} <br />
            {game.feedback.type === "showHint" && <span>Hint: {game.puzzle.hint}</span>}
          </div>
        )}

        {game.status === "playing" && (
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              value={game.guess}
              onChange={(e) => game.setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && game.submitGuess()}
              placeholder="Enter your guess…"
              className={`w-full rounded-xl px-5 py-4 text-base outline-none transition-all border ${
                isDark ? "bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 shadow-sm"
              }`}
              autoFocus
            />

            <div className="flex gap-3">
              <button onClick={game.submitGuess} disabled={!game.guess.trim()} className="flex-1 rounded-2xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 text-sm tracking-wide transition-all duration-200 active:scale-95">
                Submit
              </button>

              <button
                onClick={game.revealNextHint}
                disabled={!canHint}
                title="Reveal next hint letter"
                className={`flex items-center gap-1.5 rounded-2xl font-semibold px-5 py-4 text-xs tracking-wide transition-all duration-200 active:scale-95 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${
                  isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 shadow-sm"
                }`}
              >
                <Image
                  src={HintIcon}
                  alt="Hint"
                  width={16}
                  height={16}
                  className={`w-4 h-4 shrink-0`}
                  style={{
                    filter: isDark ? "invert(1)" : "invert(0.4)",
                  }}
                />
                Word Hint
              </button>
            </div>
          </div>
        )}

        {game.status !== "playing" && (
          <button onClick={game.nextPuzzle} className="w-full mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 text-sm tracking-wide transition-all duration-200 active:scale-95">
            Next Puzzle →
          </button>
        )}

        <p className={`mt-8 text-center text-xs ${isDark ? "text-gray-700" : "text-black"}`}>
          Puzzle {game.puzzleIndex + 1} / {game.totalPuzzles}
        </p>
      </main>

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
