
import { SentenceQuestion } from "../types/game";

export const mockQuestions: SentenceQuestion[] = [
  {
    id: 1,
    sentence: "The __blank__ was shining __blank__ in the sky.",
    options: ["sun", "brightly", "moon", "slowly"],
    correctAnswers: ["sun", "brightly"]
  },
  {
    id: 2,
    sentence: "She __blank__ her homework before __blank__ to bed.",
    options: ["finished", "started", "going", "sleeping"],
    correctAnswers: ["finished", "going"]
  },
  {
    id: 3,
    sentence: "The __blank__ ran __blank__ through the forest.",
    options: ["quickly", "fox", "quietly", "deer"],
    correctAnswers: ["fox", "quickly"]
  },
  {
    id: 4,
    sentence: "I __blank__ to the store to buy some __blank__.",
    options: ["went", "milk", "walked", "bread"],
    correctAnswers: ["went", "milk"]
  },
  {
    id: 5,
    sentence: "The __blank__ book was __blank__ on the shelf.",
    options: ["old", "sitting", "new", "placed"],
    correctAnswers: ["old", "sitting"]
  },
  {
    id: 6,
    sentence: "He __blank__ a letter to his __blank__ yesterday.",
    options: ["wrote", "friend", "sent", "family"],
    correctAnswers: ["wrote", "friend"]
  },
  {
    id: 7,
    sentence: "The __blank__ car drove __blank__ down the road.",
    options: ["red", "quickly", "blue", "slowly"],
    correctAnswers: ["red", "slowly"]
  },
  {
    id: 8,
    sentence: "They __blank__ dinner at a fancy __blank__ last night.",
    options: ["had", "restaurant", "ate", "cafe"],
    correctAnswers: ["had", "restaurant"]
  },
  {
    id: 9,
    sentence: "The __blank__ sang a beautiful __blank__ in the morning.",
    options: ["song", "bird", "melody", "tune"],
    correctAnswers: ["bird", "song"]
  },
  {
    id: 10,
    sentence: "We __blank__ to the beach and __blank__ in the ocean.",
    options: ["drove", "walked", "swam", "played"],
    correctAnswers: ["drove", "swam"]
  }
];
