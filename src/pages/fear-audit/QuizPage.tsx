import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import ProgressBar from '@/components/ProgressBar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

const sections = [
  {
    label: 'Part 1: Financial Insecurity',
    questions: [
      "I worry constantly about how I'd pay bills if I left my job.",
      "I feel like I need at least 12+ months of savings before I can even consider leaving.",
      "The thought of unstable or unpredictable income makes me physically anxious.",
      "I stay in my job primarily because of the paycheck, not because it fulfills me.",
    ],
    startIndex: 1,
  },
  {
    label: 'Part 2: Fear of Judgment',
    questions: [
      "I worry about what my family will think if I walk away from my career.",
      "I'm afraid colleagues or peers will see me as a failure if I leave this profession.",
      "I've invested so much time, money, and training into this career that leaving feels like admitting defeat.",
      "I care deeply about maintaining my professional reputation — even if it's exhausting me.",
    ],
    startIndex: 5,
  },
  {
    label: 'Part 3: Identity Loss',
    questions: [
      "I don't know who I'd be without my job title.",
      "My career is a huge part of how I introduce myself to others.",
      "I feel like I'd lose my sense of purpose if I walked away from this work.",
      "I'm afraid I won't recognize myself — or like who I become — in a different career.",
    ],
    startIndex: 9,
  },
];

const scaleLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

const QuizPage = () => {
  const { section } = useParams<{ section: string }>();
  const sectionIdx = parseInt(section || '1') - 1;
  const currentSection = sections[sectionIdx];
  const navigate = useNavigate();
  const { answers, setAnswer, progress, isSectionComplete } = useQuiz();
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowValidation(false);
  }, [sectionIdx]);

  if (!currentSection) {
    navigate('/');
    return null;
  }

  const handleNext = () => {
    if (!isSectionComplete(sectionIdx + 1)) {
      setShowValidation(true);
      return;
    }
    if (sectionIdx < 2) {
      navigate(`/quiz/${sectionIdx + 2}`);
    } else {
      navigate('/calculating');
    }
  };

  const handleBack = () => {
    if (sectionIdx > 0) {
      navigate(`/quiz/${sectionIdx}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        {/* Progress */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>

        {/* Section Label */}
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mt-8 mb-8 opacity-0 animate-fade-up">
          {currentSection.label}
        </h2>

        {/* Questions */}
        <div className="space-y-8">
          {currentSection.questions.map((question, qi) => {
            const qNum = currentSection.startIndex + qi;
            const selected = answers[qNum];
            const unanswered = showValidation && selected === undefined;

            return (
              <div
                key={qNum}
                className={`bg-card rounded-xl p-6 shadow-sm border opacity-0 animate-fade-up ${unanswered ? 'border-accent ring-2 ring-accent/30' : 'border-border'}`}
                style={{ animationDelay: `${qi * 0.1 + 0.2}s` }}
              >
                <p className="text-foreground font-medium mb-4">
                  <span className="text-secondary font-heading font-bold mr-2">{qNum}.</span>
                  {question}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => { setAnswer(qNum, val); setShowValidation(false); }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        selected === val
                          ? 'bg-secondary text-secondary-foreground border-secondary shadow-md scale-105'
                          : 'bg-card text-muted-foreground border-border hover:border-secondary hover:text-secondary'
                      }`}
                    >
                      {val} — {scaleLabels[val - 1]}
                    </button>
                  ))}
                </div>
                {unanswered && (
                  <p className="text-accent text-sm mt-2 font-medium">Please answer this question.</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10 mb-8">
          <button
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            className="bg-accent text-accent-foreground font-heading font-bold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            {sectionIdx < 2 ? 'Next →' : 'See My Results →'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;
