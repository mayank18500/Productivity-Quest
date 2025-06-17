import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Trophy, 
  Target,
  Zap,
  Clock,
  Plus,
  Filter,
  Search,
  Camera
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    level: number;
  };
  type: 'achievement' | 'progress' | 'question' | 'celebration' | 'challenge-update';
  content: string;
  attachments?: string[];
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  relatedTask?: {
    title: string;
    xp: number;
  };
  relatedBadge?: any;
}

interface Comment {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
  likes: string[];
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '2',
      username: 'FocusMaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 15
    },
    type: 'achievement',
    content: 'Just earned the "Deep Focus Master" badge after completing the 7-day deep work challenge! 🧘 The key was turning off all notifications and using the Pomodoro technique. Who else is working on their focus skills?',
    likes: ['1', '3', '4', '5'],
    comments: [
      {
        id: '1',
        user: {
          username: 'ProductivityHero',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        content: 'Congrats! I\'m on day 4 of the same challenge. Your tips are really helpful!',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: ['2']
      }
    ],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    relatedBadge: {
      id: 'deep-focus',
      name: 'Deep Focus Master',
      icon: '🧘',
      rarity: 'epic'
    }
  },
  {
    id: '2',
    user: {
      id: '3',
      username: 'CodeNinja',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 11
    },
    type: 'progress',
    content: 'Day 12 of learning React! Just built my first full-stack app with authentication. The feeling when your code finally works is unmatched 🚀',
    attachments: ['https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'],
    likes: ['1', '2', '4'],
    comments: [],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    relatedTask: {
      title: 'Build React App with Auth',
      xp: 100
    }
  },
  {
    id: '3',
    user: {
      id: '4',
      username: 'LifeHacker',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 10
    },
    type: 'question',
    content: 'How do you stay motivated when working on long-term projects? I\'ve been working on my side project for 3 months and sometimes lose steam. Any tips from fellow productivity heroes?',
    likes: ['1', '2'],
    comments: [
      {
        id: '2',
        user: {
          username: 'FocusMaster',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        content: 'Break it into smaller milestones and celebrate each win! Also, having an accountability buddy helps a lot.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: ['1', '4']
      }
    ],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
  },
  {
    id: '4',
    user: {
      id: '5',
      username: 'StudyBeast',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 9
    },
    type: 'celebration',
    content: 'Hit Level 9 today! 🎉 Started this journey 6 months ago at Level 1. Consistency really pays off. Thank you to this amazing community for all the support and motivation!',
    likes: ['1', '2', '3', '4', '6', '7'],
    comments: [],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

export const Social: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const postTypeIcons = {
    achievement: Trophy,
    progress: Target,
    question: MessageSquare,
    celebration: Zap,
    'challenge-update': Clock
  };

  const postTypeColors = {
    achievement: 'text-gaming-gold',
    progress: 'text-blue-400',
    question: 'text-purple-400',
    celebration: 'text-green-400',
    'challenge-update': 'text-orange-400'
  };

  const filteredPosts = mockPosts.filter(post => 
    filter === 'all' || post.type === filter
  );

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string, comment: string) => {
    // Handle comment functionality
    console.log('Comment on post:', postId, comment);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Users className="w-8 h-8 text-blue-400" />
            <span>Social Feed</span>
          </h1>
          <p className="text-gray-400">Connect with fellow productivity heroes</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">127</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <Heart className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">89</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">45</div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gaming-gold/20 rounded-lg">
              <Trophy className="w-5 h-5 text-gaming-gold" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">234</div>
              <div className="text-sm text-gray-400">Likes Given</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="You"
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={() => setShowCreatePost(!showCreatePost)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-400 text-left rounded-lg transition-colors"
              >
                Share your progress, ask questions, or celebrate wins...
              </button>
            </div>
            
            {showCreatePost && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'achievement', 'progress', 'question', 'celebration'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {type === 'all' ? 'All Posts' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post, index) => {
              const PostIcon = postTypeIcons[post.type];
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                >
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={post.user.avatar}
                      alt={post.user.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{post.user.username}</h3>
                        <span className="text-sm text-gray-400">Level {post.user.level}</span>
                        <div className={`p-1 rounded ${postTypeColors[post.type]}`}>
                          <PostIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">
                        {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-300 mb-3">{post.content}</p>
                    
                    {/* Related Task/Badge */}
                    {post.relatedTask && (
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{post.relatedTask.title}</span>
                          <div className="flex items-center space-x-1 text-gaming-gold">
                            <Zap className="w-3 h-3" />
                            <span className="text-xs">{post.relatedTask.xp} XP</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {post.relatedBadge && (
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge badge={post.relatedBadge} size="sm" />
                          <span className="text-sm text-gray-300">Earned: {post.relatedBadge.name}</span>
                        </div>
                      </div>
                    )}

                    {/* Attachments */}
                    {post.attachments && post.attachments.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {post.attachments.map((attachment, idx) => (
                          <img
                            key={idx}
                            src={attachment}
                            alt="Post attachment"
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes.length}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm">{post.comments.length}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start space-x-3 bg-gray-700/30 rounded-lg p-3">
                          <img
                            src={comment.user.avatar}
                            alt={comment.user.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-white">{comment.user.username}</span>
                              <span className="text-xs text-gray-400">
                                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{comment.content}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                                <Heart className="w-3 h-3" />
                                <span className="text-xs">{comment.likes.length}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Trending Topics</h3>
            <div className="space-y-2">
              {['#DeepWork', '#ReactLearning', '#FitnessChallenge', '#ProductivityTips'].map(tag => (
                <button
                  key={tag}
                  className="block w-full text-left px-3 py-2 text-primary-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Suggested Connections</h3>
            <div className="space-y-3">
              {[
                { username: 'FitnessGuru', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400', level: 18 },
                { username: 'CodeMentor', avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400', level: 22 }
              ].map(user => (
                <div key={user.username} className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{user.username}</div>
                    <div className="text-xs text-gray-400">Level {user.level}</div>
                  </div>
                  <button className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};