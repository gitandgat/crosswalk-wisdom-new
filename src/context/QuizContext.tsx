import { createContext, useContext, useState, ReactNode } from 'react';

export interface QuizState {
  answers: Record<number, number>;
  setAnswer: (questionIndex: number, value: number) => void;
  getScore: (category: 'financial' | 'judgment' | 'identity') => number;
  getPrimaryFear: () => 'financial' | 'judgment' | 'identity' | 'tie';
  isComplete: () => boolean;
  isSectionComplete: (section: number) => boolean;
  reset: () => void;
  progress: number;
  firstName: string;
  setFirstName: (name: string) => void;
}

const QuizContext = createContext<QuizState | null>(null);

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [firstName, setFirstName] = useState('');

  const setAnswer = (q: number, v: number) => {
    setAnswers(prev => ({ ...prev, [q]: v }));
  };

  const getScore = (category: 'financial' | 'judgment' | 'identity') => {
    const ranges = { financial: [1,2,3,4], judgment: [5,6,7,8], identity: [9,10,11,12] };
    return ranges[category].reduce((sum, q) => sum + (answers[q] || 0), 0);
  };

  const getPrimaryFear = (): 'financial' | 'judgment' | 'identity' | 'tie' => {
    const f = getScore('financial');
    const j = getScore('judgment');
    const i = getScore('identity');
    const max = Math.max(f, j, i);
    const ties = [f === max, j === max, i === max].filter(Boolean).length;
    if (ties > 1) return 'tie';
    if (f === max) return 'financial';
    if (j === max) return 'judgment';
    return 'identity';
  };

  const isSectionComplete = (section: number) => {
    const start = (section - 1) * 4 + 1;
    return [start, start+1, start+2, start+3].every(q => answers[q] !== undefined);
  };

  const isComplete = () => Object.keys(answers).length === 12;

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / 12) * 100;

  const reset = () => { setAnswers({}); setFirstName(''); };

  return (
    <QuizContext.Provider value={{ answers, setAnswer, getScore, getPrimaryFear, isComplete, isSectionComplete, reset, progress, firstName, setFirstName }}>
      {children}
    </QuizContext.Provider>
  );
};
