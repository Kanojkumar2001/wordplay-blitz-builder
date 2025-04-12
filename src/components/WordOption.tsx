
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface WordOptionProps {
  word: string;
  isSelected: boolean;
  onSelect: (word: string) => void;
}

const WordOption: React.FC<WordOptionProps> = ({ word, isSelected, onSelect }) => {
  return (
    <Button 
      variant={isSelected ? "outline" : "default"}
      className={cn(
        "text-base h-12 min-w-[100px] transition-all transform",
        isSelected 
          ? "bg-gray-100 text-gray-400 border-dashed" 
          : "bg-gradient-to-r from-game-primary to-game-secondary text-white hover:shadow-md hover:scale-105",
        "animate-fade-in"
      )}
      onClick={() => onSelect(word)}
      disabled={isSelected}
    >
      {word}
    </Button>
  );
};

export default WordOption;
