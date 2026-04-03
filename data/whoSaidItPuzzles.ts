export type Difficulty = "easy" | "medium" | "hard";

export interface WhoSaidItPuzzle {
  id: number;
  quote: string;
  answer: string;
  options: [string, string, string, string]; // always 4, answer is one of them
  difficulty: Difficulty;
  category: string; // e.g. "Science", "Politics", "Literature"
  hint: string; // one subtle clue, shown if player uses hint
}

export const whoSaidItPuzzles: WhoSaidItPuzzle[] = [
  // ─── EASY ────────────────────────────────────────────────────────────────
  {
    id: 1,
    quote: "That's one small step for man, one giant leap for mankind.",
    answer: "Neil Armstrong",
    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
    difficulty: "easy",
    category: "Space",
    hint: "He was the first person to walk on the Moon.",
  },
  {
    id: 2,
    quote: "I have a dream.",
    answer: "Martin Luther King Jr.",
    options: ["Malcolm X", "Barack Obama", "Martin Luther King Jr.", "Nelson Mandela"],
    difficulty: "easy",
    category: "Civil Rights",
    hint: "He delivered this speech at the Lincoln Memorial in 1963.",
  },
  {
    id: 3,
    quote: "To be or not to be, that is the question.",
    answer: "William Shakespeare",
    options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Homer"],
    difficulty: "easy",
    category: "Literature",
    hint: "This line is from Hamlet.",
  },
  {
    id: 4,
    quote: "In the middle of every difficulty lies opportunity.",
    answer: "Albert Einstein",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Stephen Hawking"],
    difficulty: "easy",
    category: "Science",
    hint: "He developed the theory of relativity.",
  },
  {
    id: 5,
    quote: "The only thing we have to fear is fear itself.",
    answer: "Franklin D. Roosevelt",
    options: ["Winston Churchill", "Abraham Lincoln", "Franklin D. Roosevelt", "John F. Kennedy"],
    difficulty: "easy",
    category: "Politics",
    hint: "He said this in his first inaugural address during the Great Depression.",
  },
  {
    id: 6,
    quote: "I think, therefore I am.",
    answer: "René Descartes",
    options: ["Aristotle", "Plato", "René Descartes", "Socrates"],
    difficulty: "easy",
    category: "Philosophy",
    hint: "A French philosopher and mathematician from the 17th century.",
  },
  {
    id: 7,
    quote: "Float like a butterfly, sting like a bee.",
    answer: "Muhammad Ali",
    options: ["Mike Tyson", "Muhammad Ali", "Joe Frazier", "Sugar Ray Leonard"],
    difficulty: "easy",
    category: "Sports",
    hint: "He was nicknamed 'The Greatest' in boxing.",
  },

  // ─── MEDIUM ──────────────────────────────────────────────────────────────
  {
    id: 8,
    quote: "Imagination is more important than knowledge.",
    answer: "Albert Einstein",
    options: ["Nikola Tesla", "Carl Sagan", "Albert Einstein", "Richard Feynman"],
    difficulty: "medium",
    category: "Science",
    hint: "He was named Time magazine's Person of the Century in 1999.",
  },
  {
    id: 9,
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    answer: "Nelson Mandela",
    options: ["Desmond Tutu", "Mahatma Gandhi", "Martin Luther King Jr.", "Nelson Mandela"],
    difficulty: "medium",
    category: "Civil Rights",
    hint: "He spent 27 years in prison before becoming South Africa's president.",
  },
  {
    id: 10,
    quote: "Well-behaved women seldom make history.",
    answer: "Laurel Thatcher Ulrich",
    options: ["Eleanor Roosevelt", "Amelia Earhart", "Laurel Thatcher Ulrich", "Gloria Steinem"],
    difficulty: "medium",
    category: "History",
    hint: "She was a Harvard historian, not a famous activist — which makes this quote ironic.",
  },
  {
    id: 11,
    quote: "You can fool all the people some of the time, and some of the people all the time, but you cannot fool all the people all the time.",
    answer: "Abraham Lincoln",
    options: ["Mark Twain", "Abraham Lincoln", "Benjamin Franklin", "Thomas Jefferson"],
    difficulty: "medium",
    category: "Politics",
    hint: "The 16th President of the United States.",
  },
  {
    id: 12,
    quote: "It does not matter how slowly you go as long as you do not stop.",
    answer: "Confucius",
    options: ["Lao Tzu", "Sun Tzu", "Confucius", "Buddha"],
    difficulty: "medium",
    category: "Philosophy",
    hint: "A Chinese philosopher whose teachings form the basis of Confucianism.",
  },
  {
    id: 13,
    quote: "The way to get started is to quit talking and begin doing.",
    answer: "Walt Disney",
    options: ["Steve Jobs", "Henry Ford", "Walt Disney", "Elon Musk"],
    difficulty: "medium",
    category: "Business",
    hint: "He created Mickey Mouse and built an entertainment empire.",
  },
  {
    id: 14,
    quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    answer: "Albert Einstein",
    options: ["Mark Twain", "Bertrand Russell", "Albert Einstein", "Oscar Wilde"],
    difficulty: "medium",
    category: "Science",
    hint: "Often misattributed to others, but most historians credit this physicist.",
  },

  // ─── HARD ────────────────────────────────────────────────────────────────
  {
    id: 15,
    quote: "The more I see, the less I know for sure.",
    answer: "John Lennon",
    options: ["Bob Dylan", "Paul McCartney", "John Lennon", "Mick Jagger"],
    difficulty: "hard",
    category: "Music",
    hint: "A founding member of the most famous band in history.",
  },
  {
    id: 16,
    quote: "Not all those who wander are lost.",
    answer: "J.R.R. Tolkien",
    options: ["C.S. Lewis", "J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling"],
    difficulty: "hard",
    category: "Literature",
    hint: "This line appears in a poem about a character named Aragorn.",
  },
  {
    id: 17,
    quote: "The secret of getting ahead is getting started.",
    answer: "Mark Twain",
    options: ["Benjamin Franklin", "Mark Twain", "Winston Churchill", "Theodore Roosevelt"],
    difficulty: "hard",
    category: "Literature",
    hint: "He wrote The Adventures of Tom Sawyer and Adventures of Huckleberry Finn.",
  },
  {
    id: 18,
    quote: "I am not afraid of storms, for I am learning how to sail my ship.",
    answer: "Louisa May Alcott",
    options: ["Emily Dickinson", "Virginia Woolf", "Jane Austen", "Louisa May Alcott"],
    difficulty: "hard",
    category: "Literature",
    hint: "She wrote Little Women.",
  },
  {
    id: 19,
    quote: "The truth will set you free, but first it will make you miserable.",
    answer: "James A. Garfield",
    options: ["Abraham Lincoln", "Mark Twain", "Oscar Wilde", "James A. Garfield"],
    difficulty: "hard",
    category: "Politics",
    hint: "He was the 20th President of the United States and served briefly before being assassinated.",
  },
  {
    id: 20,
    quote: "In three words I can sum up everything I've learned about life: it goes on.",
    answer: "Robert Frost",
    options: ["Ernest Hemingway", "F. Scott Fitzgerald", "Robert Frost", "Walt Whitman"],
    difficulty: "hard",
    category: "Literature",
    hint: "An American poet known for 'The Road Not Taken'.",
  },
];