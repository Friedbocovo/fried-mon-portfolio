import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  className = 'animate-on-scroll',
  threshold = 0.15
) {
  const hasSetup = useRef(false);

  useEffect(() => {
    if (hasSetup.current) return;
    hasSetup.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const allClasses = [
      'animate-on-scroll',
      'animate-on-scroll-left',
      'animate-on-scroll-right',
    ];

    allClasses.forEach((cls) => {
      document.querySelectorAll(`.${cls}`).forEach((el) => {
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [className, threshold]);
}

export function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = words[indexRef.current];

      if (!deletingRef.current) {
        charRef.current++;
        el.textContent = current.slice(0, charRef.current);

        if (charRef.current === current.length) {
          deletingRef.current = true;
          timeout = setTimeout(type, pause);
          return;
        }
      } else {
        charRef.current--;
        el.textContent = current.slice(0, charRef.current);

        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % words.length;
        }
      }

      timeout = setTimeout(type, deletingRef.current ? speed / 2 : speed);
    };

    timeout = setTimeout(type, speed);
    return () => clearTimeout(timeout);
  }, [words, speed, pause]);

  return elementRef;
}
