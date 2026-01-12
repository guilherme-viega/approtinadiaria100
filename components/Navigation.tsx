
import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  activeView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setView }) => {
  const items = [
    { id: 'dashboard' as ViewState, label: 'Início', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'habits' as ViewState, label: 'Missões', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )},
    { id: 'workouts' as ViewState, label: 'Treino', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
    { id: 'profile' as ViewState, label: 'Perfil', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-2xl px-4 py-2 flex justify-around items-center z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex flex-col items-center p-2 transition-all duration-300 ${
            activeView === item.id 
              ? 'text-indigo-600 transform scale-110' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {item.icon}
          <span className={`text-[10px] font-bold mt-1 uppercase tracking-tighter ${
            activeView === item.id ? 'opacity-100' : 'opacity-70'
          }`}>
            {item.label}
          </span>
          {activeView === item.id && (
            <div className="w-1 h-1 bg-indigo-600 rounded-full mt-0.5 animate-pulse" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
