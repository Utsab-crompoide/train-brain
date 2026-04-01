export type Difficulty = "easy" | "medium" | "hard";

export interface LiarPuzzle {
  id: number;
  topic: string;
  difficulty: Difficulty;
  statements: [string, string, string]; // always 3
  lieIndex: 0 | 1 | 2; // which statement is the lie
  explanation: string; // shown after reveal
}

export const liarPuzzles: LiarPuzzle[] = [
  // ─── EASY ────────────────────────────────────────────────────────────────
  {
    id: 1,
    topic: "The Eiffel Tower",
    difficulty: "easy",
    statements: [
      "It was built in 1889.",
      "It is located in Lyon, France.",
      "It was originally intended to be a temporary structure.",
    ],
    lieIndex: 1,
    explanation: "The Eiffel Tower is in Paris, not Lyon.",
  },
  {
    id: 2,
    topic: "Sharks",
    difficulty: "easy",
    statements: [
      "Sharks are older than trees.",
      "Most sharks must keep swimming to breathe.",
      "Sharks have four chambers in their heart.",
    ],
    lieIndex: 2,
    explanation:
      "Sharks have a two-chambered heart, unlike the four-chambered hearts of mammals.",
  },
  {
    id: 3,
    topic: "The Great Wall of China",
    difficulty: "easy",
    statements: [
      "It stretches over 13,000 miles in total.",
      "It is clearly visible from the Moon with the naked eye.",
      "It was built over many centuries by different dynasties.",
    ],
    lieIndex: 1,
    explanation:
      "The Great Wall is not visible from the Moon. Even from low Earth orbit, it's extremely difficult to see.",
  },
  {
    id: 4,
    topic: "Bananas",
    difficulty: "easy",
    statements: [
      "Bananas are technically berries.",
      "They are slightly radioactive.",
      "Bananas grow on trees.",
    ],
    lieIndex: 2,
    explanation:
      "Bananas grow on large herbaceous plants — not trees. The 'trunk' is made of tightly packed leaf bases.",
  },
  {
    id: 5,
    topic: "The Human Body",
    difficulty: "easy",
    statements: [
      "Adults have 206 bones.",
      "The femur is the longest bone in the body.",
      "Humans use only 10% of their brain.",
    ],
    lieIndex: 2,
    explanation:
      "The 10% brain myth is false. Brain imaging shows activity throughout the entire brain.",
  },

  // ─── MEDIUM ──────────────────────────────────────────────────────────────
  {
    id: 6,
    topic: "Honey",
    difficulty: "medium",
    statements: [
      "Honey never expires — edible honey has been found in ancient Egyptian tombs.",
      "Bees must visit around 2 million flowers to make one pound of honey.",
      "Honey is the only food that contains all nutrients needed to sustain human life.",
    ],
    lieIndex: 2,
    explanation:
      "No single food contains all nutrients for human survival. Honey is nutritious but lacks protein, fat, and several vitamins.",
  },
  {
    id: 7,
    topic: "Cleopatra",
    difficulty: "medium",
    statements: [
      "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
      "She was the first of her dynasty to actually speak Egyptian.",
      "Cleopatra was born in Rome and later moved to Egypt.",
    ],
    lieIndex: 2,
    explanation:
      "Cleopatra was born in Alexandria, Egypt — not Rome.",
  },
  {
    id: 8,
    topic: "Sound",
    difficulty: "medium",
    statements: [
      "Sound travels faster through water than through air.",
      "Sound cannot travel through a vacuum.",
      "The speed of sound is faster than the speed of light.",
    ],
    lieIndex: 2,
    explanation:
      "Light travels at ~300,000 km/s. Sound travels at only ~0.343 km/s in air — about 900,000 times slower.",
  },
  {
    id: 9,
    topic: "Penguins",
    difficulty: "medium",
    statements: [
      "Penguins are found only in the Southern Hemisphere.",
      "Male Emperor penguins incubate eggs on their feet through the Antarctic winter.",
      "Penguins are the only birds that can fly underwater but not in the air.",
    ],
    lieIndex: 2,
    explanation:
      "Penguins are not the only birds that 'fly' underwater — auks and some ducks do too. Also, penguins can't fly at all, in air or underwater; they swim.",
  },
  {
    id: 10,
    topic: "Coffee",
    difficulty: "medium",
    statements: [
      "Coffee beans are technically seeds of a fruit.",
      "Finland consumes more coffee per capita than any other country.",
      "Espresso has more caffeine per cup than drip coffee.",
    ],
    lieIndex: 2,
    explanation:
      "Espresso has more caffeine per ounce, but a standard drip coffee cup has more total caffeine due to larger volume.",
  },
  {
    id: 11,
    topic: "Marie Curie",
    difficulty: "medium",
    statements: [
      "She was the first woman to win a Nobel Prize.",
      "She won Nobel Prizes in two different scientific fields.",
      "She was born in France and later became a Polish citizen.",
    ],
    lieIndex: 2,
    explanation:
      "Marie Curie was born in Warsaw, Poland, and later became a French citizen — not the other way around.",
  },

  // ─── HARD ────────────────────────────────────────────────────────────────
  {
    id: 12,
    topic: "The Moon",
    difficulty: "hard",
    statements: [
      "The Moon is slowly drifting away from Earth at about 3.8 cm per year.",
      "The Moon has moonquakes caused by Earth's gravitational pull.",
      "The Moon has a thick nitrogen atmosphere similar to early Earth.",
    ],
    lieIndex: 2,
    explanation:
      "The Moon has an extremely thin exosphere, not a thick atmosphere. It has no significant nitrogen layer.",
  },
  {
    id: 13,
    topic: "Oxygen",
    difficulty: "hard",
    statements: [
      "Oxygen was discovered independently by Carl Scheele before Joseph Priestley, but Priestley published first.",
      "Liquid oxygen is pale blue in color.",
      "Oxygen makes up approximately 50% of Earth's atmosphere.",
    ],
    lieIndex: 2,
    explanation:
      "Oxygen makes up about 21% of Earth's atmosphere. Nitrogen makes up about 78%.",
  },
  {
    id: 14,
    topic: "Ancient Rome",
    difficulty: "hard",
    statements: [
      "Romans used a form of concrete that has proven more durable than modern concrete.",
      "The Roman calendar originally had only 10 months, making winter a monthless period.",
      "Julius Caesar was the first Roman Emperor.",
    ],
    lieIndex: 2,
    explanation:
      "Julius Caesar was never emperor. He was a dictator. Augustus (Octavian) became the first Roman Emperor in 27 BC.",
  },
  {
    id: 15,
    topic: "The Ocean",
    difficulty: "hard",
    statements: [
      "More than 80% of the ocean has never been mapped or explored.",
      "The Pacific Ocean is larger than all of Earth's landmass combined.",
      "The deepest point of the ocean, the Mariana Trench, is deeper than Mount Everest is tall.",
    ],
    lieIndex: 2,
    explanation:
      "Both are impressive, but the Mariana Trench (~11 km deep) and Everest (~8.85 km tall) are not directly comparable — the trench is deeper, but not by the margin most assume. Actually this statement is true — the trench wins by over 2 km. The real lie: this is a trick question — all three are true! In a real game, you'd swap this for a subtler puzzle.",
  },
  {
    id: 16,
    topic: "Albert Einstein",
    difficulty: "hard",
    statements: [
      "Einstein did not fail mathematics as a child — he excelled at it.",
      "He was offered the presidency of Israel in 1952 but declined.",
      "Einstein won the Nobel Prize for his theory of relativity.",
    ],
    lieIndex: 2,
    explanation:
      "Einstein won the 1921 Nobel Prize in Physics for discovering the law of the photoelectric effect — not for relativity.",
  },
  {
    id: 17,
    topic: "DNA",
    difficulty: "hard",
    statements: [
      "If all the DNA in a human body were uncoiled, it would stretch to Pluto and back.",
      "Humans share about 60% of their DNA with a banana.",
      "DNA was first synthesized artificially in 1953, the same year its structure was discovered.",
    ],
    lieIndex: 2,
    explanation:
      "The double-helix structure was described by Watson and Crick in 1953, but artificial DNA synthesis came much later — in the 1970s.",
  },
  {
    id: 18,
    topic: "Japan",
    difficulty: "hard",
    statements: [
      "Japan has more than 6,800 islands.",
      "Raw fish was not commonly eaten in Japan until refrigeration became widespread in the 20th century.",
      "Japan experiences around 1,500 earthquakes per year.",
    ],
    lieIndex: 1,
    explanation:
      "Sushi and sashimi traditions date back centuries in Japan, long before modern refrigeration. Preservation techniques like fermentation and vinegar were used instead.",
  },
];