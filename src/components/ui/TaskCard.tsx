import React, { useState } from 'react';
import { motion } from 'framer-motion';

import {
  Clock,
  CheckCircle2,
  Play,
  Camera,
  Link as LinkIcon,
  Users,
  Calendar,
  Star
} from 'lucide-react';
import { Task } from '../../types';
import { XPGainAnimation } from '../../components/ui/XPGainAnimation';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onUpdate }) => {
  const [showXPGain, setShowXPGain] = useState(false);

  const difficultyColors = {
    easy: 'from-green-500 to-green-400',
    medium: 'from-yellow-500 to-yellow-400',
    hard: 'from-red-500 to-red-400',
    legendary: 'from-purple-500 to-pink-500'
  };

  const statusColors = {
    pending: 'border-gray-600 bg-gray-800/50',
    'in-progress': 'border-blue-500 bg-blue-900/20',
    completed: 'border-green-500 bg-green-900/20',
    failed: 'border-red-500 bg-red-900/20',
    verified: 'border-purple-500 bg-purple-900/20'
  };

  const categoryIcons: Record<string, string> = {
    personal: '🎯',
    professional: '💼',
    social: '👥',
    habits: '🔄',
    learning: '📚',
    fitness: '💪',
    creative: '🎨'
  };

  const handleComplete = () => {
    if (task.status !== 'completed') {
      onComplete(task.id);
      setShowXPGain(true);
    }
  };

  const handleStartTask = () => {
    if (task.status === 'pending') {
      onUpdate(task.id, { status: 'in-progress' });
    }
  };

  const isOverdue = task.dueDate && new Date() > new Date(task.dueDate) && task.status !== 'completed';

  return (
    <>
      <motion.div
        layout
        className={`
          p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02]
          ${statusColors[task.status]}
          ${isOverdue ? 'border-red-500 bg-red-900/30' : ''}
        `}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{categoryIcons[task.category]}</span>
            <div>
              <h3 className="font-semibold text-white">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-400 mt-1">{task.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`
              px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r
              ${difficultyColors[task.difficulty]} text-white
            `}>
              {task.difficulty}
            </div>
            <div className="flex items-center space-x-1 text-gaming-gold">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">{task.xp}</span>
            </div>
          </div>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className={isOverdue ? 'text-red-400' : ''}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}

            {task.verificationRequired && (
              <div className="flex items-center space-x-1">
                {task.verificationMethod === 'proof-required' && <Camera className="w-4 h-4" />}
                {task.verificationMethod === 'peer-review' && <Users className="w-4 h-4" />}
                <span className="text-xs">Verification Required</span>
              </div>
            )}

            {task.isRecurring && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Recurring</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {task.status === 'pending' && (
              <button
                onClick={handleStartTask}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm">Start</span>
              </button>
            )}

            {(task.status === 'in-progress' || task.status === 'pending') && (
              <button
                onClick={handleComplete}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Complete</span>
              </button>
            )}

            {task.status === 'completed' && (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Completed</span>
              </div>
            )}
          </div>
        </div>

        {task.proof && (
          <div className="mt-3 p-2 bg-gray-700/50 rounded border">
            <div className="flex items-center space-x-2">
              {task.proof.type === 'screenshot' && <Camera className="w-4 h-4 text-blue-400" />}
              {task.proof.type === 'link' && <LinkIcon className="w-4 h-4 text-blue-400" />}
              <span className="text-sm text-gray-300">Proof submitted</span>
            </div>
            {task.proof.description && (
              <p className="text-xs text-gray-400 mt-1">{task.proof.description}</p>
            )}
          </div>
        )}
      </motion.div>

      <XPGainAnimation
        xp={task.xp}
        trigger={showXPGain}
        onComplete={() => setShowXPGain(false)}
      />
    </>
  );
};
