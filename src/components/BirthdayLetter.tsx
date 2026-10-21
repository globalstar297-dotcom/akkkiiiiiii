import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthday';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const { displayedText, isDone, startTyping, skipToEnd } = useTypingAnimation(
    birthdayConfig.letter.body,
    15
  );

  // Start typing when letter opens
  useEffect(() => {
    if (isOpen) {
      startTyping();
    }
  // startTyping is stable (ref-based), safe in deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <section
      id="letter"
      className="relative bg-[#08090D] py-24 px-6 overflow-hidden"
    >
      {/* Rose radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '60vw',
          height: '60vw',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(183,123,133,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl md:text-4xl text-gold mb-4"
        >
          JOKES ASIDE… THIS PART IS REAL.
        </motion.h2>

        {/* Envelope area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-80 mx-auto mt-12 mb-8"
          style={{ perspective: '1000px' }}
        >
          {/* Envelope wrapper */}
          <div className="relative">
            {/* Envelope flap */}
            <motion.div
              animate={{ rotateX: isOpen ? -180 : 0 }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
              className="absolute top-0 left-0 right-0 h-16 z-10"
            >
              <div
                className="w-full h-full"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(180deg, #FFF4E5, #D9B777)',
                }}
              />
            </motion.div>

            {/* Envelope body */}
            <div className="bg-[#FFF4E5]/10 border border-[#D9B777]/40 rounded-b-lg p-8 pt-14 min-h-[120px] flex items-center justify-center">
              {!isOpen && (
                <p className="text-[#D9B777] text-sm tracking-widest">💌</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Open button */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setIsOpen(true)}
            className="border border-[#D9B777] text-[#D9B777] px-8 py-3 text-sm tracking-widest hover:bg-[#D9B777]/10 transition-colors duration-300 mb-12"
          >
            OPEN YOUR LETTER 💌
          </motion.button>
        )}

        {/* Letter content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="letter-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-left border border-[#D9B777]/30 rounded-sm p-8"
              style={{ background: 'rgba(255,244,229,0.04)' }}
            >
              {/* Salutation */}
              <p className="font-serif text-2xl text-[#D9B777] mb-6">
                {birthdayConfig.letter.salutation}
              </p>

              {/* Body with typing effect */}
              <div className="text-[#FFF4E5]/90 text-sm leading-loose whitespace-pre-wrap font-light">
                {displayedText}
                {!isDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-[#D9B777] ml-0.5 align-middle"
                  />
                )}
              </div>

              {/* Skip / read all */}
              {!isDone && (
                <button
                  onClick={skipToEnd}
                  className="mt-6 text-xs italic text-[#C5C7D0]/50 hover:text-[#D9B777] transition-colors underline"
                >
                  Read all at once →
                </button>
              )}

              {/* Signoff */}
              {isDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mt-8 pt-6 border-t border-[#D9B777]/20"
                >
                  <p className="text-[#C5C7D0] text-sm mb-2">{birthdayConfig.letter.signoff}</p>
                  <p className="font-serif text-[#D9B777] tracking-widest text-sm">
                    {birthdayConfig.letter.signature}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post-letter line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-[#D9B777] text-center text-lg mt-16"
        >
          {birthdayConfig.letter.postLetterLine}
        </motion.p>
      </div>
    </section>
  );
}
