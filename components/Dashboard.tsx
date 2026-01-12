
import React, { useState, useEffect } from 'react';
import { Habit, CompletionRecord, UserStats } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';

interface DashboardProps {
  habits: Habit[];
  completions: CompletionRecord;
  stats: UserStats;
  today: string;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, completions, stats, today }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const todayCompletions = completions[today] || [];
  const progress = habits.length > 0 ? (todayCompletions.length / habits.length) * 100 : 0;

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString('sv-SE');
    const done = completions[dateStr]?.length || 0;
    return {
      name: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
      tasks: done
    };
  });

  return (
    <div className="space-y-6">
      {/* Daily Progress Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-slate-800">Progresso de Hoje</h2>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reset em</span>
            <span className="text-sm font-black text-indigo-600 font-mono">{timeLeft}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
              <circle
                cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                className="text-indigo-600 transition-all duration-1000 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xl font-extrabold text-indigo-700">{Math.round(progress)}%</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Você completou</p>
            <h3 className="text-2xl font-black text-slate-800">{todayCompletions.length} de {habits.length}</h3>
            <p className="text-indigo-600 text-xs font-bold mt-1 uppercase tracking-tight">
              {progress === 100 ? '✨ Meta do dia batida!' : `Faltam ${habits.length - todayCompletions.length} missões`}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="relative">
            <span className="text-3xl mb-1 block">🔥</span>
            {stats.streak > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
            )}
          </div>
          <span className="text-2xl font-black text-orange-500">{stats.streak}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dias de Fogo</span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-3xl mb-1 block">🏆</span>
          <span className="text-2xl font-black text-indigo-600">{stats.totalCompleted}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Tarefas</span>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Atividade Semanal</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}}
                dy={10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="tasks" 
                stroke="#4f46e5" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorTasks)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
