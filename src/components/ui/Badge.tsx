import React from 'react';
import { Badge as BadgeType } from '../../types';

interface BadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  badge, 
  size = 'md',
  showTooltip = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  const rarityColors = {
    common: 'from-gaming-common to-green-400',
    rare: 'from-gaming-rare to-blue-400',
    epic: 'from-gaming-epic to-purple-400',
    legendary: 'from-gaming-legendary to-pink-400'
  };

  const rarityGlow = {
    common: 'shadow-green-500/50',
    rare: 'shadow-blue-500/50',
    epic: 'shadow-purple-500/50',
    legendary: 'shadow-pink-500/50'
  };

  return (
    <div className="relative group">
      <div className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br ${rarityColors[badge.rarity]}
        rounded-full 
        flex items-center justify-center 
        shadow-lg ${rarityGlow[badge.rarity]}
        hover:scale-110 transition-transform duration-200
        cursor-pointer
      `}>
        <span className="text-white drop-shadow-md">
          {badge.icon}
        </span>
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="bg-gray-800 text-white p-2 rounded-lg shadow-lg whitespace-nowrap">
            <div className="font-semibold text-sm">{badge.name}</div>
            <div className="text-xs text-gray-300">{badge.description}</div>
            <div className={`text-xs capitalize font-medium ${
              badge.rarity === 'common' ? 'text-gaming-common' :
              badge.rarity === 'rare' ? 'text-gaming-rare' :
              badge.rarity === 'epic' ? 'text-gaming-epic' :
              'text-gaming-legendary'
            }`}>
              {badge.rarity}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};