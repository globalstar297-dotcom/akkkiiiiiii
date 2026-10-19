import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FloatingParticles from './components/FloatingParticles';
import MusicToggle from './components/MusicToggle';
import Navbar from './components/Navbar';
import OpeningPage from './pages/OpeningPage';
import HeroPage from './pages/HeroPage';
import LetterPage from './pages/LetterPage';
import GalleryPage from './pages/GalleryPage';
import ReasonsPage from './pages/ReasonsPage';
import SurprisesPage from './pages/SurprisesPage';
import FinalePage from './pages/FinalePage';

function AnimatedRoutes() {
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <>
      <FloatingParticles />
      {showNav && <MusicToggle />}
      {showNav && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/hero" element={<HeroPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/memories" element={<GalleryPage />} />
          <Route path="/reasons" element={<ReasonsPage />} />
          <Route path="/surprises" element={<SurprisesPage />} />
          <Route path="/finale" element={<FinalePage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen font-clean">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
