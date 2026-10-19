import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { config } from '../config';
import { useConfetti } from '../hooks/useConfetti';

// ─── Make a Wish ─────────────────────────────────────────────────────────────
function MakeAWish() {
  const [blown, setBlown] = useState(false);
  const { gentleConfetti } = useConfetti();

  const blow = () => {
    if (blown) return;
    gentleConfetti();
    setBlown(true);
  };

  return (
    <div className="glass-dark rounded-3xl p-8 flex flex-col items-center gap-4" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
      <h3 className="font-elegant text-2xl text-white">Make a Wish ✨</h3>
      <div className="text-7xl select-none" role="img" aria-label="Birthday cake">🎂</div>

      {/* Candles */}
      {!blown && (
        <div className="flex gap-3" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                className="w-2 h-4 rounded-full"
                style={{background: 'linear-gradient(to top, #FF6B9D, #FFD700)', transformOrigin: 'bottom'}}
                animate={{scaleY: [1, 1.15, 0.9, 1], scaleX: [1, 0.9, 1.1, 1]}}
                transition={{duration: 0.3, repeat: Infinity, delay: i * 0.07}}
              />
              <div className="w-3 h-6 rounded-sm" style={{background: 'linear-gradient(to top, #FFD700, #FFA500)'}} />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {blown ? (
          <motion.div
            key="blown"
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            className="text-center"
          >
            <p className="font-elegant text-lg text-pink-300">Your wish is on its way to the stars! ✨</p>
            <button
              onClick={() => setBlown(false)}
              className="mt-4 px-6 py-2 rounded-full font-clean text-white text-sm"
              style={{background: 'linear-gradient(135deg, #E8A598, #C9B8FF)'}}
            >
              Light the Candles Again 🕯️
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="cta"
            onClick={blow}
            className="px-8 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
            style={{background: 'linear-gradient(135deg, #FF6B9D, #FFD700)'}}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.97}}
          >
            Blow Out the Candles 🎂
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tap for Happiness ────────────────────────────────────────────────────────
function TapForHappiness() {
  const [msgIndex, setMsgIndex] = useState(-1);
  const [hearts, setHearts] = useState([]);
  const messages = config.happinessTapMessages;

  const tap = () => {
    setMsgIndex((prev) => (prev + 1) % messages.length);
    setHearts((prev) => [...prev, { id: Date.now() }]);
    setTimeout(() => setHearts((prev) => prev.slice(1)), 2100);
  };

  return (
    <div className="glass-dark rounded-3xl p-8 flex flex-col items-center gap-4 relative overflow-hidden" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
      <h3 className="font-elegant text-2xl text-white">Tap for Happiness 💖</h3>

      {/* Floating hearts on tap */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-2xl pointer-events-none select-none"
          style={{bottom: '60px', left: '50%', transform: 'translateX(-50%)'}}
          initial={{y: 0, opacity: 1}}
          animate={{y: -180, opacity: 0}}
          transition={{duration: 2, ease: 'easeOut'}}
          aria-hidden="true"
        >
          💖
        </motion.div>
      ))}

      <motion.div
        className="text-7xl cursor-pointer select-none"
        animate={{scale: [1, 1.06, 1]}}
        transition={{duration: 2, repeat: Infinity}}
        onClick={tap}
        role="button"
        aria-label="Tap for a birthday message"
      >
        💖
      </motion.div>

      <AnimatePresence mode="wait">
        {msgIndex >= 0 && (
          <motion.div
            key={msgIndex}
            initial={{opacity: 0, y: 10, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -10}}
            className="text-center p-4 rounded-2xl w-full"
            style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,182,193,0.3)'}}
          >
            <p className="font-cursive text-lg text-pink-200">{messages[msgIndex]}</p>
            <p className="font-clean text-xs mt-2 text-pink-400">✨ Message {msgIndex + 1} of {messages.length}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={tap}
        className="px-8 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
        style={{background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'}}
      >
        Tap for a Birthday Message 💖
      </button>
    </div>
  );
}

// ─── Wish Jar ─────────────────────────────────────────────────────────────────
function WishJar() {
  const [wish, setWish] = useState(null);
  const [shaking, setShaking] = useState(false);
  const wishes = config.wishJarMessages;

  const openJar = () => {
    if (shaking) return;
    setShaking(true);
    setTimeout(() => {
      setWish(wishes[Math.floor(Math.random() * wishes.length)]);
      setShaking(false);
    }, 600);
  };

  return (
    <div className="glass-dark rounded-3xl p-8 flex flex-col items-center gap-4" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
      <h3 className="font-elegant text-2xl text-white">Birthday Wish Jar 🫙</h3>
      <motion.div
        className="text-7xl cursor-pointer select-none"
        animate={shaking ? { rotate: [-5, 5, -5, 5, 0] } : { scale: [1, 1.05, 1] }}
        transition={shaking ? { duration: 0.5 } : { duration: 3, repeat: Infinity }}
        onClick={openJar}
        role="button"
        aria-label="Open the wish jar"
      >
        🫙
      </motion.div>

      <AnimatePresence mode="wait">
        {wish && (
          <motion.div
            key={wish}
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0}}
            className="text-center p-4 rounded-2xl w-full"
            style={{background: 'linear-gradient(135deg, rgba(255,214,224,0.15), rgba(201,184,255,0.15))',
              border: '1px solid rgba(255,215,0,0.4)',
              boxShadow: '0 0 20px rgba(255,215,0,0.1)',}}
          >
            <p className="font-cursive text-lg text-yellow-200">{wish}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={openJar}
        className="px-6 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
        style={{background: 'linear-gradient(135deg, #C9B8FF, #FF6B9D)'}}
      >
        {wish ? 'Another Wish ✨' : 'Open the Wish Jar 🫙'}
      </button>
    </div>
  );
}

export default function SurprisesPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div
        className="relative min-h-screen px-6 py-16 pb-24 md:pb-16 overflow-hidden"
        style={{background: 'linear-gradient(160deg, #2d0037 0%, #6b0f5e 40%, #1a0030 100%)',}}
      >
        {/* Sparkle bg dots */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              top: `${(i * 29 + 7) % 90}%`,
              left: `${(i * 47 + 5) % 95}%`,
              width: `${0.2 + (i % 3) * 0.1}rem`,
              height: `${0.2 + (i % 3) * 0.1}rem`,
            }}
            animate={{opacity: [0.1, 0.8, 0.1]}}
            transition={{duration: 1.5 + (i % 4) * 0.5, repeat: Infinity, delay: (i % 7) * 0.3}}
            aria-hidden="true"
          />
        ))}

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="font-elegant text-4xl md:text-5xl text-center mb-3 text-white"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            One Last Little Surprise for You 🎁
          </motion.h2>
          <motion.p
            className="font-cursive text-xl text-center mb-12"
            style={{color: 'rgba(255,200,220,0.85)'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.3}}
          >
            A few little gifts, just for you...
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MakeAWish />
            <TapForHappiness />
            <WishJar />
          </div>

          <div className="flex justify-between mt-10">
            <motion.button
              onClick={() => navigate('/reasons')}
              className="px-6 py-3 rounded-full font-clean font-semibold shadow-lg"
              style={{background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.25)'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              ← Special
            </motion.button>
            <motion.button
              onClick={() => navigate('/finale')}
              className="px-6 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
              style={{background: 'linear-gradient(135deg, #FF6B9D, #FFD700)'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              Grand Finale 🌌
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
