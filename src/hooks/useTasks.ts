import { useState, useEffect } from 'react';
import { Task, TaskCategory, TaskDifficulty, TaskStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: '1',
    userId: '1',
    title: 'Complete React Tutorial',
    description: 'Finish the advanced React hooks tutorial series',
    category: 'learning',
    difficulty: 'medium',
    xpReward: 50,
    xp:50,
    status: 'completed',
    createdAt: new Date('2024-01-10'),
    completedAt: new Date('2024-01-10T14:30:00'),
    verificationRequired: true,
    verificationMethod: 'proof-required',
    proof: {
      type: 'screenshot',
      url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Completed course certificate',
      submittedAt: new Date('2024-01-10T14:30:00')
    },
    verifiedBy: ['2', '3'],
    tags: ['react', 'javascript', 'frontend'],
    isRecurring: false
  },
  {
    id: '2',
    userId: '1',
    title: 'Morning Workout',
    description: '30-minute cardio session',
    category: 'fitness',
    difficulty: 'medium',
    xpReward: 40,
    xp:40,
    status: 'completed',
    createdAt: new Date('2024-01-11'),
    completedAt: new Date('2024-01-11T07:00:00'),
    verificationRequired: false,
    verificationMethod: 'self-report',
    tags: ['cardio', 'health'],
    isRecurring: true,
    recurringPattern: {
      frequency: 'daily'
    }
  },
  {
    id: '3',
    userId: '1',
    title: 'Deploy Portfolio Website',
    description: 'Deploy personal portfolio to production',
    category: 'professional',
    difficulty: 'hard',
    xpReward: 100,
    xp:100,
    status: 'in-progress',
    createdAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-15'),
    verificationRequired: true,
    verificationMethod: 'proof-required',
    tags: ['deployment', 'portfolio', 'career'],
    isRecurring: false
  },
  {
    id: '4',
    userId: '1',
    title: 'Read 20 Pages',
    description: 'Continue reading "Atomic Habits"',
    category: 'personal',
    difficulty: 'easy',
    xpReward: 20,
    xp:20,
    status: 'pending',
    createdAt: new Date('2024-01-12'),
    verificationRequired: false,
    verificationMethod: 'self-report',
    tags: ['reading', 'habits', 'self-improvement'],
    isRecurring: true,
    recurringPattern: {
      frequency: 'daily'
    }
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 500);
  }, []);

  const addTask = (title: string, difficulty: TaskDifficulty, category: TaskCategory) => {
    let xpReward = 0;
    if (difficulty === 'easy') xpReward = 10;
    else if (difficulty === 'medium') xpReward = 25;
    else if (difficulty === 'hard') xpReward = 50;

    const newTask: Task = {
  id: uuidv4(),
  userId: '1',
  title,
  description: '',
  category,
  difficulty,
  xpReward,
  xp:xpReward,
  status: 'in-progress',
  createdAt: new Date(), // ✅ fixed
  verificationRequired: false,
  verificationMethod: 'self-report',
  tags: [],
  isRecurring: false
};


    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const completeTask = (taskId: string, proof?: Task['proof']) => {
    updateTask(taskId, {
      status: 'completed',
      completedAt: new Date(),
      proof
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter(task => task.category === category);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getTodaysTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    completeTask,
    deleteTask,
    getTasksByCategory,
    getTasksByStatus,
    getTodaysTasks
  };
};
