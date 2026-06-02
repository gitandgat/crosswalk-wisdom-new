import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import davidImg from '@/assets/testimonial-david.jpg';

const fearData = {
  financial: {
    headline: 'Your Primary Fear: Financial Insecurity',
    icon: '💰',
    interpretation: "You're not afraid of change — you're afraid you won't be able to survive it financially. This is the most rational fear on the list, which is why it feels so convincing. It's also the most paralyzing, because it disguises itself as 'being responsible.' But here's the truth: this fear is solvable with planning. You don't need a trust fund. You need a strategy.",
    actions: [
      "Calculate your bare-minimum monthly expenses — not your ideal budget, your survival budget. Seeing this number in black and white often reveals it's lower than the fear makes it feel.",
      "Research 3 people who made similar transitions. Send a message: 'How did you handle finances during your transition?' Real stories beat anxious hypotheticals.",
      "Build a 3-month financial buffer plan. Even $50/week adds up. Open a separate 'freedom fund' account and watch it grow.",
    ],
  },
  judgment: {
    headline: 'Your Primary Fear: Fear of Judgment',
    icon: '👁',
    interpretation: "You're not afraid of leaving — you're afraid of disappointing people or being seen as a failure. This fear is deeply rooted in identity and social belonging. It whispers: 'What will they think? What will they say?' Here's what judgment fear doesn't tell you: the people who judge you aren't living your life. And the people who truly love you want you to be happy, not impressive.",
    actions: [
      "Write down whose opinion you're most afraid of. Now ask yourself: Do they actually understand my situation? Do they see what I'm dealing with every day? Often, the answer is no.",
      "Find 1 person who successfully transitioned and study their story. Notice how the judgment they feared either never came — or faded quickly.",
      "Practice this phrase out loud: 'I'm choosing alignment over approval.' Write it on a sticky note. Let it be your mantra.",
    ],
  },
  identity: {
    headline: 'Your Primary Fear: Identity Loss',
    icon: '🪞',
    interpretation: "You've spent years — maybe decades — building an identity tied to your career. Walking away feels like losing yourself. But here's the reality: your identity is not your resume. It's not your title, your degree, or the letters after your name. It's who you choose to become, every single day.",
    actions: [
      "Complete this sentence 10 times: 'I am someone who...' — without mentioning your job. You'll start to see you're so much more than what you do for a paycheck.",
      "List 5 values that matter to you outside of work: family, creativity, health, adventure, freedom. These are your anchors. They don't disappear when your job title does.",
      "Ask yourself: 'Who would I be if my job title disappeared tomorrow?' Sit with this question. Journal it. The answer is where your next chapter begins.",
    ],
  },
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const { getScore, getPrimaryFear, reset, firstName } = useQuiz();
  const primary = getPrimaryFear();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const scores = [
    { label: 'Financial Insecurity', score: getScore('financial'), max: 20, color: 'bg-primary' },
    { label: 'Fear of Judgment', score: getScore('judgment'), max: 20, color: 'bg-secondary' },
    { label: 'Identity Loss', score: getScore('identity'), max: 20, color: 'bg-accent' },
  ];

  const isTie = primary === 'tie';
  const fear = isTie ? null : fearData[primary];

  const handleRetake = () => {
    reset();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        {/* Title */}
        <p className="text-secondary font-heading font-semibold tracking-widest uppercase text-sm mb-4 text-center opacity-0 animate-fade-up">
          Your Results
        </p>

        {isTie ? (
          <div className="text-center opacity-0 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="text-5xl mb-4">⚖️</div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
              {firstName ? `${firstName}, It's a Tie!` : "It's a Tie!"}
            </h1>
            <p className="text-foreground/80 text-lg mb-8">
              You scored equally across multiple fear categories. This means several fears are working together to keep you stuck. The good news? Awareness of all of them gives you multiple angles to start making progress.
            </p>
          </div>
        ) : fear && (
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{fear.icon}</div>
              <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                {firstName ? `${firstName}, ${fear.headline}` : fear.headline}
              </h1>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border mb-10">
              <p className="text-foreground/85 text-lg leading-relaxed">{fear.interpretation}</p>
            </div>

            <h3 className="text-xl font-heading font-bold text-primary mb-4">
              3 Things You Can Do This Week
            </h3>
            <div className="space-y-4 mb-10">
              {fear.actions.map((action, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-5 border border-border shadow-sm opacity-0 animate-fade-up"
                  style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                >
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 text-secondary font-heading font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <p className="text-foreground/80 leading-relaxed">{action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score Chart */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-lg font-heading font-bold text-primary mb-5">Your Fear Profile</h3>
          <div className="space-y-4">
            {scores.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-sm font-medium text-foreground mb-1">
                  <span>{s.label}</span>
                  <span>{s.score}/{s.max}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${s.color}`}
                    style={{ width: `${(s.score / s.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="bg-secondary/5 rounded-2xl p-6 border border-secondary/10 mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.9s' }}>
          <p className="text-center text-foreground/80 text-sm mb-3 font-medium">
            ✓ Join 2,500+ people who've already uncovered their hidden fear
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-accent text-lg">★</span>
            ))}
            <span className="text-muted-foreground text-sm ml-2">4.9/5 average rating</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
          <a href="https://courage-to-choose.lovable.app" target="_blank" rel="noopener noreferrer" className="bg-accent text-accent-foreground font-heading font-bold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full sm:w-auto text-center">
            Get "Courage to Choose" →
          </a>
          <a href="https://www.crosswalkwisdom.com/start" target="_blank" rel="noopener noreferrer" className="border-2 border-primary text-primary font-heading font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 w-full sm:w-auto text-center">
            Join the Community →
          </a>
        </div>

        {/* Testimonial */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '1.05s' }}>
          <p className="text-foreground/80 text-sm leading-relaxed italic mb-4">
            "The Courage to Choose guide gave me a step-by-step plan I could actually follow. Within two weeks, I'd had the conversation I'd been avoiding for months."
          </p>
          <div className="flex items-center gap-3">
            <img
              src={davidImg}
              alt="David K."
              className="w-10 h-10 rounded-full object-cover border-2 border-border"
              loading="lazy"
            />
            <p className="font-heading font-bold text-primary text-sm">— David K., former teacher turned entrepreneur</p>
          </div>
        </div>

        <div className="text-center opacity-0 animate-fade-up" style={{ animationDelay: '1.1s' }}>
          <button
            onClick={handleRetake}
            className="text-muted-foreground hover:text-foreground underline font-medium transition-colors"
          >
            Retake the Audit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;
