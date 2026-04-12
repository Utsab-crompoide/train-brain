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
  puzzlesPlayed: number;
  status: GameStatus;
  selectedIndex: number | null;
  feedback: Feedback | null;
  hintsUsed: number;
  hintRevealed: boolean; // whether the one available hint is used
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

// Helper to create a shuffled array of puzzle indices
function createShuffledPuzzleIndices(): number[] {
  const indices = Array.from({ length: sortedPuzzles.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

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
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentPositionInShuffle, setCurrentPositionInShuffle] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);
  const [shuffledPuzzle, setShuffledPuzzle] = useState<LiarPuzzle>(sortedPuzzles[0]);

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

  // Shuffle the puzzle when it changes
  useEffect(() => {
    const p = sortedPuzzles[puzzleIndex];
    setShuffledPuzzle(shufflePuzzle(p));
    setStatus("playing");
    setSelectedIndex(null);
    setFeedback(null);
    setHintsUsed(0);
    setHintRevealed(false);
  }, [puzzleIndex]);

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
    [status, puzzle, hintRevealed, triggerShake],
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
    setCurrentPositionInShuffle((pos) => {
      const nextPos = pos + 1;
      if (nextPos >= liarPuzzles.length) {
        setShuffledIndices(createShuffledPuzzleIndices());
        return 0;
      }
      return nextPos;
    });
  }, []);

  const allPuzzlesCompleted = currentPositionInShuffle === 0 && shuffledIndices.length > 0;

  return {
    puzzle,
    puzzleIndex,
    totalPuzzles: liarPuzzles.length,
    puzzlesPlayed: currentPositionInShuffle,
    status,
    selectedIndex,
    feedback,
    hintsUsed,
    hintRevealed,
    streak,
    select,
    useHint,
    nextPuzzle,
    shake,
  };
}
