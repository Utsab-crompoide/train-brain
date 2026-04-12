"use client";

import { useState, useCallback, useEffect } from "react";
import { whoSaidItPuzzles, WhoSaidItPuzzle } from "@/data/whoSaidItPuzzles";

export type GameStatus = "playing" | "correct" | "wrong-once" | "wrong-final";

export interface Feedback {
  type: "success" | "error" | "info";
  text: string;
}

export interface UseWhoSaidItReturn {
  puzzle: WhoSaidItPuzzle;
  puzzleIndex: number;
  totalPuzzles: number;
  puzzlesPlayed: number;
  status: GameStatus;
  selectedOption: string | null;
  firstWrongOption: string | null; // tracks the first wrong guess
  feedback: Feedback | null;
  hintRevealed: boolean;
  hintsUsed: number;
  streak: number;
  shuffledOptions: string[];
  select: (option: string) => void;
  useHint: () => void;
  nextPuzzle: () => void;
  shake: boolean;
}

const sortedPuzzles = [...whoSaidItPuzzles].sort((a, b) => {
  const order = { easy: 0, medium: 1, hard: 2 };
  return order[a.difficulty] - order[b.difficulty];
});

function shuffleOptions(options: string[]): string[] {
  const arr = [...options];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createShuffledPuzzleIndices(): number[] {
  const indices = Array.from({ length: whoSaidItPuzzles.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export function useWhoSaidIt(): UseWhoSaidItReturn {
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentPositionInShuffle, setCurrentPositionInShuffle] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [firstWrongOption, setFirstWrongOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>(() => shuffleOptions(sortedPuzzles[0].options));

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

  // Shuffle options when puzzle changes
  useEffect(() => {
    setShuffledOptions(shuffleOptions(sortedPuzzles[puzzleIndex].options));
    setStatus("playing");
    setSelectedOption(null);
    setFirstWrongOption(null);
    setFeedback(null);
    setHintRevealed(false);
  }, [puzzleIndex]);

  const puzzle = sortedPuzzles[puzzleIndex];

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const select = useCallback(
    (option: string) => {
      if (status === "correct" || status === "wrong-final") return;

      const isCorrect = option === puzzle.answer;

      if (isCorrect) {
        setSelectedOption(option);
        setStreak((s) => s + 1);
        setStatus("correct");
        setFeedback({
          type: "success",
          text: "Correct!",
        });
      } else {
        triggerShake();

        if (status === "playing") {
          // First wrong guess — allow retry
          setFirstWrongOption(option);
          setStatus("wrong-once");
          setFeedback({
            type: "error",
            text: "Not quite — one more try!",
          });
        } else if (status === "wrong-once") {
          // Second wrong guess — game over for this puzzle
          setSelectedOption(option);
          setStreak(0);
          setStatus("wrong-final");
          setFeedback({
            type: "error",
            text: `The answer was ${puzzle.answer}.`,
          });
        }
      }
    },
    [status, puzzle, triggerShake],
  );

  const useHint = useCallback(() => {
    if (hintRevealed || status === "correct" || status === "wrong-final") return;
    setHintRevealed(true);
    setHintsUsed((h) => h + 1);
    setFeedback({
      type: "info",
      text: `Hint: ${puzzle.hint}`,
    });
  }, [hintRevealed, status, puzzle]);

  const nextPuzzle = useCallback(() => {
    setCurrentPositionInShuffle((pos) => {
      const nextPos = pos + 1;
      if (nextPos >= whoSaidItPuzzles.length) {
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
    totalPuzzles: whoSaidItPuzzles.length,
    puzzlesPlayed: currentPositionInShuffle,
    status,
    selectedOption,
    firstWrongOption,
    feedback,
    hintRevealed,
    hintsUsed,
    streak,
    shuffledOptions,
    select,
    useHint,
    nextPuzzle,
    shake,
  };
}
