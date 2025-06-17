import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Users, 
  Zap, 
  Target,
  Calendar,
  Filter
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  level: number;
  totalXP: number;
  weeklyXP: number;
  monthlyXP: number;
  tasksCompleted: number;
  currentStreak: number;
  badges: any[];
  rank: number;
  change: number;
}

const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: '1',
    username: 'ProductivityHero',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    level: 12,
    totalXP: 5430,
    weeklyXP: 420,
    monthlyXP: 1650,
    tasksCompleted: 189,
    currentStreak: 7,
    badges: [
      { id: '1', name: 'Early Bird', icon: '🌅', rarity: 'rare' },
      { id: '2', name: 'Code Warrior', icon: '⚔️', rarity: 'epic' }
    ],
    rank: 1,
    change: 2
  },
  {
    id: '2',
    username: 'FocusMaster',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    level: 15,
    totalXP: 7280,
    weeklyXP: 380,
    monthlyXP: 1520,
    tasksCompleted: 234,
    currentStreak: 12,
    badges: [
      { id: '3', name: 'Streak Master', icon: '🔥', rarity: 'legendary' },
      { id: '4', name: 'Deep Focus', icon: '🧘', rarity: 'epic' }
    ],
    rank: 2,
    change: -1
  },
  {
    id: '3',
    username: 'CodeNinja',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    level: 11,
    totalXP: 4890,
    weeklyXP: 350,
    monthlyXP: 1420,
    tasksCompleted: 167,
    currentStreak: 5,
    badges: [
      { id: '5', name: 'Git Master', icon: '🐙', rarity: 'rare' },
      { id: '6', name: 'Bug Hunter', icon: '🔍', rarity: 'common' }
    ],
    rank: 3,
    change: 1
  },
  {
    id: '4',
    username: 'LifeHacker',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    level: 10,
    totalXP: 4200,
    weeklyXP: 310,
    monthlyXP: 1280,
    tasksCompleted: 145,
    currentStreak: 8,
    badges: [
      { id: '7', name: 'Habit Builder', icon: '🏗️', rarity: 'rare' }
    ],
    rank: 4,
    change: 0
  },
  {
    id: '5',
    username: 'StudyBeast',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    level: 9,
    totalXP: 3780,
    weeklyXP: 290,
    monthlyXP: 1150,
    tasksCompleted: 128,
    currentStreak: 3,
    badges: [
      { id: '8', name: 'Knowledge Seeker', icon: '📚', rarity: 'common' }
    ],
    rank: 5,
    change: 3
  }
];

export const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const [category, setCategory] = useState<'xp' | 'tasks' | 'streak'>('xp');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-gaming-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-gaming-silver" />;
      case 3:
        return <Trophy className="w-6 h-6 text-gaming-bronze" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-gaming-gold/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gaming-silver/30';
      case 3:
        return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-gaming-bronze/30';
      default:
        return 'bg-gray-800/50 border-gray-700';
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center space-x-1 text-green-400">
          <span className="text-xs">↑{change}</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center space-x-1 text-red-400">
          <span className="text-xs">↓{Math.abs(change)}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 text-gray-400">
          <span className="text-xs">-</span>
        </div>
      );
    }
  };

  const getSortedData = () => {
    return [...mockLeaderboardData].sort((a, b) => {
      switch (category) {
        case 'xp':
          return timeframe === 'weekly' ? b.weeklyXP - a.weeklyXP :
                 timeframe === 'monthly' ? b.monthlyXP - a.monthlyXP :
                 b.totalXP - a.totalXP;
        case 'tasks':
          return b.tasksCompleted - a.tasksCompleted;
        case 'streak':
          return b.currentStreak - a.currentStreak;
        default:
          return 0;
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-gaming-gold" />
            <span>Leaderboard</span>
          </h1>
          <p className="text-gray-400">Compete with fellow productivity heroes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as 'weekly' | 'monthly' | 'alltime')}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="alltime">All Time</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'xp' | 'tasks' | 'streak')}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="xp">XP Earned</option>
              <option value="tasks">Tasks Completed</option>
              <option value="streak">Current Streak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getSortedData().slice(0, 3).map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${getRankBg(index + 1)} rounded-lg border-2 p-6 text-center relative overflow-hidden`}
          >
            <div className="absolute top-2 right-2">
              {getRankIcon(index + 1)}
            </div>
            
            <img
              src={user.avatar}
              alt={user.username}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white/20"
            />
            
            <h3 className="text-lg font-bold text-white mb-1">{user.username}</h3>
            <p className="text-sm text-gray-400 mb-2">Level {user.level}</p>
            
            <div className="text-2xl font-bold text-gaming-gold mb-2">
              {category === 'xp' ? (
                timeframe === 'weekly' ? user.weeklyXP :
                timeframe === 'monthly' ? user.monthlyXP :
                user.totalXP
              ).toLocaleString() : 
              category === 'tasks' ? user.tasksCompleted :
              user.currentStreak}
              {category === 'xp' && ' XP'}
              {category === 'streak' && ' days'}
            </div>
            
            <div className="flex justify-center space-x-1 mb-3">
              {user.badges.slice(0, 3).map(badge => (
                <Badge key={badge.id} badge={badge} size="sm" />
              ))}
            </div>
            
            {getChangeIndicator(user.change)}
          </motion.div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Full Rankings</span>
          </h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {getSortedData().map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 text-center">
                  {getRankIcon(index + 1)}
                </div>
                
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-12 h-12 rounded-full border-2 border-white/10"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-white truncate">{user.username}</h4>
                    <span className="text-sm text-gray-400">Level {user.level}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{user.totalXP.toLocaleString()} XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{user.tasksCompleted} tasks</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🔥</span>
                      <span>{user.currentStreak} day streak</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {user.badges.slice(0, 2).map(badge => (
                      <Badge key={badge.id} badge={badge} size="sm" />
                    ))}
                    {user.badges.length > 2 && (
                      <span className="text-xs text-gray-400">+{user.badges.length - 2}</span>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gaming-gold">
                      {category === 'xp' ? (
                        timeframe === 'weekly' ? user.weeklyXP :
                        timeframe === 'monthly' ? user.monthlyXP :
                        user.totalXP
                      ).toLocaleString() : 
                      category === 'tasks' ? user.tasksCompleted :
                      user.currentStreak}
                      {category === 'xp' && ' XP'}
                      {category === 'streak' && ' days'}
                    </div>
                    {getChangeIndicator(user.change)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 text-center border-t border-gray-700">
          <button className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
            Load More Rankings
          </button>
        </div>
      </div>
    </div>
  );
};