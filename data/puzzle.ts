// puzzles.ts — Common Thread game data

export interface Puzzle {
  id: number;
  answer: string;           // The hidden connection (case-insensitive match)
  acceptedAnswers: string[]; // All valid answer strings (lowercase)
  words: string[];          // Words in reveal order (first 2 shown initially)
  hint: string;             // Shown in BoxInput when player asks for a clue
}

export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    answer: "ROCK",
    acceptedAnswers: ["rock", "rocks", "stone", "stones"],
    words: ["Pebble", "Boulder", "Gravel", "Sand", "Cobblestone"],
    hint: "ROCK",
  },
  {
    id: 2,
    answer: "COLD",
    acceptedAnswers: ["cold", "ice", "icy", "freeze", "frozen"],
    words: ["Arctic", "Glacier", "Frost", "Blizzard", "Tundra"],
    hint: "COLD",
  },
  {
    id: 3,
    answer: "MUSIC",
    acceptedAnswers: ["music", "sound", "audio", "song", "melody"],
    words: ["Jazz", "Tempo", "Chord", "Rhythm", "Harmony"],
    hint: "MUSIC",
  },
  {
    id: 4,
    answer: "FIRE",
    acceptedAnswers: ["fire", "flame", "heat", "burn", "blaze"],
    words: ["Ember", "Inferno", "Ash", "Spark", "Kindle"],
    hint: "FIRE",
  },
  {
    id: 5,
    answer: "TIME",
    acceptedAnswers: ["time", "clock", "hour", "minute", "second"],
    words: ["Dawn", "Dusk", "Epoch", "Era", "Moment"],
    hint: "TIME",
  },
  {
    id: 6,
    answer: "WATER",
    acceptedAnswers: ["water", "ocean", "sea", "liquid", "wave"],
    words: ["Ripple", "Current", "Tide", "Stream", "Cascade"],
    hint: "WATER",
  },
  {
    id: 7,
    answer: "LIGHT",
    acceptedAnswers: ["light", "glow", "shine", "bright", "illumination"],
    words: ["Beam", "Glare", "Shimmer", "Radiance", "Flicker"],
    hint: "LIGHT",
  },
  {
    id: 8,
    answer: "SPACE",
    acceptedAnswers: ["space", "cosmos", "universe", "galaxy", "sky"],
    words: ["Nebula", "Quasar", "Pulsar", "Comet", "Orbit"],
    hint: "SPACE",
  },
];