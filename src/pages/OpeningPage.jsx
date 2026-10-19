import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfetti } from '../hooks/useConfetti';

const BOKEH = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 60 + (i * 47) % 120,
  top: (i * 31 + 5) % 90,
  left: (i * 43 + 7) % 90,
  duration: 4 + (i % 5),
  delay: (i % 6) * 0.7,
  color: [
    'rgba(255,182,193,0.25)', 'rgba(201,184,255,0.25)',
    'rgba(255,218,185,0.25)', 'rgba(255,215,0,0.15)',
  ][i % 4],
}));

const FLOAT_EMOJIS = ['✨','💗','🌸','⭐','💫','🎀','💕','🌷'];

const RISING_HEARTS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  left: `${25 + i * 25}%`,
  duration: 5 + i,
  delay: i * 1.5,
}));

const FLOATING_EMOJIS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  emoji: FLOAT_EMOJIS[i % FLOAT_EMOJIS.length],
  top: `${(i * 37 + 5) % 88}%`,
  left: `${(i * 53 + 3) % 92}%`,
  duration: 3 + (i % 4),
  delay: (i % 5) * 0.8,
}));

export default function OpeningPage() {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti();
  const [clicked, setClicked] = useState(false);
  const [windowHeight, setWindowHeight] = useState(600);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleOpen = () => {
    if (clicked) return;
    setClicked(true);
    triggerConfetti();
    setTimeout(() => navigate('/hero'), 900);
  };

  return (
    <motion.div
      initial={{opacity: 1}}
      exit={{opacity: 0, scale: 1.05}}
      transition={{duration: 0.6}}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animate-gradient"
      style={{background: 'linear-gradient(135deg, #ffd6e0, #e8d5f5, #fff5e4, #ffd6e0, #d4b8ff)',}}
    >
      {/* Bokeh circles */}
      {BOKEH.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full pointer-events-none animate-bokeh"
          style={{
            width: b.size,
            height: b.size,
            top: `${b.top}%`,
            left: `${b.left}%`,
            background: b.color,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            filter: 'blur(8px)',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Floating emojis */}
      {FLOATING_EMOJIS.map((e) => (
        <motion.div
          key={e.id}
          className="absolute text-2xl pointer-events-none select-none"
          style={{top: e.top, left: e.left}}
          animate={{y: [0, -15, 0], opacity: [0.6, 1, 0.6]}}
          transition={{duration: e.duration, delay: e.delay, repeat: Infinity, ease: 'easeInOut'}}
          aria-hidden="true"
        >
          {e.emoji}
        </motion.div>
      ))}

      {/* Rising hearts from bottom */}
      {RISING_HEARTS.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-3xl pointer-events-none select-none"
          style={{bottom: 0, left: h.left}}
          animate={{y: [0, -(windowHeight + 100)], opacity: [0.8, 0]}}
          transition={{duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeOut'}}
          aria-hidden="true"
        >
          💗
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.h1
          className="font-cursive text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight"
          style={{background: 'linear-gradient(135deg, #c0882e, #f5d16b, #e8a838, #f5d16b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',}}
          initial={{opacity: 0, y: 40}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, delay: 0.3}}
        >
          ✨ A Little Universe Made Just for Akki ✨
        </motion.h1>

        <motion.p
          className="font-clean text-lg md:text-xl mb-10 leading-relaxed"
          style={{color: '#9f1239'}}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.9, delay: 0.8}}
        >
          Today is not just another day... it&apos;s the day someone truly special was born. 💗
        </motion.p>

        {/* Glowing gift box */}
        <motion.div
          className="text-9xl mb-8 inline-block cursor-pointer select-none"
          animate={clicked ? { scale: [1, 1.3, 0.8], rotate: [0, 10, -10, 0] } : { scale: [1, 1.06, 1] }}
          transition={clicked ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{filter: 'drop-shadow(0 0 30px rgba(255,107,157,0.7))'}}
          onClick={handleOpen}
          role="img"
          aria-label="Birthday gift box"
        >
          🎁
        </motion.div>

        <motion.button
          onClick={handleOpen}
          disabled={clicked}
          className="px-10 py-4 rounded-full font-clean font-semibold text-white text-lg shadow-2xl block mx-auto animate-glow"
          style={{background: 'linear-gradient(135deg, #e8a598, #FF6B9D, #C9B8FF)',}}
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.7, delay: 1.2}}
          whileHover={{scale: clicked ? 1 : 1.07}}
          whileTap={{scale: 0.96}}
        >
          {clicked ? '✨ Opening...' : 'Open Your Birthday Surprise 🎁'}
        </motion.button>
      </div>
    </motion.div>
  );
}
