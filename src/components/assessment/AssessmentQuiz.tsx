import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { questions } from '../../data/assessmentData';
import type { Answer } from '../../data/assessmentData';

interface AssessmentQuizProps {
  onComplete: (answers: number[]) => void;
  savedAnswers?: number[];
  savedQuestionIndex?: number;
}

export default function AssessmentQuiz({ onComplete, savedAnswers = [], savedQuestionIndex = 0 }: AssessmentQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedQuestionIndex);
  const [answers, setAnswers] = useState<number[]>(savedAnswers);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: Answer, index: number) => {
    setSelectedAnswer(index);

    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answer.points;
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        onComplete(newAnswers);
      }
    }, 500);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <div className="w-full bg-brand-charcoal/5 h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-brand-amber via-brand-orange to-brand-teal"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="max-w-3xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors ${
                currentQuestionIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </button>

            <span className="text-sm text-brand-charcoal/60 font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mb-12 leading-tight">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.answers.map((answer, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(answer, index)}
                    data-event="question_answered"
                    data-question={currentQuestionIndex + 1}
                    data-stage={answer.stage}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'border-brand-amber bg-brand-amber/10 shadow-lg'
                        : 'border-brand-charcoal/10 bg-white hover:border-brand-amber/50 hover:shadow-md'
                    }`}
                  >
                    <p className="text-lg text-brand-charcoal leading-relaxed">
                      {answer.text}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
