
import React from 'react';
import { getMasteryColorClass } from '../utils/formatters';

interface MasteryBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const MasteryBadge = ({
  level,
  size = 'md',
  showText = true
}: MasteryBadgeProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const masteryClass = getMasteryColorClass(level);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeClasses[size]} ${masteryClass} rounded-full flex items-center justify-center font-beaufort font-bold text-white shadow-md ${level >= 6 ? 'animate-glow' : ''}`}
      >
        {level}
      </div>
      {showText && (
        <span className="text-xs mt-1 font-beaufort text-lol-light">
          Level {level}
        </span>
      )}
    </div>
  );
};

export default MasteryBadge;
