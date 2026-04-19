import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, duration = 2000, startOnVisible = true) {
  const [count, setCount] = useState(startOnVisible ? 0 : target);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!startOnVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      animateCount();
    }
  }, [startOnVisible]);

  const animateCount = () => {
    const startTime = Date.now();
    const increment = target / (duration / 16);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        setCount(Math.min(Math.floor(increment * (elapsed / 16)), target));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  };

  return { count, elementRef };
}
