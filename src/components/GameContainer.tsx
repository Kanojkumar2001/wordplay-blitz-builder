
import React, { useEffect, useState, useCallback } from 'react';
import GameQuestion from './GameQuestion';
import ResultsScreen from './ResultsScreen';
import { mockQuestions } from '@/data/mockQuestions';
import { GameState, QuestionResult, SentenceQuestion } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Simulate fetching questions from an API
const fetchQuestions = (): Promise<SentenceQuestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuestions);
    }, 500);
  });
};

const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    currentQuestionIndex: 0,
    timeRemaining: 30,
    userAnswers: new Map(),
    gameStatus: 'ready',
    results: [],
  });
  
  const { toast } = useToast();

  // Load questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setGameState(prev => ({
          ...prev,
          questions,
        }));
      } catch (error) {
        console.error("Failed to load questions:", error);
        toast({
          title: "Error",
          description: "Failed to load questions. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    loadQuestions();
  }, [toast]);

  // Timer effect when game is in progress
  useEffect(() => {
    let timerId: number | undefined;
    
    if (gameState.gameStatus === 'playing' && gameState.timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    }
    
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameState.gameStatus, gameState.timeRemaining]);

  // Handler for starting the game
  const handleStartGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      currentQuestionIndex: 0,
      timeRemaining: 30,
      userAnswers: new Map(),
      results: [],
    }));
  };

  // Handler for when time runs out
  const handleTimeUp = useCallback(() => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Get current answers or empty strings if none
    const userAnswers = gameState.userAnswers.get(currentQuestion.id) || 
      Array((currentQuestion.sentence.match(/__blank__/g) || []).length).fill('');
    
    handleNext(userAnswers);
  }, [gameState.currentQuestionIndex, gameState.questions, gameState.userAnswers]);

  // Handler for proceeding to the next question
  const handleNext = useCallback((answers: string[]) => {
    setGameState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const newUserAnswers = new Map(prev.userAnswers);
      newUserAnswers.set(currentQuestion.id, answers);
      
      // Check if this was the last question
      if (prev.currentQuestionIndex === prev.questions.length - 1) {
        // Calculate results
        const results: QuestionResult[] = prev.questions.map(question => {
          const userAnswersForQuestion = newUserAnswers.get(question.id) || [];
          const isCorrect = question.correctAnswers.every(
            (answer, index) => answer === userAnswersForQuestion[index]
          );
          
          return {
            questionId: question.id,
            userAnswers: userAnswersForQuestion,
            correct: isCorrect,
            correctAnswers: question.correctAnswers,
            sentence: question.sentence,
          };
        });
        
        return {
          ...prev,
          gameStatus: 'finished',
          userAnswers: newUserAnswers,
          results,
        };
      }
      
      // Move to next question
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: 30,
        userAnswers: newUserAnswers,
      };
    });
  }, []);

  // Render different views based on game status
  if (gameState.gameStatus === 'ready') {
    return (
      <Card className="w-full max-w-xl mx-auto mt-8 bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-game-primary to-game-secondary bg-clip-text text-transparent">
            Sentence Construction
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <p className="text-center text-gray-600">
            Complete sentences by placing the correct words in the blanks. You have 30 seconds for each question.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg w-full">
            <h3 className="font-medium mb-2">Instructions:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Click on a word to place it in the next available blank</li>
              <li>Click on a filled blank to remove the word</li>
              <li>Complete all blanks before proceeding to the next question</li>
              <li>If the timer runs out, you'll automatically move to the next question</li>
            </ul>
          </div>
          
          <Button 
            onClick={handleStartGame}
            className="bg-gradient-to-r from-game-primary to-game-secondary text-white px-8 py-6 text-lg hover:shadow-lg transition-all"
          >
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (gameState.gameStatus === 'playing') {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    return (
      <div className="w-full p-4">
        <div className="mb-4 text-center">
          <div className="text-sm font-medium text-gray-500">
            Question {gameState.currentQuestionIndex + 1} of {gameState.questions.length}
          </div>
        </div>
        
        {currentQuestion && (
          <GameQuestion
            question={currentQuestion}
            timeRemaining={gameState.timeRemaining}
            onTimeUp={handleTimeUp}
            onNext={handleNext}
          />
        )}
      </div>
    );
  }
  
  if (gameState.gameStatus === 'finished') {
    return <ResultsScreen results={gameState.results} onRestart={handleStartGame} />;
  }
  
  // Loading state
  return (
    <div className="w-full flex justify-center items-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-game-primary mx-auto mb-4"></div>
        <p>Loading questions...</p>
      </div>
    </div>
  );
};

export default GameContainer;
