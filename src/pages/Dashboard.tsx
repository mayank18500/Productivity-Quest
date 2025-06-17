import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { LevelProgress } from '../components/ui/LevelProgress';
import { Badge } from '../components/ui/Badge';
import { TaskCard } from '../components/ui/TaskCard';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tasks, completeTask, updateTask } = useTasks();

  if (!user) return null;

  const todaysTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.createdAt);
    return taskDate.toDateString() === today.toDateString();
  });

  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user.username}! 🚀
            </h1>
            <p className="text-primary-100">
              Ready to level up? You have {inProgressTasks.length} tasks in progress.
            </p>
          </div>
          <div className="text-right">
            <div className="w-64">
              <LevelProgress user={user} showDetails size="lg" />
            </div>
            <div className="flex items-center justify-end space-x-2 mt-3">
              {user.badges.slice(0, 4).map(badge => (
                <Badge key={badge.id} badge={badge} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <DashboardStats user={user} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Today's Tasks ({todaysTasks.length})
            </h3>
            {todaysTasks.length > 0 ? (
              <div className="space-y-3">
                {todaysTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onUpdate={updateTask}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No tasks for today. Create your first task to start earning XP!</p>
              </div>
            )}
          </div>

          {/* In Progress Tasks */}
          {inProgressTasks.length > 0 && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                In Progress ({inProgressTasks.length})
              </h3>
              <div className="space-y-3">
                {inProgressTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onUpdate={updateTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};