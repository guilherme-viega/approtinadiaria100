
import React from 'react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
}

const Header: React.FC<HeaderProps> = ({ stats }) => {
  const nextLevelXp = Math.pow(stats.level, 2) * 100;
  const prevLevelXp = Math.pow(stats.level - 1, 2) * 100;
  const progressInLevel = stats.xp - prevLevelXp;
  const levelCapacity = nextLevelXp - prevLevelXp;
  const progressPercent = (progressInLevel / levelCapacity) * 100;

  return (
    <header className="sticky top-0 z-50 glass shadow-sm border-b">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {stats.level}
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">Nível {stats.level}</h1>
            <p className="text-xs text-slate-500 font-medium">Avatar: {stats.name}</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-[140px] ml-4">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">XP</span>
            <span className="text-[10px] font-semibold text-slate-400">{Math.round(progressInLevel)} / {levelCapacity}</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
