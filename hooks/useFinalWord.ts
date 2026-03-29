"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Puzzle } from "@/data/finalWordPuzzles";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RowStatus = "idle" | "active" | "correct" | "wrong" | "locked";

export interface RowState {
  /** Current typed letters, one per cell */
  letters: string[];
  /** Validation / animation state of the row */
  status: RowStatus;
  /** Hint text shown above the submit button */
  hint: string;
  /** Expected answer (uppercase) */
  answer: string;
  /** Number of characters expected */
  length: number;
}

export interface FinalWordState {
  rows: RowState[];
  /** Index of the row currently focused (0-4) */
  activeRowIndex: number;
  /** True when all 4 regular rows are solved and the final row is unlocked */
  finalUnlocked: boolean;
  /** True when the entire puzzle (including final word) is solved */
  puzzleSolved: boolean;
}

export interface FinalWordActions {
  /** Type a letter into the active row */
  typeLetter: (letter: string) => void;
  /** Delete the last letter in the active row */
  deleteLetter: () => void;
  /**
   * Submit the final (locked→active) row. Only valid for row index 4.
   * For rows 1–4 submission is automatic when the last letter is typed.
   */
  submitFinalRow: () => void;
  /**
   * True when the final row is fully filled (all letters typed).
   * Use this to enable/disable the Submit button in the UI.
   */
  isFinalRowFilled: boolean;
  /** Programmatically focus a specific row (for tap-to-focus on mobile) */
  focusRow: (index: number) => void;
  /** Ref array for the row container elements (useful for scrolling on mobile) */
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

const TOTAL_ROWS = 5; // 4 regular + 1 final

function buildInitialRows(puzzle: Puzzle): RowState[] {
  const regularRows: RowState[] = puzzle.rows.map((row, i) => ({
    letters: Array(row.answer.length).fill(""),
    status: i === 0 ? "active" : "idle",
    hint: row.hint,
    answer: row.answer.toUpperCase(),
    length: row.answer.length,
  }));

  const finalRow: RowState = {
    letters: Array(puzzle.finalWord.length).fill(""),
    status: "locked",
    hint: puzzle.finalHint,
    answer: puzzle.finalWord.toUpperCase(),
    length: puzzle.finalWord.length,
  };

  return [...regularRows, finalRow];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useFinalWord
 *
 * Encapsulates all game logic for the Cross Climb puzzle game.
 * The hook is UI-agnostic: it exposes plain state and action callbacks
 * so the same logic can drive a web UI (React) or a mobile UI (React Native).
 *
 * @param puzzle - The puzzle data to play
 */
export function useFinalWord(puzzle: Puzzle): FinalWordState & FinalWordActions {
  const [rows, setRows] = useState<RowState[]>(() => buildInitialRows(puzzle));
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [finalUnlocked, setFinalUnlocked] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // Re-initialise when the puzzle changes (e.g. user picks a different puzzle)
  useEffect(() => {
    setRows(buildInitialRows(puzzle));
    setActiveRowIndex(0);
    setFinalUnlocked(false);
    setPuzzleSolved(false);
  }, [puzzle]);

  // Refs for row containers so the parent can scroll them into view on mobile
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  /** Return the cursor position (index of first empty cell) in a row */
  const getCursor = useCallback((letters: string[]): number => {
    const idx = letters.findIndex((l) => l === "");
    return idx === -1 ? letters.length : idx;
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────

  const typeLetter = useCallback(
    (letter: string) => {
      const upper = letter.toUpperCase();
      if (!/^[A-Z]$/.test(upper)) return;

      setRows((prev) => {
        const row = prev[activeRowIndex];
        if (row.status !== "active") return prev;

        const cursor = getCursor(row.letters);
        if (cursor >= row.length) return prev; // row full

        const newLetters = [...row.letters];
        newLetters[cursor] = upper;
        const updated = [...prev];
        updated[activeRowIndex] = { ...row, letters: newLetters };

        // Auto-submit for regular rows (indices 0–3) when last letter is typed
        const isFinalRow = activeRowIndex === TOTAL_ROWS - 1;
        const isNowFull = cursor === row.length - 1;

        if (!isFinalRow && isNowFull) {
          const guess = newLetters.join("");
          const isCorrect = guess === row.answer;
          updated[activeRowIndex] = {
            ...updated[activeRowIndex],
            status: isCorrect ? "correct" : "wrong",
          };

          if (isCorrect) {
            const isLastRegular = activeRowIndex === TOTAL_ROWS - 2;
            const nextRowIndex = isLastRegular ? TOTAL_ROWS - 1 : activeRowIndex + 1;

            updated[nextRowIndex] = {
              ...updated[nextRowIndex],
              status: "active",
            };

            if (isLastRegular) {
              setFinalUnlocked(true);
            }
            setActiveRowIndex(nextRowIndex);
          }
          // wrong case: shake + reset handled by the useEffect below
        }

        return updated;
      });
    },
    [activeRowIndex, getCursor],
  );

  const deleteLetter = useCallback(() => {
    setRows((prev) => {
      const row = prev[activeRowIndex];
      if (row.status !== "active") return prev;

      const cursor = getCursor(row.letters);
      const deleteAt = cursor === row.length ? cursor - 1 : cursor - 1;
      if (deleteAt < 0) return prev;

      const newLetters = [...row.letters];
      newLetters[deleteAt] = "";
      const updated = [...prev];
      updated[activeRowIndex] = { ...row, letters: newLetters };
      return updated;
    });
  }, [activeRowIndex, getCursor]);

  /** Only called by the Submit button for the final row */
  const submitFinalRow = useCallback(() => {
    setRows((prev) => {
      const finalIndex = TOTAL_ROWS - 1;
      const row = prev[finalIndex];
      if (row.status !== "active") return prev;

      const guess = row.letters.join("");
      if (guess.length < row.length) return prev; // button should be disabled, but guard anyway

      const isCorrect = guess === row.answer;
      const updated = [...prev];
      updated[finalIndex] = { ...row, status: isCorrect ? "correct" : "wrong" };

      if (isCorrect) {
        setPuzzleSolved(true);
      }
      // wrong: shake + reset handled by the useEffect below
      return updated;
    });
  }, []);

  // Reset "wrong" status back to "active" after the shake animation completes
  useEffect(() => {
    const wrongRow = rows[activeRowIndex];
    if (!wrongRow || wrongRow.status !== "wrong") return;

    const timer = setTimeout(() => {
      setRows((prev) => {
        const updated = [...prev];
        // Clear letters so user can retype
        updated[activeRowIndex] = {
          ...updated[activeRowIndex],
          letters: Array(updated[activeRowIndex].length).fill(""),
          status: "active",
        };
        return updated;
      });
    }, 600); // match shake animation duration

    return () => clearTimeout(timer);
  }, [rows, activeRowIndex]);

  const focusRow = useCallback(
    (index: number) => {
      const row = rows[index];
      if (!row || row.status === "locked" || row.status === "correct") return;
      setActiveRowIndex(index);
    },
    [rows],
  );

  // ── Keyboard listener (web-only convenience; ignored by React Native) ─────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Backspace") {
        deleteLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        typeLetter(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typeLetter, deleteLetter]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const isFinalRowFilled = useMemo(() => {
    const finalRow = rows[TOTAL_ROWS - 1];
    return finalRow.letters.every((l) => l !== "");
  }, [rows]);

  const state = useMemo<FinalWordState>(() => ({ rows, activeRowIndex, finalUnlocked, puzzleSolved }), [rows, activeRowIndex, finalUnlocked, puzzleSolved]);

  return {
    ...state,
    typeLetter,
    deleteLetter,
    submitFinalRow,
    isFinalRowFilled,
    focusRow,
    rowRefs,
  };
}
