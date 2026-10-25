import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gentleConfetti } from '../hooks/useConfetti';
import { birthdayConfig } from '../config/birthday';

const CANDLE_COUNT = 5;

function getRandomWish(exclude?: string): string {
  const wishes = birthdayConfig.wishes;
  const filtered = wishes.filter((w) => w !== exclude);
  const pool = filtered.length > 0 ? filtered : wishes;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function BirthdayCake() {
  const [flamesVisible, setFlamesVisible] = useState<boolean[]>(
    Array(CANDLE_COUNT).fill(true)
  );
  const [wishRevealed, setWishRevealed] = useState(false);
  const [currentWish, setCurrentWish] = useState<string>('');

  const blowOutCandles = () => {
    if (!flamesVisible.some(Boolean)) return;

    for (let i = 0; i < CANDLE_COUNT; i++) {
      setTimeout(() => {
        setFlamesVisible((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      }, i * 150);
    }

    setTimeout(() => {
      setCurrentWish(getRandomWish());
      setWishRevealed(true);
      gentleConfetti();
    }, CANDLE_COUNT * 150 + 200);
  };

  const resetCandles = () => {
    setFlamesVisible(Array(CANDLE_COUNT).fill(true));
    setWishRevealed(false);
    setCurrentWish('');
  };

  return (
    <div className="text-center py-16 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif text-3xl md:text-4xl text-gold mb-12"
      >
        MAKE A WISH, BIRTHDAY STAR.
      </motion.h2>

      {/* Cake */}
      <div className="flex flex-col items-center mb-10">
        {/* Candles row */}
        <div className="flex items-end justify-center gap-1 mb-0">
          {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center"
              style={{ width: 14 }}
            >
              {/* Flame */}
              <AnimatePresence>
                {flamesVisible[i] && (
                  <motion.div
                    key={`flame-${i}`}
                    initial={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 10,
                      height: 16,
                      background: 'linear-gradient(to bottom, #ffd700, #ff6b35)',
                      borderRadius: '50% 50% 30% 30%',
                      animation: `flicker 0.4s ease-in-out ${i * 0.08}s infinite`,
                      marginBottom: 2,
                    }}
                  />
                )}
              </AnimatePresence>
              {/* Smoke when blown out */}
              {!flamesVisible[i] && (
                <motion.div
                  key={`smoke-${i}`}
                  initial={{ opacity: 0.6, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1.5 }}
                  style={{
                    width: 4,
                    height: 12,
                    background: 'rgba(200,200,200,0.5)',
                    borderRadius: 2,
                    marginBottom: 2,
                  }}
                />
              )}
              {/* Candle */}
              <div
                style={{
                  width: 10,
                  height: 36,
                  background: 'linear-gradient(to bottom, #FFF4E5, #f0d4a0)',
                  borderRadius: 2,
                }}
              />
            </div>
          ))}
        </div>

        {/* Top tier */}
        <div
          style={{
            width: 150,
            height: 45,
            background: 'linear-gradient(to bottom, #FFF4E5, #f5e6cc)',
            borderRadius: '4px 4px 0 0',
            borderBottom: '4px solid #D9B777',
          }}
        />

        {/* Middle tier */}
        <div
          style={{
            width: 200,
            height: 50,
            background: 'linear-gradient(to bottom, #FFF4E5, #f5e6cc)',
            borderBottom: '4px solid #D9B777',
          }}
        />

        {/* Bottom tier */}
        <div
          style={{
            width: 260,
            height: 60,
            background: 'linear-gradient(to bottom, #FFF4E5, #f5e6cc)',
            borderRadius: '0 0 8px 8px',
            borderBottom: '4px solid #D9B777',
          }}
        />

        {/* Plate */}
        <div
          style={{
            width: 300,
            height: 20,
            background: 'rgba(197,199,208,0.2)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Blow out button */}
      {flamesVisible.some(Boolean) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={blowOutCandles}
          className="border border-[#D9B777] text-[#D9B777] px-8 py-3 text-sm tracking-widest hover:bg-[#D9B777]/10 transition-colors duration-300 mb-6"
        >
          BLOW OUT THE CANDLES ✨
        </motion.button>
      )}

      {/* Wish */}
      <AnimatePresence>
        {wishRevealed && (
          <motion.div
            key="wish-reveal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="mt-6"
          >
            <p className="font-serif italic text-[#D9B777] text-xl max-w-lg mx-auto">
              ✨ {currentWish} ✨
            </p>
            <button
              onClick={resetCandles}
              className="mt-6 text-xs text-[#C5C7D0]/50 hover:text-[#D9B777] transition-colors"
            >
              Light the candles again 🕯️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
