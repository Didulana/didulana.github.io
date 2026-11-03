import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const GLYPHS = '01<>/{}[]#$%&*+=?';

type Props = {
  text: string;
  className?: string;
  // When to play: on first view, and/or again on hover
  replayOnHover?: boolean;
  duration?: number;
};

// Text that "decodes" from random glyphs into the real characters, left to right.
export default function ScrambleText({ text, className = '', replayOnHover = false, duration = 700 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);

  const play = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const settled = Math.floor(progress * text.length);
      setDisplay(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, duration, reduced]);

  useEffect(() => {
    if (inView) play();
  }, [inView, play]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={replayOnHover ? play : undefined}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
