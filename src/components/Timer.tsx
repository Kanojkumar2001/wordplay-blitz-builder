
import React, { useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
        className={cn("h-2 transition-all", {
          "bg-secondary": true,
          "[&>div]:bg-blue-500": percentRemaining >= 60,
          "[&>div]:bg-yellow-500": percentRemaining < 60 && percentRemaining >= 30,
          "[&>div]:bg-red-500": percentRemaining < 30,
        })}
      />
    </div>
  );
};

export default Timer;
