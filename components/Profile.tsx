
import React from 'react';
import { UserStats, Achievement } from '../types';

interface ProfileProps {
  stats: UserStats;
  achievements: Achievement[];
  onViewHistory: () => void;
}

const Profile: React.FC<ProfileProps> = ({ stats, achievements, onViewHistory }) => {
  const getTitle = (level: number) => {
    if (level < 5) return "Novato Errante";
    if (level < 10) return "Desbravador";
    if (level < 20) return "Mestre de Rotina";
    return "Lenda da Persistência";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="relative mb-6 group">
          <div className="w-36 h-36 rounded-full bg-slate-100 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
            👤
          </div>
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white min-w-[40px] h-10 px-2 rounded-2xl flex items-center justify-center font-black text-lg border-4 border-white shadow-lg">
            {stats.level}
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">{stats.name}</h2>
        <div className="mt-1 flex items-center space-x-2">
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {getTitle(stats.level)}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-8 w-full mt-10 border-t border-slate-50 pt-8">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-indigo-600">{stats.xp}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total XP</span>
          </div>
          <div className="flex flex-col">
             <span className="text-2xl font-black text-orange-500">{stats.streak}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dias Fogo</span>
          </div>
          <div className="flex flex-col">
             <span className="text-2xl font-black text-indigo-600">{stats.totalCompleted}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Missões</span>
          </div>
        </div>

        <button 
          onClick={onViewHistory}
          className="mt-8 w-full bg-slate-900 text-white font-black py-4 rounded-[24px] shadow-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>VER HISTÓRICO DE MISSÕES</span>
        </button>
      </div>

      <div className="px-2">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center">
          <span className="mr-2">🎖️</span> Mural de Conquistas
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {achievements.map((ach) => {
            const isUnlocked = stats.unlockedAchievements.includes(ach.id);
            return (
              <div 
                key={ach.id} 
                className={`flex items-center p-5 rounded-[32px] border-2 transition-all duration-500 ${
                  isUnlocked 
                    ? 'bg-white border-indigo-100 shadow-sm' 
                    : 'bg-slate-50 border-slate-100 grayscale opacity-40 blur-[0.5px]'
                }`}
              >
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-4xl mr-5 shadow-inner transition-transform duration-700 ${
                  isUnlocked ? 'bg-indigo-50 rotate-12' : 'bg-slate-200'
                }`}>
                  {ach.icon}
                </div>
                <div className="flex-grow">
                  <h4 className={`font-black text-lg ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                    {ach.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-snug">{ach.desc}</p>
                </div>
                {isUnlocked && (
                  <div className="ml-2 text-emerald-500">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
