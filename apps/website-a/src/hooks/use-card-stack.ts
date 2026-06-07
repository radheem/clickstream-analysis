import { useEffect, useRef, useState } from 'react';

export function useCardStack<T>(items: readonly T[], duration = 5000) {
  const [cards, setCards] = useState([...items]);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(0);
  const elapsedRef = useRef(0);

  const activeIndex = items.indexOf(cards[0]);

  const goTo = (targetIndex: number) => {
    if (targetIndex === activeIndex) return;
    elapsedRef.current = 0;
    setCards([...items.slice(targetIndex), ...items.slice(0, targetIndex)]);
  };

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    const remaining = duration - elapsedRef.current;
    const id = setTimeout(() => {
      elapsedRef.current = 0;
      setCards((prev) => {
        const next = [...prev];
        next.push(next.shift()!);
        return next;
      });
    }, remaining);
    return () => clearTimeout(id);
  }, [paused, activeIndex, duration]);

  // Progress tracking
  useEffect(() => {
    if (paused) {
      elapsedRef.current = (progress / 100) * duration;
      return;
    }
    startRef.current = performance.now() - elapsedRef.current;
    let rafId: number;
    const tick = () => {
      const pct = Math.min(
        ((performance.now() - startRef.current) / duration) * 100,
        100,
      );
      setProgress(pct);
      if (pct < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused, activeIndex, duration]);

  return { cards, paused, setPaused, goTo, activeIndex, progress };
}

export function getCardStyle(index: number) {
  if (index === 0) return { top: 0, scale: 1, zIndex: 3, opacity: 1 };
  if (index === 1) return { top: -16, scale: 0.9, zIndex: 1, opacity: 0.5 };
  if (index === 2) return { top: -8, scale: 0.95, zIndex: 2, opacity: 1 };
  return { top: -8, scale: 0.95, zIndex: 0, opacity: 0 };
}
