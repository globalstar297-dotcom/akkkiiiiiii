import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthday';

const TOTAL = birthdayConfig.gallery.length;

export default function MemoryGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + TOTAL) % TOTAL);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % TOTAL);
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  // Body overflow control
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50)  next();
    if (delta < -50) prev();
  };

  const currentItem = lightboxIndex !== null ? birthdayConfig.gallery[lightboxIndex] : null;

  return (
    <section id="memories" className="bg-[#08090D] py-24 px-6">
      {/* Heading */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl md:text-4xl text-gold mb-4"
        >
          THE ARCHIVE OF CHAOS &amp; BEAUTIFUL MEMORIES.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#C5C7D0] text-sm tracking-wide"
        >
          Proof that we&apos;ve been creating stories, laughing at nonsense, and collecting memories for years.
        </motion.p>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4">
        {birthdayConfig.gallery.map((item, index) => (
          <div
            key={item.id}
            className="break-inside-avoid mb-4 relative overflow-hidden group border border-[#D9B777]/30 rounded-sm cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            {/* Fallback behind img */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#10121C] to-[#1a1a2e] text-[#D9B777] text-4xl">
              📷
            </div>

            <img
              src={item.src}
              alt={item.alt}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              loading="lazy"
            />

            {/* Number badge */}
            <div className="absolute top-2 right-2 bg-black/60 text-[#D9B777] text-xs px-2 py-0.5 z-20 rounded-sm">
              {String(item.id).padStart(2, '0')}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
              <p className="text-[#FFF4E5] text-xs">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#D9B777] text-sm tracking-widest z-10">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </div>

            {/* Close */}
            <button
              className="absolute top-4 right-4 text-[#C5C7D0] hover:text-[#D9B777] transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5C7D0] hover:text-[#D9B777] transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl mx-auto px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-sm border border-[#D9B777]/30"
              />
              <p className="text-[#C5C7D0] text-sm text-center mt-4">{currentItem.caption}</p>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5C7D0] hover:text-[#D9B777] transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
