import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Timer, Users, Sword } from 'lucide-react';
import TaskModal from './TaskModal'; // ✅ Corrected import
import { FocusMode } from './FocusMode';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types'; // ✅ Make sure this path matches your structure

type Action = {
  label: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
};

export const QuickActions: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [findingTeammate, setFindingTeammate] = useState(false);
  const navigate = useNavigate();

  const handleFindTeammates = () => {
    setFindingTeammate(true);
    setTimeout(() => {
      alert('You have been matched with a teammate!');
      setFindingTeammate(false);
    }, 2000);
  };

  const handleAddTask = (newTask: Task) => {
    console.log('New task added:', newTask);
    // You can integrate this with global task state later
  };

  const actions: Action[] = [
    {
      label: 'New Task',
      icon: Plus,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => setShowTaskModal(true),
    },
    {
      label: 'Focus Session',
      icon: Timer,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => setShowFocusMode(true),
    },
    {
      label: 'Join Challenge',
      icon: Sword,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => navigate('/challenges'),
    },
    {
      label: 'Find Teammates',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: handleFindTeammates,
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, icon: Icon, color, action }) => {
          const isFinding = label === 'Find Teammates' && findingTeammate;
          return (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action}
              className={`
                ${color}
                text-white p-4 rounded-lg
                flex flex-col items-center space-y-2
                transition-colors duration-200
              `}
              disabled={isFinding}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">
                {isFinding ? 'Finding...' : label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {}
      {showTaskModal && (
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {showFocusMode && (
        <FocusMode onClose={() => setShowFocusMode(false)} />
      )}
    </div>
  );
};
