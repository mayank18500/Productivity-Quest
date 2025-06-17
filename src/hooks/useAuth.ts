import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  username: 'ProductivityHero',
  email: 'hero@productivityquest.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  level: 12,
  totalXP: 5430,
  currentXP: 430,
  xpToNextLevel: 570,
  bio: 'Leveling up one task at a time! Currently grinding coding skills and fitness goals.',
  badges: [
    {
      id: '1',
      name: 'Early Bird',
      description: 'Complete 30 morning tasks',
      icon: '🌅',
      rarity: 'rare',
      unlockedAt: new Date('2024-01-15'),
      requirements: [{ type: 'tasks-completed', target: 30 }]
    },
    {
      id: '2',
      name: 'Code Warrior',
      description: 'Complete 50 coding tasks',
      icon: '⚔️',
      rarity: 'epic',
      unlockedAt: new Date('2024-02-01'),
      requirements: [{ type: 'category-focus', target: 50, category: 'professional' }]
    }
  ],
  stats: {
    tasksCompleted: 189,
    totalXPEarned: 5430,
    currentStreak: 7,
    longestStreak: 23,
    categoriesStats: {
      personal: 45,
      professional: 89,
      social: 12,
      habits: 23,
      learning: 15,
      fitness: 3,
      creative: 2
    },
    averageTasksPerDay: 3.2,
    timeSpentFocusing: 2340
  },
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      achievements: true,
      social: true
    },
    privacy: {
      profilePublic: true,
      showStats: true,
      allowTeamInvites: true
    }
  },
  streaks: [
    {
      type: 'overall',
      count: 7,
      lastUpdated: new Date(),
      isActive: true
    }
  ],
  joinedAt: new Date('2023-12-01'),
  isOnline: true,
  trustScore: 95,
  following: ['2', '3', '4'],
  followers: ['2', '5', '6', '7'],
  squadId: 'squad1'
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser(mockUser);
    setIsLoading(false);
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newUser: User = {
      ...mockUser,
      id: Date.now().toString(),
      username,
      email,
      level: 1,
      totalXP: 0,
      currentXP: 0,
      xpToNextLevel: 100,
      badges: [],
      stats: {
        tasksCompleted: 0,
        totalXPEarned: 0,
        currentStreak: 0,
        longestStreak: 0,
        categoriesStats: {
          personal: 0,
          professional: 0,
          social: 0,
          habits: 0,
          learning: 0,
          fitness: 0,
          creative: 0
        },
        averageTasksPerDay: 0,
        timeSpentFocusing: 0
      },
      following: [],
      followers: []
    };
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading
  };
};

export { AuthContext };