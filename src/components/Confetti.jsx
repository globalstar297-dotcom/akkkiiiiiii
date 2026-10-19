import { forwardRef, useImperativeHandle } from 'react';
import { useConfetti } from '../hooks/useConfetti';

const Confetti = forwardRef((props, ref) => {
  const { triggerConfetti, gentleConfetti } = useConfetti();
  useImperativeHandle(ref, () => ({ triggerConfetti, gentleConfetti }));
  return null;
});
Confetti.displayName = 'Confetti';
export default Confetti;
