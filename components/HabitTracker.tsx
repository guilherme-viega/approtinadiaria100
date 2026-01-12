
import React, { useState } from 'react';
import { Habit, CompletionRecord } from '../types';

interface HabitTrackerProps {
  habits: Habit[];
  completions: CompletionRecord;
  today: string;
  onToggle: (id: string) => void;
  onAdd: (name: string, category: Habit['category'], icon: string) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, completions, today, onToggle, onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState<Habit['category']>('Saúde');
  const [newIcon, setNewIcon] = useState('⭐');

  const todayCompletions = completions[today] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName, newCat, newIcon);
      setNewName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Missões Ativas</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
        >
          {isAdding ? '✕' : '+'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[32px] border-2 border-indigo-100 shadow-2xl space-y-4 animate-slide-up">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">O que vamos dominar?</label>
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Ler 10 páginas"
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Categoria</label>
              <select 
                value={newCat}
                onChange={(e) => setNewCat(e.target.value as Habit['category'])}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Saúde</option>
                <option>Mente</option>
                <option>Produtividade</option>
                <option>Estilo de Vida</option>
              </select>
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Ícone</label>
               <input 
                type="text" 
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                maxLength={2}
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            CONFIRMAR MISSÃO
          </button>
        </form>
      )}

      <div className="space-y-3">
        {habits.map((habit) => {
          const isDone = todayCompletions.includes(habit.id);
          return (
            <div 
              key={habit.id}
              onClick={() => onToggle(habit.id)}
              className={`group flex items-center p-4 rounded-[24px] cursor-pointer transition-all duration-500 border-2 ${
                isDone 
                  ? 'bg-emerald-50 border-emerald-100 opacity-75' 
                  : 'bg-white border-transparent shadow-sm hover:shadow-md hover:border-indigo-100 active:scale-[0.98]'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mr-4 transition-all duration-700 ${
                isDone ? 'bg-emerald-100 rotate-[360deg]' : 'bg-slate-100 group-hover:bg-indigo-50 group-hover:scale-110'
              }`}>
                {habit.icon}
              </div>
              <div className="flex-grow">
                <h4 className={`font-black text-base transition-colors ${isDone ? 'text-emerald-700 line-through' : 'text-slate-800'}`}>
                  {habit.name}
                </h4>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${isDone ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {habit.category} • <span className="text-indigo-600">+{habit.xp} XP</span>
                </p>
              </div>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${
                isDone 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'border-slate-200 bg-slate-50'
              }`}>
                {isDone && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitTracker;
