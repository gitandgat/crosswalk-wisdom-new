import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Mail, Check } from 'lucide-react';
import { z } from 'zod';

const ENCHARGE_WEBHOOK_URL = 'https://api.encharge.io/v1/hooks/36aa1a9e-2b87-4625-bccb-9d455a2f8ba5';

const fearTypeLabels: Record<string, string> = {
  financial: 'Financial Insecurity',
  judgment: 'Fear of Judgment',
  identity: 'Identity Loss',
};

const formSchema = z.object({
  firstName: z.string().trim().min(1, 'Please enter your first name').max(100),
  email: z.string().trim().min(1, 'Please enter your email').email('Please enter a valid email address').max(255),
});

const EmailGatePage = () => {
  const navigate = useNavigate();
  const { setFirstName: saveFirstName, getScore, getPrimaryFear } = useQuiz();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({ firstName, email });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const trimmedFirstName = result.data.firstName;
    const trimmedEmail = result.data.email;
    const primaryFear = getPrimaryFear();
    const financialScore = getScore('financial');
    const judgmentScore = getScore('judgment');
    const identityScore = getScore('identity');
    const fearType = primaryFear === 'tie' ? 'Financial Insecurity' : fearTypeLabels[primaryFear];

    console.log('Fear Audit — Lead captured:', { firstName: trimmedFirstName, email: trimmedEmail });

    // Send to Encharge webhook (non-blocking)
    fetch(ENCHARGE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmedEmail,
        firstName: trimmedFirstName,
        fearType,
        financialScore,
        judgmentScore,
        identityScore,
      }),
    }).catch(err => console.warn('Encharge webhook failed:', err));

    saveFirstName(trimmedFirstName);
    setSubmitted(true);

    setTimeout(() => {
      navigate('/results');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px] opacity-0 animate-fade-up">
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <Mail className="w-7 h-7 text-secondary" />
              </div>
            </div>

            {/* Headlines */}
            <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-primary text-center mb-2">
              Your Results Are Ready!
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Enter your email to unlock your Fear Audit results and receive your personalized action plan.
            </p>

            {/* Trust signals */}
            <div className="space-y-2 mb-8">
              {[
                'Your personalized fear profile',
                '3 micro-actions tailored to your result',
                'Free — no credit card needed',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={e => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: '' })); }}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.firstName ? 'border-accent ring-1 ring-accent/30' : 'border-border'}`}
                  maxLength={100}
                />
                {errors.firstName && <p className="text-accent text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your best email address"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.email ? 'border-accent ring-1 ring-accent/30' : 'border-border'}`}
                  maxLength={255}
                />
                {errors.email && <p className="text-accent text-sm mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full font-heading font-bold text-lg py-3.5 rounded-full shadow-md transition-all duration-300 ${
                  submitted
                    ? 'bg-secondary text-secondary-foreground scale-105'
                    : 'bg-accent text-accent-foreground hover:shadow-lg hover:scale-[1.02]'
                }`}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> You're In!
                  </span>
                ) : (
                  'Unlock My Results →'
                )}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailGatePage;
