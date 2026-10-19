import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerConfetti = () => {
    const colors = ['#FFD6E0', '#C9B8FF', '#FFD700', '#FFCBA4', '#FF6B9D', '#E8A598'];
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors });
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
  };

  const gentleConfetti = () => {
    const colors = ['#FFD6E0', '#C9B8FF', '#FFD700', '#FFCBA4'];
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors, gravity: 0.5 });
  };

  return { triggerConfetti, gentleConfetti };
}
