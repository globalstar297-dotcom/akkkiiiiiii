import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { config } from '../config';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

const fullText = `${config.letter.greeting}\n\n${config.letter.body}\n\n${config.letter.signoff}\n${config.letter.signature}`;

export default function BirthdayLetter() {
  const [opened, setOpened] = useState(false);
  const { displayedText, isDone } = useTypingAnimation(fullText, 20, opened);

  return (
    <section
      className="py-20 px-6"
      style={{ background: 'linear-gradient(160deg, #FFF5E4, #FFD6E0)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="font-elegant text-4xl md:text-5xl mb-4"
          style={{ color: '#FF6B9D' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Letter, From the Heart 💌
        </motion.h2>
        <p className="font-clean mb-12" style={{ color: '#fb7185' }}>
          Something written just for you...
        </p>

        {!opened ? (
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Envelope visual */}
            <motion.div
              className="w-48 h-32 rounded-2xl shadow-2xl relative flex items-center justify-center cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #FFD6E0, #C9B8FF)' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              onClick={() => setOpened(true)}
              role="button"
              aria-label="Open letter"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpened(true)}
            >
              <Mail size={48} className="text-white" style={{ opacity: 0.8 }} />
              <div
                className="absolute inset-x-0 bottom-0 h-12 rounded-b-2xl"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              />
            </motion.div>

            <motion.button
              onClick={() => setOpened(true)}
              className="px-8 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,107,157,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Open My Letter 💌
            </motion.button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl p-8 md:p-12 shadow-2xl text-left relative"
              style={{
                background: 'linear-gradient(135deg, #FFFBF5, #FFF5E4)',
                border: '2px solid rgba(255,182,193,0.4)',
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 right-4 text-2xl" aria-hidden="true">💌</div>
              <div className="absolute bottom-4 left-4 text-2xl" aria-hidden="true">🌸</div>

              <pre
                className="font-cursive text-lg md:text-xl leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "'Dancing Script', cursive", color: '#9f1239' }}
              >
                {displayedText}
                {!isDone && <span className="animate-pulse">|</span>}
              </pre>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
