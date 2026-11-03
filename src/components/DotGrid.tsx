import { useEffect, useRef } from 'react';

const GAP = 24;
const RADIUS = 1.1;
const LENS = 150; // cursor influence radius in px

const readRgb = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);

// A calm dot grid: a slow brightness wave drifts across it, and dots near the cursor
// swell and pick up the theme's gradient colours.
export default function DotGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let ink = [0, 0, 0];
    let from = [0, 0, 0];
    let to = [0, 0, 0];
    const mouse = { x: -9999, y: -9999 };
    const lens = { x: -9999, y: -9999 }; // eased toward the mouse for a soft trail
    let raf = 0;
    let running = false;

    const loadColors = () => {
      ink = readRgb('--ink');
      from = readRgb('--accent');
      to = readRgb('--teal');
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      lens.x += (mouse.x - lens.x) * 0.12;
      lens.y += (mouse.y - lens.y) * 0.12;
      ctx.clearRect(0, 0, width, height);

      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const wave = reduced ? 0.5 : (Math.sin(x * 0.012 + y * 0.008 - t * 0.9) + 1) / 2;
          const d = Math.hypot(x - lens.x, y - lens.y);
          const near = d < LENS ? 1 - d / LENS : 0;
          const ease = near * near;

          const alpha = 0.1 + wave * 0.12 + ease * 0.75;
          const r = RADIUS + ease * 1.9;

          // Near the cursor, blend from the accent to the secondary colour across the width.
          let c = ink;
          if (ease > 0) {
            const k = x / width;
            c = [0, 1, 2].map((i) => {
              const g = from[i] + (to[i] - from[i]) * k;
              return ink[i] + (g - ink[i]) * Math.min(1, ease * 1.6);
            });
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${alpha})`;
          ctx.fill();
        }
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const redrawStatic = () => reduced && draw(0);

    loadColors();
    resize();
    redrawStatic();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    // Only animate while visible on screen and the tab is in the foreground.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());

    const themeObserver = new MutationObserver(() => {
      loadColors();
      redrawStatic();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const ro = new ResizeObserver(() => {
      resize();
      redrawStatic();
    });
    ro.observe(canvas);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />;
}
