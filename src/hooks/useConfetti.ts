import confetti from 'canvas-confetti';

const AKKI_COLORS = ['#D9B777', '#B77B85', '#FFF4E5', '#C5C7D0'];

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function triggerConfetti(_options?: Record<string, unknown>): void {
  if (prefersReducedMotion()) return;
  confetti({ particleCount: 100, spread: 80,  origin: { y: 0.6 },       colors: AKKI_COLORS });
  confetti({ particleCount: 60,  spread: 55,  origin: { x: 0, y: 0.6 }, colors: AKKI_COLORS, angle: 60  });
  confetti({ particleCount: 60,  spread: 55,  origin: { x: 1, y: 0.6 }, colors: AKKI_COLORS, angle: 120 });
}

export function gentleConfetti(): void {
  if (prefersReducedMotion()) return;
  confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors: AKKI_COLORS, gravity: 0.5 });
}
