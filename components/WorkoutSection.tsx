
import React, { useState } from 'react';
import { WorkoutDay } from '../types';

interface WorkoutSectionProps {
  plan: WorkoutDay[];
}

const WorkoutSection: React.FC<WorkoutSectionProps> = ({ plan }) => {
  const [activeDay, setActiveDay] = useState(0);

  const currentWorkout = plan[activeDay];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-slate-800">Caminho do Guerreiro</h2>
        <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          PLANO 4 DIAS
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {plan.map((day, idx) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(idx)}
            className={`flex-shrink-0 px-5 py-2 rounded-2xl font-bold text-sm transition-all ${
              activeDay === idx 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-slate-500 border border-slate-100'
            }`}
          >
            Dia {day.day}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-slide-up" key={activeDay}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mr-4">
            🎯
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800">{currentWorkout.title}</h3>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Foco do Dia</p>
          </div>
        </div>

        <div className="space-y-4">
          {currentWorkout.exercises.map((ex, i) => (
            <div key={i} className="group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{ex.name}</h4>
                <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase">
                  {ex.sets}
                </span>
              </div>
              <p className="text-xs text-slate-500 italic">"{ex.notes}"</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start">
          <span className="text-xl mr-3">⚠️</span>
          <p className="text-xs text-orange-800 leading-relaxed">
            <strong>DICA:</strong> Todos os exercícios devem ser executados até a <strong>falha concêntrica</strong> (quando você não consegue fazer mais nenhuma repetição com boa forma). Descanse 60-90 segundos entre séries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSection;
