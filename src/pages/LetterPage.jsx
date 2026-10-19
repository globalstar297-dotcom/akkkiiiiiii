import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { config } from '../config';

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  emoji: i % 2 === 0 ? '🌹' : '💗',
  top: `${(i * 31 + 5) % 85}%`,
  left: `${(i * 47 + 8) % 90}%`,
  duration: 4 + (i % 4),
  delay: (i % 6) * 0.6,
}));

const FULL_LETTER = `${config.letter.greeting}\n\n${config.letter.body}\n\n${config.letter.signoff}\n${config.letter.signature}`;

function EnvelopeLetter() {
  const [opened, setOpened] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const { displayedText, isDone } = useTypingAnimation(FULL_LETTER, 18, startTyping);

  const openEnvelope = () => {
    setOpened(true);
    setTimeout(() => setStartTyping(true), 800);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
      {/* Envelope */}
      <div className="relative w-full" style={{minHeight: '280px'}}>
        {/* Envelope body */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
          style={{background: 'linear-gradient(135deg, #fff9f0, #fff0e8)',
            border: '2px solid rgba(255,107,157,0.3)',
            minHeight: '200px',}}
          animate={opened ? { height: 'auto' } : {}}
        >
          {/* Envelope flap (top triangle) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                exit={{rotateX: 180, opacity: 0}}
                style={{transformOrigin: 'top',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 2,}}
              >
                <div
                  style={{width: 0,
                    height: 0,
                    borderLeft: '200px solid transparent',
                    borderRight: '200px solid transparent',
                    borderTop: '100px solid rgba(255,182,193,0.6)',
                    margin: '0 auto',}}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!opened && (
            <div className="flex flex-col items-center justify-center p-8 pt-16 gap-4">
              <div className="text-5xl">💌</div>
              <p className="font-cursive text-xl" style={{color: '#FF6B9D'}}>A letter, just for you...</p>
              <motion.button
                onClick={openEnvelope}
                className="px-8 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
                style={{background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'}}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.96}}
              >
                Open My Letter 💌
              </motion.button>
            </div>
          )}

          {/* Letter slides up after opening */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{y: 80, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7, ease: 'easeOut', delay: 0.3}}
                className="p-6 md:p-10"
                style={{background: 'repeating-linear-gradient(transparent, transparent 27px, rgba(255,182,193,0.15) 27px, rgba(255,182,193,0.15) 28px)',}}
              >
                <pre
                  className="font-elegant text-sm md:text-base leading-7 whitespace-pre-wrap"
                  style={{color: '#4a1040'}}
                >
                  {displayedText}
                  {!isDone && <motion.span animate={{opacity: [1, 0]}} transition={{duration: 0.6, repeat: Infinity}}>|</motion.span>}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function LetterPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div
        className="relative min-h-screen px-6 py-16 pb-24 md:pb-16 overflow-hidden"
        style={{background: 'linear-gradient(160deg, #fff9f0 0%, #ffe8f0 40%, #f5e8ff 100%)',}}
      >
        {/* Decorative petals */}
        {PETALS.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-xl pointer-events-none select-none"
            style={{top: p.top, left: p.left, opacity: 0.5}}
            animate={{y: [0, -10, 0], rotate: [0, 15, -15, 0]}}
            transition={{duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut'}}
            aria-hidden="true"
          >
            {p.emoji}
          </motion.div>
        ))}

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2
            className="font-elegant text-4xl md:text-5xl text-center mb-3"
            style={{color: '#9f1239'}}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            A Letter, From the Heart 💌
          </motion.h2>
          <motion.p
            className="font-cursive text-xl text-center mb-10"
            style={{color: '#db2777'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.3}}
          >
            Written with every bit of love and warmth...
          </motion.p>

          <EnvelopeLetter />

          <div className="flex justify-between mt-10">
            <motion.button
              onClick={() => navigate('/hero')}
              className="px-6 py-3 rounded-full font-clean font-semibold shadow-lg glass"
              style={{color: '#FF6B9D'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              ← Back
            </motion.button>
            <motion.button
              onClick={() => navigate('/memories')}
              className="px-6 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
              style={{background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              Next: Memories 📸
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
