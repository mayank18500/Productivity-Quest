import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface XPGainAnimationProps {
  xp: number;
  trigger: boolean;
  onComplete?: () => void;
}

export const XPGainAnimation: React.FC<XPGainAnimationProps> = ({ 
  xp, 
  trigger, 
  onComplete 
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            y: [-20, -40, -60, -80],
            scale: [0.5, 1, 1, 0.8]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-gaming-gold to-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            +{xp} XP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};