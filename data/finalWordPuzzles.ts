export interface Puzzle {
  id: number;
  rows: PuzzleRow[];
  /**
   * The final locked word that gets unlocked after all four rows are solved.
   * It must be derivable from (or thematically linked to) the four words above.
   */
  finalWord: string;
  finalHint: string;
}

export interface PuzzleRow {
  answer: string; // uppercase, e.g. "FLAME"
  hint: string;
}

/**
 * Rules:
 *  - Each puzzle has exactly 4 regular rows + 1 final locked row.
 *  - All five words share the same letter count.
 *  - Adjacent words differ by exactly one letter (like CrossClimb ladder logic).
 *  - The finalWord is thematically linked to the chain.
 */
export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    rows: [
      { answer: "LIGHT", hint: "Opposite of heavy, or what a lamp emits" },
      { answer: "NIGHT", hint: "The dark hours after sunset" },
      { answer: "MIGHT", hint: "Power or strength" },
      { answer: "MISTY", hint: "Foggy or hazy weather" },
    ],
    finalWord: "SIGHT",
    finalHint: "A gun's aiming device or scope",
  },
  {
    id: 2,
    rows: [
      { answer: "STONE", hint: "A hard natural mineral lump" },
      { answer: "STORE", hint: "A place where goods are sold" },
      { answer: "SCORE", hint: "Points tallied in a game" },
      { answer: "SCARE", hint: "To frighten someone" },
    ],
    finalWord: "SHARE",
    finalHint: "A piece of ownership in a company",
  },
  {
    id: 3,
    rows: [
      { answer: "BRAIN", hint: "Organ inside your skull" },
      { answer: "TRAIN", hint: "Locomotive-pulled vehicle on rails" },
      { answer: "TRAIL", hint: "A path through wilderness" },
      { answer: "TRIAL", hint: "A legal proceeding in court" },
    ],
    finalWord: "VIRAL",
    finalHint: "Rapidly spreading content online",
  },
  {
    id: 4,
    rows: [
      { answer: "FLAME", hint: "Visible combustion, burning fire" },
      { answer: "FRAME", hint: "A border around a picture" },
      { answer: "FRANC", hint: "Former currency of France" },
      { answer: "FRANK", hint: "Candid and openly honest" },
    ],
    finalWord: "FLANK",
    finalHint: "The side of a military formation",
  },
  {
    id: 5,
    rows: [
      { answer: "BLEND", hint: "Mix ingredients smoothly together" },
      { answer: "BLAND", hint: "Lacking strong flavor or character" },
      { answer: "BRAND", hint: "A company's trademark identity" },
      { answer: "BRAID", hint: "Hair woven into a plait" },
    ],
    finalWord: "BRAIN",
    finalHint: "Slang for a very intelligent person",
  },
  {
    id: 6,
    rows: [
      { answer: "SHARP", hint: "Having a fine cutting edge" },
      { answer: "SHARE", hint: "To give a portion to others" },
      { answer: "SHAME", hint: "A feeling of disgrace or embarrassment" },
      { answer: "SHALE", hint: "A fine-grained sedimentary rock" },
    ],
    finalWord: "WHALE",
    finalHint: "The largest mammal in the ocean",
  },
  {
    id: 7,
    rows: [
      { answer: "CROWD", hint: "A large group of people gathered together" },
      { answer: "CROWN", hint: "A monarch's ornamental headpiece" },
      { answer: "BROWN", hint: "The color of chocolate or earth" },
      { answer: "DROWN", hint: "To sink or die under water" },
    ],
    finalWord: "FROWN",
    finalHint: "An expression of displeasure or sadness",
  },
  {
    id: 8,
    rows: [
      { answer: "PLANT", hint: "A living organism that grows in soil" },
      { answer: "SLANT", hint: "A diagonal tilt or angle" },
      { answer: "SCANT", hint: "Barely sufficient in amount" },
      { answer: "CHANT", hint: "A rhythmic song or melody to sing" },
    ],
    finalWord: "GRANT",
    finalHint: "Funds given for education or research",
  },
  {
    id: 9,
    rows: [
      { answer: "GRACE", hint: "Elegance or smoothness of movement" },
      { answer: "TRACE", hint: "A faint mark or barely detectable amount" },
      { answer: "TRUCE", hint: "An agreement to stop fighting temporarily" },
      { answer: "TRUCK", hint: "A large motor vehicle for hauling cargo" },
    ],
    finalWord: "TRACK",
    finalHint: "A railway line or sports course",
  },
  {
    id: 10,
    rows: [
      { answer: "BLACK", hint: "The darkest color, absence of light" },
      { answer: "SLACK", hint: "Not tight; also a workplace chat app" },
      { answer: "SLICK", hint: "Smooth, glossy, or cleverly done" },
      { answer: "CLICK", hint: "The sound of a mouse button press" },
    ],
    finalWord: "CLOCK",
    finalHint: "A device that shows hours and minutes",
  },
];

export const getPuzzleById = (id: number): Puzzle | undefined => PUZZLES.find((p) => p.id === id);

export const getDailyPuzzle = (): Puzzle => {
  const dayIndex = Math.floor(Date.now() / 86_400_000) % PUZZLES.length;
  return PUZZLES[dayIndex];
};
