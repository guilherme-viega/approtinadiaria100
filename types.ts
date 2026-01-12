
export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: 'Saúde' | 'Produtividade' | 'Mente' | 'Estilo de Vida';
  xp: number;
  isCustom?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  condition: (completions: CompletionRecord, habits: Habit[]) => boolean;
  xpReward: number;
}

export interface CompletionRecord {
  [date: string]: string[];
}

export interface WorkoutExercise {
  name: string;
  sets: string;
  notes: string;
}

export interface WorkoutDay {
  day: number;
  title: string;
  exercises: WorkoutExercise[];
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  totalCompleted: number;
  name: string;
  unlockedAchievements: string[];
}

export type ViewState = 'dashboard' | 'habits' | 'workouts' | 'profile' | 'history';
