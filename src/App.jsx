import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import HeroSection from './components/HeroSection';
import BirthdayLetter from './components/BirthdayLetter';
import MemoriesGallery from './components/MemoriesGallery';
import ReasonsSpecial from './components/ReasonsSpecial';
import InteractiveSurprises from './components/InteractiveSurprises';
import GrandFinale from './components/GrandFinale';
import FloatingParticles from './components/FloatingParticles';
import MusicToggle from './components/MusicToggle';

export default function App() {
  const [showMain, setShowMain] = useState(false);

  return (
    <div className="relative min-h-screen font-clean">
      <FloatingParticles />
      <MusicToggle />

      <AnimatePresence>
        {!showMain && (
          <OpeningScreen onReveal={() => setShowMain(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMain && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroSection />
            <BirthdayLetter />
            <MemoriesGallery />
            <ReasonsSpecial />
            <InteractiveSurprises />
            <GrandFinale />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
