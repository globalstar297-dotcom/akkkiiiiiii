import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { birthdayConfig } from '../config/birthday';

const headlineWords = ['HAPPY', 'BIRTHDAY,', 'AKKI.'];

export default function BirthdayHero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #08090D 0%, #10121C 50%, #08090D 100%)' }}
    >
      {/* Light rays */}
      {[-20, 0, 20].map((deg, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: '2px',
            height: '120%',
            top: '-10%',
            left: '50%',
            background: 'linear-gradient(180deg, transparent, rgba(217,183,119,0.05), transparent)',
            transform: `rotate(${deg}deg)`,
            animation: `lightRay 6s ease-in-out ${i * 1.5}s infinite`,
            opacity: 0.05,
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] text-[#D9B777] mb-6"
        >
          {birthdayConfig.hero.eyebrow}
        </motion.p>

        {/* Headline — word by word */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold leading-tight mb-6">
          {headlineWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className={`inline-block mr-4 ${word === 'AKKI.' ? 'text-gold' : 'text-[#FFF4E5]'}`}
              style={
                word === 'AKKI.'
                  ? { textShadow: '0 0 40px rgba(217,183,119,0.5)' }
                  : undefined
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-[#C5C7D0] mt-6"
        >
          {birthdayConfig.hero.subtext}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-sm italic text-[#FFF4E5]/60 mt-3"
        >
          {birthdayConfig.hero.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex gap-4 justify-center flex-wrap mt-10"
        >
          <button
            onClick={() => scrollTo('#roast')}
            className="flex items-center gap-2 border border-[#D9B777] text-[#D9B777] px-6 py-3 text-sm tracking-widest hover:bg-[#D9B777]/10 transition-colors duration-300"
          >
            EXPLORE YOUR SURPRISE <ChevronDown size={16} />
          </button>
          <button
            onClick={() => scrollTo('#letter')}
            className="flex items-center gap-2 bg-[#D9B777] text-[#08090D] px-6 py-3 text-sm tracking-widest font-semibold hover:bg-[#f0d080] transition-colors duration-300"
          >
            A MESSAGE FOR YOU <Mail size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
