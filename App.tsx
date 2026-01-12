
import React, { useState, useEffect } from 'react';
import { INITIAL_HABITS, WORKOUT_PLAN, ACHIEVEMENTS } from './constants';
import { Habit, CompletionRecord, UserStats, ViewState, Achievement } from './types';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import WorkoutSection from './components/WorkoutSection';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import Header from './components/Header';
import AchievementToast from './components/AchievementToast';
import HabitHistory from './components/HabitHistory';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('levelup_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });
  
  const [completions, setCompletions] = useState<CompletionRecord>(() => {
    const saved = localStorage.getItem('levelup_completions');
    return saved ? JSON.parse(saved) : {};
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('levelup_stats');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      streak: 0,
      totalCompleted: 0,
      name: 'Viajante',
      unlockedAchievements: []
    };
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    localStorage.setItem('levelup_habits', JSON.stringify(habits));
    localStorage.setItem('levelup_completions', JSON.stringify(completions));
    localStorage.setItem('levelup_stats', JSON.stringify(stats));
  }, [habits, completions, stats]);

  const checkAchievements = (newCompletions: CompletionRecord) => {
    ACHIEVEMENTS.forEach(ach => {
      if (!stats.unlockedAchievements.includes(ach.id) && ach.condition(newCompletions, habits)) {
        setStats(prev => ({
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, ach.id],
          xp: prev.xp + ach.xpReward
        }));
        setUnlockedAchievement(ach);
      }
    });
  };

  const toggleHabit = (id: string) => {
    const todayCompletions = completions[today] || [];
    const isCompleted = todayCompletions.includes(id);
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    let newTodayCompletions: string[];
    let xpChange = habit.xp;

    if (isCompleted) {
      newTodayCompletions = todayCompletions.filter(cid => cid !== id);
      xpChange = -xpChange;
    } else {
      newTodayCompletions = [...todayCompletions, id];
    }

    const nextCompletions = {
      ...completions,
      [today]: newTodayCompletions
    };

    setCompletions(nextCompletions);
    updateStats(xpChange, !isCompleted ? 1 : -1);
    
    setTimeout(() => checkAchievements(nextCompletions), 100);
  };

  const updateStats = (xpChange: number, completedChange: number) => {
    setStats(prev => {
      const newXp = Math.max(0, prev.xp + xpChange);
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        totalCompleted: Math.max(0, prev.totalCompleted + completedChange)
      };
    });
  };

  const addHabit = (name: string, category: Habit['category'], icon: string) => {
    const newHabit: Habit = {
      id: `h-${Date.now()}`,
      name,
      category,
      icon,
      xp: 25,
      isCustom: true
    };
    setHabits([...habits, newHabit]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header stats={stats} />
      
      <main className="flex-grow pb-24 max-w-2xl mx-auto w-full px-4 pt-6">
        <div className="animate-slide-up">
          {view === 'dashboard' && (
            <Dashboard 
              habits={habits} 
              completions={completions} 
              stats={stats} 
              today={today}
            />
          )}
          {view === 'habits' && (
            <HabitTracker 
              habits={habits} 
              completions={completions} 
              today={today}
              onToggle={toggleHabit}
              onAdd={addHabit}
            />
          )}
          {view === 'workouts' && (
            <WorkoutSection plan={WORKOUT_PLAN} />
          )}
          {view === 'profile' && (
            <Profile 
              stats={stats} 
              achievements={ACHIEVEMENTS} 
              onViewHistory={() => setView('history')} 
            />
          )}
          {view === 'history' && (
            <HabitHistory 
              completions={completions} 
              habits={habits} 
              onBack={() => setView('profile')} 
            />
          )}
        </div>
      </main>

      <Navigation activeView={view === 'history' ? 'profile' : view} setView={setView} />

      {unlockedAchievement && (
        <AchievementToast 
          achievement={unlockedAchievement} 
          onClose={() => setUnlockedAchievement(null)} 
        />
      )}
    </div>
  );
};

export default App;
