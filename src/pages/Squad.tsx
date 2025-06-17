import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Users, 
  Zap, 
  Target, 
  Trophy, 
  Settings,
  Plus,
  UserPlus,
  MessageSquare,
  Calendar,
  TrendingUp,
  Star
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface Squad {
  id: string;
  name: string;
  description: string;
  avatar: string;
  leaderId: string;
  members: SquadMember[];
  level: number;
  totalXP: number;
  weeklyXP: number;
  createdAt: Date;
  isPublic: boolean;
  memberLimit: number;
}

interface SquadMember {
  id: string;
  username: string;
  avatar: string;
  level: number;
  role: 'leader' | 'member';
  joinedAt: Date;
  weeklyXP: number;
  totalContribution: number;
  isOnline: boolean;
}

const mockSquad: Squad = {
  id: 'squad1',
  name: 'The Productivity Legends',
  description: 'Elite squad focused on crushing goals and building lasting habits. We support each other through challenges and celebrate every win, big or small.',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
  leaderId: '1',
  level: 8,
  totalXP: 12450,
  weeklyXP: 1230,
  createdAt: new Date('2023-11-15'),
  isPublic: true,
  memberLimit: 10,
  members: [
    {
      id: '1',
      username: 'ProductivityHero',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 12,
      role: 'leader',
      joinedAt: new Date('2023-11-15'),
      weeklyXP: 420,
      totalContribution: 5430,
      isOnline: true
    },
    {
      id: '2',
      username: 'FocusMaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 15,
      role: 'member',
      joinedAt: new Date('2023-11-20'),
      weeklyXP: 380,
      totalContribution: 4200,
      isOnline: true
    },
    {
      id: '3',
      username: 'CodeNinja',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 11,
      role: 'member',
      joinedAt: new Date('2023-12-01'),
      weeklyXP: 350,
      totalContribution: 2820,
      isOnline: false
    },
    {
      id: '4',
      username: 'LifeHacker',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 10,
      role: 'member',
      joinedAt: new Date('2023-12-10'),
      weeklyXP: 80,
      totalContribution: 2100,
      isOnline: true
    }
  ]
};

const mockSquadChallenges = [
  {
    id: '1',
    title: 'Squad Deep Work Week',
    description: 'Complete 20 hours of deep work as a squad this week',
    progress: 14,
    target: 20,
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    reward: '200 XP per member + Squad XP Boost'
  },
  {
    id: '2',
    title: 'Learning Sprint',
    description: 'Complete 5 learning tasks each member',
    progress: 12,
    target: 20,
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    reward: 'Knowledge Seeker Badge'
  }
];

export const Squad: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'challenges' | 'activity'>('overview');

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
            <Crown className="w-8 h-8 text-gaming-gold" />
            <span>My Squad</span>
          </h1>
          <p className="text-gray-400">Collaborate and compete with your team</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Squad Info Card */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30 p-6">
        <div className="flex items-start space-x-4">
          <img
            src={mockSquad.avatar}
            alt={mockSquad.name}
            className="w-20 h-20 rounded-full border-4 border-gaming-gold/50"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-2xl font-bold text-white">{mockSquad.name}</h2>
              <div className="flex items-center space-x-1 text-gaming-gold">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Level {mockSquad.level}</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{mockSquad.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">{mockSquad.members.length}/{mockSquad.memberLimit} members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-gaming-gold" />
                <span className="text-gray-400">{mockSquad.totalXP.toLocaleString()} total XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">{mockSquad.weeklyXP} this week</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Since Nov 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-1">
        <div className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'members', label: 'Members', icon: Users },
            { id: 'challenges', label: 'Challenges', icon: Trophy },
            { id: 'activity', label: 'Activity', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Squad Stats */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Squad Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">This Week's XP</span>
                  <span className="text-xl font-bold text-gaming-gold">{mockSquad.weeklyXP}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Level</span>
                  <span className="text-xl font-bold text-white">
                    {(mockSquad.members.reduce((sum, m) => sum + m.level, 0) / mockSquad.members.length).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Members</span>
                  <span className="text-xl font-bold text-green-400">
                    {mockSquad.members.filter(m => m.isOnline).length}/{mockSquad.members.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Squad Rank</span>
                  <span className="text-xl font-bold text-blue-400">#23</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { user: 'FocusMaster', action: 'completed Deep Work session', time: '2h ago', xp: 50 },
                  { user: 'CodeNinja', action: 'earned Code Warrior badge', time: '4h ago', xp: 100 },
                  { user: 'ProductivityHero', action: 'reached Level 12', time: '1d ago', xp: 200 }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-gaming-gold font-medium text-sm">+{activity.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Squad Members</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <UserPlus className="w-4 h-4" />
                <span>Invite Member</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {mockSquad.members
                .sort((a, b) => b.weeklyXP - a.weeklyXP)
                .map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-shrink-0 relative">
                    <img
                      src={member.avatar}
                      alt={member.username}
                      className="w-12 h-12 rounded-full"
                    />
                    {member.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                    {member.role === 'leader' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gaming-gold rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">{member.username}</h4>
                      <span className="text-sm text-gray-400">Level {member.level}</span>
                      {member.role === 'leader' && (
                        <span className="text-xs bg-gaming-gold text-black px-2 py-1 rounded">LEADER</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span>Joined {member.joinedAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{member.totalContribution.toLocaleString()} total XP</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gaming-gold">{member.weeklyXP}</div>
                    <div className="text-sm text-gray-400">This week</div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Squad Challenges</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create Challenge</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockSquadChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{challenge.title}</h4>
                      <p className="text-gray-400 text-sm">{challenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Ends in</div>
                      <div className="text-sm font-medium text-orange-400">{getTimeRemaining(challenge.endsAt)}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Progress</span>
                      <span className="text-sm text-primary-400">{challenge.progress}/{challenge.target}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-full h-3 transition-all duration-300"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gaming-gold" />
                      <span className="text-sm text-gray-300">Reward: {challenge.reward}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Squad Activity Feed</h3>
            <div className="space-y-4">
              {[
                { user: 'FocusMaster', action: 'completed 3-hour deep work session', time: '2 hours ago', type: 'achievement' },
                { user: 'CodeNinja', action: 'shared progress on React learning', time: '4 hours ago', type: 'progress' },
                { user: 'ProductivityHero', action: 'reached Level 12 and earned XP Master badge', time: '1 day ago', type: 'celebration' },
                { user: 'LifeHacker', action: 'asked for advice on morning routine optimization', time: '2 days ago', type: 'question' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-700/30 rounded-lg">
                  <div className="w-3 h-3 bg-primary-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="font-medium text-white">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    activity.type === 'achievement' ? 'bg-gaming-gold/20 text-gaming-gold' :
                    activity.type === 'progress' ? 'bg-blue-600/20 text-blue-400' :
                    activity.type === 'celebration' ? 'bg-green-600/20 text-green-400' :
                    'bg-purple-600/20 text-purple-400'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};