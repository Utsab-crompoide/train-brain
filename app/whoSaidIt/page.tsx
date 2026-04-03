"use client";

import React from "react";
import { useWhoSaidIt } from "@/hooks/useWhoSaidIt";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import SunIcon from "@/public/assets/sun-icon.svg";
import MoonIcon from "@/public/assets/moon-icon.svg";
import HintIcon from "@/public/assets/hint-icon.svg";

// ─── Difficulty Badge ────────────────────────────────────────────────────────

function DifficultyBadge({
  difficulty,
  isDark,
}: {
  difficulty: string;
  isDark: boolean;
}) {
  const colors: Record<string, string> = {
    easy: isDark
      ? "bg-emerald-900/50 text-emerald-400 border-emerald-800"
      : "bg-emerald-50 text-emerald-600 border-emerald-200",
    medium: isDark
      ? "bg-amber-900/50 text-amber-400 border-amber-800"
      : "bg-amber-50 text-amber-600 border-amber-200",
    hard: isDark
      ? "bg-red-900/50 text-red-400 border-red-800"
      : "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

// ─── Progress Dots ───────────────────────────────────────────────────────────

function ProgressDots({
  total,
  current,
  isDark,
}: {
  total: number;
  current: number;
  isDark: boolean;
}) {
  return (
    <div className="flex gap-1.5 justify-center flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-5 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-indigo-500"
              : i === current
              ? "bg-indigo-400/60"
              : isDark
              ? "bg-gray-700"
              : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Streak Badge ────────────────────────────────────────────────────────────

function StreakBadge({ streak, isDark }: { streak: number; isDark: boolean }) {
  if (streak >= 2) {
    return (
      <div
        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
          isDark
            ? "bg-orange-900/40 border-orange-800 text-orange-400"
            : "bg-orange-50 border-orange-200 text-orange-600"
        }`}
      >
        🔥 {streak} streak
      </div>
    );
  }

  return (
    <span
      className={`text-xs font-medium ${
        isDark ? "text-gray-600" : "text-gray-400"
      }`}
    >
      No Streak
    </span>
  );
}

// ─── Option Card ─────────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong" | "disabled";

function OptionCard({
  text,
  state,
  isDark,
  onClick,
}: {
  text: string;
  state: OptionState;
  isDark: boolean;
  onClick: () => void;
}) {
  const isInteractive = state === "idle";

  const containerClass: Record<OptionState, string> = {
    idle: isDark
      ? "border-gray-700 bg-gray-900/40 hover:bg-gray-800/60 hover:border-gray-600 cursor-pointer active:scale-[0.98]"
      : "border-gray-200 bg-gray-50/60 hover:bg-white hover:border-gray-300 shadow-sm cursor-pointer active:scale-[0.98]",
    correct: isDark
      ? "border-emerald-600 bg-emerald-900/40 cursor-default"
      : "border-emerald-400 bg-emerald-50 cursor-default",
    wrong: isDark
      ? "border-red-700 bg-red-900/40 cursor-default"
      : "border-red-400 bg-red-50 cursor-default",
    disabled: isDark
      ? "border-gray-800 bg-gray-900/20 opacity-40 cursor-default"
      : "border-gray-300 bg-gray-100 opacity-60 cursor-default",
  };

  const textClass: Record<OptionState, string> = {
    idle: isDark ? "text-gray-200" : "text-gray-800",
    correct: isDark ? "text-emerald-300" : "text-emerald-700",
    wrong: isDark ? "text-red-300" : "text-red-700",
    disabled: isDark ? "text-gray-600" : "text-gray-500",
  };

  const icon: Record<OptionState, string | null> = {
    idle: null,
    correct: "✓",
    wrong: "✗",
    disabled: null,
  };

  return (
    <div
      className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-all duration-300 ${containerClass[state]}`}
      onClick={isInteractive ? onClick : undefined}
    >
      <span
        className={`text-sm font-semibold leading-snug transition-colors duration-300 ${textClass[state]}`}
      >
        {text}
      </span>
      {icon[state] && (
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ml-3 ${
            state === "correct"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {icon[state]}
        </span>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WhoSaidItPage() {
  const game = useWhoSaidIt();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const isOver = game.status === "correct" || game.status === "wrong-final";
  const isLastPuzzle = game.puzzleIndex + 1 >= game.totalPuzzles;

  function getOptionState(option: string): OptionState {
    const isAnswer = option === game.puzzle.answer;
    const isFirstWrong = option === game.firstWrongOption;

    if (!isOver) {
      // During wrong-once: keep first wrong pick highlighted red, rest idle
      if (isFirstWrong) return "wrong";
      return "idle";
    }

    // Game over
    if (isAnswer) return "correct";
    if (isFirstWrong || option === game.selectedOption) return "wrong";
    return "disabled";
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center font-sans transition-colors duration-300 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 ${
          isDark
            ? "bg-gray-800 hover:bg-gray-700 text-yellow-300"
            : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
        }`}
      >
        {isDark ? (
          <Image src={MoonIcon} alt="Toggle theme" width={20} height={20} />
        ) : (
          <Image src={SunIcon} alt="Toggle theme" width={20} height={20} />
        )}
      </button>

      <main className="flex w-full max-w-lg flex-col px-5 py-12 sm:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Who Said It?
          </h1>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Match the quote to the person who said it.
          </p>
        </div>

        {/* Streak row */}
        <div className="flex items-center justify-end mb-6">
          <StreakBadge streak={game.streak} isDark={isDark} />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <p
            className={`mb-2 text-xs text-center tracking-widest uppercase ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Puzzle {game.puzzleIndex + 1} of {game.totalPuzzles}
          </p>
          <ProgressDots
            total={game.totalPuzzles}
            current={game.puzzleIndex}
            isDark={isDark}
          />
        </div>

        {/* Quote card */}
        <div
          className={`mb-5 rounded-2xl px-6 py-5 border flex flex-col gap-3 ${
            isDark
              ? "bg-gray-900/60 border-gray-800"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs uppercase tracking-widest ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {game.puzzle.category}
            </span>
            <DifficultyBadge
              difficulty={game.puzzle.difficulty}
              isDark={isDark}
            />
          </div>
          <p
            className={`text-base font-semibold leading-relaxed ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            "{game.puzzle.quote}"
          </p>
        </div>

        {/* Options */}
        <div
          className={`flex flex-col gap-3 mb-5 ${
            game.shake ? "animate-shake" : ""
          }`}
        >
          {game.shuffledOptions.map((option) => (
            <OptionCard
              key={option}
              text={option}
              state={getOptionState(option)}
              isDark={isDark}
              onClick={() => game.select(option)}
            />
          ))}
        </div>

        {/* Feedback */}
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
            {game.feedback.text}
          </div>
        )}

        {/* Actions */}
        {!isOver ? (
          <button
            onClick={game.useHint}
            disabled={game.hintRevealed}
            className={`flex items-center justify-center gap-2 w-full rounded-2xl font-semibold px-5 py-4 text-sm tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 shadow-sm"
            }`}
          >
            <Image
              src={HintIcon}
              alt="Hint"
              width={16}
              height={16}
              className="w-4 h-4 shrink-0"
              style={{ filter: isDark ? "invert(1)" : "invert(0.4)" }}
            />
            {game.hintRevealed ? "Hint used" : "Get a Hint"}
          </button>
        ) : (
          <button
            onClick={game.nextPuzzle}
            disabled={isLastPuzzle}
            className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 text-sm tracking-wide transition-all duration-200 active:scale-95"
          >
            {isLastPuzzle ? "You've completed all puzzles! 🎉" : "Next Puzzle →"}
          </button>
        )}

        <p
          className={`mt-8 text-center text-xs ${
            isDark ? "text-gray-700" : "text-gray-400"
          }`}
        >
          Hints used: {game.hintsUsed}
        </p>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.45s ease; }
      `}</style>
    </div>
  );
}