
import React from 'react';
import { Habit, CompletionRecord, UserStats } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  habits: Habit[];
  completions: CompletionRecord;
  stats: UserStats;
  today: string;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, completions, stats, today }) => {
  const todayCompletions = completions[today] || [];
  const progress = habits.length > 0 ? (todayCompletions.length / habits.length) * 100 : 0;

  // Mock data for the chart based on the last 7 days
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const done = completions[dateStr]?.length || 0;
    return {
      name: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
      tasks: done
    };
  });

  return (
    <div className="space-y-6">
      {/* Daily Progress Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Progresso de Hoje</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
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
            <p className="text-indigo-600 text-xs font-bold mt-1 uppercase tracking-tight">Faltam {habits.length - todayCompletions.length} para o 100%!</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-3xl mb-1">🔥</span>
          <span className="text-2xl font-black text-orange-500">{stats.streak}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Streak Dias</span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-3xl mb-1">🏆</span>
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
                tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}}
                dy={10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="tasks" 
                stroke="#4f46e5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTasks)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Motivation Section */}
      <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-200 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-1 italic">"A constância é a mãe do sucesso."</h3>
          <p className="text-indigo-100 text-sm opacity-90">Não pare agora. Cada hábito marcado é um passo para uma versão melhor de você.</p>
        </div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 transform rotate-12">🚀</div>
      </div>
    </div>
  );
};

export default Dashboard;
