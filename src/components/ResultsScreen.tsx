
import React from 'react';
import { QuestionResult } from '@/types/game';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface ResultsScreenProps {
  results: QuestionResult[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestart }) => {
  // Calculate score
  const correctCount = results.filter(result => result.correct).length;
  const totalQuestions = results.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="mb-8 bg-white shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Your Results</CardTitle>
          <CardDescription>
            You scored {correctCount} out of {totalQuestions} ({score}%)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex justify-center py-6">
          <div className="w-48 h-48 rounded-full border-8 border-game-primary flex items-center justify-center bg-white">
            <div className="text-4xl font-bold">{correctCount}/{totalQuestions}</div>
          </div>
        </CardContent>
        
        <CardFooter className="justify-center">
          <Button onClick={onRestart} className="bg-gradient-to-r from-game-primary to-game-secondary text-white hover:shadow-lg">
            Play Again
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Question Summary</h2>
        
        {results.map((result, index) => {
          // Replace blanks in the sentence with the correct answers
          const parts = result.sentence.split('__blank__');
          const sentenceWithCorrectAnswers = parts.reduce((acc, part, i) => {
            if (i < parts.length - 1) {
              return `${acc}${part}<span class="text-game-correct font-medium">${result.correctAnswers[i]}</span>`;
            }
            return acc + part;
          }, '');
          
          return (
            <Card key={index} className={`border-l-4 ${result.correct ? 'border-l-game-correct' : 'border-l-game-incorrect'}`}>
              <CardHeader className="py-4">
                <div className="flex items-center space-x-2">
                  {result.correct ? (
                    <CheckCircle2 className="h-5 w-5 text-game-correct" />
                  ) : (
                    <XCircle className="h-5 w-5 text-game-incorrect" />
                  )}
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="py-2">
                {!result.correct && (
                  <div className="mb-3">
                    <div className="font-medium text-sm text-gray-500 mb-1">Your Answer:</div>
                    <div className="p-2 bg-gray-50 rounded">
                      {parts.reduce((acc, part, i) => {
                        if (i < parts.length - 1) {
                          const userAnswer = result.userAnswers[i] || '[blank]';
                          const isCorrect = userAnswer === result.correctAnswers[i];
                          return `${acc}${part}<span class="${isCorrect ? 'text-game-correct' : 'text-game-incorrect'} font-medium">${userAnswer}</span>`;
                        }
                        return acc + part;
                      }, '')}
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="font-medium text-sm text-gray-500 mb-1">Correct Answer:</div>
                  <div className="p-2 bg-gray-50 rounded" dangerouslySetInnerHTML={{ __html: sentenceWithCorrectAnswers }} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsScreen;
