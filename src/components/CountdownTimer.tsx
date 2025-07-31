import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialMinutes: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialMinutes }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4">
      <div className="text-center mb-1 text-amber-100 text-xs">
        Esta oferta expira em:
      </div>
      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-violet-400/20">
        <div className="flex justify-center items-center gap-2 text-purple-100 text-lg font-bold">
          <div className="flex flex-col items-center">
            <span>{formatNumber(minutes)}</span>
            <span className="text-xs font-normal text-violet-200">min</span>
          </div>
          <span className="text-lg">:</span>
          <div className="flex flex-col items-center">
            <span>{formatNumber(seconds)}</span>
            <span className="text-xs font-normal text-violet-200">seg</span>
          </div>
        </div>
        
        <div className="w-full bg-violet-300/30 h-1.5 rounded-full mt-2">
          <div 
            className="bg-gradient-to-r from-violet-500 to-purple-600 h-1.5 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((minutes * 60 + seconds) / (initialMinutes * 60)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;