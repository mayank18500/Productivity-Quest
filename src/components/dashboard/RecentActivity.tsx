import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Trophy, 
  Users, 
  Zap,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'task_completed' | 'badge_earned' | 'level_up' | 'joined_squad' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: Date;
  xp?: number;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_completed',
    title: 'Completed React Tutorial',
    description: 'Finished the advanced React hooks tutorial series',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    xp: 50
  },
  {
    id: '2',
    type: 'badge_earned',
    title: 'Earned "Code Warrior" Badge',
    description: 'Completed 50 programming tasks',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '3',
    type: 'level_up',
    title: 'Level Up!',
    description: 'Reached Level 12',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    type: 'streak_milestone',
    title: '7-Day Streak!',
    description: 'Maintained consistent daily progress',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  }
];

export const RecentActivity: React.FC = () => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'badge_earned':
        return <Trophy className="w-5 h-5 text-gaming-gold" />;
      case 'level_up':
        return <Zap className="w-5 h-5 text-purple-400" />;
      case 'joined_squad':
        return <Users className="w-5 h-5 text-blue-400" />;
      case 'streak_milestone':
        return <Clock className="w-5 h-5 text-orange-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white truncate">
                  {activity.title}
                </p>
                {activity.xp && (
                  <span className="text-xs text-gaming-gold font-medium">
                    +{activity.xp} XP
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors">
        View All Activity
      </button>
    </div>
  );
};