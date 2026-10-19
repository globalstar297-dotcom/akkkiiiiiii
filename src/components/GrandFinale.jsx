import { motion } from 'framer-motion';
import { useConfetti } from '../hooks/useConfetti';

const STAR_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: (i * 37 + 5) % 95,
  left: (i * 53 + 3) % 98,
  size: 0.3 + (i % 5) * 0.15,
  duration: 1.5 + (i % 5) * 0.5,
  delay: (i % 8) * 0.3,
}));

const FIREWORKS_DATA = [
  { top: '10%', left: '10%', delay: 0 },
  { top: '20%', left: '30%', delay: 0.8 },
  { top: '15%', left: '55%', delay: 1.6 },
  { top: '25%', left: '75%', delay: 0.4 },
  { top: '35%', left: '20%', delay: 1.2 },
];

const HEART_DATA = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${10 + i * 12}%`,
  duration: 6 + i * 0.5,
  delay: i * 0.8,
}));

export default function GrandFinale() {
  const { triggerConfetti } = useConfetti();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'linear-gradient(180deg, #0f0c29, #302b63, #24243e)' }}
    >
      {/* Twinkling stars */}
      {STAR_DATA.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          aria-hidden="true"
        />
      ))}

      {/* Glowing moon */}
      <div
        className="absolute top-10 right-16 rounded-full pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, #FFF9C4, #FFD700)',
          boxShadow: '0 0 40px 20px rgba(255,215,0,0.3)',
        }}
        aria-hidden="true"
      />

      {/* Fireworks */}
      {FIREWORKS_DATA.map((fw, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl pointer-events-none"
          style={{ top: fw.top, left: fw.left }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: fw.delay }}
          aria-hidden="true"
        >
          🎆
        </motion.div>
      ))}

      {/* Floating hearts rising */}
      {HEART_DATA.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-2xl pointer-events-none"
          style={{ bottom: 0, left: h.left }}
          animate={{ y: [0, -600], opacity: [1, 0] }}
          transition={{ duration: h.duration, repeat: Infinity, delay: h.delay }}
          aria-hidden="true"
        >
          💗
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          className="text-6xl mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          aria-hidden="true"
        >
          💖
        </motion.div>

        <motion.h2
          className="font-elegant text-4xl md:text-6xl lg:text-7xl text-gold-gradient mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Happy Birthday Once Again, Akki! 💖
        </motion.h2>

        <motion.p
          className="font-clean text-lg md:text-xl text-white mb-6 leading-relaxed"
          style={{ opacity: 0.85 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          You deserve all the happiness this world has to offer. May your life always be filled with
          love, laughter, beautiful adventures, and dreams that come true.
        </motion.p>

        <motion.p
          className="font-cursive text-2xl md:text-3xl mb-10"
          style={{ color: '#f9a8d4' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Made with lots of love, especially for you, Akki. 🎀
        </motion.p>

        <motion.button
          onClick={triggerConfetti}
          className="px-10 py-4 rounded-full font-clean font-semibold text-white shadow-2xl text-lg"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #FFD700, #C9B8FF)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,215,0,0.5)' }}
          whileTap={{ scale: 0.97 }}
        >
          Celebrate Again 🎉
        </motion.button>
      </div>
    </section>
  );
}
