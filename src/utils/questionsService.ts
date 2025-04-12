
import sentenceData from '../data/sentenceData.json';
import { SentenceQuestion } from '@/types/game';

// Function to convert API format to our app's format
export const transformApiQuestions = (): SentenceQuestion[] => {
  return sentenceData.data.questions.map((q, index) => {
    // Replace placeholder text with __blank__ format that our app uses
    const sentence = q.question.replace(/_{13}/g, '__blank__');
    
    return {
      id: index + 1,
      sentence: sentence,
      options: q.options,
      correctAnswers: q.correctAnswer
    };
  });
};

// Simulate fetching questions from the JSON file
export const fetchQuestions = async (): Promise<SentenceQuestion[]> => {
  return new Promise((resolve) => {
    // Add a small delay to simulate network request
    setTimeout(() => {
      const transformedQuestions = transformApiQuestions();
      resolve(transformedQuestions);
    }, 500);
  });
};

// Export the raw data for reference if needed
export const rawData = sentenceData;
