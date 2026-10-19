import { motion } from 'framer-motion';

const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈'];

const starPositions = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: [15, 25, 35, 45, 55, 65, 75, 20, 30, 40, 50, 70][i],
  left: [10, 20, 30, 40, 50, 60, 70, 80, 15, 25, 45, 85][i],
  duration: [2, 2.3, 2.6, 2.9, 3.2, 2.1, 2.4, 2.7, 3, 2.2, 2.5, 2.8][i],
  delay: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2][i],
}));

const cornerPositions = ['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'linear-gradient(160deg, #FFF5E4 0%, #FFD6E0 40%, #C9B8FF 100%)' }}
    >
      {/* Floating balloons */}
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl pointer-events-none"
          style={{ left: `${10 + i * 20}%`, bottom: '-80px' }}
          animate={{ y: [-800, -1400] }}
          transition={{ duration: 8 + i * 1.5, repeat: Infinity, delay: i * 1.2, ease: 'linear' }}
          aria-hidden="true"
        >
          {b}
        </motion.div>
      ))}

      {/* Floating birthday cake */}
      <motion.div
        className="text-7xl md:text-8xl mb-6"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        🎂
      </motion.div>

      {/* Main title */}
      <motion.h1
        className="font-elegant text-5xl md:text-7xl lg:text-8xl text-pink-gradient text-center leading-tight mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Happy Birthday, Akki! 🎂💖
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-clean text-lg md:text-2xl text-center max-w-2xl leading-relaxed mb-8"
        style={{ color: '#f43f5e' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        To the one who makes life a little brighter, laughter a little louder, and memories a little more beautiful.
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        className="font-clean text-sm opacity-50 mt-4"
        style={{ color: '#be185d' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        ↓ Scroll to celebrate ↓
      </motion.div>

      {/* Corner flowers */}
      {cornerPositions.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-3xl md:text-4xl pointer-events-none`}
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          aria-hidden="true"
        >
          🌸
        </motion.div>
      ))}

      {/* Scattered twinkling stars */}
      {starPositions.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-lg pointer-events-none"
          style={{ top: `${star.top}%`, left: `${star.left}%`, opacity: 0.6 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          aria-hidden="true"
        >
          ⭐
        </motion.div>
      ))}
    </section>
  );
}
