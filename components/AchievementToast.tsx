
import React, { useEffect } from 'react';
import { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-6">
      <div className="bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-indigo-500 p-8 w-full max-w-sm pointer-events-auto animate-slide-up text-center relative overflow-hidden">
        {/* Confetti Animation Placeholder */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-indigo-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl border-4 border-white transform rotate-12 scale-110">
            {achievement.icon}
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">CONQUISTA!</h2>
          <h3 className="text-xl font-bold text-indigo-600 mb-1">{achievement.title}</h3>
          <p className="text-sm text-slate-500 font-medium mb-6">{achievement.desc}</p>
          <div className="bg-indigo-600 text-white font-black py-2 px-4 rounded-full inline-block shadow-lg">
            +{achievement.xpReward} XP RECOMPENSA
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AchievementToast;
