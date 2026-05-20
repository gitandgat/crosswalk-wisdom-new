import { useState, useEffect } from 'react';
import AssessmentLanding from '../components/assessment/AssessmentLanding';
import AssessmentQuiz from '../components/assessment/AssessmentQuiz';
import AssessmentResults from '../components/assessment/AssessmentResults';
import { calculateStage } from '../data/assessmentData';
import type { StageResult } from '../data/assessmentData';

type Screen = 'landing' | 'quiz' | 'results';

interface QuizState {
  screen: Screen;
  answers: number[];
  currentQuestionIndex: number;
  result?: StageResult;
  score?: number;
}

const STORAGE_KEY = 'crosswalk_quiz_state';

const ASSESSMENT_TITLE = 'Nurse Burnout Assessment | Free 2-Min Quiz | Crosswalk Wisdom';
const ASSESSMENT_DESCRIPTION =
  "Take this free 2-minute burnout quiz built for nurses, doctors, and healthcare workers. Discover which of the 4 healing stages you're in and get your personalized next step.";

export default function AssessmentPage() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<StageResult | null>(null);
  const [score, setScore] = useState<number>(0);

  // Update document title + meta description for this route
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDesc?.content ?? '';

    document.title = ASSESSMENT_TITLE;
    if (metaDesc) metaDesc.content = ASSESSMENT_DESCRIPTION;

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.content = prevDescription;
    };
  }, []);

  // Restore in-progress session from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;
    try {
      const state: QuizState = JSON.parse(savedState);
      if (state.screen === 'quiz' && state.answers.length > 0) {
        setScreen(state.screen);
        setAnswers(state.answers);
        setCurrentQuestionIndex(state.currentQuestionIndex);
      } else if (state.screen === 'results' && state.result && state.score !== undefined) {
        setScreen(state.screen);
        setAnswers(state.answers);
        setResult(state.result);
        setScore(state.score);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveState = (state: QuizState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const handleStart = () => {
    setScreen('quiz');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    saveState({ screen: 'quiz', answers: [], currentQuestionIndex: 0 });
  };

  const handleQuizComplete = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, s) => sum + s, 0);
    const averageScore = totalScore / finalAnswers.length;
    const stageResult = calculateStage(finalAnswers);

    setAnswers(finalAnswers);
    setResult(stageResult);
    setScore(averageScore);
    setScreen('results');

    saveState({
      screen: 'results',
      answers: finalAnswers,
      currentQuestionIndex: finalAnswers.length,
      result: stageResult,
      score: averageScore,
    });

    window.dispatchEvent(
      new CustomEvent('quiz_completed', {
        detail: { stage: stageResult.stage, score: averageScore },
      })
    );
  };

  const handleRetake = () => {
    setScreen('landing');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setScore(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (screen === 'landing') {
    return <AssessmentLanding onStart={handleStart} />;
  }

  if (screen === 'quiz') {
    return (
      <AssessmentQuiz
        onComplete={handleQuizComplete}
        savedAnswers={answers}
        savedQuestionIndex={currentQuestionIndex}
      />
    );
  }

  if (result) {
    return (
      <AssessmentResults
        result={result}
        score={score}
        answers={answers}
        onRetake={handleRetake}
      />
    );
  }

  // Fallback — should not be reached
  return <AssessmentLanding onStart={handleStart} />;
}
