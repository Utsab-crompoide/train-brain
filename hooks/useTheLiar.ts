"use client";

import { useState, useCallback, useEffect } from "react";
import { liarPuzzles, LiarPuzzle } from "@/data/theLiarPuzzles";

export type GameStatus = "playing" | "correct" | "wrong";

export interface Feedback {
  type: "success" | "error" | "info";
  text: string;
}

export interface UseLiarReturn {
  puzzle: LiarPuzzle;
  puzzleIndex: number;
  totalPuzzles: number;
  status: GameStatus;
  selectedIndex: number | null;
  feedback: Feedback | null;
  hintsUsed: number;
  hintRevealed: boolean; // whether the one available hint is used
  score: number;
  streak: number;
  select: (index: number) => void;
  useHint: () => void;
  nextPuzzle: () => void;
  shake: boolean;
}

const POINTS = {
  correctNoHint: 100,
  correctWithHint: 50,
};

const sortedPuzzles = [...liarPuzzles].sort((a, b) => {
  const order = { easy: 0, medium: 1, hard: 2 };
  return order[a.difficulty] - order[b.difficulty];
});

// Shuffle statements and remap lieIndex so the lie isn't always in the same position
function shufflePuzzle(puzzle: LiarPuzzle): LiarPuzzle {
  const indices = [0, 1, 2];
  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const shuffledStatements = indices.map((i) => puzzle.statements[i]) as [string, string, string];
  const newLieIndex = indices.indexOf(puzzle.lieIndex) as 0 | 1 | 2;
  return { ...puzzle, statements: shuffledStatements, lieIndex: newLieIndex };
}

export function useTheLiar(): UseLiarReturn {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);
  // Start with the unshuffled puzzle so server and client render identically,
  // then shuffle on the client after mount to avoid hydration mismatch.
  const [shuffledPuzzle, setShuffledPuzzle] = useState<LiarPuzzle>(sortedPuzzles[0]);

  useEffect(() => {
    setShuffledPuzzle(shufflePuzzle(sortedPuzzles[0]));
  }, []);

  const puzzle = shuffledPuzzle;

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const select = useCallback(
    (index: number) => {
      if (status !== "playing") return;

      setSelectedIndex(index);

      if (index === puzzle.lieIndex) {
        // Correct
        const points = hintRevealed ? POINTS.correctWithHint : POINTS.correctNoHint;
        setScore((s) => s + points);
        setStreak((s) => s + 1);
        setStatus("correct");
        setFeedback({
          type: "success",
          text: `Correct! +${points} points${hintRevealed ? " (hint used)" : ""}`,
        });
      } else {
        // Wrong — reveal and move on
        triggerShake();
        setStreak(0);
        setStatus("wrong");
        setFeedback({
          type: "error",
          text: `Not quite — the lie is highlighted below.`,
        });
      }
    },
    [status, puzzle, hintRevealed, triggerShake]
  );

  const useHint = useCallback(() => {
    if (hintRevealed || status !== "playing") return;
    setHintRevealed(true);
    setHintsUsed((h) => h + 1);
    setFeedback({
      type: "info",
      text: "Hint: One of the true statements has been highlighted.",
    });
  }, [hintRevealed, status]);

  const nextPuzzle = useCallback(() => {
    const next = puzzleIndex + 1;
    if (next >= sortedPuzzles.length) return;

    setPuzzleIndex(next);
    setShuffledPuzzle(shufflePuzzle(sortedPuzzles[next]));
    setStatus("playing");
    setSelectedIndex(null);
    setFeedback(null);
    setHintRevealed(false);
  }, [puzzleIndex]);

  return {
    puzzle,
    puzzleIndex,
    totalPuzzles: sortedPuzzles.length,
    status,
    selectedIndex,
    feedback,
    hintsUsed,
    hintRevealed,
    score,
    streak,
    select,
    useHint,
    nextPuzzle,
    shake,
  };
}