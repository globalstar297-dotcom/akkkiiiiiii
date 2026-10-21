import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldParticles from './components/GoldParticles';
import Navigation from './components/Navigation';
import IntroScene from './components/IntroScene';
import BirthdayHero from './components/BirthdayHero';
import RoastSection from './components/RoastSection';
import MemoryGallery from './components/MemoryGallery';
import BirthdayLetter from './components/BirthdayLetter';
import BirthdayCake from './components/BirthdayCake';
import WishGenerator from './components/WishGenerator';
import BirthdayFinale from './components/BirthdayFinale';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <GoldParticles />

      <AnimatePresence>
        {showIntro && (
          <IntroScene key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navigation />
            <BirthdayHero />
            <RoastSection />
            <MemoryGallery />
            <BirthdayLetter />

            {/* Wish section — wraps BirthdayCake + WishGenerator */}
            <section
              id="wish"
              style={{ background: '#08090D', padding: '80px 0' }}
            >
              <BirthdayCake />
              <WishGenerator />
            </section>

            <BirthdayFinale />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
