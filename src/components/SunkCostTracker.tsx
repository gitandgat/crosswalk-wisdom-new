import { useState, useMemo } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { InputCard } from './InputCard';
import { ScoreRing } from './ScoreRing';

const MONEY_OPTIONS = [
  { label: '$0 – $5K', value: '$0-5K', midpoint: 2500 },
  { label: '$5K – $15K', value: '$5-15K', midpoint: 10000 },
  { label: '$15K – $30K', value: '$15-30K', midpoint: 22500 },
  { label: '$30K – $50K', value: '$30-50K', midpoint: 40000 },
  { label: '$50K+', value: '$50K+', midpoint: 75000 },
];

function calculateScore(years: number, moneyMidpoint: number, relationships: number, identity: number): number {
  const yearsScore = (years / 20) * 25;
  const moneyScore = (moneyMidpoint / 75000) * 25;
  const relScore = (relationships / 10) * 25;
  const identityScore = ((identity - 1) / 9) * 25;
  return Math.round(yearsScore + moneyScore + relScore + identityScore);
}

export function SunkCostTracker() {
  const [years, setYears] = useState(0);
  const [moneyIndex, setMoneyIndex] = useState(-1);
  const [relationships, setRelationships] = useState(0);
  const [identity, setIdentity] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const allSet = moneyIndex >= 0;

  const score = useMemo(() => {
    if (!allSet) return 0;
    return calculateScore(years, MONEY_OPTIONS[moneyIndex].midpoint, relationships, identity);
  }, [years, moneyIndex, relationships, identity, allSet]);

  const getInterpretation = () => {
    if (score <= 30) return 'You still have agency. Act now before sunk cost deepens.';
    if (score <= 60) return 'Sunk cost is weighing on you. This is the moment to pivot.';
    return "You're deep in the 4-layer trap. Reframing is urgent and possible.";
  };

  const getScoreLabel = () => {
    if (score <= 30) return 'Low Entrapment';
    if (score <= 60) return 'Moderate Entrapment';
    return 'High Entrapment';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      alert('Please enter your first name');
      return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) return;

    setSubmitting(true);
    try {
      const RAILWAY_URL = import.meta.env.VITE_API_URL || 'https://your-railway-app.up.railway.app';

      const response = await fetch(`${RAILWAY_URL}/api/capture-tracker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          score,
          years_trapped: years,
          money_invested: MONEY_OPTIONS[moneyIndex]?.label ?? '',
          relationships_cost: relationships,
          identity_loss: identity,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFirstName('');
        setEmail('');
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to save your email. Please try again or contact support.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans">
      {/* Header */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-warm font-sans font-medium tracking-wide uppercase text-sm mb-4">
            Crosswalk Wisdom
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-4">
            Your Sunk Cost Index
          </h1>
          <h2 className="font-serif text-xl md:text-2xl text-charcoal-light font-semibold mb-6">
            Measure the 4-layer trap holding you back
          </h2>
          <p className="text-charcoal-light font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            You've invested years in exams, thousands of dollars in certifications, relationships that
            bent under pressure, and parts of your identity you barely recognize. This tool gives that
            weight a number — so you can finally see it clearly and decide what comes next.
          </p>
        </div>
      </header>

      {/* Input Section */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputCard title="Years Trapped" context="How long in a low-level role below your capability?">
            <input
              type="range"
              min={0}
              max={20}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-3 text-center">
              <span className="font-serif text-2xl font-bold text-charcoal">{years}</span>
              <span className="text-charcoal-light ml-1 text-sm">years</span>
            </div>
          </InputCard>

          <InputCard title="Money Invested" context="Exams, certifications, visa sponsorship — all of it.">
            <select
              value={moneyIndex}
              onChange={(e) => setMoneyIndex(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-amber-light/50 bg-parchment text-charcoal font-sans focus:outline-none focus:ring-2 focus:ring-amber-warm/40 transition-all"
            >
              <option value={-1} disabled>Select a range</option>
              {MONEY_OPTIONS.map((opt, i) => (
                <option key={opt.value} value={i}>{opt.label}</option>
              ))}
            </select>
          </InputCard>

          <InputCard title="Relationships Cost" context="How many key relationships have been strained or lost?">
            <input
              type="range"
              min={0}
              max={10}
              value={relationships}
              onChange={(e) => setRelationships(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-3 text-center">
              <span className="font-serif text-2xl font-bold text-charcoal">{relationships}</span>
              <span className="text-charcoal-light ml-1 text-sm">relationships</span>
            </div>
          </InputCard>

          <InputCard title="Identity Loss" context="How much have you lost sense of who you are?">
            <input
              type="range"
              min={1}
              max={10}
              value={identity}
              onChange={(e) => setIdentity(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-3 text-center">
              <span className="font-serif text-2xl font-bold text-charcoal">{identity}</span>
              <span className="text-charcoal-light ml-1 text-sm">/10</span>
            </div>
          </InputCard>
        </div>
      </section>

      {/* Results Section */}
      {allSet && (
        <section className="px-6 pb-16 animate-fade-in-up">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-amber-light/20">
            <div className="text-center mb-8">
              <p className="text-sm font-sans font-medium text-charcoal-light uppercase tracking-wide mb-6">
                Your Sunk Cost Score
              </p>
              <ScoreRing score={score} />
              <p className="mt-4 font-serif text-lg font-semibold text-charcoal">
                {getScoreLabel()}
              </p>
            </div>

            <div className="bg-parchment rounded-2xl p-6 md:p-8 mb-8">
              <p className="font-sans text-charcoal text-base md:text-lg leading-relaxed text-center italic">
                "{getInterpretation()}"
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-charcoal mb-4">What this means:</h4>
              <p className="font-sans text-charcoal-light leading-relaxed">
                You've invested <strong className="text-charcoal">{years} years</strong>,{' '}
                <strong className="text-charcoal">{moneyIndex >= 0 ? MONEY_OPTIONS[moneyIndex].label : '$0'}</strong> in costs,{' '}
                strained <strong className="text-charcoal">{relationships} relationships</strong>, and scored{' '}
                <strong className="text-charcoal">{identity}/10</strong> on identity loss.
                These four layers compound on each other — each one makes it harder to walk away,
                even when staying costs more than leaving.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Email Capture */}
      {allSet && (
        <section className="px-6 pb-24 animate-fade-in-up">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-10 h-10 text-amber-warm mx-auto mb-4" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-2">
              Get your personalized reframe guide
            </h3>
            <p className="font-sans text-charcoal-light mb-8">
              We'll email you a 3-step guide to break free — the same framework that's helped
              hundreds of IMGs reclaim their career path.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl p-6 shadow-sm border border-amber-light/20">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="font-sans text-charcoal">
                  Check your inbox in 2 minutes. We sent you the download link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-amber-light/50 bg-white text-charcoal font-sans placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 transition-all"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-3.5 rounded-xl border border-amber-light/50 bg-white text-charcoal font-sans placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-charcoal text-cream font-sans font-medium rounded-xl hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send me my results'}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="pb-12 text-center px-6">
        <p className="text-sm text-charcoal-light/60 font-sans">
          Crosswalk Wisdom — Helping International Medical Graduates reclaim their path.
        </p>
      </footer>
    </div>
  );
}
