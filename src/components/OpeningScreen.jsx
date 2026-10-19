import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfetti } from '../hooks/useConfetti';

const bokehPositions = [
  { top: '10%', left: '5%', size: 120 },
  { top: '20%', right: '8%', size: 80 },
  { bottom: '15%', left: '10%', size: 100 },
  { top: '50%', right: '5%', size: 60 },
  { bottom: '30%', right: '20%', size: 90 },
  { top: '40%', left: '15%', size: 50 },
];

const sparkleEmojis = ['✨', '💗', '⭐', '🌸', '💫'];

export default function OpeningScreen({ onReveal }) {
  const [leaving, setLeaving] = useState(false);
  const { triggerConfetti } = useConfetti();

  const handleOpen = () => {
    triggerConfetti();
    setLeaving(true);
    setTimeout(() => onReveal(), 1200);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFD6E0 0%, #C9B8FF 40%, #FFF5E4 70%, #FFCBA4 100%)',
          }}
        >
          {/* Background bokeh circles */}
          {bokehPositions.map((pos, i) => {
            const { size, ...posStyles } = pos;
            return (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  ...posStyles,
                  width: size,
                  height: size,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
                  animation: `bokeh ${3 + i * 0.7}s ease-in-out infinite`,
                }}
                aria-hidden="true"
              />
            );
          })}

          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            {/* Glowing gift box */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-8xl md:text-9xl mb-6 inline-block"
              role="img"
              aria-label="Gift box"
            >
              🎁
            </motion.div>

            {/* Title */}
            <h1 className="font-cursive text-4xl md:text-6xl lg:text-7xl mb-4 text-gold-gradient leading-tight">
              ✨ A Little Universe Made Just for Akki ✨
            </h1>

            {/* Subtitle */}
            <p className="font-clean text-lg md:text-xl mb-10 leading-relaxed" style={{ color: '#be185d', opacity: 0.9 }}>
              Today is not just another day... it&apos;s the day someone truly special was born. 💗
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={handleOpen}
              className="relative overflow-hidden px-10 py-4 rounded-full text-white font-clean font-semibold text-lg shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #E8A598, #FF6B9D, #C9B8FF)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,107,157,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Open Your Birthday Surprise 🎁
            </motion.button>

            {/* Floating sparkles hint */}
            <div className="mt-6 flex justify-center gap-4 opacity-60" aria-hidden="true">
              {sparkleEmojis.map((e, i) => (
                <motion.span
                  key={i}
                  className="text-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
