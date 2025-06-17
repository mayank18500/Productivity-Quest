import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary-500/50"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Loading Your Quest...
        </motion.h2>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden"
        >
          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"></div>
        </motion.div>
        
        <p className="text-gray-400 mt-4">Preparing your productivity adventure...</p>
      </div>
    </div>
  );
};