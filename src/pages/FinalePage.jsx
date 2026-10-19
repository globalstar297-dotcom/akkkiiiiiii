import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useConfetti } from '../hooks/useConfetti';

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${(i * 29 + 3) % 95}%`,
  left: `${(i * 47 + 7) % 98}%`,
  size: 0.15 + (i % 5) * 0.1,
  duration: 1.5 + (i % 6) * 0.4,
  delay: (i % 9) * 0.25,
}));

const FIREWORKS = [
  { top: '12%', left: '8%', delay: 0, color: '#FFD700' },
  { top: '18%', left: '28%', delay: 0.9, color: '#FF6B9D' },
  { top: '10%', left: '52%', delay: 1.7, color: '#C9B8FF' },
  { top: '22%', left: '72%', delay: 0.5, color: '#FFA500' },
  { top: '30%', left: '18%', delay: 1.3, color: '#E8A598' },
  { top: '8%', left: '88%', delay: 2.1, color: '#B8D4FF' },
];

const HEARTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${8 + i * 12}%`,
  duration: 6 + i * 0.6,
  delay: i * 0.9,
}));

// Shooting star
const SHOOTING_STAR = { top: '15%', delay: 4 };

export default function FinalePage() {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti();

  return (
    <PageTransition>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-16 pb-24 md:pb-16"
        style={{background: 'linear-gradient(180deg, #0a0015 0%, #1a0533 50%, #0d001a 100%)'}}
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
            animate={{opacity: [0.15, 1, 0.15]}}
            transition={{duration: s.duration, repeat: Infinity, delay: s.delay}}
            aria-hidden="true"
          />
        ))}

        {/* Glowing moon */}
        <div
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{width: '90px', height: '90px',
            background: 'radial-gradient(circle, #FFF9C4 30%, #FFD700 80%)',
            boxShadow: '0 0 50px 25px rgba(255,215,0,0.25), 0 0 80px 40px rgba(255,215,0,0.1)',}}
          aria-hidden="true"
        />

        {/* Shooting star */}
        <motion.div
          className="absolute pointer-events-none"
          style={{top: SHOOTING_STAR.top,
            left: 0,
            width: '120px',
            height: '2px',
            background: 'linear-gradient(to right, transparent, white, transparent)',
            borderRadius: '2px',}}
          animate={{x: ['-150px', 'calc(100vw + 300px)'], y: [0, 180], opacity: [0, 1, 1, 0]}}
          transition={{duration: 2, delay: SHOOTING_STAR.delay, repeat: Infinity, repeatDelay: 8}}
          aria-hidden="true"
        />

        {/* Fireworks */}
        {FIREWORKS.map((fw, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{top: fw.top, left: fw.left}}
            aria-hidden="true"
          >
            {/* Center dot expands */}
            <motion.div
              className="rounded-full"
              style={{width: '8px', height: '8px', background: fw.color, position: 'absolute', top: 0, left: 0}}
              animate={{scale: [0, 3, 0], opacity: [0, 1, 0]}}
              transition={{duration: 1.8, delay: fw.delay, repeat: Infinity, repeatDelay: 3}}
            />
            {/* Rays */}
            {Array.from({ length: 8 }, (_, r) => (
              <motion.div
                key={r}
                className="absolute"
                style={{width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: fw.color,
                  top: 0, left: 0,
                  transformOrigin: '0 0',}}
                animate={{x: [0, Math.cos((r * Math.PI * 2) / 8) * 50],
                  y: [0, Math.sin((r * Math.PI * 2) / 8) * 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],}}
                transition={{duration: 1.5, delay: fw.delay + 0.1, repeat: Infinity, repeatDelay: 3.3}}
              />
            ))}
          </motion.div>
        ))}

        {/* Floating hearts rising from bottom */}
        {HEARTS.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-2xl pointer-events-none select-none"
            style={{bottom: '-30px', left: h.left}}
            animate={{y: [0, -(window.innerHeight + 100)], opacity: [0.8, 0]}}
            transition={{duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeOut'}}
            aria-hidden="true"
          >
            💗
          </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            className="text-6xl mb-6 select-none"
            animate={{scale: [1, 1.12, 1]}}
            transition={{duration: 3, repeat: Infinity}}
            aria-hidden="true"
          >
            💖
          </motion.div>

          <motion.h2
            className="font-elegant text-4xl md:text-6xl lg:text-7xl text-gold-gradient mb-6 leading-tight"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1}}
          >
            Happy Birthday Once Again, Akki! 💖
          </motion.h2>

          <motion.p
            className="font-clean text-lg md:text-xl text-white mb-6 leading-relaxed"
            style={{opacity: 0.85}}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: 0.4}}
          >
            You deserve all the happiness this world has to offer. May your life always be filled with love, laughter, beautiful adventures, and dreams that come true.
          </motion.p>

          <motion.p
            className="font-cursive text-2xl md:text-3xl mb-10 text-rose-gold"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1, delay: 0.7}}
          >
            Made with lots of love, especially for you, Akki. 🎀
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={triggerConfetti}
              className="px-10 py-4 rounded-full font-clean font-semibold text-white shadow-2xl text-lg"
              style={{background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B9D)'}}
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.7, delay: 0.9}}
              whileHover={{scale: 1.06, boxShadow: '0 0 35px rgba(255,215,0,0.5)'}}
              whileTap={{scale: 0.97}}
            >
              Celebrate Again 🎉
            </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              className="px-8 py-4 rounded-full font-clean font-semibold shadow-lg"
              style={{background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.25)',}}
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.7, delay: 1.1}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.97}}
            >
              Start Over 💗
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
