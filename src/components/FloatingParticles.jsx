import { useEffect, useState, useRef } from 'react';

const EMOJIS = ['✨', '💗', '⭐', '🌸', '💫', '🦋'];

export default function FloatingParticles() {
  const [particles, setParticles] = useState([]);
  const prefersReduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (prefersReduced.current) return;
    const count = window.innerWidth < 768 ? 20 : 40;
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      animDuration: 8 + Math.random() * 12,
      animDelay: Math.random() * 10,
      size: 0.8 + Math.random() * 0.8,
      opacity: 0.4 + Math.random() * 0.4,
    }));
    setParticles(newParticles);
  }, []);

  if (prefersReduced.current) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            opacity: p.opacity,
            animation: `float-up ${p.animDuration}s ease-in ${p.animDelay}s infinite`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
