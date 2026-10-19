import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const BALLOONS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  emoji: '🎈',
  left: `${8 + i * 12}%`,
  duration: 10 + (i % 4) * 2,
  delay: i * 0.8,
  color: ['#FF6B9D','#C9B8FF','#FFD700','#FFB3BA','#E8A598','#B8D4FF','#FFD6E0','#D4B8FF'][i],
}));

const STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${(i * 29 + 7) % 80}%`,
  left: `${(i * 47 + 5) % 95}%`,
  size: 0.4 + (i % 4) * 0.15,
  duration: 1.5 + (i % 5) * 0.4,
  delay: (i % 7) * 0.35,
}));

const CORNER_FLOWERS = [
  { id: 0, top: '-20px', left: '-20px' },
  { id: 1, top: '-20px', right: '-20px' },
  { id: 2, bottom: '-20px', left: '-20px' },
  { id: 3, bottom: '-20px', right: '-20px' },
];

const HEADING_WORDS = ['Happy', 'Birthday,', 'Akki!', '🎂💖'];

export default function HeroPage() {
  const navigate = useNavigate();
  const [windowHeight, setWindowHeight] = useState(600);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <PageTransition>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-24 md:pb-16"
        style={{background: 'radial-gradient(ellipse at 50% 30%, #ff8fab 0%, #c77dff 40%, #4a0072 100%)',}}
      >
        {/* Twinkling stars */}
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              top: s.top, left: s.left,
              width: `${s.size}rem`, height: `${s.size}rem`,
            }}
            animate={{opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8]}}
            transition={{duration: s.duration, repeat: Infinity, delay: s.delay}}
            aria-hidden="true"
          />
        ))}

        {/* Rising balloons */}
        {BALLOONS.map((b) => (
          <motion.div
            key={b.id}
            className="absolute text-4xl pointer-events-none select-none"
            style={{left: b.left, bottom: '-60px'}}
            animate={{y: [0, -(windowHeight + 200)], rotate: [-5, 5, -5]}}
            transition={{duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut'}}
            aria-hidden="true"
          >
            {b.emoji}
          </motion.div>
        ))}

        {/* Corner flowers */}
        {CORNER_FLOWERS.map((f) => (
          <motion.div
            key={f.id}
            className="absolute text-4xl md:text-5xl pointer-events-none select-none"
            style={{top: f.top, left: f.left, right: f.right, bottom: f.bottom}}
            animate={{rotate: [0, 15, -15, 0], scale: [1, 1.1, 1]}}
            transition={{duration: 4, repeat: Infinity, ease: 'easeInOut'}}
            aria-hidden="true"
          >
            🌸
          </motion.div>
        ))}

        {/* Floating cake */}
        <motion.div
          className="text-7xl md:text-8xl mb-6 animate-bob select-none"
          aria-hidden="true"
        >
          🎂
        </motion.div>

        {/* Heading words staggered */}
        <div className="text-center mb-6 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
            {HEADING_WORDS.map((word, i) => (
              <motion.span
                key={i}
                className="font-elegant text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                style={{background: 'linear-gradient(135deg, #fff5c0, #ffe066, #fff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',}}
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.2 + i * 0.2}}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          className="font-clean text-base md:text-xl text-center max-w-lg mb-10 leading-relaxed"
          style={{color: 'rgba(255,240,255,0.92)'}}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.9, delay: 1.2}}
        >
          To the one who makes life a little brighter, laughter a little louder, and memories a little more beautiful.
        </motion.p>

        <motion.button
          onClick={() => navigate('/letter')}
          className="px-10 py-4 rounded-full font-clean font-semibold text-white text-lg shadow-2xl mb-8"
          style={{background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'}}
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.7, delay: 1.5}}
          whileHover={{scale: 1.06, boxShadow: '0 0 30px rgba(255,107,157,0.6)'}}
          whileTap={{scale: 0.96}}
        >
          Continue to My Letter 💌
        </motion.button>

        {/* Scroll hint arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-2xl pointer-events-none"
          animate={{y: [0, 8, 0], opacity: [0.5, 1, 0.5]}}
          transition={{duration: 2, repeat: Infinity}}
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </div>
    </PageTransition>
  );
}
