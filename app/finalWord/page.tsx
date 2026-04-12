"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import SunIcon from "@/public/assets/sun-icon.svg";
import MoonIcon from "@/public/assets/moon-icon.svg";
import { useFinalWord } from "@/hooks/useFinalWord";
import { PUZZLES, getDailyPuzzle } from "@/data/finalWordPuzzles";
import type { RowState } from "@/hooks/useFinalWord";

const DAILY_PUZZLE = getDailyPuzzle();
const DAILY_INDEX = PUZZLES.findIndex((p) => p.id === DAILY_PUZZLE.id);

interface CellProps {
  letter: string;
  reveal: "idle" | "correct" | "wrong";
  isDark: boolean;
  colIndex: number;
}

function Cell({ letter, reveal, isDark, colIndex }: CellProps) {
  const base = "flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 text-2xl font-bold uppercase tracking-widest select-none transition-all duration-200";

  const stateClass =
    reveal === "correct"
      ? isDark
        ? "bg-emerald-600 border-emerald-500 text-white"
        : "bg-emerald-500 border-emerald-400 text-white"
      : reveal === "wrong"
        ? isDark
          ? "bg-red-700 border-red-600 text-white"
          : "bg-red-500 border-red-400 text-white"
        : letter
          ? isDark
            ? "bg-gray-700 border-gray-500 text-white"
            : "bg-gray-100 border-gray-400 text-gray-900"
          : isDark
            ? "bg-transparent border-gray-700 text-white"
            : "bg-transparent border-gray-300 text-gray-900";

  return (
    <div className={`${base} ${stateClass}`} style={{ animationDelay: `${colIndex * 60}ms` }}>
      {letter}
    </div>
  );
}

interface RowProps {
  row: RowState;
  isDark: boolean;
  divRef: (el: HTMLDivElement | null) => void;
}

function Row({ row, isDark, divRef }: RowProps) {
  const isLocked = row.status === "locked";
  const isWrong = row.status === "wrong";
  const isCorrect = row.status === "correct";

  const revealState: "idle" | "correct" | "wrong" = isCorrect ? "correct" : isWrong ? "wrong" : "idle";

  return (
    <div ref={divRef} className={`flex gap-2 transition-all duration-300 ${isLocked ? "opacity-30" : ""} ${isWrong ? "animate-shake" : ""}`}>
      {row.letters.map((letter, ci) => (
        <Cell key={ci} letter={isLocked ? "" : letter} reveal={revealState} isDark={isDark} colIndex={ci} />
      ))}
    </div>
  );
}


