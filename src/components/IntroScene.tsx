import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerConfetti } from '../hooks/useConfetti';

interface IntroSceneProps {
  onComplete: () => void;
}

interface InlineParticle {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const particles = useMemo<InlineParticle[]>(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#D9B777' : '#f0d080',
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 10,
      })),
    []
  );

  const handleUnwrap = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerConfetti();
    setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 800);
  };

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-scene"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #10121C 0%, #08090D 100%)',
          }}
        >
          {/* Gold particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.color,
                animation: `floatParticle ${p.duration}s linear ${p.delay}s infinite`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Spotlight */}
          <div
            className="absolute"
            style={{
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(217,183,119,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Skip intro */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7.0, duration: 0.6 }}
            className="absolute top-4 right-4 text-xs text-[#C5C7D0]/60 hover:text-[#D9B777] transition-colors tracking-widest"
            onClick={handleSkip}
          >
            Skip intro →
          </motion.button>

          {/* Gift box */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[5rem] mb-8 select-none"
            style={{ filter: 'drop-shadow(0 0 20px rgba(217,183,119,0.4))' }}
          >
            🎁
          </motion.div>

          {/* Text sequence */}
          <div className="text-center px-6 max-w-2xl z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-sm tracking-[0.3em] text-[#C5C7D0] mb-6"
            >
              TONIGHT, THE SPOTLIGHT IS YOURS.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-sm tracking-[0.3em] text-[#C5C7D0] mb-8"
            >
              THIS LITTLE SURPRISE IS MADE FOR…
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
              className="font-serif text-8xl md:text-9xl font-bold text-gold mb-6"
              style={{ textShadow: '0 0 60px rgba(217,183,119,0.6)' }}
            >
              AKKI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.0, duration: 0.8 }}
              className="italic text-sm text-[#B77B85] mb-10"
            >
              Warning: Contains excessive love, embarrassing memories, and unlimited cousin-level roasting.
            </motion.p>

            {/* Unwrap button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6.5, duration: 0.8 }}
            >
              <button
                onClick={handleUnwrap}
                disabled={isAnimating}
                className="border border-[#D9B777] text-[#D9B777] px-8 py-3 text-sm tracking-widest hover:bg-[#D9B777]/10 transition-colors duration-300 disabled:opacity-60"
              >
                UNWRAP YOUR SURPRISE ✨
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
