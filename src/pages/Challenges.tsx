import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sword, 
  Users, 
  Clock, 
  Trophy, 
  Zap, 
  Calendar,
  Target,
  Star,
  Play,
  CheckCircle2,
  Filter,
  Plus
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special-event';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  xpReward: number;
  badge?: any;
  startDate: Date;
  endDate: Date;
  participants: number;
  maxParticipants?: number;
  requirements: string[];
  progress?: number;
  isJoined: boolean;
  isCompleted: boolean;
  leaderboard: { username: string; progress: number; avatar: string }[];
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '7-Day Deep Work Challenge',
    description: 'Complete at least 2 hours of focused deep work every day for 7 consecutive days',
    type: 'weekly',
    category: 'Focus',
    difficulty: 'medium',
    xpReward: 350,
    badge: {
      id: 'deep-focus',
      name: 'Deep Focus Master',
      icon: '🧘',
      rarity: 'epic'
    },
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    participants: 156,
    maxParticipants: 200,
    requirements: ['Complete 2+ hours of deep work', 'Maintain 7-day streak', 'Submit daily proof'],
    progress: 4,
    isJoined: true,
    isCompleted: false,
    leaderboard: [
      { username: 'FocusMaster', progress: 7, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { username: 'CodeNinja', progress: 6, avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { username: 'ProductivityHero', progress: 4, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  {
    id: '2',
    title: 'New Year Fitness Kickstart',
    description: 'Complete 30 workouts in 30 days to build a lasting fitness habit',
    type: 'monthly',
    category: 'Fitness',
    difficulty: 'hard',
    xpReward: 500,
    badge: {
      id: 'fitness-warrior',
      name: 'Fitness Warrior',
      icon: '💪',
      rarity: 'legendary'
    },
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    participants: 89,
    requirements: ['Complete 30 workouts', 'Track all sessions', 'Share weekly progress'],
    progress: 12,
    isJoined: true,
    isCompleted: false,
    leaderboard: [
      { username: 'FitnessBeast', progress: 18, avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { username: 'HealthHero', progress: 15, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { username: 'ProductivityHero', progress: 12, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  {
    id: '3',
    title: 'Daily Reading Sprint',
    description: 'Read for at least 30 minutes every day this week',
    type: 'daily',
    category: 'Learning',
    difficulty: 'easy',
    xpReward: 150,
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    participants: 234,
    requirements: ['Read 30+ minutes daily', 'Track reading sessions', 'Share book recommendations'],
    isJoined: false,
    isCompleted: false,
    leaderboard: [
      { username: 'BookWorm', progress: 5, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  {
    id: '4',
    title: 'Code Review Champion',
    description: 'Review and provide feedback on 10 code submissions from the community',
    type: 'special-event',
    category: 'Professional',
    difficulty: 'medium',
    xpReward: 200,
    badge: {
      id: 'code-reviewer',
      name: 'Code Review Champion',
      icon: '👨‍💻',
      rarity: 'rare'
    },
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    participants: 67,
    maxParticipants: 100,
    requirements: ['Review 10 code submissions', 'Provide constructive feedback', 'Maintain quality standards'],
    isJoined: false,
    isCompleted: false,
    leaderboard: []
  }
];

export const Challenges: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showOnlyJoined, setShowOnlyJoined] = useState(false);

  const difficultyColors = {
    easy: 'from-green-500 to-green-400',
    medium: 'from-yellow-500 to-yellow-400',
    hard: 'from-red-500 to-red-400',
    legendary: 'from-purple-500 to-pink-500'
  };

  const typeIcons = {
    daily: Clock,
    weekly: Calendar,
    monthly: Target,
    'special-event': Star
  };

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesJoined = !showOnlyJoined || challenge.isJoined;
    return matchesType && matchesDifficulty && matchesJoined;
  });

  const getTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Ending soon';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Sword className="w-8 h-8 text-orange-400" />
            <span>Challenges</span>
          </h1>
          <p className="text-gray-400">Join challenges and compete with the community</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Challenge</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Play className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">2</div>
              <div className="text-sm text-gray-400">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gaming-gold/20 rounded-lg">
              <Zap className="w-5 h-5 text-gaming-gold" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">1,250</div>
              <div className="text-sm text-gray-400">XP Earned</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">5</div>
              <div className="text-sm text-gray-400">Badges Won</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="special-event">Special Events</option>
            </select>
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="legendary">Legendary</option>
          </select>

          <label className="flex items-center space-x-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={showOnlyJoined}
              onChange={(e) => setShowOnlyJoined(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
            />
            <span>Show only joined</span>
          </label>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge, index) => {
          const TypeIcon = typeIcons[challenge.type];
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 rounded-lg border-2 p-6 hover:scale-[1.02] transition-all duration-200 ${
                challenge.isJoined ? 'border-primary-500/50' : 'border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <TypeIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400 capitalize">{challenge.type.replace('-', ' ')}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">{challenge.category}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${difficultyColors[challenge.difficulty]} text-white`}>
                  {challenge.difficulty}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
              <p className="text-gray-400 mb-4">{challenge.description}</p>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {challenge.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary-400 rounded-full"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress */}
              {challenge.isJoined && challenge.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Progress</span>
                    <span className="text-sm text-primary-400">{challenge.progress}/7 days</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(challenge.progress / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Participants and Leaderboard */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {challenge.participants} participants
                      {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{getTimeRemaining(challenge.endDate)}</span>
                  </div>
                </div>
                
                {challenge.leaderboard.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Top performers:</span>
                    <div className="flex -space-x-2">
                      {challenge.leaderboard.slice(0, 3).map((user, idx) => (
                        <img
                          key={idx}
                          src={user.avatar}
                          alt={user.username}
                          className="w-6 h-6 rounded-full border-2 border-gray-800"
                          title={`${user.username} - ${user.progress} progress`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-gaming-gold" />
                    <span className="text-sm font-medium text-gaming-gold">{challenge.xpReward} XP</span>
                  </div>
                  {challenge.badge && (
                    <div className="flex items-center space-x-1">
                      <Badge badge={challenge.badge} size="sm" />
                      <span className="text-sm text-gray-400">Badge</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex space-x-2">
                {challenge.isCompleted ? (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg w-full justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                ) : challenge.isJoined ? (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex-1 justify-center">
                    <Target className="w-4 h-4" />
                    <span>Continue</span>
                  </button>
                ) : (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex-1 justify-center">
                    <Play className="w-4 h-4" />
                    <span>Join Challenge</span>
                  </button>
                )}
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚔️</div>
          <h3 className="text-xl font-semibold text-white mb-2">No challenges found</h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your filters or create a new challenge
          </p>
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
            Create Challenge
          </button>
        </div>
      )}
    </div>
  );
};