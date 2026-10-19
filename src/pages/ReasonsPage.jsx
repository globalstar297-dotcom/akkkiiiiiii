import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { config } from '../config';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, rgba(255,182,193,0.6), rgba(255,218,185,0.6))',
  'linear-gradient(135deg, rgba(201,184,255,0.6), rgba(255,182,193,0.6))',
  'linear-gradient(135deg, rgba(255,218,185,0.6), rgba(255,235,150,0.4))',
  'linear-gradient(135deg, rgba(180,230,200,0.4), rgba(201,184,255,0.5))',
  'linear-gradient(135deg, rgba(255,182,193,0.6), rgba(201,184,255,0.5))',
  'linear-gradient(135deg, rgba(255,235,150,0.4), rgba(255,218,185,0.6))',
];

const DECO = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  emoji: ['🌸','💗','✨','🦋','🌷','💫','⭐','🎀'][i],
  top: `${(i * 37 + 5) % 90}%`,
  left: `${(i * 53 + 3) % 92}%`,
  duration: 4 + (i % 4),
  delay: (i % 5) * 0.7,
}));

export default function ReasonsPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div
        className="relative min-h-screen px-6 py-16 pb-24 md:pb-16 overflow-hidden"
        style={{background: 'linear-gradient(160deg, #e8d5f5 0%, #fff5e4 50%, #ffd6e0 100%)',}}
      >
        {/* Decorative floating elements */}
        {DECO.map((d) => (
          <motion.div
            key={d.id}
            className="absolute text-2xl pointer-events-none select-none"
            style={{top: d.top, left: d.left, opacity: 0.45}}
            animate={{y: [0, -14, 0], rotate: [0, 10, -10, 0]}}
            transition={{duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut'}}
            aria-hidden="true"
          >
            {d.emoji}
          </motion.div>
        ))}

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="font-elegant text-4xl md:text-5xl text-center mb-3"
            style={{color: '#9f1239'}}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            A Few Little Reasons Why You&apos;re Special 🌷
          </motion.h2>
          <motion.p
            className="font-cursive text-xl text-center mb-12"
            style={{color: '#db2777'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.3}}
          >
            Just a few of the many, many reasons...
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.reasons.map((reason, i) => (
              <motion.div
                key={i}
                className="rounded-3xl p-8 cursor-default"
                style={{background: CARD_GRADIENTS[i],
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 8px 32px rgba(255,107,157,0.15)',}}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6, delay: i * 0.15}}
                whileHover={{y: -10,
                  scale: 1.02,
                  boxShadow: '0 20px 50px rgba(255,107,157,0.35)',}}
              >
                <motion.div
                  className="text-5xl mb-4 inline-block"
                  animate={{y: [0, -8, 0]}}
                  transition={{duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut'}}
                  aria-hidden="true"
                >
                  {reason.icon}
                </motion.div>
                <h3
                  className="font-elegant text-xl font-semibold mb-2"
                  style={{background: 'linear-gradient(135deg, #9f1239, #7e22ce)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',}}
                >
                  {reason.title}
                </h3>
                <p className="font-clean text-sm leading-relaxed" style={{color: 'rgba(80,20,60,0.8)'}}>
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <motion.button
              onClick={() => navigate('/memories')}
              className="px-6 py-3 rounded-full font-clean font-semibold shadow-lg glass"
              style={{color: '#9f1239'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              ← Memories
            </motion.button>
            <motion.button
              onClick={() => navigate('/surprises')}
              className="px-6 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
              style={{background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              Next: Surprises 🎁
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
