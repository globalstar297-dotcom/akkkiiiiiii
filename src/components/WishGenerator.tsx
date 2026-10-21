import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthday';

export default function WishGenerator() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const wishes = birthdayConfig.wishes;

  const revealWish = () => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * wishes.length);
    } while (newIndex === currentIndex && wishes.length > 1);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="py-16 px-6">
      <div
        className="max-w-lg mx-auto p-8 rounded-sm border border-[#D9B777]/40"
        style={{ boxShadow: '0 0 30px rgba(217,183,119,0.25)' }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-widest text-[#D9B777] uppercase mb-8 text-center"
        >
          YOUR LITTLE BOX OF GOOD THINGS.
        </motion.h3>

        <div className="min-h-[80px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {currentIndex === null ? (
              <motion.p
                key="prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-[#C5C7D0]/60 text-sm italic"
              >
                Click below to reveal a little wish…
              </motion.p>
            ) : (
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="font-serif italic text-[#D9B777] text-xl leading-relaxed"
              >
                {wishes[currentIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={revealWish}
            className="border border-[#D9B777] text-[#D9B777] px-6 py-3 text-xs tracking-widest hover:bg-[#D9B777]/10 transition-colors duration-300"
          >
            REVEAL A LITTLE WISH ✨
          </button>
        </div>
      </div>
    </div>
  );
}
