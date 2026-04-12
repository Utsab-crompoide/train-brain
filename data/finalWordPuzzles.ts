export type Difficulty = "easy" | "medium" | "hard";

export interface Puzzle {
  id: number;
  rows: PuzzleRow[];
  /**
   * The final locked word that gets unlocked after all four rows are solved.
   * It must be derivable from (or thematically linked to) the four words above.
   */
  finalWord: string;
  finalHint: string;
  difficulty: Difficulty;
}

export interface PuzzleRow {
  answer: string; // uppercase, e.g. "FLAME"
  hint: string;
}

/**
 * Rules:
 *  - Each puzzle has exactly 4 regular rows + 1 final locked row.
 *  - All five words share the same letter count (5 letters).
 *  - Adjacent words differ by exactly one letter (like CrossClimb ladder logic).
 *  - The finalWord is thematically linked to the chain.
 *  - The finalWord must NOT appear in any of the 4 rows.
 */
export const PUZZLES: Puzzle[] = [
  // Easy (1-15)
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
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
    difficulty: "easy",
  },
  {
    id: 11,
    rows: [
      { answer: "SCAPE", hint: "Landscape or view of land" },
      { answer: "SCALE", hint: "Graduated grading system or fish covering" },
      { answer: "STALE", hint: "No longer fresh" },
      { answer: "STOLE", hint: "Past tense of steal, or a garment" },
    ],
    finalWord: "STONE",
    finalHint: "A hard mineral lump found on the ground",
    difficulty: "easy",
  },
  {
    id: 12,
    rows: [
      { answer: "GRANT", hint: "To allow or bestow something" },
      { answer: "GREAT", hint: "Of large size or importance" },
      { answer: "TREAT", hint: "Special food or reward" },
      { answer: "TREAD", hint: "To walk or step on something" },
    ],
    finalWord: "TREND",
    finalHint: "A popular general tendency",
    difficulty: "easy",
  },
  {
    id: 13,
    rows: [
      { answer: "PLACE", hint: "A location or position" },
      { answer: "PEACE", hint: "Absence of conflict" },
      { answer: "PEACH", hint: "A fuzzy sweet fruit" },
      { answer: "POACH", hint: "To cook gently in liquid" },
    ],
    finalWord: "PORCH",
    finalHint: "A covered entrance to a house",
    difficulty: "easy",
  },
  {
    id: 14,
    rows: [
      { answer: "STATE", hint: "A region or condition" },
      { answer: "STAGE", hint: "A platform for performance" },
      { answer: "STALE", hint: "No longer fresh" },
      { answer: "SCALE", hint: "Size or ranking system" },
    ],
    finalWord: "SHAPE",
    finalHint: "The form or outline of something",
    difficulty: "easy",
  },
  {
    id: 15,
    rows: [
      { answer: "STOVE", hint: "Device for cooking with heat" },
      { answer: "STONE", hint: "Hard rock or mineral" },
      { answer: "STORE", hint: "A place to buy items" },
      { answer: "SNORE", hint: "Sound made while sleeping" },
    ],
    finalWord: "SHORE",
    finalHint: "The edge of a body of water",
    difficulty: "easy",
  },

  // Medium (16-35)
  {
    id: 16,
    rows: [
      { answer: "BEAST", hint: "A large or fierce animal" },
      { answer: "BLAST", hint: "A sudden explosion or gust" },
      { answer: "BOAST", hint: "To brag about achievements" },
      { answer: "COAST", hint: "The land along the sea" },
    ],
    finalWord: "BOOST",
    finalHint: "To push upward or increase",
    difficulty: "medium",
  },
  {
    id: 17,
    rows: [
      { answer: "COAST", hint: "Seashore or area near ocean" },
      { answer: "ROAST", hint: "To cook with dry heat" },
      { answer: "TOAST", hint: "Browned bread or a celebration speech" },
      { answer: "BOAST", hint: "To brag proudly about something" },
    ],
    finalWord: "ROOST",
    finalHint: "Where a bird settles to rest",
    difficulty: "medium",
  },
  {
    id: 18,
    rows: [
      { answer: "DREAM", hint: "Imagination during sleep" },
      { answer: "CREAM", hint: "Rich dairy topping" },
      { answer: "CREAK", hint: "A squeaking sound" },
      { answer: "CLEAK", hint: "An old word for a sharp click" },
    ],
    finalWord: "BREAK",
    finalHint: "To damage or cease working",
    difficulty: "medium",
  },
  {
    id: 19,
    rows: [
      { answer: "CRAFT", hint: "Skill in making things" },
      { answer: "CREST", hint: "The top of a wave or hill" },
      { answer: "CRISP", hint: "Firm and crunchy texture" },
      { answer: "GRASP", hint: "To seize or hold tightly" },
    ],
    finalWord: "DRAFT",
    finalHint: "A preliminary version or air current",
    difficulty: "medium",
  },
  {
    id: 20,
    rows: [
      { answer: "HEART", hint: "Organ that pumps blood" },
      { answer: "HEARD", hint: "Past tense of hear" },
      { answer: "HOARD", hint: "To collect and store greedily" },
      { answer: "GOURD", hint: "A hollow fruit used as a vessel" },
    ],
    finalWord: "BOARD",
    finalHint: "A flat piece of wood or governing body",
    difficulty: "medium",
  },
  {
    id: 21,
    rows: [
      { answer: "SMART", hint: "Intelligent or fashionable" },
      { answer: "START", hint: "To begin something" },
      { answer: "STAIR", hint: "A step in a staircase" },
      { answer: "SWEAR", hint: "To make a solemn promise" },
    ],
    finalWord: "STARE",
    finalHint: "To look at intensely for a long time",
    difficulty: "medium",
  },
  {
    id: 22,
    rows: [
      { answer: "SPARE", hint: "Extra or to refrain from harming" },
      { answer: "SPACE", hint: "An empty area or the cosmos" },
      { answer: "SPORE", hint: "A cell for reproduction in plants" },
      { answer: "STORE", hint: "A place where goods are sold" },
    ],
    finalWord: "SNORE",
    finalHint: "A loud breathing sound during sleep",
    difficulty: "medium",
  },
  {
    id: 23,
    rows: [
      { answer: "TRAIL", hint: "A narrow path through nature" },
      { answer: "TRIAL", hint: "A legal proceeding in court" },
      { answer: "TRIAD", hint: "A group of three things" },
      { answer: "TRAIN", hint: "A railway vehicle on tracks" },
    ],
    finalWord: "TWIRL",
    finalHint: "To spin or rotate quickly",
    difficulty: "medium",
  },
  {
    id: 24,
    rows: [
      { answer: "FLASH", hint: "A bright sudden light" },
      { answer: "FLESH", hint: "Soft tissue of the body" },
      { answer: "FRESH", hint: "New or not stale" },
      { answer: "CRUSH", hint: "To press or squeeze forcefully" },
    ],
    finalWord: "FRISK",
    finalHint: "To search someone or move playfully",
    difficulty: "medium",
  },
  {
    id: 25,
    rows: [
      { answer: "PLANT", hint: "Living organism rooted in soil" },
      { answer: "GRANT", hint: "To give or allow" },
      { answer: "GIANT", hint: "A very tall creature" },
      { answer: "GRIND", hint: "To crush into small particles" },
    ],
    finalWord: "GLINT",
    finalHint: "A quick flash of reflected light",
    difficulty: "medium",
  },
  {
    id: 26,
    rows: [
      { answer: "GRAND", hint: "Large and impressive" },
      { answer: "GRANT", hint: "To allow or give" },
      { answer: "GRAFT", hint: "To attach tissue surgically" },
      { answer: "DRAFT", hint: "A preliminary version of a document" },
    ],
    finalWord: "CRAFT",
    finalHint: "Skill in making or creating things",
    difficulty: "medium",
  },
  {
    id: 27,
    rows: [
      { answer: "SPLIT", hint: "To separate or divide" },
      { answer: "SPLAT", hint: "To hit with a wet sound" },
      { answer: "SPRAT", hint: "A small silver fish" },
      { answer: "STRAP", hint: "A narrow strip for fastening" },
    ],
    finalWord: "SPRAY",
    finalHint: "Fine mist dispersed into air",
    difficulty: "medium",
  },
  {
    id: 28,
    rows: [
      { answer: "MORAL", hint: "Ethical or virtuous" },
      { answer: "CORAL", hint: "Marine organism forming reefs" },
      { answer: "FOCAL", hint: "Relating to a central point" },
      { answer: "LOCAL", hint: "Belonging to a nearby area" },
    ],
    finalWord: "RURAL",
    finalHint: "Relating to the countryside",
    difficulty: "medium",
  },
  {
    id: 29,
    rows: [
      { answer: "FLOAT", hint: "To rest on a liquid surface" },
      { answer: "BLOAT", hint: "Swelling from gas or fluid" },
      { answer: "BLEAT", hint: "The cry of a goat or sheep" },
      { answer: "CLEAT", hint: "A metal fitting for securing ropes" },
    ],
    finalWord: "PLEAT",
    finalHint: "A fold in fabric or clothing",
    difficulty: "medium",
  },
  {
    id: 30,
    rows: [
      { answer: "DEALT", hint: "Distributed cards or handled" },
      { answer: "DWELT", hint: "Lived or resided somewhere" },
      { answer: "SWELL", hint: "To grow larger or a wave" },
      { answer: "SMELL", hint: "An odor or to detect scent" },
    ],
    finalWord: "SPELL",
    finalHint: "To write out letters or magic words",
    difficulty: "medium",
  },
  {
    id: 31,
    rows: [
      { answer: "STAKE", hint: "A pointed rod driven into ground" },
      { answer: "STALE", hint: "No longer fresh or new" },
      { answer: "STAVE", hint: "A wooden slat of a barrel" },
      { answer: "SHAVE", hint: "To cut hair close to the skin" },
    ],
    finalWord: "SLAVE",
    finalHint: "A person held in bondage or servitude",
    difficulty: "medium",
  },
  {
    id: 32,
    rows: [
      { answer: "PLAIN", hint: "Simple or flat terrain" },
      { answer: "PLANE", hint: "Aircraft or flat surface" },
      { answer: "PLACE", hint: "A specific location or spot" },
      { answer: "GRACE", hint: "Elegance of movement" },
    ],
    finalWord: "PEACE",
    finalHint: "Absence of conflict or war",
    difficulty: "medium",
  },
  {
    id: 33,
    rows: [
      { answer: "PLANK", hint: "Thick wooden board" },
      { answer: "BLANK", hint: "Empty or not filled in" },
      { answer: "BLEAK", hint: "Cold, barren, and hopeless" },
      { answer: "BLEAR", hint: "Dim or blurry in vision" },
    ],
    finalWord: "BREAK",
    finalHint: "To separate or cease functioning",
    difficulty: "medium",
  },
  {
    id: 34,
    rows: [
      { answer: "GRILL", hint: "Cooking device with metal bars" },
      { answer: "GRAIL", hint: "A legendary sacred cup" },
      { answer: "GRAIN", hint: "A cereal crop like wheat" },
      { answer: "DRAIN", hint: "To remove liquid from something" },
    ],
    finalWord: "DRANK",
    finalHint: "Past tense of drink",
    difficulty: "medium",
  },
  {
    id: 35,
    rows: [
      { answer: "FAINT", hint: "Weak or barely visible" },
      { answer: "SAINT", hint: "A holy or virtuous person" },
      { answer: "SLANT", hint: "A diagonal angle or bias" },
      { answer: "SCANT", hint: "Barely enough in amount" },
    ],
    finalWord: "PLANT",
    finalHint: "A living organism that grows in soil",
    difficulty: "medium",
  },

  // Hard (36-50)
  {
    id: 36,
    rows: [
      { answer: "KNEEL", hint: "To bend on one's knee" },
      { answer: "KNELT", hint: "Past tense of kneel" },
      { answer: "KNACK", hint: "A special talent or skill" },
      { answer: "KNOCK", hint: "To rap on a door" },
    ],
    finalWord: "KNOWN",
    finalHint: "Recognized or familiar to many",
    difficulty: "hard",
  },
  {
    id: 37,
    rows: [
      { answer: "WRIST", hint: "Joint between hand and forearm" },
      { answer: "WAIST", hint: "Middle section of the body" },
      { answer: "WASTE", hint: "Unwanted garbage or excess" },
      { answer: "HASTE", hint: "Urgency or rushing speed" },
    ],
    finalWord: "TASTE",
    finalHint: "Sensation of flavor in the mouth",
    difficulty: "hard",
  },
  {
    id: 38,
    rows: [
      { answer: "NORTH", hint: "Direction toward the Arctic" },
      { answer: "WORTH", hint: "The value or merit of something" },
      { answer: "FORTH", hint: "Forward or onward in time" },
      { answer: "MOUTH", hint: "Opening used for eating and speaking" },
    ],
    finalWord: "YOUTH",
    finalHint: "The early period of one's life",
    difficulty: "hard",
  },
  {
    id: 39,
    rows: [
      { answer: "GUILT", hint: "Feeling of having done wrong" },
      { answer: "QUILT", hint: "A padded bed covering" },
      { answer: "QUIET", hint: "Absence of noise" },
      { answer: "QUICK", hint: "Moving or done rapidly" },
    ],
    finalWord: "QUITE",
    finalHint: "To a certain extent, rather",
    difficulty: "hard",
  },
  {
    id: 40,
    rows: [
      { answer: "BEAST", hint: "A large fierce animal" },
      { answer: "FEAST", hint: "A large elaborate meal" },
      { answer: "LEAST", hint: "The smallest amount possible" },
      { answer: "YEAST", hint: "Agent used to make bread rise" },
    ],
    finalWord: "FROST",
    finalHint: "Ice crystals formed in cold weather",
    difficulty: "hard",
  },
  {
    id: 41,
    rows: [
      { answer: "TRUST", hint: "Confidence in another person" },
      { answer: "TRYST", hint: "A secret romantic meeting" },
      { answer: "CRUST", hint: "The hard outer layer of bread" },
      { answer: "BLUSH", hint: "To turn red from embarrassment" },
    ],
    finalWord: "CRUSH",
    finalHint: "To squeeze with great force",
    difficulty: "hard",
  },
  {
    id: 42,
    rows: [
      { answer: "SHRUG", hint: "A shoulder gesture of uncertainty" },
      { answer: "SHRUB", hint: "A woody plant smaller than a tree" },
      { answer: "SCRUB", hint: "To clean by rubbing hard" },
      { answer: "SCRUM", hint: "A formation in rugby" },
    ],
    finalWord: "SERUM",
    finalHint: "A medical fluid used for treatment",
    difficulty: "hard",
  },
  {
    id: 43,
    rows: [
      { answer: "GRAND", hint: "Impressive in size or scale" },
      { answer: "GRIND", hint: "To crush into fine powder" },
      { answer: "GRIME", hint: "Dirt or filth on a surface" },
      { answer: "GRAPE", hint: "A small fruit that grows in clusters" },
    ],
    finalWord: "GRANT",
    finalHint: "To allow or bestow something",
    difficulty: "hard",
  },
  {
    id: 44,
    rows: [
      { answer: "SIGHT", hint: "The ability to see" },
      { answer: "LIGHT", hint: "Electromagnetic radiation we see" },
      { answer: "TIGHT", hint: "Firmly fixed or closely packed" },
      { answer: "THIGH", hint: "Upper part of the leg" },
    ],
    finalWord: "THING",
    finalHint: "An object or entity of any kind",
    difficulty: "hard",
  },
  {
    id: 45,
    rows: [
      { answer: "GLOAT", hint: "To feel smug satisfaction" },
      { answer: "FLOAT", hint: "To rest on a liquid surface" },
      { answer: "BLOAT", hint: "To swell up uncomfortably" },
      { answer: "BLEAT", hint: "The cry of a sheep or goat" },
    ],
    finalWord: "BLAST",
    finalHint: "A powerful explosion or gust of air",
    difficulty: "hard",
  },
  {
    id: 46,
    rows: [
      { answer: "CLAMP", hint: "A device that holds things tight" },
      { answer: "CLAIM", hint: "To assert or demand ownership" },
      { answer: "CLIMB", hint: "To ascend upward" },
      { answer: "CLING", hint: "To hold on tightly to something" },
    ],
    finalWord: "CLIFF",
    finalHint: "A steep rock face or precipice",
    difficulty: "hard",
  },
  {
    id: 47,
    rows: [
      { answer: "GRAFT", hint: "To attach tissue surgically" },
      { answer: "KRAFT", hint: "Strong brown wrapping paper" },
      { answer: "CRAVE", hint: "To desire something intensely" },
      { answer: "BRAVE", hint: "Showing courage and daring" },
    ],
    finalWord: "CRAFT",
    finalHint: "Skill in making things by hand",
    difficulty: "hard",
  },
  {
    id: 48,
    rows: [
      { answer: "WHEAT", hint: "A common grain crop" },
      { answer: "TREAT", hint: "A special reward or snack" },
      { answer: "GREAT", hint: "Large, impressive, or excellent" },
      { answer: "GREET", hint: "To welcome or say hello" },
    ],
    finalWord: "FLEET",
    finalHint: "A group of ships or vehicles",
    difficulty: "hard",
  },
  {
    id: 49,
    rows: [
      { answer: "STAND", hint: "To be upright on one's feet" },
      { answer: "BRAND", hint: "A trademark or company name" },
      { answer: "BRAID", hint: "To weave strands together" },
      { answer: "BRAIN", hint: "The organ responsible for thought" },
    ],
    finalWord: "BRAWN",
    finalHint: "Physical strength and muscle power",
    difficulty: "hard",
  },
  {
    id: 50,
    rows: [
      { answer: "SWIFT", hint: "Moving very fast or rapid" },
      { answer: "SHIFT", hint: "To move or change position" },
      { answer: "SHIRT", hint: "A garment worn on the upper body" },
      { answer: "SHORT", hint: "Not long in length or duration" },
    ],
    finalWord: "SHORE",
    finalHint: "The land along the edge of the sea",
    difficulty: "hard",
  },
];

export const getPuzzleById = (id: number): Puzzle | undefined => PUZZLES.find((p) => p.id === id);

export const getDailyPuzzle = (): Puzzle => {
  const dayIndex = Math.floor(Date.now() / 86_400_000) % PUZZLES.length;
  return PUZZLES[dayIndex];
};
