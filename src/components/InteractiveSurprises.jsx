import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { useConfetti } from '../hooks/useConfetti';

// ─── Make a Wish ────────────────────────────────────────────────────────────

function MakeAWish() {
  const [blown, setBlown] = useState(false);
  const { gentleConfetti } = useConfetti();

  const blowCandles = () => {
    gentleConfetti();
    setBlown(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-3xl glass shadow-xl">
      <h3 className="font-elegant text-2xl" style={{ color: '#FF6B9D' }}>
        Make a Wish ✨
      </h3>
      <div className="text-7xl" role="img" aria-label="Birthday cake">
        🎂
      </div>

      {/* Animated candles */}
      {!blown && (
        <div className="flex gap-3" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <motion.div
                className="w-2 h-4 rounded-full"
                style={{
                  background: 'linear-gradient(to top, #FF6B9D, #FFD700)',
                  transformOrigin: 'bottom',
                }}
                animate={{ scaleY: [1, 1.1, 0.9, 1], scaleX: [1, 0.9, 1.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
              />
              {/* Candle */}
              <div
                className="w-3 h-6 rounded-sm"
                style={{ background: 'linear-gradient(to top, #FFD700, #FFA500)' }}
              />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {blown ? (
          <motion.div
            key="blown"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="font-elegant text-xl" style={{ color: '#FF6B9D' }}>
              Your wish is on its way to the stars! ✨
            </p>
            <button
              onClick={() => setBlown(false)}
              className="mt-4 px-6 py-2 rounded-full font-clean text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #E8A598, #C9B8FF)' }}
            >
              Light Again 🕯️
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="cta"
            onClick={blowCandles}
            className="px-8 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #FFD700)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Blow Out the Candles 🎂
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tap for Happiness ───────────────────────────────────────────────────────

function TapForHappiness() {
  const [msgIndex, setMsgIndex] = useState(-1);
  const messages = config.happinessTapMessages;

  const tap = () => {
    setMsgIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-3xl glass shadow-xl">
      <h3 className="font-elegant text-2xl" style={{ color: '#FF6B9D' }}>
        Tap for Happiness 💖
      </h3>
      <motion.button
        className="text-7xl cursor-pointer bg-transparent border-none p-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={tap}
        aria-label="Tap for a birthday message"
      >
        💖
      </motion.button>

      <AnimatePresence mode="wait">
        {msgIndex >= 0 && (
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.5)' }}
          >
            <p className="font-cursive text-lg" style={{ color: '#9f1239' }}>
              {messages[msgIndex]}
            </p>
            <p className="font-clean text-xs mt-2" style={{ color: '#fb7185' }}>
              Message {msgIndex + 1} of {messages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={tap}
        className="px-8 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)' }}
      >
        Tap for a Birthday Message 💖
      </button>
    </div>
  );
}

// ─── Wish Jar ────────────────────────────────────────────────────────────────

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
    <div className="flex flex-col items-center gap-4 p-8 rounded-3xl glass shadow-xl">
      <h3 className="font-elegant text-2xl" style={{ color: '#FF6B9D' }}>
        Birthday Wish Jar 🫙
      </h3>
      <motion.button
        className="text-7xl cursor-pointer bg-transparent border-none p-0"
        animate={
          shaking
            ? { rotate: [-5, 5, -5, 5, 0] }
            : { scale: [1, 1.05, 1] }
        }
        transition={
          shaking
            ? { duration: 0.5 }
            : { duration: 3, repeat: Infinity }
        }
        onClick={openJar}
        aria-label="Open the wish jar"
      >
        🫙
      </motion.button>

      <AnimatePresence mode="wait">
        {wish && (
          <motion.div
            key={wish}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-4 rounded-2xl shadow-inner"
            style={{ background: 'linear-gradient(135deg, rgba(255,214,224,0.5), rgba(201,184,255,0.5))' }}
          >
            <p className="font-cursive text-lg" style={{ color: '#9f1239' }}>
              {wish}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={openJar}
        className="px-6 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #C9B8FF, #FF6B9D)' }}
      >
        {wish ? 'Another Wish ✨' : 'Open the Wish Jar 🫙'}
      </button>
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

export default function InteractiveSurprises() {
  return (
    <section
      className="py-20 px-6"
      style={{ background: 'linear-gradient(160deg, #FFD6E0, rgba(201,184,255,0.25), #FFF5E4)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-elegant text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#FF6B9D' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          One Last Little Surprise for You 🎁
        </motion.h2>
        <p className="font-clean text-center mb-12" style={{ color: '#fb7185' }}>
          A few little gifts, just for you...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MakeAWish />
          <TapForHappiness />
          <WishJar />
        </div>
      </div>
    </section>
  );
}
