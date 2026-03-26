/**
 * useCommonThread — All game logic for the Common Thread puzzle.
 *
 * Completely UI-agnostic: no JSX, no CSS, no web-only APIs.
 * Drop this file into React Native and build your own UI on top.
 *
 * Behaviour:
 *  - First INITIAL_WORDS_SHOWN words are visible at start.
 *  - Each "Reveal Word" press shows the next hidden word (costs 1 attempt).
 *  - Each "Hint" press reveals the next letter of the answer (costs 1 attempt).
 *  - Correct guess wins; running out of attempts loses.
 */

import { useState, useCallback, useEffect } from "react";
import { PUZZLES, type Puzzle } from "../data/puzzle";

// ─── Constants ────────────────────────────────────────────────────────────────

export const INITIAL_WORDS_SHOWN = 2;
export const MAX_ATTEMPTS = 5;

// ─── Types ────────────────────────────────────────────────────────────────────

export type GameStatus = "playing" | "won" | "lost";

export type FeedbackType = "success" | "error" | "info";

export interface Feedback {
  text: string;
  type: FeedbackType;
}

export interface CommonThreadState {
  puzzle: Puzzle;
  puzzleIndex: number;
  totalPuzzles: number;

  /** How many words are currently visible (from the top) */
  revealedCount: number;

  /** Index of word that was just revealed (for animation triggers) */
  newlyRevealedIndex: number | null;

  /** Number of answer letters revealed by hint presses */
  hintsRevealed: number;

  /** Current text in the guess field */
  guess: string;

  /** Remaining wrong-guess budget */
  attemptsLeft: number;

  /** Overall game status */
  status: GameStatus;

  /** Latest feedback message to show the user */
  feedback: Feedback | null;

  /** Whether the input row should animate a "shake" */
  shake: boolean;

  // ── Derived helpers (computed, not stored) ──
  canRevealWord: boolean;
  canRevealHint: boolean;
  allWordsRevealed: boolean;
  allHintsRevealed: boolean;
}

export interface CommonThreadActions {
  setGuess: (text: string) => void;
  submitGuess: () => void;
  revealNextWord: () => void;
  revealNextHint: () => void;
  nextPuzzle: () => void;
  resetPuzzle: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCommonThread(): CommonThreadState & CommonThreadActions {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle>(PUZZLES[0]);
  const [revealedCount, setRevealedCount] = useState(INITIAL_WORDS_SHOWN);
  const [newlyRevealedIndex, setNewlyRevealedIndex] = useState<number | null>(null);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [guess, setGuess] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [shake, setShake] = useState(false);

  // Reset all state when puzzle changes
  useEffect(() => {
    const p = PUZZLES[puzzleIndex];
    setPuzzle(p);
    setRevealedCount(INITIAL_WORDS_SHOWN);
    setNewlyRevealedIndex(null);
    setHintsRevealed(0);
    setGuess("");
    setAttemptsLeft(MAX_ATTEMPTS);
    setStatus("playing");
    setFeedback(null);
    setShake(false);
  }, [puzzleIndex]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const loseIfExhausted = useCallback(
    (remaining: number, p: Puzzle) => {
      if (remaining <= 0) {
        setStatus("lost");
        setRevealedCount(p.words.length);
        setFeedback({
          text: `Out of attempts! The answer was "${p.answer}".`,
          type: "error",
        });
        return true;
      }
      return false;
    },
    []
  );

  // ── Actions ──────────────────────────────────────────────────────────────

  const submitGuess = useCallback(() => {
    if (status !== "playing" || !guess.trim()) return;

    const normalised = guess.trim().toLowerCase();
    const isCorrect = puzzle.acceptedAnswers.includes(normalised);

    if (isCorrect) {
      setStatus("won");
      setRevealedCount(puzzle.words.length);
      setFeedback({ text: "🎉 Correct! You found the common thread!", type: "success" });
    } else {
      const next = attemptsLeft - 1;
      setAttemptsLeft(next);
      triggerShake();
      if (!loseIfExhausted(next, puzzle)) {
        setFeedback({
          text: `Not quite — ${next} attempt${next === 1 ? "" : "s"} remaining.`,
          type: "error",
        });
      }
    }
    setGuess("");
  }, [status, guess, puzzle, attemptsLeft, triggerShake, loseIfExhausted]);

  const revealNextWord = useCallback(() => {
    if (status !== "playing") return;
    if (revealedCount >= puzzle.words.length) {
      setFeedback({ text: "All words are already revealed!", type: "info" });
      return;
    }
    const next = attemptsLeft - 1;
    if (next < 0) {
      setFeedback({ text: "No attempts left to reveal a word!", type: "error" });
      return;
    }
    setNewlyRevealedIndex(revealedCount);
    setRevealedCount((c) => c + 1);
    setAttemptsLeft(next);
    if (!loseIfExhausted(next, puzzle)) {
      setFeedback({
        text: `Word revealed — ${next} attempt${next === 1 ? "" : "s"} remaining.`,
        type: "info",
      });
    }
  }, [status, revealedCount, puzzle, attemptsLeft, loseIfExhausted]);

  const revealNextHint = useCallback(() => {
    if (status !== "playing") return;
    if (hintsRevealed >= puzzle.answer.length) {
      setFeedback({ text: "All hint letters are already revealed!", type: "info" });
      return;
    }
    const next = attemptsLeft - 1;
    if (next < 0) {
      setFeedback({ text: "No attempts left!", type: "error" });
      return;
    }
    setHintsRevealed((h) => h + 1);
    setAttemptsLeft(next);
    if (!loseIfExhausted(next, puzzle)) {
      setFeedback({
        text: `Hint: letter ${hintsRevealed + 1} revealed — ${next} attempt${next === 1 ? "" : "s"} remaining.`,
        type: "info",
      });
    }
  }, [status, hintsRevealed, puzzle, attemptsLeft, loseIfExhausted]);

  const nextPuzzle = useCallback(() => {
    setPuzzleIndex((i) => (i + 1) % PUZZLES.length);
  }, []);

  const resetPuzzle = useCallback(() => {
    setPuzzleIndex((i) => i); // triggers useEffect via same index trick
    // Force reset by re-calling the effect manually:
    const p = PUZZLES[puzzleIndex];
    setPuzzle(p);
    setRevealedCount(INITIAL_WORDS_SHOWN);
    setNewlyRevealedIndex(null);
    setHintsRevealed(0);
    setGuess("");
    setAttemptsLeft(MAX_ATTEMPTS);
    setStatus("playing");
    setFeedback(null);
    setShake(false);
  }, [puzzleIndex]);

  // ── Derived ──────────────────────────────────────────────────────────────

  const canRevealWord =
    revealedCount < puzzle.words.length && status === "playing" && attemptsLeft > 0;

  const canRevealHint =
    hintsRevealed < puzzle.answer.length && status === "playing" && attemptsLeft > 0;

  const allWordsRevealed = revealedCount >= puzzle.words.length;
  const allHintsRevealed = hintsRevealed >= puzzle.answer.length;

  return {
    // State
    puzzle,
    puzzleIndex,
    totalPuzzles: PUZZLES.length,
    revealedCount,
    newlyRevealedIndex,
    hintsRevealed,
    guess,
    attemptsLeft,
    status,
    feedback,
    shake,
    // Derived
    canRevealWord,
    canRevealHint,
    allWordsRevealed,
    allHintsRevealed,
    // Actions
    setGuess,
    submitGuess,
    revealNextWord,
    revealNextHint,
    nextPuzzle,
    resetPuzzle,
  };
}
