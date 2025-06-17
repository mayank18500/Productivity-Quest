export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  totalXP: number;
  currentXP: number;
  xpToNextLevel: number;
  bio?: string;
  badges: Badge[];
  stats: UserStats;
  preferences: UserPreferences;
  streaks: Streak[];
  joinedAt: Date;
  isOnline: boolean;
  trustScore: number;
  following: string[];
  followers: string[];
  squadId?: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  xp:number;
  xpReward: number;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
  verificationRequired: boolean;
  verificationMethod: VerificationMethod;
  proof?: TaskProof;
  verifiedBy?: string[];
  tags: string[];
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  target?:string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  unlockedAt: Date;
  requirements: BadgeRequirement[];
}

export interface UserStats {
  tasksCompleted: number;
  totalXPEarned: number;
  currentStreak: number;
  longestStreak: number;
  categoriesStats: Record<TaskCategory, number>;
  averageTasksPerDay: number;
  timeSpentFocusing: number; // in minutes
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  requirements: ChallengeRequirement[];
  xpReward: number;
  badge?: Badge;
  startDate: Date;
  endDate: Date;
  participants: string[];
  leaderboard: ChallengeLeaderboard[];
}

export interface Squad {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  leaderId: string;
  members: string[];
  level: number;
  totalXP: number;
  createdAt: Date;
  challenges: string[];
  isPublic: boolean;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  type: PostType;
  attachments?: string[];
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  relatedTaskId?: string;
  relatedChallengeId?: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  likes: string[];
}

export type TaskCategory = 'personal' | 'professional' | 'social' | 'habits' | 'learning' | 'fitness' | 'creative';
export type TaskDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'verified';
export type VerificationMethod = 'self-report' | 'proof-required' | 'peer-review' | 'auto-integration';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ChallengeType = 'daily' | 'weekly' | 'monthly' | 'special-event';
export type PostType = 'achievement' | 'progress' | 'question' | 'celebration' | 'challenge-update';

export interface TaskProof {
  type: 'screenshot' | 'link' | 'text' | 'video';
  url?: string;
  description?: string;
  submittedAt: Date;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  notifications: {
    email: boolean;
    push: boolean;
    achievements: boolean;
    social: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showStats: boolean;
    allowTeamInvites: boolean;
  };
}

export interface Streak {
  type: TaskCategory | 'overall';
  count: number;
  lastUpdated: Date;
  isActive: boolean;
}

export interface BadgeRequirement {
  type: 'tasks-completed' | 'xp-earned' | 'streak-days' | 'category-focus' | 'social-interaction';
  target: number;
  category?: TaskCategory;
}

export interface ChallengeRequirement {
  type: 'complete-tasks' | 'earn-xp' | 'maintain-streak' | 'category-specific';
  target: number;
  category?: TaskCategory;
  timeframe: 'daily' | 'weekly' | 'total';
}

export interface ChallengeLeaderboard {
  userId: string;
  progress: number;
  rank: number;
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[]; // 0-6, Sunday = 0
  dayOfMonth?: number;
}