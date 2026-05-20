import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ImgPivotChallengePage() {
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // For local development, use relative URL; for production, use Railway API
      const apiUrl = import.meta.env.VITE_API_URL || 'https://crosswalk-webhook.up.railway.app';
      const response = await fetch(`${apiUrl}/api/encharge/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Form submission failed');

      const data = await response.json();
      setStatus('success');
      setMessage(data.message || 'Welcome! Check your email for Day 1 of the challenge.');
      setFormData({ firstName: '', email: '' });
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e]">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#d4a574]">
            The 7-Day IMG Pivot Challenge
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Stop Waiting for CaRMS. Start Building a Career That Pays.
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Free 7-day email course revealing 4 non-clinical paths paying $65K+ with zero additional exams
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 md:px-12 py-16 bg-[#0f0f1e]">
        <div className="max-w-md mx-auto">
          {status === 'success' ? (
            <div className="bg-green-900 border border-green-700 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-green-200 mb-2">Check your email!</h3>
              <p className="text-green-100">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#2a2a3e] border border-[#d4a574] rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#e6b380]"
                  placeholder="Your first name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#2a2a3e] border border-[#d4a574] rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#e6b380]"
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#d4a574] hover:bg-[#e6b380] text-[#1a1a2e] font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : (
                  <>
                    Start the Challenge
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">{message}</p>
              )}
            </form>
          )}

          {/* Guarantee */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              💰 Free. Completely free. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-6 md:px-12 py-16 bg-[#1a1a2e]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#d4a574]">What You'll Get</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                day: 1,
                subject: "The 1 Question That Changes Everything",
                preview: "Reframe your IMG situation + the one question that breaks the paralysis"
              },
              {
                day: 2,
                subject: "Why You Feel Stuck (And It's Not What You Think)",
                preview: "The real cost of staying in clinical limbo vs. pivoting"
              },
              {
                day: 3,
                subject: "The 4 Paths Nobody Tells You Exist",
                preview: "$65K+ non-clinical roles hiring IMG doctors right now"
              },
              {
                day: 4,
                subject: "Why You Haven't Switched Yet",
                preview: "The stories keeping you stuck (and how to break them)"
              },
              {
                day: 5,
                subject: "Permission Comes From You",
                preview: "The moment everything shifts in your thinking"
              },
              {
                day: 6,
                subject: "Your 30-Day Pivot Playbook",
                preview: "Clarify → Polish → Apply → Close framework"
              },
              {
                day: 7,
                subject: "Here's What Happens Next",
                preview: "The offer: Fear Audit (free) + Courage to Choose ($27)"
              },
            ].map((email, idx) => (
              <div key={idx} className="bg-[#2a2a3e] p-6 rounded border border-gray-700">
                <div className="text-sm text-[#d4a574] font-bold mb-2">Day {email.day}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-100">{email.subject}</h3>
                <p className="text-gray-400 text-sm">{email.preview}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SAHAWAT */}
      <section className="px-6 md:px-12 py-16 bg-[#0f0f1e]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-[#d4a574]">Why I Built This</h2>
          <p className="text-gray-300 mb-6">
            I was a physician for 3 years. Then I became a crossing guard. And I found something better than residency.
          </p>
          <p className="text-gray-400 mb-6">
            This challenge is free because I remember the panic of being unmatched. The sunk cost shame. The family pressure. I built this to show you the 4 paths that actually exist — so you can make a clear decision instead of being stuck.
          </p>
          <p className="text-gray-300 font-semibold">
            — Sahawat, Former Physician, Crossing Guard, IMG Pivot Guide
          </p>
        </div>
      </section>

      {/* CAN-SPAM FOOTER */}
      <section className="px-6 md:px-12 py-8 bg-[#1a1a2e] border-t border-gray-700 text-center text-sm text-gray-500">
        <p className="mb-4">
          We respect your privacy. You can unsubscribe at any time. No spam, just the challenge.
        </p>
        <p>
          Crosswalk Wisdom Inc. | Toronto, ON | Canada
        </p>
      </section>

      <Footer />
    </div>
  );
}
