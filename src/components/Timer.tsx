
import React, { useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, totalTime, onTimeUp }) => {
  const percentRemaining = (timeRemaining / totalTime) * 100;
  
  // Color changes as time decreases
  let progressColor = 'bg-blue-500';
  if (percentRemaining < 30) {
    progressColor = 'bg-red-500';
  } else if (percentRemaining < 60) {
    progressColor = 'bg-yellow-500';
  }

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span className="font-medium">{timeRemaining}s</span>
      </div>
      <Progress 
        value={percentRemaining} 
        className="h-2 transition-all" 
        indicatorClassName={`transition-all ${progressColor}`}
      />
    </div>
  );
};

export default Timer;
