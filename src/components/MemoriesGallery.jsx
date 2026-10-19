import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { config } from '../config';

function PhotoCard({ photo, index, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
      style={{ border: '2px solid rgba(255,182,193,0.4)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(255,107,157,0.35)' }}
      onClick={() => onClick(index)}
    >
      <div className="aspect-square overflow-hidden">
        {!imgError && photo.src ? (
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #FFD6E0, #C9B8FF)' }}
          >
            <Camera size={40} className="text-white" style={{ opacity: 0.7 }} />
            <span className="text-white text-sm font-clean" style={{ opacity: 0.7 }}>
              {photo.title}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 text-center" style={{ background: 'rgba(255,255,255,0.7)' }}>
        <p className="font-cursive text-sm" style={{ color: '#f43f5e' }}>
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function MemoriesGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const photos = config.gallery;

  const prev = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setLightboxIndex((i) => (i + 1) % photos.length);

  return (
    <section
      className="py-20 px-6"
      style={{ background: 'linear-gradient(160deg, rgba(201,184,255,0.15), #FFD6E0)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-elegant text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#FF6B9D' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Little Collection of Memories 📸
        </motion.h2>
        <p className="font-clean text-center mb-12" style={{ color: '#fb7185' }}>
          A little collection of our most beautiful moments together 💗
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} onClick={setLightboxIndex} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="aspect-square"
                style={{ background: 'linear-gradient(135deg, #FFD6E0, #C9B8FF)' }}
              >
                {photos[lightboxIndex].src ? (
                  <img
                    src={photos[lightboxIndex].src}
                    alt={photos[lightboxIndex].title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera size={64} className="text-white" style={{ opacity: 0.5 }} />
                  </div>
                )}
              </div>
              <div className="p-4 text-center" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <p className="font-cursive text-lg" style={{ color: '#f43f5e' }}>
                  {photos[lightboxIndex].caption}
                </p>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:text-rose-600 transition-colors"
                style={{ color: '#fb7185' }}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:text-rose-600 transition-colors"
                style={{ color: '#fb7185' }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-14 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:text-rose-600 transition-colors"
                style={{ color: '#fb7185' }}
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
