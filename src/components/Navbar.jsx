import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', emoji: '🎂', path: '/hero' },
  { label: 'Letter', emoji: '💌', path: '/letter' },
  { label: 'Memories', emoji: '📸', path: '/memories' },
  { label: 'Special', emoji: '🌷', path: '/reasons' },
  { label: 'Surprises', emoji: '🎁', path: '/surprises' },
  { label: 'Finale', emoji: '🌌', path: '/finale' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{opacity: 0, y: 60}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6, ease: 'easeOut'}}
      className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:top-4"
      aria-label="Page navigation"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 md:px-4 md:py-2.5 rounded-full shadow-2xl"
        style={{background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,182,193,0.4)',
          boxShadow: '0 8px 32px rgba(255,107,157,0.2), 0 2px 8px rgba(0,0,0,0.1)',}}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 md:px-3 md:py-2 rounded-full transition-all"
              style={{background: isActive
                  ? 'linear-gradient(135deg, rgba(255,107,157,0.35), rgba(201,184,255,0.35))'
                  : 'transparent',
                minWidth: '44px',}}
              whileHover={{y: -3, scale: 1.05}}
              whileTap={{scale: 0.95}}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-lg md:text-xl leading-none">{item.emoji}</span>
              <span
                className="hidden md:block font-clean text-xs font-medium"
                style={{color: isActive ? '#FF6B9D' : 'rgba(100,50,80,0.8)'}}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeNavDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{background: '#FF6B9D', boxShadow: '0 0 6px #FF6B9D'}}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
