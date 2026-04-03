/**
 * useCommonThread — All game logic for the Common Thread puzzle.
 *
 * Mechanic:
 *  - 1 word is shown at start, rest are locked.
 *  - Each wrong guess unlocks the next word.
 *  - Correct guess at any point will win (all words revealed).
 *  - Wrong guess when all words are already shown will lose.
 *  - Hint button reveals one letter of the answer at a time (no attempt cost).
 *
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { PUZZLES, type Puzzle } from "../data/puzzle";

export const INITIAL_WORDS_SHOWN = 1;

// Helper to create a shuffled array of puzzle indices
function createShuffledPuzzleIndices(): number[] {
  const indices = Array.from({ length: PUZZLES.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export type GameStatus = "playing" | "won" | "lost";
export type FeedbackType = "success" | "error" | "info" | "showHint";

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

  /** Index of the word that was just unlocked, for animation triggers */
  newlyRevealedIndex: number | null;

  /** Number of answer letters revealed by hint presses */
  hintsRevealed: number;

  /** Current text in the guess field */
  guess: string;

  /** Number of wrong guesses so far */
  wrongGuesses: number;

  /** Overall game status */
  status: GameStatus;

  /** Latest feedback message */
  feedback: Feedback | null;

  /** Whether the input should animate a shake  */
  shake: boolean;

  // ── Derived helpers ──────────────────────────────────────────────────────
  /** True when all words are already visible */
  allWordsRevealed: boolean;

  /** True when all hint letters are already revealed */
  allHintsRevealed: boolean;

  /** Remaining guesses before the game ends (= words still locked) */
  guessesLeft: number;
}

export interface CommonThreadActions {
  setGuess: (text: string) => void;
  submitGuess: () => void;
  revealNextHint: () => void;
  nextPuzzle: () => void;
  resetPuzzle: () => void;
}

export function useCommonThread(): CommonThreadState & CommonThreadActions {
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentPositionInShuffle, setCurrentPositionInShuffle] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle>(PUZZLES[0]);
  const [revealedCount, setRevealedCount] = useState(INITIAL_WORDS_SHOWN);
  const [newlyRevealedIndex, setNewlyRevealedIndex] = useState<number | null>(null);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [guess, setGuess] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [shake, setShake] = useState(false);

  // Initialize shuffled indices on first mount
  useEffect(() => {
    setShuffledIndices(createShuffledPuzzleIndices());
  }, []);

  // Update puzzle index based on shuffle position
  useEffect(() => {
    if (shuffledIndices.length > 0) {
      setPuzzleIndex(shuffledIndices[currentPositionInShuffle]);
    }
  }, [shuffledIndices, currentPositionInShuffle]);

  useEffect(() => {
    const p = PUZZLES[puzzleIndex];
    setPuzzle(p);
    setRevealedCount(INITIAL_WORDS_SHOWN);
    setNewlyRevealedIndex(null);
    setHintsRevealed(0);
    setGuess("");
    setWrongGuesses(0);
    setStatus("playing");
    setFeedback(null);
    setShake(false);
  }, [puzzleIndex]);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const submitGuess = useCallback(() => {
    if (status !== "playing" || !guess.trim()) return;

    const normalised = guess.trim().toLowerCase();
    const isCorrect = puzzle.acceptedAnswers.includes(normalised);

    if (isCorrect) {
      setStatus("won");
      setRevealedCount(puzzle.words.length);
      setFeedback({
        text: "Correct! You found the common thread!",
        type: "success",
      });
    } else {
      triggerShake();
      const nextRevealed = revealedCount + 1;

      if (revealedCount >= puzzle.words.length) {
        setStatus("lost");
        setFeedback({
          text: `The answer was "${puzzle.answer}". Better luck next time!`,
          type: "error",
        });
      } else {
        setNewlyRevealedIndex(revealedCount);
        setRevealedCount(nextRevealed);
        setWrongGuesses((w) => w + 1);

        if (nextRevealed >= puzzle.words.length) {
          setFeedback({
            text: "Last word revealed — this is your final chance!",
            type: "showHint",
          });
        } else {
          const remaining = puzzle.words.length - nextRevealed;
          setFeedback({
            text: `Not quite — a new word has been revealed. ${remaining} word${remaining === 1 ? "" : "s"} still locked.`,
            type: "error",
          });
        }
      }
    }

    setGuess("");
  }, [status, guess, puzzle, revealedCount, triggerShake]);

  const revealNextHint = useCallback(() => {
    if (status !== "playing") return;
    if (hintsRevealed >= puzzle.answer.length) {
      setFeedback({ text: "All hint letters are already revealed!", type: "info" });
      return;
    }
    setHintsRevealed((h) => h + 1);
    setFeedback({
      text: `Hint: letter ${hintsRevealed + 1} of ${puzzle.answer.length} revealed.`,
      type: "info",
    });
    if (hintsRevealed + 1 === puzzle.answer.length) {
      setStatus("lost");
      setFeedback({
        text: "Answer revealed by hints is not a valid guess. Game over!",
        type: "error",
      });
    }
  }, [status, hintsRevealed, puzzle]);

  const nextPuzzle = useCallback(() => {
    setCurrentPositionInShuffle((pos) => {
      const nextPos = pos + 1;
      if (nextPos >= PUZZLES.length) {
        // All puzzles completed, restart with new shuffle
        setShuffledIndices(createShuffledPuzzleIndices());
        return 0;
      }
      return nextPos;
    });
  }, []);

  const resetPuzzle = useCallback(() => {
    const p = PUZZLES[puzzleIndex];
    setPuzzle(p);
    setRevealedCount(INITIAL_WORDS_SHOWN);
    setNewlyRevealedIndex(null);
    setHintsRevealed(0);
    setGuess("");
    setWrongGuesses(0);
    setStatus("playing");
    setFeedback(null);
    setShake(false);
  }, [puzzleIndex]);

  const allWordsRevealed = revealedCount >= puzzle.words.length;
  const allHintsRevealed = hintsRevealed >= puzzle.answer.length;
  // Remaining guesses = locked words left (each wrong = 1 unlock) + 1 final guess when all shown
  const guessesLeft = allWordsRevealed ? 1 : puzzle.words.length - revealedCount + 1;

  return {
    puzzle,
    puzzleIndex,
    totalPuzzles: PUZZLES.length,
    revealedCount,
    newlyRevealedIndex,
    hintsRevealed,
    guess,
    wrongGuesses,
    status,
    feedback,
    shake,
    allWordsRevealed,
    allHintsRevealed,
    guessesLeft,
    setGuess,
    submitGuess,
    revealNextHint,
    nextPuzzle,
    resetPuzzle,
  };
}
