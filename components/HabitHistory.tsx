
import React, { useState } from 'react';
import { Habit, CompletionRecord } from '../types';

interface HabitHistoryProps {
  completions: CompletionRecord;
  habits: Habit[];
  onBack: () => void;
}

const HabitHistory: React.FC<HabitHistoryProps> = ({ completions, habits, onBack }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Gerar últimos 30 dias
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const getDayInfo = (dateStr: string) => {
    const doneIds = completions[dateStr] || [];
    const percent = habits.length > 0 ? (doneIds.length / habits.length) * 100 : 0;
    const dateObj = new Date(dateStr + 'T12:00:00'); // Evitar problemas de fuso
    return {
      date: dateStr,
      label: dateObj.getDate(),
      percent,
      doneIds
    };
  };

  const getColorClass = (percent: number) => {
    if (percent === 0) return 'bg-slate-100 text-slate-400';
    if (percent < 30) return 'bg-indigo-100 text-indigo-400';
    if (percent < 60) return 'bg-indigo-300 text-indigo-700';
    if (percent < 100) return 'bg-indigo-500 text-white';
    return 'bg-indigo-700 text-white shadow-lg shadow-indigo-100';
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center text-slate-500 font-bold hover:text-indigo-600 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Registro Temporal</h2>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Últimos 30 dias</h3>
        <div className="grid grid-cols-7 gap-3">
          {last30Days.map((dateStr) => {
            const info = getDayInfo(dateStr);
            const isSelected = selectedDate === dateStr;
            return (
              <div 
                key={dateStr}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className={`
                  aspect-square rounded-xl flex items-center justify-center text-xs font-black cursor-pointer transition-all duration-300
                  ${getColorClass(info.percent)}
                  ${isSelected ? 'ring-4 ring-indigo-200 scale-110 z-10' : 'hover:scale-105'}
                `}
              >
                {info.label}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-400 px-1">
          <span>MENOS</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-slate-100 rounded" />
            <div className="w-3 h-3 bg-indigo-100 rounded" />
            <div className="w-3 h-3 bg-indigo-300 rounded" />
            <div className="w-3 h-3 bg-indigo-500 rounded" />
            <div className="w-3 h-3 bg-indigo-700 rounded" />
          </div>
          <span>MAIS</span>
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white p-6 rounded-[32px] border-2 border-indigo-100 shadow-xl animate-slide-up">
          <div className="flex justify-between items-start mb-4">
             <h4 className="font-black text-slate-800">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h4>
            <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full uppercase">
              {completions[selectedDate]?.length || 0} CONCLUÍDOS
            </span>
          </div>
          
          <div className="space-y-2">
            {(completions[selectedDate] || []).length > 0 ? (
              completions[selectedDate].map(habitId => {
                const h = habits.find(habit => habit.id === habitId);
                return (
                  <div key={habitId} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                    <span className="text-xl">{h?.icon || '⭐'}</span>
                    <span className="text-sm font-bold text-slate-700">{h?.name || 'Hábito Removido'}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400 italic text-center py-4">Nenhuma missão concluída neste dia.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitHistory;
