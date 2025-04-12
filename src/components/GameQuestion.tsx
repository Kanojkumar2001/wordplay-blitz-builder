
import React, { useEffect, useState } from 'react';
import { SentenceQuestion } from '@/types/game';
import SentenceDisplay from './SentenceDisplay';
import WordOption from './WordOption';
import Timer from './Timer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameQuestionProps {
  question: SentenceQuestion;
  timeRemaining: number;
  onTimeUp: () => void;
  onNext: (answers: string[]) => void;
}

const TOTAL_TIME = 30; // 30 seconds per question

const GameQuestion: React.FC<GameQuestionProps> = ({ 
  question, 
  timeRemaining, 
  onTimeUp, 
  onNext 
}) => {
  // Count blanks in the sentence
  const blankCount = (question.sentence.match(/__blank__/g) || []).length;
  
  // State to track filled blanks
  const [filledWords, setFilledWords] = useState<(string | null)[]>(Array(blankCount).fill(null));
  
  // Track selected words
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());

  // Reset state when question changes
  useEffect(() => {
    setFilledWords(Array(blankCount).fill(null));
    setSelectedWords(new Set());
  }, [question.id, blankCount]);

  // Check if we can move to the next question
  const canProceed = filledWords.every(word => word !== null);

  // Handle word selection
  const handleWordSelect = (word: string) => {
    // Find first empty blank
    const emptyIndex = filledWords.findIndex(w => w === null);
    if (emptyIndex !== -1) {
      const newFilledWords = [...filledWords];
      newFilledWords[emptyIndex] = word;
      setFilledWords(newFilledWords);
      
      // Mark word as selected
      setSelectedWords(new Set([...selectedWords, word]));
    }
  };

  // Handle clicking on a filled blank to remove the word
  const handleBlankClick = (index: number) => {
    if (filledWords[index]) {
      const wordToRemove = filledWords[index];
      const newFilledWords = [...filledWords];
      newFilledWords[index] = null;
      setFilledWords(newFilledWords);
      
      // Remove from selected words
      const newSelected = new Set(selectedWords);
      if (wordToRemove) {
        newSelected.delete(wordToRemove);
      }
      setSelectedWords(newSelected);
    }
  };

  // Handle Next button click
  const handleNext = () => {
    if (canProceed) {
      onNext(filledWords as string[]);
    }
  };

  // When timer runs out, proceed with whatever answers are filled
  useEffect(() => {
    if (timeRemaining <= 0) {
      const answers = filledWords.map(word => word || "");
      onNext(answers);
    }
  }, [timeRemaining, filledWords, onNext]);

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Complete the sentence</span>
        </CardTitle>
        <Timer timeRemaining={timeRemaining} totalTime={TOTAL_TIME} onTimeUp={onTimeUp} />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <SentenceDisplay
          sentenceWithBlanks={question.sentence}
          filledWords={filledWords}
          onBlankClick={handleBlankClick}
        />
        
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((word, index) => (
            <WordOption
              key={index}
              word={word}
              isSelected={selectedWords.has(word)}
              onSelect={handleWordSelect}
            />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!canProceed}
          className="bg-gradient-to-r from-game-primary to-game-secondary text-white hover:shadow-lg transition-all"
        >
          Next Question
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameQuestion;
