import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  Play,
  Camera,
  Link as LinkIcon,
  Users,
  Calendar,
  Star,
  Edit
} from 'lucide-react';
import { Task } from '../../types';
import { XPGainAnimation } from '../../components/ui/XPGainAnimation';
import { DifficultyBadge } from '../ui/DifficultyBadge'; // New component

// Constants for better maintainability
const STATUS_COLORS = {
  pending: 'border-gray-600 bg-gray-800/50',
  'in-progress': 'border-blue-500 bg-blue-900/20',
  completed: 'border-green-500 bg-green-900/20',
  failed: 'border-red-500 bg-red-900/20',
  verified: 'border-purple-500 bg-purple-900/20'
};

const CATEGORY_ICONS: Record<string, string> = {
  personal: '🎯',
  professional: '💼',
  social: '👥',
  habits: '🔄',
  learning: '📚',
  fitness: '💪',
  creative: '🎨'
};

interface TaskModalProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onEdit?: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = React.memo(({ 
  task, 
  onComplete, 
  onUpdate,
  onEdit 
}) => {
  const [showXPGain, setShowXPGain] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const isOverdue = useMemo(() => (
    task.dueDate && 
    new Date() > new Date(task.dueDate) && 
    task.status !== 'completed'
  ), [task.dueDate, task.status]);

  const handleComplete = async () => {
    if (task.status !== 'completed') {
      setIsCompleting(true);
      try {
        await onComplete(task.id);
        setShowXPGain(true);
      } finally {
        setIsCompleting(false);
      }
    }
  };

  const handleStartTask = () => {
    if (task.status === 'pending') {
      onUpdate(task.id, { status: 'in-progress' });
    }
  };

  const statusClass = isOverdue 
    ? 'border-red-500 bg-red-900/30' 
    : STATUS_COLORS[task.status];

  return (
    <>
      <motion.div
        layout
        className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${statusClass}`}
        whileHover={{ y: -2 }}
        aria-labelledby={`task-title-${task.id}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl" aria-hidden="true">
              {CATEGORY_ICONS[task.category] || '📝'}
            </span>
            <div>
              <h3 
                id={`task-title-${task.id}`}
                className="font-semibold text-white"
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-400 mt-1">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DifficultyBadge difficulty={task.difficulty} />
            <div className="flex items-center space-x-1 text-gaming-gold">
              <Star className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">{task.xp} XP</span>
            </div>
            {onEdit && (
              <button 
                onClick={() => onEdit(task.id)}
                aria-label={`Edit task ${task.title}`}
                className="p-1 text-gray-400 hover:text-white"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {task.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                aria-label={`Tag: ${tag}`}
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
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time 
                  dateTime={new Date(task.dueDate).toISOString()}
                  className={isOverdue ? 'text-red-400' : ''}
                >
                  {new Date(task.dueDate).toLocaleDateString()}
                </time>
              </div>
            )}

            {task.verificationRequired && (
              <div className="flex items-center space-x-1">
                {task.verificationMethod === 'proof-required' && (
                  <Camera className="w-4 h-4" aria-label="Proof required" />
                )}
                {task.verificationMethod === 'peer-review' && (
                  <Users className="w-4 h-4" aria-label="Peer review required" />
                )}
                <span className="text-xs">Verification Required</span>
              </div>
            )}

            {task.isRecurring && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" aria-label="Recurring task" />
                <span className="text-xs">Recurring</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {task.status === 'pending' && (
              <button
                onClick={handleStartTask}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                aria-label={`Start task ${task.title}`}
              >
                <Play className="w-4 h-4" />
                <span className="text-sm">Start</span>
              </button>
            )}

            {(task.status === 'in-progress' || task.status === 'pending') && (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors disabled:opacity-75"
                aria-label={`Complete task ${task.title}`}
              >
                {isCompleting ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Complete</span>
                  </>
                )}
              </button>
            )}

            {task.status === 'completed' && (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
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
});

TaskModal.displayName = 'TaskModal';
export default TaskModal;