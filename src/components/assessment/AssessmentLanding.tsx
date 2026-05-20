import { motion } from 'framer-motion';

interface AssessmentLandingProps {
  onStart: () => void;
}

export default function AssessmentLanding({ onStart }: AssessmentLandingProps) {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 inline-block px-4 py-2 bg-brand-teal/10 border border-brand-teal/30 rounded-full"
        >
          <p className="text-brand-teal font-medium text-sm">
            For nurses, doctors, caregivers &amp; healthcare professionals
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mb-6 leading-tight"
        >
          The Burnout Crosswalk Assessment
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-display text-2xl md:text-3xl text-brand-amber mb-8"
        >
          Discover where you are on your healing journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-lg text-brand-charcoal/80 leading-relaxed mb-12 max-w-xl mx-auto"
        >
          This 2-minute assessment maps your burnout to the 4 stages of the Crosswalk Method — Start, Stop, Elder, and Human. Your results are personalized and private.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          data-event="quiz_start"
          className="bg-brand-amber text-brand-charcoal font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-orange"
        >
          Begin Your Assessment
        </motion.button>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-16 text-brand-charcoal/60 text-sm"
        >
          <p className="mb-2 font-display italic">
            "The sidewalk is the classroom. You are the student. Healing is the lesson."
          </p>
          <p>
            By{' '}
            <a
              href="https://www.crosswalkwisdom.com"
              className="text-brand-amber hover:text-brand-orange transition-colors underline"
            >
              Crosswalk Wisdom
            </a>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
