import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { config } from '../config';

const photos = config.gallery;

function Lightbox({ photo, index, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Touch swipe
  let touchStartX = 0;
  const onTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) onNext();
    else if (diff < -50) onPrev();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{background: 'rgba(0,0,0,0.92)'}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative max-w-4xl w-full px-12" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-3xl font-light leading-none hover:text-pink-300 transition-colors"
          aria-label="Close lightbox"
        >✕</button>

        <motion.img
          key={photo.id}
          src={photo.src}
          alt={photo.caption}
          className="w-full rounded-2xl object-contain"
          style={{maxHeight: '75vh'}}
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.3}}
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        <p className="text-center text-white mt-4 font-clean text-sm opacity-80">{photo.caption}</p>
        <p className="text-center text-pink-300 font-clean text-xs mt-1">{index + 1} / {total}</p>

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl px-3 py-4 rounded-full hover:text-pink-300 transition-colors"
          aria-label="Previous photo"
        >‹</button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl px-3 py-4 rounded-full hover:text-pink-300 transition-colors"
          aria-label="Next photo"
        >›</button>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = useCallback(() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length), []);
  const nextPhoto = useCallback(() => setLightboxIndex((i) => (i + 1) % photos.length), []);

  return (
    <PageTransition>
      <div
        className="relative min-h-screen px-4 md:px-8 py-16 pb-24 md:pb-16 overflow-hidden"
        style={{background: 'linear-gradient(160deg, #4a0e8f 0%, #9b2c5d 50%, #c9415a 100%)',}}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="font-elegant text-4xl md:text-5xl text-center mb-3 text-white"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            Our Little Collection of Memories 📸
          </motion.h2>
          <motion.p
            className="font-cursive text-xl text-center mb-8"
            style={{color: 'rgba(255,200,220,0.9)'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.3}}
          >
            A little collection of our most beautiful moments together 💗
          </motion.p>

          {/* Filter tabs (UI only) */}
          <div className="flex gap-3 justify-center mb-8 flex-wrap">
            {['All', 'Portraits', 'Together', 'Candid'].map((tab) => (
              <button
                key={tab}
                className="px-5 py-2 rounded-full font-clean text-sm font-medium transition-all"
                style={{background: tab === 'All'
                    ? 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'
                    : 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(8px)',}}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="relative break-inside-avoid rounded-3xl overflow-hidden cursor-pointer group mb-4"
                style={{boxShadow: '0 0 20px rgba(255,107,157,0.3)',
                  border: '1px solid rgba(255,182,193,0.3)',}}
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: (i % 6) * 0.06}}
                whileHover={{scale: 1.03, boxShadow: '0 0 35px rgba(255,107,157,0.6)'}}
                onClick={() => openLightbox(i)}
              >
                {/* Number badge */}
                <div
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center font-clean text-xs font-bold text-white"
                  style={{background: 'rgba(255,107,157,0.8)'}}
                >
                  {i + 1}
                </div>

                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />

                {/* Fallback */}
                <div
                  className="w-full h-40 items-center justify-center text-4xl"
                  style={{display: 'none', background: 'rgba(255,182,193,0.2)'}}
                >📸</div>

                {/* Caption overlay on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3"
                  style={{background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',}}
                >
                  <p className="font-clean text-xs text-white">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <motion.button
              onClick={() => navigate('/letter')}
              className="px-6 py-3 rounded-full font-clean font-semibold shadow-lg"
              style={{background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              ← Letter
            </motion.button>
            <motion.button
              onClick={() => navigate('/reasons')}
              className="px-6 py-3 rounded-full font-clean font-semibold text-white shadow-lg"
              style={{background: 'linear-gradient(135deg, #FF6B9D, #C9B8FF)'}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.96}}
            >
              Next: Special 🌷
            </motion.button>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              photo={photos[lightboxIndex]}
              index={lightboxIndex}
              total={photos.length}
              onClose={closeLightbox}
              onPrev={prevPhoto}
              onNext={nextPhoto}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
