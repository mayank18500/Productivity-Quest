import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  Clock,
  Zap,
  Trophy,
  Flame,
  Users,
  Filter
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Stats: React.FC = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  if (!user) return null;

  const weeklyData = [
    { day: 'Mon', xp: 120, tasks: 3 },
    { day: 'Tue', xp: 80, tasks: 2 },
    { day: 'Wed', xp: 200, tasks: 5 },
    { day: 'Thu', xp: 150, tasks: 4 },
    { day: 'Fri', xp: 180, tasks: 4 },
    { day: 'Sat', xp: 90, tasks: 2 },
    { day: 'Sun', xp: 110, tasks: 3 }
  ];

  const categoryData = Object.entries(user.stats.categoriesStats).map(([category, count]) => ({
    category,
    count,
    percentage: (count / user.stats.tasksCompleted) * 100
  }));

  const categoryColors = {
    personal: 'bg-blue-500',
    professional: 'bg-green-500',
    social: 'bg-purple-500',
    habits: 'bg-orange-500',
    learning: 'bg-yellow-500',
    fitness: 'bg-red-500',
    creative: 'bg-pink-500'
  };

  const categoryIcons = {
    personal: '🎯',
    professional: '💼',
    social: '👥',
    habits: '🔄',
    learning: '📚',
    fitness: '💪',
    creative: '🎨'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-8 h-8 text-primary-400" />
            <span>Statistics</span>
          </h1>
          <p className="text-gray-400">Track your productivity journey and progress</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gaming-gold/20 rounded-lg">
              <Zap className="w-6 h-6 text-gaming-gold" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{user.stats.totalXPEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total XP Earned</div>
              <div className="text-xs text-green-400 mt-1">+420 this week</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{user.stats.tasksCompleted}</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
              <div className="text-xs text-green-400 mt-1">+23 this week</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-600/20 rounded-lg">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{user.stats.currentStreak}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
              <div className="text-xs text-gray-400 mt-1">Best: {user.stats.longestStreak} days</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{user.stats.averageTasksPerDay.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Daily Average</div>
              <div className="text-xs text-green-400 mt-1">+0.3 from last month</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Weekly Progress</span>
          </h3>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-8 text-sm text-gray-400">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{day.tasks} tasks</span>
                    <span className="text-sm text-gaming-gold">{day.xp} XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.xp / 200) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-full h-2"
                    ></motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Task Categories</span>
          </h3>
          
          <div className="space-y-3">
            {categoryData
              .sort((a, b) => b.count - a.count)
              .map((category, index) => (
              <div key={category.category} className="flex items-center space-x-3">
                <div className="text-lg">{categoryIcons[category.category as keyof typeof categoryIcons]}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300 capitalize">{category.category}</span>
                    <span className="text-sm text-gray-400">{category.count} tasks</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`${categoryColors[category.category as keyof typeof categoryColors]} rounded-full h-2`}
                    ></motion.div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 w-10 text-right">
                  {category.percentage.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Focus Time</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Hours</span>
              <span className="text-xl font-bold text-white">{Math.floor(user.stats.timeSpentFocusing / 60)}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">This Week</span>
              <span className="text-lg font-semibold text-primary-400">12h 30m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Daily Average</span>
              <span className="text-lg font-semibold text-blue-400">1h 47m</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Achievements</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Badges Earned</span>
              <span className="text-xl font-bold text-white">{user.badges.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Rare+ Badges</span>
              <span className="text-lg font-semibold text-purple-400">
                {user.badges.filter(b => ['rare', 'epic', 'legendary'].includes(b.rarity)).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Completion Rate</span>
              <span className="text-lg font-semibold text-green-400">87%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Social Stats</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Squad Rank</span>
              <span className="text-xl font-bold text-white">#3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Challenges Won</span>
              <span className="text-lg font-semibold text-gaming-gold">7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Peer Reviews</span>
              <span className="text-lg font-semibold text-blue-400">23</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gray-800 rounded-lg border border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Progress Timeline</h3>
        <div className="space-y-4">
          {[
            { date: 'Today', event: 'Completed Deep Work session', xp: 50 },
            { date: 'Yesterday', event: 'Earned Code Warrior badge', xp: 100 },
            { date: '2 days ago', event: 'Reached Level 12', xp: 200 },
            { date: '3 days ago', event: '7-day streak milestone', xp: 75 },
            { date: '1 week ago', event: 'Joined Productivity Legends squad', xp: 0 }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{item.event}</span>
                  {item.xp > 0 && (
                    <span className="text-gaming-gold font-medium">+{item.xp} XP</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};