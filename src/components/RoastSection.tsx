import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthday';

export default function RoastSection() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="roast"
      className="relative bg-[#10121C] py-24 px-6 overflow-hidden"
    >
      {/* Subtle gold gradient at top */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(180deg, rgba(217,183,119,0.04) 0%, transparent 100%)' }}
      />

      {/* Heading */}
      <div className="text-center mb-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl md:text-4xl text-gold mb-4"
        >
          OFFICIAL AKKI APPRECIATION… WITH A LITTLE ROASTING.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#C5C7D0] text-sm tracking-wide"
        >
          Because a normal birthday wish would be suspicious coming from me.
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16 relative z-10">
        {birthdayConfig.roastCards.map((card, index) => {
          const isExpanded = !!expanded[card.id];
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card border-t-2 border-[#D9B777] p-6 cursor-pointer rounded-sm hover:border-[#f0d080] transition-colors duration-300"
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              onClick={() => toggle(card.id)}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(card.id);
                }
              }}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="font-serif text-[#D9B777] tracking-[0.2em] text-sm mb-3 font-semibold">
                {card.title}
              </div>
              {!isExpanded && (
                <p className="text-xs italic text-[#C5C7D0]/60">Click to reveal ↓</p>
              )}

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key={`card-${card.id}-message`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-[#FFF4E5]/90 text-sm leading-relaxed pt-2">
                      {card.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Closing line */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif italic text-[#D9B777] text-center text-xl mt-16 relative z-10"
      >
        ROAST COMPLETE. LOVE LEVEL: UNLIMITED. ❤️
      </motion.p>
    </section>
  );
}