export default function FinalWord() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Initialize randomized puzzle sequence
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentPositionInShuffle, setCurrentPositionInShuffle] = useState(0);

  useEffect(() => {
    // Create shuffled indices on mount
    const indices = Array.from({ length: PUZZLES.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
  }, []);

  const puzzleIndex = shuffledIndices.length > 0 ? shuffledIndices[currentPositionInShuffle] : 0;
  const puzzle = PUZZLES[puzzleIndex];

  const { rows, activeRowIndex, finalUnlocked, puzzleSolved, submitFinalRow, isFinalRowFilled, rowRefs, focusRow, typeLetter, deleteLetter } =
    useFinalWord(puzzle);

  useEffect(() => {
    rowRefs.current[activeRowIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeRowIndex, rowRefs]);

  const finalRowIndex = rows.length - 1;

  const handleNextPuzzle = () => {
    const nextPos = currentPositionInShuffle + 1;
    if (nextPos >= PUZZLES.length) {
      // All puzzles completed, restart with new shuffle
      const indices = Array.from({ length: PUZZLES.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledIndices(indices);
      setCurrentPositionInShuffle(0);
    } else {
      setCurrentPositionInShuffle(nextPos);
    }
  };

  return (
    <div className={`flex min-h-screen flex-col items-center font-sans transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-white"}`}>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700 text-yellow-300" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
      >
        {isDark ? <Image src={MoonIcon} alt="Dark mode" width={20} height={20} /> : <Image src={SunIcon} alt="Light mode" width={20} height={20} />}
      </button>

      <main className={`flex w-full max-w-lg flex-col items-center px-4 pt-16 gap-6 pb-6`}>
        <div className="text-center">
          <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-gray-900"}`}>The Final Word</h1>
          <p className={`mt-1 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Solve each word, unlock the last.</p>
        </div>

        {!puzzleSolved && (
          <div className={`w-full rounded-xl px-4 py-3 text-center text-sm font-medium transition-all duration-300 ${isDark ? "bg-gray-800 text-gray-200 border border-gray-700" : "bg-gray-50 text-gray-700 border border-gray-200"}`}>
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>Hint #{activeRowIndex + 1}</span>
            <p className="mt-0.5">{rows[activeRowIndex]?.hint}</p>
          </div>
        )}

        {/* ── Game grid ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 w-full items-center">
          {rows.map((row, ri) => {
            const isFinalRow = ri === finalRowIndex;
            const isSelectable = !isFinalRow && !puzzleSolved && row.status !== "correct" && rows[finalRowIndex].status !== "active";

            return (
              <div key={ri} className="flex flex-col items-center gap-1 w-full">
                {/* Dashed divider before the final row */}
                {isFinalRow && <div className={`w-full max-w-xs border-t-2 border-dashed my-1 ${finalUnlocked ? (isDark ? "border-emerald-600" : "border-emerald-400") : isDark ? "border-gray-700" : "border-gray-300"}`} />}

                {/* Lock label when final row is still locked */}
                {isFinalRow && row.status === "locked" && <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>🔒 Solve all four to unlock</p>}

                {/* Row cells — clickable for regular rows */}
                <div className={`relative ${isSelectable || ri === activeRowIndex ? "cursor-pointer" : ""}`}>
                  {(isSelectable || ri === activeRowIndex) && !puzzleSolved && (
                    <input
                      type="text"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 text-[16px] focus:outline-none"
                      value={" " + row.letters.join("")}
                      onFocus={(e) => {
                        if (isSelectable && ri !== activeRowIndex) {
                          focusRow(ri);
                        }
                        const len = e.currentTarget.value.length;
                        e.currentTarget.setSelectionRange(len, len);
                      }}
                      onClick={(e) => {
                        const len = e.currentTarget.value.length;
                        e.currentTarget.setSelectionRange(len, len);
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value.toUpperCase();
                        const currentValue = " " + row.letters.join("");

                        if (newValue.length < currentValue.length) {
                          const times = currentValue.length - newValue.length;
                          for (let i = 0; i < times; i++) deleteLetter();
                        } else if (newValue.length > currentValue.length) {
                          const added = newValue.slice(currentValue.length);
                          for (const char of added) {
                            if (/^[A-Z]$/.test(char)) {
                              typeLetter(char);
                            }
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Backspace" && e.currentTarget.value.length <= 1) {
                          deleteLetter();
                        }
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="characters"
                      spellCheck="false"
                      title={isSelectable ? `Play row ${ri + 1}` : undefined}
                    />
                  )}
                  <div title={isSelectable ? `Play row ${ri + 1}` : undefined}>
                    <Row
                      row={row}
                      isDark={isDark}
                      divRef={(el) => {
                        rowRefs.current[ri] = el;
                      }}
                    />
                  </div>
                </div>

                {/* Active row indicator dot (regular rows only) */}
                {ri === activeRowIndex && !isFinalRow && !puzzleSolved && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isDark ? "bg-emerald-400" : "bg-emerald-500"}`} />}

                {/* Submit button — only for the final row once unlocked */}
                {isFinalRow && finalUnlocked && !puzzleSolved && (
                  <button
                    onClick={submitFinalRow}
                    disabled={!isFinalRowFilled}
                    className={`mt-2 px-8 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
                      isFinalRowFilled
                        ? isDark
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 active:scale-95"
                          : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-200 active:scale-95"
                        : isDark
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Submit
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Progress bar ─────────────────────────────────────────── */}
        <div className="w-full max-w-xs mt-2">
          <div className={`text-xs text-center mb-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            {rows.filter((r) => r.status === "correct").length} / {rows.length} solved
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${(rows.filter((r) => r.status === "correct").length / rows.length) * 100}%`,
              }}
            />
          </div>
        </div>
        {/* ── Win banner ───────────────────────────────────────────── */}
        {puzzleSolved && (
          <div className="flex flex-col items-center gap-3 w-full animate-fade-in">
            <div className={`w-full rounded-xl px-4 py-4 text-center font-bold text-lg ${isDark ? "bg-emerald-900 text-emerald-300 border border-emerald-700" : "bg-emerald-50 text-emerald-700 border border-emerald-300"}`}>🎉 Puzzle Solved! Great climb!</div>
            <button
              onClick={handleNextPuzzle}
              className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 ${
                isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40" : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-200"
              }`}
            >
              Next Puzzle →
            </button>
          </div>
        )}
      </main>



      {/* ── Global animations ────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          15% {
            transform: translateX(-6px);
          }
          30% {
            transform: translateX(6px);
          }
          45% {
            transform: translateX(-5px);
          }
          60% {
            transform: translateX(5px);
          }
          75% {
            transform: translateX(-3px);
          }
          90% {
            transform: translateX(3px);
          }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
