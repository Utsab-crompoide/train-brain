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
 *  - All five words share the same letter count.
 *  - Adjacent words differ by exactly one letter (like CrossClimb ladder logic).
 *  - The finalWord is thematically linked to the chain.
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
    finalWord: "STALE",
    finalHint: "No longer fresh or new",
    difficulty: "easy",
  },
  {
    id: 12,
    rows: [
      { answer: "GRANT", hint: "To allow or bestow something" },
      { answer: "GREAT", hint: "Of large size or importance" },
      { answer: "TREAT", hint: "Special food or reward" },
      { answer: "TREND", hint: "A general direction or tendency" },
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
      { answer: "PIECE", hint: "A part or portion of something" },
      { answer: "PRICE", hint: "Cost of something for sale" },
    ],
    finalWord: "PRICE",
    finalHint: "The cost of an item",
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
      { answer: "SHORE", hint: "Beach or coast area" },
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
      { answer: "BOOST", hint: "To increase or elevate" },
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
      { answer: "ROOST", hint: "A place where birds rest" },
      { answer: "BOOST", hint: "To push up or increase" },
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
      { answer: "BREAK", hint: "To damage or separate" },
    ],
    finalWord: "BREAK",
    finalHint: "To damage or cease working",
    difficulty: "medium",
  },
  {
    id: 19,
    rows: [
      { answer: "CRAFT", hint: "Skill in making things" },
      { answer: "DRAFT", hint: "A preliminary version" },
      { answer: "DRAFT", hint: "Air current or beer serving" },
      { answer: "DRIFT", hint: "To move slowly without direction" },
    ],
    finalWord: "DRIFT",
    finalHint: "To move without control or purpose",
    difficulty: "medium",
  },
  {
    id: 20,
    rows: [
      { answer: "HEART", hint: "Organ that pumps blood" },
      { answer: "HEARD", hint: "Past tense of hear" },
      { answer: "HOARD", hint: "To collect and store" },
      { answer: "BOARD", hint: "A wooden plank" },
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
      { answer: "STARE", hint: "To look intensely" },
      { answer: "SHARE", hint: "To divide and give" },
    ],
    finalWord: "STARE",
    finalHint: "To look at intensely for a long time",
    difficulty: "medium",
  },
  {
    id: 22,
    rows: [
      { answer: "SPARE", hint: "Extra or to refrain from" },
      { answer: "SPHERE", hint: "A round ball-shaped object" },
      { answer: "SPORE", hint: "A cell for reproduction" },
      { answer: "SPORT", hint: "Athletic competition" },
    ],
    finalWord: "SPORT",
    finalHint: "Athletic activity or fair-minded person",
    difficulty: "medium",
  },
  {
    id: 23,
    rows: [
      { answer: "TRAIL", hint: "A narrow path through nature" },
      { answer: "TRIAL", hint: "A legal proceeding" },
      { answer: "TWIRL", hint: "To spin or rotate" },
      { answer: "TWITTER", hint: "To make quick chirping sounds" },
    ],
    finalWord: "TWIRL",
    finalHint: "To spin or rotate quickly",
    difficulty: "medium",
  },
  {
    id: 24,
    rows: [
      { answer: "FLASH", hint: "A bright sudden light" },
      { answer: "FLESH", hint: "Soft tissue of body" },
      { answer: "FRESH", hint: "New or not stale" },
      { answer: "FRISK", hint: "To search or move playfully" },
    ],
    finalWord: "FRISK",
    finalHint: "To search or move playfully",
    difficulty: "medium",
  },
  {
    id: 25,
    rows: [
      { answer: "PLANT", hint: "Living organism without movement" },
      { answer: "GRANT", hint: "To give or allow" },
      { answer: "GIANT", hint: "A very tall creature" },
      { answer: "GLINT", hint: "A quick bright flash" },
    ],
    finalWord: "GLINT",
    finalHint: "A quick flash of light",
    difficulty: "medium",
  },
  {
    id: 26,
    rows: [
      { answer: "GRAND", hint: "Large and impressive" },
      { answer: "GRANT", hint: "To allow or give" },
      { answer: "GRAFT", hint: "To attach or surgery" },
      { answer: "CRAFT", hint: "Skill in making things" },
    ],
    finalWord: "CRAFT",
    finalHint: "Skill in making or creating things",
    difficulty: "medium",
  },
  {
    id: 27,
    rows: [
      { answer: "SPLIT", hint: "To separate or divide" },
      { answer: "SPLAT", hint: "To hit with wet sound" },
      { answer: "SPRAT", hint: "A small fish" },
      { answer: "SPRAY", hint: "Fine mist of liquid" },
    ],
    finalWord: "SPRAY",
    finalHint: "Fine mist dispersed into air",
    difficulty: "medium",
  },
  {
    id: 28,
    rows: [
      { answer: "MORAL", hint: "Ethical or virtuous" },
      { answer: "MURAL", hint: "Wall painting" },
      { answer: "MURAL", hint: "Wall-based art" },
      { answer: "RURAL", hint: "Countryside or farm area" },
    ],
    finalWord: "RURAL",
    finalHint: "Relating to countryside",
    difficulty: "medium",
  },
  {
    id: 29,
    rows: [
      { answer: "FLOAT", hint: "To rest on liquid surface" },
      { answer: "BLOAT", hint: "Swelling from gas" },
      { answer: "BLEAT", hint: "Cry of a goat" },
      { answer: "PLEAT", hint: "A fold in fabric" },
    ],
    finalWord: "PLEAT",
    finalHint: "A fold in fabric or clothing",
    difficulty: "medium",
  },
  {
    id: 30,
    rows: [
      { answer: "DEALT", hint: "Distributed cards or addressed" },
      { answer: "DWELT", hint: "Lived or resided" },
      { answer: "SMELL", hint: "Odor or to detect scent" },
      { answer: "SPELL", hint: "To write out letters or magic" },
    ],
    finalWord: "SPELL",
    finalHint: "To write out letters or magic words",
    difficulty: "medium",
  },
  {
    id: 31,
    rows: [
      { answer: "STAKE", hint: "A pointed rod or bet" },
      { answer: "STALE", hint: "No longer fresh" },
      { answer: "STAVE", hint: "To push off or wooden slat" },
      { answer: "SLAVE", hint: "Person held in bondage" },
    ],
    finalWord: "SLAVE",
    finalHint: "A person in bondage or servitude",
    difficulty: "medium",
  },
  {
    id: 32,
    rows: [
      { answer: "PLAIN", hint: "Simple or flat terrain" },
      { answer: "PLANE", hint: "Aircraft or flat surface" },
      { answer: "PLACE", hint: "Location" },
      { answer: "PEACE", hint: "Absence of conflict" },
    ],
    finalWord: "PEACE",
    finalHint: "Absence of conflict or war",
    difficulty: "medium",
  },
  {
    id: 33,
    rows: [
      { answer: "PLANK", hint: "Thick wooden board" },
      { answer: "BLANK", hint: "Empty or not filled" },
      { answer: "BLEAK", hint: "Cold and barren" },
      { answer: "BREAK", hint: "To damage" },
    ],
    finalWord: "BREAK",
    finalHint: "To separate or cease functioning",
    difficulty: "medium",
  },
  {
    id: 34,
    rows: [
      { answer: "GRILL", hint: "Cooking device with bars" },
      { answer: "GIRL", hint: "Young female" },
      { answer: "GILT", hint: "Covered with gold" },
      { answer: "GIFT", hint: "A present" },
    ],
    finalWord: "GIFT",
    finalHint: "A present given to someone",
    difficulty: "medium",
  },
  {
    id: 35,
    rows: [
      { answer: "FAINT", hint: "Weak or barely visible" },
      { answer: "SAINT", hint: "Holy or virtuous person" },
      { answer: "SLANT", hint: "Diagonal angle" },
      { answer: "PLANT", hint: "Living organism" },
    ],
    finalWord: "PLANT",
    finalHint: "A living organism that grows",
    difficulty: "medium",
  },

  // Hard (36-50)
  {
    id: 36,
    rows: [
      { answer: "KNEEL", hint: "To bend on one's knee" },
      { answer: "KNIFE", hint: "Cutting utensil" },
      { answer: "KNIGHT", hint: "Medieval warrior with armor" },
      { answer: "KNIGHT", hint: "Medieval warrior" },
    ],
    finalWord: "KNIGHT",
    finalHint: "Medieval warrior in armor",
    difficulty: "hard",
  },
  {
    id: 37,
    rows: [
      { answer: "WRIST", hint: "Joint between hand and forearm" },
      { answer: "WAIST", hint: "Middle section of body" },
      { answer: "WASTE", hint: "Unwanted garbage or excess" },
      { answer: "TASTE", hint: "Flavor in mouth" },
    ],
    finalWord: "TASTE",
    finalHint: "Sensation of flavor",
    difficulty: "hard",
  },
  {
    id: 38,
    rows: [
      { answer: "WREATH", hint: "Circular arrangement of flowers" },
      { answer: "WRATH", hint: "Intense anger" },
      { answer: "WORTH", hint: "Value or merit" },
      { answer: "YOUTH", hint: "Early period of life" },
    ],
    finalWord: "YOUTH",
    finalHint: "Period of early life",
    difficulty: "hard",
  },
  {
    id: 39,
    rows: [
      { answer: "GUILT", hint: "Feeling of having done wrong" },
      { answer: "QUILT", hint: "Padded bed covering" },
      { answer: "QUIET", hint: "Absence of noise" },
      { answer: "QUITE", hint: "Rather or definitely" },
    ],
    finalWord: "QUITE",
    finalHint: "Rather or definitely",
    difficulty: "hard",
  },
  {
    id: 40,
    rows: [
      { answer: "BEAST", hint: "Large animal" },
      { answer: "FEAST", hint: "Large meal celebration" },
      { answer: "FEAST", hint: "Large celebration meal" },
      { answer: "FROST", hint: "Ice crystals from cold" },
    ],
    finalWord: "FROST",
    finalHint: "Ice crystals formed in cold",
    difficulty: "hard",
  },
  {
    id: 41,
    rows: [
      { answer: "TRUST", hint: "Confidence in another" },
      { answer: "TRUST", hint: "Faith in someone" },
      { answer: "CRUST", hint: "Hard outer layer" },
      { answer: "CRUSH", hint: "To squeeze forcefully" },
    ],
    finalWord: "CRUSH",
    finalHint: "To squeeze with force",
    difficulty: "hard",
  },
  {
    id: 42,
    rows: [
      { answer: "SHRUG", hint: "Shoulder gesture" },
      { answer: "SHRUB", hint: "A woody plant" },
      { answer: "SHRUNK", hint: "Past tense of shrink" },
      { answer: "SHRINK", hint: "To become smaller" },
    ],
    finalWord: "SHRINK",
    finalHint: "To become smaller",
    difficulty: "hard",
  },
  {
    id: 43,
    rows: [
      { answer: "STRAIN", hint: "To stretch or filter" },
      { answer: "STRAND", hint: "Thread or beach" },
      { answer: "GRAND", hint: "Impressive or large" },
      { answer: "GRANT", hint: "To give or allow" },
    ],
    finalWord: "GRANT",
    finalHint: "To allow or bestow something",
    difficulty: "hard",
  },
  {
    id: 44,
    rows: [
      { answer: "SIGHT", hint: "Vision or view" },
      { answer: "SLIGHT", hint: "Small or thin" },
      { answer: "SLEIGHT", hint: "Skillful trick" },
      { answer: "SLEIGH", hint: "Snow vehicle" },
    ],
    finalWord: "SLEIGH",
    finalHint: "Vehicle for traveling on snow",
    difficulty: "hard",
  },
  {
    id: 45,
    rows: [
      { answer: "GLOAT", hint: "To feel smug satisfaction" },
      { answer: "FLOAT", hint: "To rest on surface" },
      { answer: "BLOAT", hint: "To swell up" },
      { answer: "GLOAT", hint: "To feel self-satisfied" },
    ],
    finalWord: "FLOAT",
    finalHint: "To rest on liquid surface",
    difficulty: "hard",
  },
  {
    id: 46,
    rows: [
      { answer: "CLAMP", hint: "Device that holds" },
      { answer: "CLAIM", hint: "To assert or demand" },
      { answer: "CLIMB", hint: "To ascend" },
      { answer: "CLIMAX", hint: "Peak or turning point" },
    ],
    finalWord: "CLIMAX",
    finalHint: "Peak or highest point",
    difficulty: "hard",
  },
  {
    id: 47,
    rows: [
      { answer: "GRAFT", hint: "To attach surgically" },
      { answer: "CRAFT", hint: "Skill in making" },
      { answer: "CRAFT", hint: "Skillful making" },
      { answer: "CRAFT", hint: "Skillfully made" },
    ],
    finalWord: "CRAFT",
    finalHint: "Skill in making things",
    difficulty: "hard",
  },
  {
    id: 48,
    rows: [
      { answer: "WHEAT", hint: "Grain crop" },
      { answer: "TREAT", hint: "Special reward" },
      { answer: "GREAT", hint: "Large and impressive" },
      { answer: "GRANT", hint: "To allow" },
    ],
    finalWord: "GRANT",
    finalHint: "To allow or give permission",
    difficulty: "hard",
  },
  {
    id: 49,
    rows: [
      { answer: "SPRANG", hint: "Past tense of spring" },
      { answer: "STRAND", hint: "Thread or beach" },
      { answer: "STAND", hint: "Position upright" },
      { answer: "BRAND", hint: "Trademark name" },
    ],
    finalWord: "BRAND",
    finalHint: "A trademark or company name",
    difficulty: "hard",
  },
  {
    id: 50,
    rows: [
      { answer: "SWIFT", hint: "Fast or rapid" },
      { answer: "SHIFT", hint: "To move or change" },
      { answer: "SHRIFT", hint: "Confession and absolution" },
      { answer: "THRIFT", hint: "Careful spending" },
    ],
    finalWord: "THRIFT",
    finalHint: "Careful economical spending",
    difficulty: "hard",
  },
];

export const getPuzzleById = (id: number): Puzzle | undefined => PUZZLES.find((p) => p.id === id);

export const getDailyPuzzle = (): Puzzle => {
  const dayIndex = Math.floor(Date.now() / 86_400_000) % PUZZLES.length;
  return PUZZLES[dayIndex];
};
