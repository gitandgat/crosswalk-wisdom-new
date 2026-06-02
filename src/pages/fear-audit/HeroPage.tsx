import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const audiences = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'The Burned-Out Physician',
    text: "You spent years becoming a doctor. Now you're exhausted, unfulfilled, and quietly wondering if there's another way. There is.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    title: 'The Stuck Professional',
    text: "You're good at your job. You're just not sure it's the right job. Fear is the only thing standing between you and the life you actually want.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
      </svg>
    ),
    title: 'The Quiet Quitter',
    text: "You haven't left yet. But part of you already has. This audit helps you understand why — and what to do next.",
  },
];

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-pulse" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-secondary/5 animate-float" />
        <div className="absolute bottom-20 right-[10%] w-48 h-48 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] right-[25%] w-32 h-32 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '0.8s' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="text-secondary font-heading font-semibold tracking-widest uppercase text-sm mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Crosswalk Wisdom
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            The Fear Audit
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-heading font-semibold mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            Discover What's Really Holding You Back
          </p>

          <div className="space-y-4 text-foreground/80 text-lg mb-12">
            <p className="opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              You're not stuck because you lack courage or ambition.
            </p>
            <p className="opacity-0 animate-fade-up" style={{ animationDelay: '0.65s' }}>
              You're stuck because of one of three fears. When you can name it, you can move past it.
            </p>
            <p className="opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
              This 10-minute audit will show you exactly which fear is your mountain — and how to start climbing.
            </p>
          </div>

          <button
            onClick={() => navigate('/quiz/1')}
            className="opacity-0 animate-fade-up inline-flex items-center gap-2 bg-accent text-accent-foreground font-heading font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ animationDelay: '1s' }}
          >
            Start the Audit →
          </button>

        </div>
      </div>

      {/* Who This Is For section */}
      <section className="bg-card border-t border-border py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary text-center mb-10">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((a, i) => (
              <div
                key={i}
                className="bg-background rounded-2xl p-6 border border-border shadow-sm flex flex-col"
              >
                <div className="text-accent mb-4">{a.icon}</div>
                <p className="font-heading font-bold text-primary text-base mb-2">{a.title}</p>
                <p className="text-foreground/80 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HeroPage;
