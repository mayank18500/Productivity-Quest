import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Flame, 
  Trophy,
  TrendingUp,
  Clock
} from 'lucide-react';
import { User } from '../../types';

interface DashboardStatsProps {
  user: User;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ user }) => {
  const stats = [
    {
      label: 'Tasks Completed',
      value: user.stats.tasksCompleted,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      label: 'Total XP',
      value: user.stats.totalXPEarned.toLocaleString(),
      icon: Zap,
      color: 'text-gaming-gold',
      bgColor: 'bg-yellow-900/20'
    },
    {
      label: 'Current Streak',
      value: `${user.stats.currentStreak} days`,
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20'
    },
    {
      label: 'Badges Earned',
      value: user.badges.length,
      icon: Trophy,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20'
    },
    {
      label: 'Daily Average',
      value: user.stats.averageTasksPerDay.toFixed(1),
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    },
    {
      label: 'Focus Time',
      value: `${Math.floor(user.stats.timeSpentFocusing / 60)}h`,
      icon: Clock,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-lg border border-gray-700 ${stat.bgColor} hover:scale-105 transition-transform duration-200`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
