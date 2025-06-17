import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';

interface LevelProgressProps {
  user: User;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ 
  user, 
  showDetails = false,
  size = 'md' 
}) => {
  const progressPercentage = (user.currentXP / user.xpToNextLevel) * 100;

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className={`font-bold text-gaming-gold ${textSizes[size]}`}>
              Level {user.level}
            </span>
            {showDetails && (
              <span className={`text-gray-400 ${textSizes[size]}`}>
                ({user.totalXP.toLocaleString()} total XP)
              </span>
            )}
          </div>
        </div>
        {showDetails && (
          <span className={`text-gray-300 ${textSizes[size]}`}>
            {user.currentXP}/{user.xpToNextLevel} XP
          </span>
        )}
      </div>
      
      <div className={`bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-full h-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};