
import { Habit, WorkoutDay, Achievement, CompletionRecord } from './types';

export const INITIAL_HABITS: Habit[] = [
  { id: 'h1', name: 'Não Fumar', icon: '🚭', category: 'Saúde', xp: 80 },
  { id: 'h2', name: 'Leitura', icon: '📚', category: 'Mente', xp: 40 },
  { id: 'h3', name: 'Treino do Dia', icon: '💪', category: 'Saúde', xp: 120 },
  { id: 'h4', name: 'Tomar Água (2L+)', icon: '💧', category: 'Saúde', xp: 30 },
  { id: 'h5', name: 'Skin Care', icon: '✨', category: 'Estilo de Vida', xp: 20 },
  { id: 'h6', name: 'Comer Direito', icon: '🥗', category: 'Saúde', xp: 50 },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_week_smoke_free',
    title: 'Pulmão de Aço',
    desc: '7 dias seguidos sem fumar',
    icon: '🫁',
    xpReward: 500,
    condition: (history) => {
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      });
      return last7Days.every(date => history[date]?.includes('h1'));
    }
  },
  {
    id: 'hydration_master',
    title: 'Mestre da Hidratação',
    desc: 'Bebeu água suficiente por 5 dias',
    icon: '🔱',
    xpReward: 200,
    condition: (history) => {
      const last5Days = Array.from({ length: 5 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      });
      return last5Days.every(date => history[date]?.includes('h4'));
    }
  },
  {
    id: 'bookworm',
    title: 'Leitor Assíduo',
    desc: 'Leu por 10 dias no total',
    icon: '🧠',
    xpReward: 300,
    condition: (history) => {
      return Object.values(history).filter(day => day.includes('h2')).length >= 10;
    }
  },
  {
    id: 'workout_warrior',
    title: 'Guerreiro Lendário',
    desc: 'Completou 20 treinos',
    icon: '🛡️',
    xpReward: 1000,
    condition: (history) => {
      return Object.values(history).filter(day => day.includes('h3')).length >= 20;
    }
  }
];

export const WORKOUT_PLAN: WorkoutDay[] = [
  {
    day: 1,
    title: 'Peito e Tríceps',
    exercises: [
      { name: 'Flexão de Braço Padrão', sets: 'Até a falha', notes: 'Mantenha o corpo reto' },
      { name: 'Flexão Declinada (Pés elevados)', sets: 'Até a falha', notes: 'Foca no peito superior' },
      { name: 'Flexão Aberta', sets: 'Até a falha', notes: 'Foca no peitoral lateral' },
      { name: 'Tríceps Testa (Mochila/Peso)', sets: 'Até a falha', notes: 'Cotovelos fechados' },
      { name: 'Tríceps Banco', sets: 'Até a falha', notes: 'Use uma cadeira estável' },
      { name: 'Flexão Diamante', sets: 'Até a falha', notes: 'Mãos juntas formando um diamante' },
    ]
  },
  {
    day: 2,
    title: 'Pernas',
    exercises: [
      { name: 'Agachamento Búlgaro', sets: 'Até a falha', notes: 'Um pé atrás em um banco' },
      { name: 'Afundo (Passada)', sets: 'Até a falha', notes: 'Passos largos e controlados' },
      { name: 'Agachamento Sumô', sets: 'Até a falha', notes: 'Pés afastados, pontas para fora' },
      { name: 'Stiff Unilateral (Peso/Mochila)', sets: 'Até a falha', notes: 'Foco no posterior de coxa' },
      { name: 'Panturrilha Unilateral', sets: 'Até a falha', notes: 'Use um degrau para amplitude' },
    ]
  },
  {
    day: 3,
    title: 'Costas e Bíceps',
    exercises: [
      { name: 'Remada Curvada (Peso/Barra)', sets: 'Até a falha', notes: 'Coluna ereta, incline o tronco' },
      { name: 'Remada Unilateral (Serrote)', sets: 'Até a falha', notes: 'Apoie uma mão no banco' },
      { name: 'Super-Homem (Chão)', sets: 'Até a falha', notes: 'Levante peito e pernas do chão' },
      { name: 'Rosca Direta (Mochila/Peso)', sets: 'Até a falha', notes: 'Mantenha cotovelos fixos' },
      { name: 'Rosca Martelo', sets: 'Até a falha', notes: 'Pegada neutra (palmas para dentro)' },
      { name: 'Rosca Concentrada', sets: 'Até a falha', notes: 'Sentado, cotovelo na parte interna da coxa' },
    ]
  },
  {
    day: 4,
    title: 'Ombros e Abdômen',
    exercises: [
      { name: 'Flexão Pike', sets: 'Até a falha', notes: 'Quadril elevado, cabeça desce entre as mãos' },
      { name: 'Elevação Lateral (Garrafas)', sets: 'Até a falha', notes: 'Braços levemente flexionados' },
      { name: 'Elevação Frontal', sets: 'Até a altura dos olhos', notes: '' },
      { name: 'Abdominal Supra', sets: 'Até a falha', notes: 'Foco na contração superior' },
      { name: 'Abdominal Infra', sets: 'Até a falha', notes: 'Elevação de pernas' },
      { name: 'Prancha Abdominal', sets: 'Até a falha', notes: 'Tempo máximo possível' },
    ]
  }
];
