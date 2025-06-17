import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LevelProgress } from '../ui/LevelProgress';
import { Badge } from '../ui/Badge';

export const Header: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks, users, challenges..."
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-48">
            <LevelProgress user={user} size="sm" />
          </div>
          
          <div className="flex items-center space-x-2">
            {user.badges.slice(0, 3).map(badge => (
              <Badge key={badge.id} badge={badge} size="sm" />
            ))}
            {user.badges.length > 3 && (
              <span className="text-xs text-gray-400">+{user.badges.length - 3}</span>
            )}
          </div>

          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <div className="text-white font-medium">{user.username}</div>
              <div className="text-gray-400">Level {user.level}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};