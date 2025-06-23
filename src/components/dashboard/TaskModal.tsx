import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Task, TaskCategory } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
}

// Simulated AI XP suggestion
const getSuggestedXP = (
  title: string,
  description: string,
  difficulty: string,
  category: string
): number => {
  const baseXP = {
    easy: 50,
    medium: 100,
    hard: 200,
    legendary: 300
  };

  let xp = baseXP[difficulty as keyof typeof baseXP] || 50;
  if (description.length > 100) xp += 20;
  if (title.toLowerCase().includes('project')) xp += 30;
  if (category === 'fitness') xp += 20;

  return Math.min(xp, 1000); // limit max XP
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'legendary'>('easy');
  const [xp, setXP] = useState(50);

  useEffect(() => {
    const newXP = getSuggestedXP(title, description, difficulty, category);
    setXP(newXP);
  }, [title, description, difficulty, category]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      userId: '1',
      title,
      description,
      category,
      difficulty,
      xpReward: xp,
      xp,
      status: 'pending',
      createdAt: new Date(),
      verificationRequired: false,
      verificationMethod: 'self-report',
      tags: [],
      isRecurring: false
    };

    onAddTask(newTask);
    onClose();
    setTitle('');
    setDescription('');
    setCategory('personal');
    setDifficulty('easy');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/60" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md z-10 shadow-lg"
        >
          <Dialog.Title className="text-xl font-semibold mb-4">Create New Task</Dialog.Title>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />

            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              >
                <option value="personal">Personal</option>
                <option value="professional">Professional</option>
                <option value="social">Social</option>
                <option value="habits">Habits</option>
                <option value="learning">Learning</option>
                <option value="fitness">Fitness</option>
                <option value="creative">Creative</option>
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Task['difficulty'])}
                className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>

            <input
              type="number"
              min={10}
              max={1000}
              step={10}
              value={xp}
              readOnly
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-700 cursor-not-allowed"
              placeholder="XP Reward"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
};

export default TaskModal;
