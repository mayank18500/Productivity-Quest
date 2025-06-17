import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Badge } from '../components/ui/Badge';

export const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'appearance'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = () => {
    updateProfile({
      username: formData.username,
      bio: formData.bio
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <SettingsIcon className="w-8 h-8 text-gray-400" />
            <span>Settings</span>
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Basic Info */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                
                <div className="flex items-center space-x-6 mb-6">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-sm text-gray-400 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              {/* Account Stats */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gaming-gold">{user.level}</div>
                    <div className="text-sm text-gray-400">Current Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{user.stats.tasksCompleted}</div>
                    <div className="text-sm text-gray-400">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400">{user.badges.length}</div>
                    <div className="text-sm text-gray-400">Badges Earned</div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {user.badges.map(badge => (
                    <Badge key={badge.id} badge={badge} size="md" />
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    <Lock className="w-4 h-4" />
                    <span>Update Password</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-white mb-3 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Notifications</span>
                  </h4>
                  <div className="space-y-3 ml-6">
                    {[
                      { key: 'achievements', label: 'Achievement unlocks and level ups' },
                      { key: 'social', label: 'Comments, likes, and social interactions' },
                      { key: 'challenges', label: 'Challenge invites and results' },
                      { key: 'weekly', label: 'Weekly progress summary' }
                    ].map(item => (
                      <label key={item.key} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={user.preferences.notifications.email}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-gray-300">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-white mb-3 flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Push Notifications</span>
                  </h4>
                  <div className="space-y-3 ml-6">
                    {[
                      { key: 'task-reminders', label: 'Task deadlines and reminders' },
                      { key: 'streak-alerts', label: 'Streak break warnings' },
                      { key: 'squad-activity', label: 'Squad member activities' },
                      { key: 'daily-goals', label: 'Daily goal completion prompts' }
                    ].map(item => (
                      <label key={item.key} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={user.preferences.notifications.push}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-gray-300">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-6 flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Profile Visibility</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked={user.preferences.privacy.profilePublic}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Make my profile publicly visible</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked={user.preferences.privacy.showStats}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Show my statistics on profile</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked={user.preferences.privacy.allowTeamInvites}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Allow squad invitations</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-white mb-3">Data Sharing</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Share anonymous usage data to improve the platform</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Allow integration with productivity apps</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-md font-medium text-white mb-3 text-red-400">Danger Zone</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-900/30 transition-colors">
                      Export My Data
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-900/30 transition-colors">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Theme</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-gray-900 border-2 border-primary-500 rounded-lg">
                      <div className="w-full h-16 bg-gray-900 rounded mb-2 flex items-center justify-center">
                        <span className="text-white text-sm">Dark Theme</span>
                      </div>
                      <span className="text-sm text-primary-400">Current</span>
                    </button>
                    <button className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                      <div className="w-full h-16 bg-white rounded mb-2 flex items-center justify-center border">
                        <span className="text-gray-900 text-sm">Light Theme</span>
                      </div>
                      <span className="text-sm text-gray-600">Coming Soon</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-white mb-3">Language</h4>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-md font-medium text-white mb-3">Animation Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Enable animations and transitions</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Show XP gain animations</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};