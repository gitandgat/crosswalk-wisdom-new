import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const CalculatingPage = () => {
  const navigate = useNavigate();
  const { getScore } = useQuiz();
  const [barWidths, setBarWidths] = useState({ financial: 0, judgment: 0, identity: 0 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => {
      setBarWidths({
        financial: (getScore('financial') / 20) * 100,
        judgment: (getScore('judgment') / 20) * 100,
        identity: (getScore('identity') / 20) * 100,
      });
    }, 800);
    const t3 = setTimeout(() => navigate('/email'), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const bars = [
    { label: 'Financial', value: barWidths.financial, color: 'bg-primary' },
    { label: 'Judgment', value: barWidths.judgment, color: 'bg-secondary' },
    { label: 'Identity', value: barWidths.identity, color: 'bg-accent' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className={`transition-opacity duration-500 ${phase >= 0 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
              Analyzing your responses...
            </h2>
            <p className="text-muted-foreground mb-10">Calculating your fear profile</p>
          </div>

          <div className={`space-y-4 transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            {bars.map(bar => (
              <div key={bar.label} className="text-left">
                <div className="flex justify-between text-sm font-medium text-foreground mb-1">
                  <span>{bar.label}</span>
                  <span>{Math.round(bar.value)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${bar.color}`}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculatingPage;
