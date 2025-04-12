
export interface SentenceQuestion {
  id: number;
  sentence: string; // Contains placeholders like "__blank__" for missing words
  options: string[]; // Array of 4 words (including correct ones)
  correctAnswers: string[]; // Array of correct words in the order they appear in the sentence
}

export interface QuestionResult {
  questionId: number;
  userAnswers: string[];
  correct: boolean;
  correctAnswers: string[];
  sentence: string;
}

export interface GameState {
  questions: SentenceQuestion[];
  currentQuestionIndex: number;
  timeRemaining: number;
  userAnswers: Map<number, string[]>;
  gameStatus: 'ready' | 'playing' | 'finished';
  results: QuestionResult[];
}
