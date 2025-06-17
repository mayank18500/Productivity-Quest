import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'legendary';

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  tooltip?: boolean;
}

const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    color: 'bg-green-500/20 text-green-500 border-green-500',
    icon: '⭐',
    xp: '10 XP',
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500',
    icon: '⭐⭐',
    xp: '25 XP',
  },
  hard: {
    label: 'Hard',
    color: 'bg-red-500/20 text-red-500 border-red-500',
    icon: '🔥',
    xp: '50 XP',
  },
  legendary: {
    label: 'Legendary',
    color: 'bg-purple-500/20 text-purple-500 border-purple-500',
    icon: '⚡',
    xp: '100 XP',
  },
} as const;

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className,
  showIcon = true,
  size = 'md',
  onClick,
  tooltip = false,
}) => {
  const config = DIFFICULTY_CONFIG[difficulty];

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.();
    }
  };

  const badgeContent = (
    <>
      {showIcon && <span className="mr-1.5">{config.icon}</span>}
      <span className="font-medium">{config.label}</span>
      <span className="ml-1.5 text-xs opacity-80">{config.xp}</span>
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: onClick ? 1.05 : 1 }}
      whileTap={{ scale: onClick ? 0.95 : 1 }}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${config.label} difficulty - ${config.xp}`}
      className={cn(
        'inline-flex items-center rounded-full border cursor-pointer select-none focus:outline-none focus:ring-2 ring-offset-1 ring-gray-300 transition-all duration-150',
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {tooltip ? (
        <div className="relative group">
          {badgeContent}
          <span className="absolute z-10 w-max top-full mt-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded px-2 py-1">
            {config.xp} for completing this task
          </span>
        </div>
      ) : (
        badgeContent
      )}
    </motion.div>
  );
};
