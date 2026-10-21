import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { triggerConfetti } from '../hooks/useConfetti';
import { birthdayConfig } from '../config/birthday';

interface StarData { id: number; top: string; left: string; delay: number; }

const FIREWORK_POSITIONS = [
  { top: '30%', left: '20%'  },
  { top: '20%', left: '75%'  },
  { top: '40%', left: '50%'  },
  { top: '25%', left: '70%'  },
  { top: '35%', left: '85%'  },
];

const FIREWORK_COLORS = ['#D9B777', '#B77B85', '#FFF4E5', '#C5C7D0', '#f0d080'];

export default function BirthdayFinale() {
  const [celebrateKey, setCelebrateKey] = useState(0);

  const stars = useMemo<StarData[]>(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 8,
      })),
    []
  );

  const handleCelebrate = () => {
    setCelebrateKey((k) => k + 1);
    triggerConfetti();
  };

  return (
    <section
      id="finale"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-24"
      style={{ background: 'linear-gradient(180deg, #10121C 0%, #0a0015 100%)' }}
    >
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: 2,
            height: 2,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${star.delay}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute top-16 right-16 rounded-full"
        style={{
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, #FFF4E5, rgba(255,244,229,0.3))',
          boxShadow: '0 0 60px rgba(255,244,229,0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* Shooting star */}
      <div
        className="absolute"
        style={{
          top: '25%',
          right: '25%',
          width: 2,
          height: 2,
          background: 'white',
          animation: 'shootingStar 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Fireworks */}
      {FIREWORK_POSITIONS.map((pos, fi) => (
        <div
          key={`fw-${celebrateKey}-${fi}`}
          className="absolute"
          style={{ top: pos.top, left: pos.left, width: 4, height: 4 }}
        >
          {Array.from({ length: 12 }).map((_, ri) => (
            <motion.div
              key={`ray-${ri}`}
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ scaleY: 1, opacity: 0 }}
              transition={{ delay: ri * 0.04, duration: 0.6 }}
              style={{
                position: 'absolute',
                width: 2,
                height: 30,
                background: FIREWORK_COLORS[fi % FIREWORK_COLORS.length],
                transformOrigin: 'bottom center',
                transform: `rotate(${ri * 30}deg)`,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      ))}

      {/* Text content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] text-[#D9B777] mb-6"
        >
          {birthdayConfig.finale.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-2xl md:text-3xl text-[#D9B777] mb-8 tracking-wide"
        >
          {birthdayConfig.finale.line2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[#C5C7D0] text-sm leading-relaxed mb-8 max-w-lg mx-auto"
        >
          {birthdayConfig.finale.body}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-[#FFF4E5] mb-6"
          style={{ textShadow: '0 0 40px rgba(217,183,119,0.3)' }}
        >
          {birthdayConfig.finale.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="italic text-[#C5C7D0]/80 text-sm mb-4"
        >
          {birthdayConfig.finale.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="font-serif italic text-[#D9B777]/70 text-xs mb-12"
        >
          {birthdayConfig.finale.signature}
        </motion.p>

        {/* Celebrate button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={handleCelebrate}
          className="bg-[#D9B777] text-[#08090D] px-8 py-3 text-sm tracking-widest font-semibold hover:bg-[#f0d080] transition-colors duration-300"
        >
          CELEBRATE AGAIN 🎉
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 text-center pb-8 pt-4">
        <p className="text-xs text-[#C5C7D0]/40">
          AKKI&apos;S BIRTHDAY EXPERIENCE · MADE WITH LOVE ✨
        </p>
      </footer>
    </section>
  );
}
