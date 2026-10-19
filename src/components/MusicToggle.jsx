import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState(false);
  const audioRef = useRef(null);

  const toggle = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/birthday-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setToast(true);
        setTimeout(() => setToast(false), 4000);
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={toggle}
        className="fixed top-4 right-4 z-50 glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-clean shadow-lg"
        style={{ color: '#FF6B9D' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? 'Mute music' : 'Play music'}
      >
        <motion.span
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: playing ? Infinity : 0, ease: 'linear' }}
        >
          {playing ? <Music size={16} /> : <VolumeX size={16} />}
        </motion.span>
        <span>{playing ? 'Music On 🎵' : 'Music Off 🎵'}</span>
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-16 right-4 z-50 glass rounded-2xl px-4 py-3 text-xs shadow-md max-w-xs"
            style={{ color: '#FF6B9D' }}
          >
            🎵 Add birthday-music.mp3 to the /public folder to enable music!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
