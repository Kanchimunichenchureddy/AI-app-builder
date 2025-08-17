import { useState, useEffect } from 'react';

export function useAnimationSettings() {
  const [enableAnimations, setEnableAnimations] = useState(() => {
    const saved = localStorage.getItem('enableAnimations');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return saved !== null ? JSON.parse(saved) : !prefersReducedMotion;
  });

  useEffect(() => {
    localStorage.setItem('enableAnimations', JSON.stringify(enableAnimations));
  }, [enableAnimations]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setEnableAnimations(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { enableAnimations, setEnableAnimations };
}