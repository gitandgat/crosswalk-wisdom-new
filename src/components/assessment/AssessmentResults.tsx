import { useState } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Hand, Compass, Heart, Mail, Check, Share2, MessageCircle, Copy } from 'lucide-react';
import type { StageResult } from '../../data/assessmentData';

interface AssessmentResultsProps {
  result: StageResult;
  score: number;
  answers: number[];
  onRetake: () => void;
}

const stageIcons = {
  footprints: Footprints,
  hand: Hand,
  compass: Compass,
  heart: Heart,
};

const stageColors = {
  START: 'from-brand-teal to-brand-teal/70',
  STOP: 'from-brand-amber to-brand-orange',
  ELDER: 'from-brand-orange to-brand-amber',
  HUMAN: 'from-brand-charcoal to-brand-charcoal/80',
};

const stagePosition = {
  START: '12.5%',
  STOP: '37.5%',
  ELDER: '62.5%',
  HUMAN: '87.5%',
};

export default function AssessmentResults({ result, score, answers, onRetake }: AssessmentResultsProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const Icon = stageIcons[result.icon];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      email,
      firstName,
      quizStage: result.stage,
      quizScore: score,
      tags: `quiz-completed, quiz-stage-${result.stage.toLowerCase()}`,
    };

    try {
      await fetch('https://api.encharge.io/v1/hooks/013bfb98-e932-4336-935c-8135ae235bb0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = 'https://www.crosswalkwisdom.com/assessment';
  const shareText = 'I just took the Burnout Crosswalk Assessment and discovered where I am on my healing journey. Take it free:';

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Burnout Crosswalk Assessment')}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    };
    window.open(urls[platform], '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // suppress unused warning — score prop used in email payload above
  void answers;

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className={`inline-flex items-center gap-4 px-8 py-6 rounded-3xl bg-gradient-to-r ${stageColors[result.stage]} mb-6 shadow-xl`}>
            <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
            <div className="text-left">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                {result.title}
              </h1>
              <p className="text-white/90 text-lg mt-1">{result.subtitle}</p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-brand-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {result.description}
          </motion.p>
        </motion.div>

        {/* Stage progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-brand-charcoal/5"
        >
          <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-4">
            Your Journey Stage
          </h3>
          <div className="relative h-16 bg-gradient-to-r from-brand-teal via-brand-amber via-brand-orange to-brand-charcoal rounded-full mb-4">
            <motion.div
              initial={{ left: '0%' }}
              animate={{ left: stagePosition[result.stage] }}
              transition={{ delay: 0.8, duration: 1, type: 'spring' }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-4 border-brand-charcoal"
            />
          </div>
          <div className="flex justify-between text-xs text-brand-charcoal/60 font-medium">
            <span>START</span>
            <span>STOP</span>
            <span>ELDER</span>
            <span>HUMAN</span>
          </div>
        </motion.div>

        {/* Next step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12 bg-brand-amber/10 rounded-2xl p-8 border-2 border-brand-amber/30"
        >
          <h3 className="font-display text-2xl font-semibold text-brand-charcoal mb-4">
            Your Personalized Next Step
          </h3>
          <p className="text-lg text-brand-charcoal/80 leading-relaxed">
            {result.nextStep}
          </p>
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-brand-charcoal/5"
        >
          <h3 className="font-display text-2xl font-semibold text-brand-charcoal mb-2">
            Get Your Full Crosswalk Healing Plan
          </h3>
          <p className="text-brand-charcoal/70 mb-6">
            We'll send you a personalized guide based on your results — plus the 5 Crosswalk Lessons that have helped healthcare workers move from survival mode to something that feels like themselves again.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-xl border-2 border-brand-charcoal/10 focus:border-brand-amber focus:outline-none transition-colors text-brand-charcoal"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-xl border-2 border-brand-charcoal/10 focus:border-brand-amber focus:outline-none transition-colors text-brand-charcoal"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                data-event="email_submitted"
                className="w-full bg-brand-amber hover:bg-brand-orange text-brand-charcoal font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Mail size={20} />
                {isSubmitting ? 'Sending...' : 'Send My Healing Plan'}
              </button>
              <p className="text-xs text-brand-charcoal/50 text-center">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <Check className="w-16 h-16 text-brand-teal mx-auto mb-4" />
              <p className="text-xl font-semibold text-brand-teal">
                Check your inbox — your healing plan is on its way.
              </p>
            </div>
          )}
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-brand-charcoal/5"
        >
          <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-4 text-center">
            Know someone who needs this?
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <button onClick={() => handleShare('facebook')} data-event="share_clicked" data-platform="facebook" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              <Share2 size={18} /><span className="text-sm font-medium">Facebook</span>
            </button>
            <button onClick={() => handleShare('linkedin')} data-event="share_clicked" data-platform="linkedin" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors">
              <Share2 size={18} /><span className="text-sm font-medium">LinkedIn</span>
            </button>
            <button onClick={() => handleShare('twitter')} data-event="share_clicked" data-platform="twitter" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-800 text-white transition-colors">
              <Share2 size={18} /><span className="text-sm font-medium">X/Twitter</span>
            </button>
            <button onClick={() => handleShare('whatsapp')} data-event="share_clicked" data-platform="whatsapp" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors">
              <MessageCircle size={18} /><span className="text-sm font-medium">WhatsApp</span>
            </button>
            <button onClick={() => handleShare('email')} data-event="share_clicked" data-platform="email" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">
              <Mail size={18} /><span className="text-sm font-medium">Email</span>
            </button>
          </div>
          <button onClick={handleCopyLink} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-brand-charcoal/10 hover:border-brand-amber transition-colors">
            {copySuccess ? (
              <><Check size={18} className="text-brand-teal" /><span className="text-sm font-medium text-brand-teal">Link copied!</span></>
            ) : (
              <><Copy size={18} className="text-brand-charcoal/60" /><span className="text-sm font-medium text-brand-charcoal/60">Copy Link</span></>
            )}
          </button>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl font-semibold text-brand-charcoal mb-6">
            Ready to start walking?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.crosswalkwisdom.com"
              className="bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 inline-block"
            >
              Explore the Crosswalk Method
            </a>
            <a
              href="https://www.crosswalkwisdom.com/start"
              className="bg-brand-amber hover:bg-brand-orange text-brand-charcoal font-semibold px-8 py-4 rounded-xl transition-all duration-300 inline-block"
            >
              Join the community
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center"
        >
          <button onClick={onRetake} className="text-brand-charcoal/60 hover:text-brand-charcoal underline text-sm font-medium transition-colors">
            Retake Assessment
          </button>
        </motion.div>
      </div>
    </div>
  );
}
