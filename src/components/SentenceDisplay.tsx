
import React from 'react';
import { cn } from '@/lib/utils';

interface SentenceDisplayProps {
  sentenceWithBlanks: string;
  filledWords: (string | null)[];
  onBlankClick: (index: number) => void;
}

const SentenceDisplay: React.FC<SentenceDisplayProps> = ({ 
  sentenceWithBlanks, 
  filledWords, 
  onBlankClick 
}) => {
  const parts = sentenceWithBlanks.split('__blank__');
  
  // Make sure we have the right number of words to fill blanks
  const words = [...filledWords];
  while (words.length < parts.length - 1) {
    words.push(null);
  }

  return (
    <div className="text-xl md:text-2xl leading-relaxed text-center mb-8 p-4 bg-white rounded-lg shadow-sm">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span
              onClick={() => words[index] && onBlankClick(index)}
              className={cn(
                "mx-1 px-3 py-1 rounded-md inline-flex items-center justify-center min-w-[80px]",
                words[index] 
                  ? "bg-game-primary text-white cursor-pointer hover:bg-game-secondary transition-colors" 
                  : "bg-game-blank border-2 border-dashed border-gray-300",
                words[index] && "animate-pulse-once"
              )}
            >
              {words[index] || "\u00A0\u00A0\u00A0\u00A0"}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SentenceDisplay;
