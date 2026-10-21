import { useState, useRef, useEffect } from 'react';

export function useTypingAnimation(fullText: string, charDelay = 20, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  // useRef for guard — avoids stale closure in setInterval
  const hasStarted = useRef<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef<number>(0);

  const startTyping = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    timerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        indexRef.current += 1;
        setDisplayedText(fullText.slice(0, indexRef.current));
        if (indexRef.current >= fullText.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsDone(true);
        }
      }, charDelay);
    }, startDelay);
  };

  const skipToEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    indexRef.current = fullText.length;
    setDisplayedText(fullText);
    setIsDone(true);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { displayedText, isDone, startTyping, skipToEnd };
}
