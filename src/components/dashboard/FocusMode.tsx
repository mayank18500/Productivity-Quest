import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const FocusMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [dndEnabled, setDndEnabled] = useState(false);

  useEffect(() => {
    // Simulate enabling DND
    console.log('Do Not Disturb mode enabled');
    setDndEnabled(true);

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('Do Not Disturb mode disabled');
      setDndEnabled(false);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <X className="w-6 h-6" />
      </button>
      <h2 className="text-white text-3xl font-bold mb-4">Focus Session</h2>
      <p className="text-lg text-gray-300 mb-2">Do Not Disturb: {dndEnabled ? 'ON' : 'OFF'}</p>
      <p className="text-4xl font-mono text-green-400">{formatTime(seconds)}</p>
      <button
        onClick={onClose}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
      >
        End Session
      </button>
    </div>
  );
};
