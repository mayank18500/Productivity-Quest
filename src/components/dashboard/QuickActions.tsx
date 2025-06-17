import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Timer, Users, Sword, Loader2 } from 'lucide-react';
import TaskModal from '../../components/dashboard/TaskModal';
import { FocusMode } from './FocusMode';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types'; // Make sure Task type is correctly imported

const ICON_STYLE = { width: 24, height: 24 };

type Action = {
  label: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
  loading?: boolean;
};

export const QuickActions: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [findingTeammate, setFindingTeammate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // ADDED
  const navigate = useNavigate();

  const handleFindTeammates = async () => {
    setFindingTeammate(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('You have been matched with a teammate!');
    } catch (error) {
      alert('Failed to find teammates. Please try again.');
    } finally {
      setFindingTeammate(false);
    }
  };

  const handleSaveTask = (newTask: Task) => {
    console.log('Saved task:', newTask);
    // TODO: Send to backend or update local state
    setShowTaskModal(false);
  };

  const actions: Action[] = [
    {
      label: 'New Task',
      icon: Plus,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        setSelectedTask(null); // New task
        setShowTaskModal(true);
      },
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
      icon: findingTeammate ? Loader2 : Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: handleFindTeammates,
      loading: findingTeammate,
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map(({ label, icon: Icon, color, action, loading }) => (
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
              ${loading ? 'opacity-75' : ''}
            `}
            disabled={loading}
            aria-busy={loading}
            aria-label={label}
          >
            {loading ? (
              <Loader2 style={ICON_STYLE} className="animate-spin" />
            ) : (
              <Icon style={ICON_STYLE} />
            )}
            <span className="text-sm font-medium">
              {loading ? 'Finding...' : label}
            </span>
          </motion.button>
        ))}
      </div>

      {showTaskModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => setShowTaskModal(false)}
          onSave={handleSaveTask}
        />
      )}

      {showFocusMode && (
        <FocusMode onClose={() => setShowFocusMode(false)} />
      )}
    </div>
  );
};
